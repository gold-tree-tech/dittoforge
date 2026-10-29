# Idea profile: Ditto Generators page features (draft, 2026-10-27)

## Metric
- Purpose: a generator miner (SN118 data-gen competition) opens https://dittobench.ai/generators and learns, with the
  fewest actions, where they stand, why, and what to change to earn more.
- Proxy metric: of 6 miner questions, how many the page answers for the miner's own generator, and in how many actions.
  Q1 where do I stand, Q2 why this score, Q3 what to change, Q4 how the field moves, Q5 what is at stake and when,
  Q6 can I trust the numbers (noise, rules). Now (after PR 1): Q1 in 0-1 actions; Q2 in 1 click (panel, per round case
  bar); Q3 none; Q4 partly (sparklines); Q5 schedule + payout shares; Q6 rules on GitHub only. Target: all 6, <=1 action.
- Second gate: the owner (Peyton-Spencer, CODEOWNERS) merges it. A feature he will not merge scores zero.

## Data to measure from
- Public API (no auth): https://platform-api.heyditto.ai/api/v1/generator/board, /generator/rounds?limit=50&offset=N,
  /generator/rounds/{n} (columns: discriminating/trivial/unsolved/duplicate/score; standings), /generator/submissions/{id},
  /generator/upload-terms, /public/treasury-allocation, /public/weights.
- Scoring rules: ~/dev/ditto-subnet/research/dittobench-datagen/docs/generator-competition.md (Scoring section ~l.372),
  anti-gaming.md, v14-generator-credits.md (operator's per-shape analysis; credits miners by letter, never by hotkey).
- Page code: ~/dev/ditto-subnet/apps/platform/dashboard/src/pages/GeneratorsPage.tsx, components/generators/.
- Our own board (Ditto Forge): ~/dev/dittoforge/public/index.html, api/history.js.

## Hard limits
- Public endpoints only; never show generator source, seeds before reveal, or case content (owner PR #3196 "Data and safety").
- Payout projection must mirror the validator fold (compute_generator_weights); no fake ranks for unpaid rows.
- Style: the dashboard brand kit (tokens.css, 5 palettes, Ditto Display); details on demand; each section loads alone.
- A new Platform API endpoint is allowed but costs review (Platform API changes affect Backroom); dashboard-only is cheaper.
- No spend. No edits to ditto-subnet during idea rounds.

## History
- Done: PR 1 past rounds (?round=N) + my hotkey highlight and status line (branch feat/generator-past-rounds-my-hotkey).
- Planned: trend charts (case mix share per round, panel best/mean per round) from Ditto Forge.
- Rejected: full redesign of the owner's new page; rank numbers on unpaid rows (owner's no-fake-ranks rule).
- Notes: ~/dev/dittoforge/work/ditto-pr-plan.md, ~/dev/dittoforge/work/hci-review.md.

## Register ideas
- ~/dev/dittoforge/work/ideas-generators.md (one section per idea: core card, lens, rung, status).
