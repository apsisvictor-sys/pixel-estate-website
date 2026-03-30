// api/listings.js — Vercel Serverless Function
// Proxies EstateAssistant API so token stays server-side and CORS is bypassed.

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.ESTATE_ASSISTANT_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'CRM token not configured' });
  }

  const url = `http://exportdata.estateassistant.info/api/export/GetEstates/?token=${token}`;

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(502).json({ error: 'CRM upstream error', status: upstream.status });
    }
    const data = await upstream.json();

    // Cache for 6 hours (matches EstateAssistant's own cache)
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Proxy error', message: e.message });
  }
}
