# cwmunismo

Site estático do projeto cwmunismo.

## Change history

- 2026-10-06: Removed the homepage background video and its audio control from the new project copy.
- 2026-10-06: Removed the content below APOIE, the live support counter, and the animated results globe to reduce background work.
- 2026-10-08: Restored the campaign background video, added static and animated social previews plus the CWMUNISTA favicon, and pointed APOIE to the project's X profile.
- 2026-10-08: Separated Home, Blog, and Docs views; added the Marxist reference covers and hardened unsupported routes and the support endpoint.
- 2026-10-09: Reduced hero typography, supporting copy, button, and spacing on mobile while preserving the desktop layout.
- 2026-10-09: Kept organization logo cards square and side by side in a two-column mobile grid.
- 2026-10-09: Fixed mobile grid cascade so the two-column layout applies at normal browser zoom.
- 2026-10-09: Updated the homepage header brand to MDUP - movimento de uniao popular.

- `index.html` serves the MDUP portal with Home, Blog, and Docs views.
- `assets/` contains compiled bundles, local profile images, organization logos, reference covers, the favicon, the static `cwmunismo.pw.jpg` social preview, and the animated GIF.
- The homepage uses a muted background video; link previews prioritize the static image for compatibility, with the optimized 480 x 384 animated GIF as a secondary Open Graph image.
- APOIE currently links to `https://x.com/cwmunista`.
- `server.py` serves the allowlisted static files, security headers, and the optional PostgreSQL support endpoint.
- Vercel should publish the existing `nreumally-ops/projetocw` repository as a static site; unsupported login/admin routes are not part of this import.
