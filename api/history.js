// Compact per-round history for the trend charts: one upstream pass, cached at the edge
// for 10 minutes so page views do not multiply calls to the Ditto API.
const A = "https://platform-api.heyditto.ai/api/v1/generator";

const get = async (p) => {
  const r = await fetch(A + p, { signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`${p}: ${r.status}`);
  return r.json();
};

export default async function handler(req, res) {
  try {
    const lists = await Promise.all([get("/rounds?limit=50"), get("/rounds?limit=50&offset=50")]);
    const scored = lists.flatMap((l) => l.rounds || []).filter((r) => r.status === "scored" && r.column_count > 0);
    const rounds = [];
    for (let i = 0; i < scored.length; i += 8) {
      const part = await Promise.allSettled(scored.slice(i, i + 8).map((r) => get(`/rounds/${r.round_index}`)));
      for (const x of part) if (x.status === "fulfilled") rounds.push(x.value);
    }
    const out = rounds.map((d) => {
      const c = d.columns || [];
      const sum = (k) => c.reduce((s, x) => s + (x[k] || 0), 0);
      const st = (d.standings || []).filter((a) => a.common_cases > 0);
      const top = st.slice().sort((a, b) => a.rank - b.rank)[0];
      return {
        round: d.summary.round_index,
        scored_at: d.summary.scored_at,
        generators: c.filter((x) => x.miner_hotkey).length,
        split: sum("discriminating"), trivial: sum("trivial"), unsolved: sum("unsolved"), duplicate: sum("duplicate"),
        panel_mean: st.length ? st.reduce((s, a) => s + a.common_mean, 0) / st.length : null,
        panel_best: st.length ? Math.max(...st.map((a) => a.common_mean)) : null,
        top_agent: top ? `${top.agent_name || "?"}${top.agent_version != null ? " v" + top.agent_version : ""}` : null,
        best_column: c.filter((x) => x.miner_hotkey).sort((a, b) => (b.score ?? -1) - (a.score ?? -1))[0]?.miner_hotkey || null,
      };
    }).filter((r) => r.split + r.trivial + r.unsolved > 0).sort((a, b) => a.round - b.round);
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1800");
    res.status(200).json({ rounds: out, generated_at: new Date().toISOString() });
  } catch (e) {
    res.status(502).json({ error: "upstream unreachable" });
  }
}
