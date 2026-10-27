#!/usr/bin/env bash
# Deploys to Vercel production. Uses VERCEL_TOKEN when set, else the CLI login.
set -euo pipefail
cd "$(dirname "$0")"
npx -y vercel@latest deploy --prod --yes ${VERCEL_TOKEN:+--token "$VERCEL_TOKEN"} "$@"
