# dittoforge

purpose: a readable public page for the SN118 (Ditto) generator competition board and rounds, while Ditto has no GUI
for it. Community view, not official; data only from platform-api.heyditto.ai.

- Hard limits: no Ditto logo or official-looking name; keep API load low (server cache, fixed paths only); never put
  the Vercel token in the repo (it is read from ~/dev/weekly/.env at deploy time).
- Deploy: `./deploy.sh` (Vercel account goldentree9929-5779, Hobby, no Git link).
- Check: open the site, compare the board with `python3 ~/store/ditto-gen/kit/tools/rounds.py <hotkey> 4`.
