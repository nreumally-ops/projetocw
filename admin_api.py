import base64
import hashlib
import hmac
import html
import json
import os
import re
import secrets
import time
from html.parser import HTMLParser
from http.cookies import SimpleCookie
from pathlib import PurePosixPath
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, quote, urlencode, urlsplit
from urllib.request import Request, urlopen

import psycopg


SESSION_COOKIE = "cw_admin_session"
STATE_COOKIE = "cw_x_oauth_state"
VERIFIER_COOKIE = "cw_x_oauth_verifier"
SESSION_TTL = 60 * 60 * 24 * 5
ALLOWED_TAGS = {"a", "b", "blockquote", "br", "div", "em", "h2", "h3", "i", "img", "li", "ol", "p", "s", "span", "strong", "u", "ul", "video"}
VOID_TAGS = {"br", "img"}
ALLOWED_MEDIA_TYPES = {
    "image/gif", "image/jpeg", "image/png", "image/webp",
    "video/mp4", "video/quicktime", "video/webm",
}
ALLOWED_EXTENSIONS = {
    ".gif", ".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mov", ".webm",
}


class ConfigurationError(Exception):
    pass


def env(name, default=""):
    return os.environ.get(name, default).strip()


def site_origin():
    return env("SITE_ORIGIN", "https://cwmunista.vercel.app").rstrip("/")


def allowed_origins():
    configured = env("ALLOWED_ADMIN_ORIGINS")
    origins = {site_origin()}
    origins.update(origin.strip().rstrip("/") for origin in configured.split(",") if origin.strip())
    admin_url = env("ADMIN_APP_URL")
    if admin_url.startswith("https://"):
        origins.add(urlsplit(admin_url).scheme + "://" + urlsplit(admin_url).netloc)
    return origins


def session_secret():
    secret = env("SESSION_SECRET")
    if len(secret.encode("utf-8")) < 32:
        raise ConfigurationError("SESSION_SECRET must contain at least 32 bytes.")
    return secret.encode("utf-8")


def encode_token(payload):
    encoded = base64.urlsafe_b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode().rstrip("=")
    signature = hmac.new(session_secret(), encoded.encode(), hashlib.sha256).hexdigest()
    return f"{encoded}.{signature}"


def decode_token(token):
    try:
        encoded, signature = token.split(".", 1)
        expected = hmac.new(session_secret(), encoded.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected):
            return None
        payload = json.loads(base64.urlsafe_b64decode(encoded + "=" * (-len(encoded) % 4)))
        if int(payload.get("exp", 0)) < int(time.time()):
            return None
        return payload
    except (ValueError, TypeError, json.JSONDecodeError, ConfigurationError):
        return None


def cookie_value(handler, name):
    cookie = SimpleCookie()
    cookie.load(handler.headers.get("Cookie", ""))
    morsel = cookie.get(name)
    return morsel.value if morsel else ""


def cookie_header(name, value, max_age, path="/", http_only=True):
    parts = [f"{name}={value}", f"Path={path}", f"Max-Age={max_age}", "SameSite=Lax", "Secure"]
    domain = env("SESSION_COOKIE_DOMAIN")
    if domain:
        parts.append(f"Domain={domain}")
    if http_only:
        parts.append("HttpOnly")
    return "; ".join(parts)


def clear_cookie_header(name, path="/"):
    return cookie_header(name, "", 0, path)


def current_session(handler):
    session = decode_token(cookie_value(handler, SESSION_COOKIE))
    if not session or not session.get("x_user_id") or not session.get("username"):
        return None
    allowed_ids = {value.strip() for value in env("ADMIN_X_USER_IDS").split(",") if value.strip()}
    if not allowed_ids or session["x_user_id"] not in allowed_ids:
        return None
    return session


def is_allowed_origin(handler):
    origin = handler.headers.get("Origin", "").rstrip("/")
    return origin in allowed_origins()


def require_origin(handler):
    if not is_allowed_origin(handler):
        send_json(handler, 403, {"error": "Origem não autorizada."})
        return False
    return True


def require_admin(handler):
    if not require_origin(handler):
        return None
    session = current_session(handler)
    if not session:
        send_json(handler, 401, {"error": "Sessão administrativa necessária."})
        return None
    return session


def send_json(handler, status, payload, extra_headers=None):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    for name, value in (extra_headers or []):
        handler.send_header(name, value)
    handler.end_headers()
    handler.wfile.write(body)


def send_redirect(handler, location, cookies=None):
    handler.send_response(302)
    handler.send_header("Location", location)
    handler.send_header("Cache-Control", "no-store")
    for cookie in cookies or []:
        handler.send_header("Set-Cookie", cookie)
    handler.end_headers()


def read_json(handler, max_bytes=1_000_000):
    length = handler.headers.get("Content-Length", "0")
    if not length.isascii() or not length.isdecimal() or int(length) > max_bytes:
        raise ValueError("Tamanho da solicitação inválido.")
    try:
        payload = json.loads(handler.rfile.read(int(length)) or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError) as error:
        raise ValueError("JSON inválido.") from error
    if not isinstance(payload, dict):
        raise ValueError("Envie um objeto JSON.")
    return payload


class RichTextSanitizer(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.output = []

    def handle_starttag(self, tag, attrs):
        if tag not in ALLOWED_TAGS:
            return
        safe_attrs = []
        attributes = dict(attrs)
        if tag == "a":
            href = attributes.get("href", "")
            if urlsplit(href).scheme == "https":
                safe_attrs.extend([( "href", href), ("target", "_blank"), ("rel", "noopener noreferrer")])
        if tag in {"img", "video"}:
            src = safe_media_url(attributes.get("src", ""))
            if not src:
                return
            safe_attrs.append(("src", src))
            if tag == "img" and attributes.get("alt"):
                safe_attrs.append(("alt", attributes["alt"][:300]))
            if tag == "video":
                safe_attrs.extend([("controls", ""), ("preload", "metadata")])
        if tag == "span":
            color = re.fullmatch(r"\s*color\s*:\s*(#[0-9a-fA-F]{3,8}|rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\))\s*;?\s*", attributes.get("style", ""), re.IGNORECASE)
            if color and (not color.group(2) or all(int(color.group(index)) <= 255 for index in (2, 3, 4))):
                safe_attrs.append(("style", f"color: {color.group(1)}"))
        rendered = "".join(f' {key}="{html.escape(value, quote=True)}"' for key, value in safe_attrs)
        self.output.append(f"<{tag}{rendered}>")

    def handle_endtag(self, tag):
        if tag in ALLOWED_TAGS and tag not in VOID_TAGS:
            self.output.append(f"</{tag}>")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_data(self, data):
        self.output.append(html.escape(data, quote=False))


def safe_media_url(value):
    parsed = urlsplit(value)
    storage_origin = env("SUPABASE_URL").rstrip("/")
    if not storage_origin or parsed.scheme != "https" or parsed.netloc != urlsplit(storage_origin).netloc:
        return ""
    if not parsed.path.startswith(f"/storage/v1/object/public/{env('POST_MEDIA_BUCKET', 'cwmunista-post-media')}/"):
        return ""
    return value


def sanitize_rich_text(value):
    sanitizer = RichTextSanitizer()
    sanitizer.feed(value)
    sanitizer.close()
    return "".join(sanitizer.output).strip()


def database_connection():
    database_url = env("DATABASE_URL")
    if not database_url:
        raise ConfigurationError("DATABASE_URL is not configured.")
    return psycopg.connect(database_url, connect_timeout=5, options="-c statement_timeout=8000 -c lock_timeout=3000")


def oauth_start(handler):
    required = ["X_CLIENT_ID", "X_CLIENT_SECRET", "ADMIN_X_USER_IDS"]
    missing = [name for name in required if not env(name)]
    try:
        session_secret()
    except ConfigurationError:
        missing.append("SESSION_SECRET")
    if missing:
        send_redirect(handler, "/admin/?error=not_configured")
        return

    state = secrets.token_urlsafe(32)
    verifier = secrets.token_urlsafe(64)
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).decode().rstrip("=")
    redirect_uri = env("X_REDIRECT_URI", site_origin() + "/api/auth/x/callback")
    params = urlencode({
        "response_type": "code",
        "client_id": env("X_CLIENT_ID"),
        "redirect_uri": redirect_uri,
        "scope": "users.read",
        "state": state,
        "code_challenge": challenge,
        "code_challenge_method": "S256",
    })
    location = "https://x.com/i/oauth2/authorize?" + params
    send_redirect(handler, location, [
        cookie_header(STATE_COOKIE, state, 600, "/api/auth/x"),
        cookie_header(VERIFIER_COOKIE, verifier, 600, "/api/auth/x"),
    ])


def oauth_callback(handler):
    query = parse_qs(urlsplit(handler.path).query)
    error = query.get("error", [""])[0]
    if error:
        send_redirect(handler, "/admin/?error=cancelled", [clear_cookie_header(STATE_COOKIE, "/api/auth/x"), clear_cookie_header(VERIFIER_COOKIE, "/api/auth/x")])
        return

    state = query.get("state", [""])[0]
    code = query.get("code", [""])[0]
    expected_state = cookie_value(handler, STATE_COOKIE)
    verifier = cookie_value(handler, VERIFIER_COOKIE)
    clear = [clear_cookie_header(STATE_COOKIE, "/api/auth/x"), clear_cookie_header(VERIFIER_COOKIE, "/api/auth/x")]
    if not state or not code or not expected_state or not hmac.compare_digest(state, expected_state) or not verifier:
        send_redirect(handler, "/admin/?error=invalid_state", clear)
        return

    client_id = env("X_CLIENT_ID")
    client_secret = env("X_CLIENT_SECRET")
    redirect_uri = env("X_REDIRECT_URI", site_origin() + "/api/auth/x/callback")
    credentials = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    token_request = Request(
        "https://api.x.com/2/oauth2/token",
        data=urlencode({"grant_type": "authorization_code", "code": code, "redirect_uri": redirect_uri, "code_verifier": verifier, "client_id": client_id}).encode(),
        headers={"Authorization": f"Basic {credentials}", "Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    try:
        with urlopen(token_request, timeout=10) as response:
            token = json.loads(response.read())
        user_request = Request("https://api.x.com/2/users/me?user.fields=name,username", headers={"Authorization": f"Bearer {token['access_token']}"})
        with urlopen(user_request, timeout=10) as response:
            profile = json.loads(response.read()).get("data", {})
    except (HTTPError, URLError, TimeoutError, KeyError, json.JSONDecodeError):
        send_redirect(handler, "/admin/?error=oauth_failed", clear)
        return

    allowed_ids = {value.strip() for value in env("ADMIN_X_USER_IDS").split(",") if value.strip()}
    user_id = str(profile.get("id", ""))
    if not allowed_ids or user_id not in allowed_ids:
        send_redirect(handler, "/admin/?error=not_authorized", clear)
        return

    session = {
        "x_user_id": user_id,
        "username": profile.get("username", ""),
        "name": profile.get("name", ""),
        "exp": int(time.time()) + SESSION_TTL,
    }
    session_cookie = cookie_header(SESSION_COOKIE, encode_token(session), SESSION_TTL)
    destination = env("ADMIN_APP_URL", site_origin() + "/admin/")
    send_redirect(handler, destination, clear + [session_cookie])


def get_posts():
    with database_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id::text, author_name, author_username, content_html, created_at
                FROM public.cwmunista_posts
                WHERE published IS TRUE
                ORDER BY created_at DESC
                LIMIT 100
            """)
            rows = cursor.fetchall()
    return [{"id": row[0], "author_name": row[1], "author_username": row[2], "content_html": row[3], "created_at": row[4].isoformat()} for row in rows]


def create_post(handler):
    session = require_admin(handler)
    if not session:
        return
    payload = read_json(handler)
    raw_content = payload.get("content_html")
    if not isinstance(raw_content, str) or len(raw_content) > 500_000:
        send_json(handler, 400, {"error": "O conteúdo está vazio ou é grande demais."})
        return
    content = sanitize_rich_text(raw_content)
    if not re.search(r"\S", re.sub(r"<[^>]*>", "", content)) and not re.search(r"<(img|video)\b", content):
        send_json(handler, 400, {"error": "Escreva algo ou adicione uma mídia."})
        return
    with database_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO public.cwmunista_posts (author_x_user_id, author_name, author_username, content_html)
                VALUES (%s, %s, %s, %s)
                RETURNING id::text, author_name, author_username, content_html, created_at
            """, (session["x_user_id"], session.get("name", ""), session["username"], content))
            row = cursor.fetchone()
    post = {"id": row[0], "author_name": row[1], "author_username": row[2], "content_html": row[3], "created_at": row[4].isoformat()}
    send_json(handler, 201, post)


def delete_post(handler, post_id):
    session = require_admin(handler)
    if not session:
        return
    with database_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM public.cwmunista_posts WHERE id = %s AND author_x_user_id = %s", (post_id, session["x_user_id"]))
            deleted = cursor.rowcount > 0
    send_json(handler, 200 if deleted else 404, {"deleted": deleted})


def create_media_upload(handler):
    session = require_admin(handler)
    if not session:
        return
    payload = read_json(handler, 20_000)
    filename = str(payload.get("filename", ""))
    content_type = str(payload.get("content_type", "")).lower()
    size = payload.get("size")
    extension = PurePosixPath(filename).suffix.lower()
    if content_type not in ALLOWED_MEDIA_TYPES or extension not in ALLOWED_EXTENSIONS:
        send_json(handler, 415, {"error": "Formato de mídia não permitido."})
        return
    if not isinstance(size, int) or size < 1 or size > 200_000_000:
        send_json(handler, 413, {"error": "A mídia deve ter até 200 MB."})
        return

    supabase_url = env("SUPABASE_URL").rstrip("/")
    service_key = env("SUPABASE_SERVICE_ROLE_KEY")
    bucket = env("POST_MEDIA_BUCKET", "cwmunista-post-media")
    if not supabase_url or not service_key:
        send_json(handler, 503, {"error": "Armazenamento de mídia ainda não configurado."})
        return

    object_path = f"posts/{secrets.token_hex(16)}{extension}"
    encoded_path = quote(f"{bucket}/{object_path}", safe="/")
    request = Request(
        f"{supabase_url}/storage/v1/object/upload/sign/{encoded_path}",
        data=b"{}",
        headers={"apikey": service_key, "Authorization": f"Bearer {service_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=10) as response:
            signed = json.loads(response.read())
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError):
        send_json(handler, 502, {"error": "Não foi possível preparar o upload."})
        return

    signed_url = signed.get("signedURL") or signed.get("signedUrl") or signed.get("url")
    if signed_url and signed_url.startswith("/"):
        signed_url = supabase_url + "/storage/v1" + signed_url
    if not signed_url:
        send_json(handler, 502, {"error": "O armazenamento não retornou uma URL de upload válida."})
        return
    public_url = f"{supabase_url}/storage/v1/object/public/{quote(bucket, safe='')}/{quote(object_path, safe='/')}"
    send_json(handler, 200, {"upload_url": signed_url, "public_url": public_url, "content_type": content_type})


def route(handler):
    parsed = urlsplit(handler.path)
    params = parse_qs(parsed.query)
    route_name = params.get("route", [""])[0].strip("/")
    if handler.command == "OPTIONS":
        handler.send_response(204)
        handler.send_header("Content-Length", "0")
        handler.end_headers()
        return
    if handler.command == "GET" and route_name == "auth/x/start":
        oauth_start(handler)
    elif handler.command == "GET" and route_name == "auth/x/callback":
        oauth_callback(handler)
    elif handler.command == "GET" and route_name == "auth/session":
        session = current_session(handler)
        if session:
            send_json(handler, 200, {"authenticated": True, "user": {"username": session["username"], "name": session.get("name", "")}})
        else:
            send_json(handler, 401, {"authenticated": False})
    elif handler.command == "POST" and route_name == "auth/logout":
        if require_origin(handler):
            send_json(handler, 200, {"ok": True}, [("Set-Cookie", clear_cookie_header(SESSION_COOKIE))])
    elif handler.command == "GET" and route_name == "posts":
        send_json(handler, 200, {"posts": get_posts()})
    elif handler.command == "POST" and route_name == "posts":
        create_post(handler)
    elif handler.command == "DELETE" and route_name.startswith("posts/"):
        delete_post(handler, route_name.split("/", 1)[1])
    elif handler.command == "POST" and route_name == "media/upload-url":
        create_media_upload(handler)
    else:
        send_json(handler, 404, {"error": "Endpoint não encontrado."})