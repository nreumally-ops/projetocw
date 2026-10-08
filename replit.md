# Running this imported website

- Click **Run** to start the `Start application` workflow.
- The command is `python3 server.py`, listening on `0.0.0.0:5000`.
- The homepage is a compiled static build. The `/api/support-count` endpoint is
  served by `server.py` and stores one support per IP hash in PostgreSQL.
- Set `DATABASE_URL` and a random `SESSION_SECRET` of at least 32 bytes in
  Replit Secrets for the counter to record supports. Never commit either value.
- Client IPs come from the socket by default. Set `TRUSTED_PROXY_CIDRS` only to
  the exact CIDRs of trusted ingress proxies if forwarded client IPs are needed;
  never trust arbitrary `X-Forwarded-For` values or use a catch-all CIDR.
- The support endpoint accepts same-origin JSON requests only, with an empty
  object body capped at 1 KB. Apply edge rate limiting to `/api/support-count`.
- The imported HTML and compiled JavaScript/CSS remain in place. `branding.js`
  provides the CWMUNISTA hero, organization directory, social profiles, and Docs.
- The browser favicon and social metadata use local CWMUNISTA assets.
- Link previews use an optimized animated GIF generated from the homepage video.
- APOIE currently directs visitors to `https://x.com/cwmunista`.
- The server serves only the root page and public assets; unsupported routes
  return 404. Login, signup, and admin screens from the imported bundle are not
  supported by this site.
- Replit must terminate HTTPS before forwarding traffic to port 5000. For other
  deployments, use a TLS reverse proxy and enable request-rate limits.

## Import limitations

This repository contains a compiled static website, not its editable frontend
source. Login, signup, profile editing, and other API-backed features are not
provided by this import. The support counter is the only API endpoint included.
Some third-party services and assets are still referenced by the original build.