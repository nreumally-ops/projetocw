# cwmunismo: Project Instructions

## Project Boundary
- This directory is a standalone static-site project named `cwmunismo`; it is not the Next.js app at the workspace root.
- Keep cwmunismo changes inside `projetocw/` unless the user explicitly asks to change the parent app.
- Do not add React, Next.js, or package-based components here. The project has no `package.json` build pipeline.

## Architecture
- `index.html` is the entry point. It loads the prebuilt bundles in `assets/` and then `branding.js`.
- Put ongoing UI customizations in `branding.js`. Treat `assets/index-*.js` and `assets/index-*.css` as generated/vendor bundles; do not edit them directly unless the source/build process is found and the user asks for that work.
- `branding.js` applies changes after the bundled app renders. Its `MutationObserver` may call the layout functions repeatedly, so injected elements and handlers must remain idempotent.
- Keep `#campaign-background-layer` fixed behind `#root`; the background video must continue behind the page while scrolling. Keep the app shell and organization section backgrounds translucent.
- `organizationGroups` in `branding.js` is the source of truth for organization tabs and cards. Each card links its image and name to the configured destination. Tabs show one category at a time and support click and arrow-key navigation.
- Organization logos are local files in `assets/logos/`. Preserve these user-provided files. Use `object-fit: contain` so logos are not cropped; only use a different aspect ratio when the individual asset requires it.
- The browser tab title is set in `index.html` as `cwmunista ☭`. There is intentionally no custom favicon link.

## Editing Rules
- Make small, targeted changes and preserve existing text, destinations, card order, and supplied assets unless the user requests otherwise.
- Do not invent or reuse another organization's logo. If a logo is missing, ask for it or use an explicitly labeled placeholder.
- Keep external card links using HTTPS, `target="_blank"`, and `rel="noopener noreferrer"`.
- Do not remove the background layer, category tabs, or local logo mappings while simplifying markup.

## Running and Validation
- `.replit` defines the canonical app workflow as `python3 server.py` on port `5000`; it requires Python dependencies (including `psycopg`). The support-count API additionally requires `DATABASE_URL` and `SESSION_SECRET`.
- On this Windows workspace Python was unavailable. The static preview was started from this directory with `npm exec --yes --package=serve -- serve . --listen 5000`, at `http://localhost:5000/`. This command serves static files only; it does not provide API routes.
- There is no project-local `npm run dev`, build, or test script. Validate UI changes in the browser at `http://localhost:5000/`, including image loading, category switching, keyboard navigation, and mobile overflow.
- The Python server handles `/api/support-count`; do not assume other `/api/*` routes exist in this static copy.
