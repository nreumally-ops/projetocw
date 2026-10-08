# cwmunismo

Site estático do projeto cwmunismo.

## Change history

- 2026-10-06: Removed the homepage background video and its audio control from the new project copy.
- 2026-10-06: Removed the content below APOIE, the live support counter, and the animated results globe to reduce background work.
- 2026-10-08: Restored the campaign background video, added an optimized animated social preview and CWMUNISTA favicon, and pointed APOIE to the project's X profile.
- 2026-10-08: Separated Home, Blog, and Docs views; added the Marxist reference covers and hardened unsupported routes and the support endpoint.

- `index.html` serves the CWMUNISTA portal with Home, Blog, and Docs views.
- `assets/` contains compiled bundles, local profile images, organization logos, reference covers, the favicon, and the animated social preview.
- The homepage uses a muted background video; link previews use its optimized 480 x 384 animated GIF and the homepage text.
- APOIE currently links to `https://x.com/cwmunista`.
- `server.py` serves the allowlisted static files, security headers, and the optional PostgreSQL support endpoint.
- Vercel should publish the existing `nreumally-ops/projetocw` repository as a static site; unsupported login/admin routes are not part of this import.
