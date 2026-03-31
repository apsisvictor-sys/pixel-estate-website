import { Redis } from '@upstash/redis';

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const COUNTRIES = ['BG', 'GR', 'TR'];
const EVENTS    = ['open', 'click'];

export default async function handler(req, res) {
  const stats = {};
  let totalOpens = 0, totalClicks = 0;

  for (const c of COUNTRIES) {
    stats[c] = {};
    for (const e of EVENTS) {
      const val = (await redis.get(`campaign:stone-workshop:${e}:${c}`)) || 0;
      stats[c][e] = Number(val);
      if (e === 'open')  totalOpens  += Number(val);
      if (e === 'click') totalClicks += Number(val);
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.json({
    campaign: 'stone-workshop',
    retrieved_at: new Date().toISOString(),
    total: { opens: totalOpens, clicks: totalClicks },
    by_country: stats,
  });
}
