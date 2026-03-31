import { Redis } from '@upstash/redis';

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 1×1 transparent GIF
const PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

export default async function handler(req, res) {
  const { t = 'open', c = 'unknown', dest } = req.query;
  const country = c.toUpperCase();

  try {
    await redis.incr(`campaign:stone-workshop:${t}:${country}`);
  } catch (_) {
    // never block the user on a tracking failure
  }

  if (t === 'click' && dest) {
    return res.redirect(302, dest);
  }

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.end(PIXEL);
}
