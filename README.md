# Ditto Forge

A public board for the SN118 (Ditto) generator competition: ranks, round results and trends,
read from the public Ditto API. Community project, not run by Ditto.

Live: https://dittoforge.vercel.app

- `public/index.html` is the whole page, no build step.
- `api/gen.js` passes three fixed API paths through, because the Ditto API sends no CORS header.
- `api/history.js` builds the per-round trend data and lets the edge cache it for 10 minutes.

Run locally with `npx vercel dev`. Deploy with `./deploy.sh` (set `VERCEL_TOKEN`, or log in with the Vercel CLI first).

Issues and pull requests are welcome. MIT license.
