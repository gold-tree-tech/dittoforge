#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
T=$(grep '^VERCEL_TOKEN=' ~/dev/weekly/.env | cut -d= -f2- | tr -d '"')
npx -y vercel@latest deploy --prod --yes --token "$T" "$@"
