// Reads the public Ditto generator API on the server side; the API sends no CORS header,
// so the browser cannot call it directly. Only three fixed paths are allowed.
const A = "https://platform-api.heyditto.ai/api/v1/generator";

export default async function handler(req, res) {
  const p = String(req.query.p || "");
  if (!/^(board|rounds|rounds\/\d{1,9})$/.test(p)) {
    res.status(400).json({ error: "bad path" });
    return;
  }
  try {
    const r = await fetch(`${A}/${p}`, { signal: AbortSignal.timeout(15000) });
    const body = await r.text();
    res.setHeader("Content-Type", "application/json");
    // scored rounds never change, the board and round list do
    const age = p.startsWith("rounds/") ? 3600 : 60;
    if (r.ok) res.setHeader("Cache-Control", `public, s-maxage=${age}, stale-while-revalidate=600`);
    res.status(r.status).send(body);
  } catch (e) {
    res.status(502).json({ error: "upstream unreachable" });
  }
}
