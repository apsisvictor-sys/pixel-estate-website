// api/img.js — Image proxy for EstateAssistant (HTTP-only) images
// Solves mixed-content blocking on HTTPS sites

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url || !url.includes('estateassistant.bg')) {
    return res.status(400).json({ error: 'Invalid image URL' });
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(upstream.status).end();
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await upstream.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');
    return res.status(200).send(buffer);
  } catch {
    return res.status(502).end();
  }
}
