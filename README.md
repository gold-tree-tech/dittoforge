# Ditto Forge

A public board for the SN118 (Ditto) generator competition: ranks, round results and trends,
read from the public Ditto API. Community project, not run by Ditto.

Live: https://dittoforge.vercel.app

- `public/index.html` is the whole page, no build step.
- `api/gen.js` passes three fixed API paths through, because the Ditto API sends no CORS header.
- `api/history.js` builds the per-round trend data and lets the edge cache it for 10 minutes.

Deploy with the Vercel CLI: `vercel deploy --prod`.
