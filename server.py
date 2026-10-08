"""Serve the imported static site without exposing project configuration."""

import hashlib
import hmac
import ipaddress
import json
import os
from datetime import datetime, timedelta
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
from zoneinfo import ZoneInfo

import psycopg


ROOT = Path(__file__).resolve().parent
SUPPORT_COUNT_PATH = "/api/support-count"
BRAZIL_TIME = ZoneInfo("America/Sao_Paulo")
PUBLIC_ASSET_SUFFIXES = {
    ".css", ".js", ".jpg", ".jpeg", ".png", ".svg", ".ico", ".webp", ".gif",
    ".woff", ".woff2", ".mp3", ".mp4",
}
SECURITY_HEADERS = {
    "Content-Security-Policy": (
        "default-src 'self'; "
        "base-uri 'self'; "
        "object-src 'none'; "
        "frame-ancestors 'none'; "
        "form-action 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "img-src 'self' data: https://flagcdn.com; "
        "connect-src 'self'; "
        "media-src 'self' blob:; "
        "frame-src 'none'"
    ),
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
}
PUBLIC_FILES = {
    path.name
    for path in ROOT.iterdir()
    if path.is_file()
    and path.suffix.lower() in {".html", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".mp3", ".mp4", ".webp", ".gif"}
}
PUBLIC_FILES.add("branding.js")
TRUSTED_PROXY_NETWORKS = tuple(
    ipaddress.ip_network(value.strip(), strict=False)
    for value in os.environ.get("TRUSTED_PROXY_CIDRS", "").split(",")
    if value.strip()
)


def open_database_connection():
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is required for the support counter.")
    return psycopg.connect(
        database_url,
        connect_timeout=5,
        options="-c statement_timeout=8000 -c lock_timeout=3000",
    )


def ensure_support_schema(cursor):
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS public.campaign_support_baseline (
            singleton BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (singleton),
            baseline_count BIGINT NOT NULL CHECK (baseline_count >= 0),
            resumed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        """
    )
    cursor.execute(
        """
        INSERT INTO public.campaign_support_baseline (singleton, baseline_count)
        VALUES (TRUE, 2380)
        ON CONFLICT (singleton) DO NOTHING
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS public.campaign_support_votes (
            ip_hash TEXT PRIMARY KEY,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        """
    )


class SiteHandler(SimpleHTTPRequestHandler):
    def setup(self):
        super().setup()
        self.connection.settimeout(10)

    def version_string(self):
        return "CWMunista"

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def get_client_ip_hash(self):
        secret = os.environ.get("SESSION_SECRET")
        if not secret or len(secret.encode("utf-8")) < 32:
            raise RuntimeError("SESSION_SECRET must contain at least 32 bytes.")

        peer_ip = ipaddress.ip_address(self.client_address[0])
        client_ip = peer_ip
        if any(peer_ip in network for network in TRUSTED_PROXY_NETWORKS):
            forwarded_for = self.headers.get("X-Forwarded-For", "")
            for candidate in reversed(forwarded_for.split(",")):
                try:
                    forwarded_ip = ipaddress.ip_address(candidate.strip())
                except ValueError:
                    continue
                if any(forwarded_ip in network for network in TRUSTED_PROXY_NETWORKS):
                    continue
                client_ip = forwarded_ip
                break

        return hmac.new(
            secret.encode("utf-8"),
            client_ip.compressed.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

    def is_same_origin_request(self):
        origin = self.headers.get("Origin")
        host = self.headers.get("Host")
        if not origin or not host:
            return False
        try:
            origin_parts = urlsplit(origin)
            host_parts = urlsplit(f"//{host}")
            if (
                origin_parts.scheme not in {"http", "https"}
                or not origin_parts.hostname
                or not host_parts.hostname
                or origin_parts.path not in {"", "/"}
                or origin_parts.query
                or origin_parts.fragment
            ):
                return False
            default_port = 443 if origin_parts.scheme == "https" else 80
            return (
                origin_parts.hostname.casefold() == host_parts.hostname.casefold()
                and (origin_parts.port or default_port) == (host_parts.port or default_port)
            )
        except ValueError:
            return False

    def get_support_stats(self):
        now = datetime.now(BRAZIL_TIME)
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        first_day = today_start.date() - timedelta(days=6)
        week_start = datetime.combine(first_day, datetime.min.time(), tzinfo=BRAZIL_TIME)

        with open_database_connection() as connection:
            with connection.cursor() as cursor:
                ensure_support_schema(cursor)
                cursor.execute(
                    """
                    SELECT baseline.baseline_count,
                           baseline.resumed_at,
                           COUNT(vote.ip_hash)::BIGINT AS added_count,
                           COUNT(vote.ip_hash) FILTER (
                               WHERE vote.created_at >= %s
                           )::BIGINT AS today_count
                    FROM public.campaign_support_baseline AS baseline
                    LEFT JOIN public.campaign_support_votes AS vote ON TRUE
                    WHERE baseline.singleton IS TRUE
                    GROUP BY baseline.baseline_count, baseline.resumed_at
                    """,
                    (today_start,),
                )
                row = cursor.fetchone()
                if row is None:
                    raise RuntimeError("The support counter baseline is not configured.")

                baseline, resumed_at, added, today_count = row
                cursor.execute(
                    """
                    SELECT (created_at AT TIME ZONE 'America/Sao_Paulo')::DATE AS vote_day,
                           COUNT(*)::BIGINT AS vote_count
                    FROM public.campaign_support_votes
                    WHERE created_at >= %s
                    GROUP BY vote_day
                    ORDER BY vote_day
                    """,
                    (week_start,),
                )
                activity_rows = cursor.fetchall()

        activity_by_day = {day: int(count) for day, count in activity_rows}
        activity = [
            {
                "date": (first_day + timedelta(days=offset)).isoformat(),
                "count": activity_by_day.get(first_day + timedelta(days=offset), 0),
            }
            for offset in range(7)
        ]
        baseline = int(baseline)
        added = int(added)
        total = baseline + added

        return {
            "baseline": baseline,
            "total": total,
            "added": added,
            "today": int(today_count),
            "changePercent": round((added / baseline) * 100, 6) if baseline else 0,
            "resumedAt": resumed_at.isoformat(),
            "activity": activity,
        }

    def do_GET(self):
        if urlsplit(self.path).path == SUPPORT_COUNT_PATH:
            try:
                self.send_json(200, self.get_support_stats())
            except Exception as error:
                print("Support count read failed:", type(error).__name__, flush=True)
                self.send_json(503, {"error": "A contagem está temporariamente indisponível."})
            return
        super().do_GET()

    def do_POST(self):
        if urlsplit(self.path).path != SUPPORT_COUNT_PATH:
            self.send_json(404, {"error": "Endpoint não encontrado."})
            return

        if not self.is_same_origin_request():
            self.send_json(403, {"error": "Origem da solicitação não permitida."})
            return

        if self.headers.get_content_type() != "application/json":
            self.send_json(415, {"error": "Envie a solicitação como JSON."})
            return
        content_length_header = self.headers.get("Content-Length", "0")
        if not content_length_header.isascii() or not content_length_header.isdecimal():
            self.send_json(400, {"error": "Tamanho da solicitação inválido."})
            return
        try:
            content_length = int(content_length_header)
        except ValueError:
            self.send_json(400, {"error": "Tamanho da solicitação inválido."})
            return
        if content_length > 1024:
            self.send_json(413, {"error": "Solicitação muito grande."})
            return
        try:
            payload = json.loads(self.rfile.read(content_length) or b"{}")
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_json(400, {"error": "JSON inválido."})
            return
        if payload != {}:
            self.send_json(400, {"error": "Formato inválido."})
            return

        try:
            ip_hash = self.get_client_ip_hash()
            with open_database_connection() as connection:
                with connection.cursor() as cursor:
                    ensure_support_schema(cursor)
                    cursor.execute(
                        """
                        INSERT INTO public.campaign_support_votes (ip_hash)
                        VALUES (%s)
                        ON CONFLICT (ip_hash) DO NOTHING
                        RETURNING ip_hash
                        """,
                        (ip_hash,),
                    )
                    recorded = cursor.fetchone() is not None
            stats = self.get_support_stats()
            stats["recorded"] = recorded
            self.send_json(200, stats)
        except Exception as error:
            print("Support count write failed:", type(error).__name__, flush=True)
            self.send_json(503, {"error": "Não foi possível registrar o apoio agora."})

    def send_head(self):
        path = unquote(urlsplit(self.path).path)
        parts = Path(path).parts
        if any(part.startswith(".") or part == ".." for part in parts):
            self.send_error(404)
            return None
        if path == "/api" or path.startswith("/api/"):
            body = json.dumps({"error": "The imported project does not include an API backend."}).encode()
            self.send_response(503)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            return None
        target = (ROOT / path.lstrip("/")).resolve()
        if not target.is_relative_to(ROOT):
            self.send_error(404)
            return None
        is_public = (
            path.lstrip("/") in PUBLIC_FILES
            or (
                path.startswith("/assets/")
                and target.is_file()
                and target.suffix.lower() in PUBLIC_ASSET_SUFFIXES
            )
        )
        if not is_public:
            if path == "/":
                self.path = "/index.html"
            else:
                self.send_error(404)
                return None
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        for name, value in SECURITY_HEADERS.items():
            self.send_header(name, value)
        super().end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer(
        ("0.0.0.0", 5000), partial(SiteHandler, directory=str(ROOT))
    )
    print("Static website listening on 0.0.0.0:5000", flush=True)
    server.serve_forever()