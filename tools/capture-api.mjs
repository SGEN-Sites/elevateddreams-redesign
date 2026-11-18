// capture-api.mjs — capture the live site's own public JSON API (the SPA renders every word from it).
// Polite: sequential, 400 ms apart, no retries past a 401/403. Writes untouched responses to audit/api/.
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://elevateddreamscannabisny.com';
const OUT = path.resolve(process.argv[2] || 'audit/api');
fs.mkdirSync(OUT, { recursive: true });
const UA = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  accept: 'application/json,text/html;q=0.9,*/*;q=0.8',
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const extra = process.argv.slice(3);
const endpoints = extra.length ? extra : [
  '/api/products', '/api/deals', '/api/store-settings', '/api/slides', '/api/shop-links', '/api/articles', '/api/pages',
];
const log = [];
for (const ep of endpoints) {
  try {
    const r = await fetch(ORIGIN + ep, { headers: UA, redirect: 'manual' });
    const t = await r.text();
    const name = ep.replace(/^\//, '').replace(/[/?=&]/g, '_') + (/^\/api\//.test(ep) ? '.json' : '.html');
    fs.writeFileSync(path.join(OUT, name), t);
    const hs = {};
    for (const [k, v] of r.headers) if (/server|location|content-type|x-powered|via|cf-ray/i.test(k)) hs[k] = v.slice(0, 160);
    let shape = '';
    try { const j = JSON.parse(t); shape = Array.isArray(j) ? `array(${j.length})` : `object{${Object.keys(j).slice(0, 14).join(',')}}`; } catch { shape = 'text:' + t.slice(0, 60).replace(/\s+/g, ' '); }
    const row = { status: r.status, ep, bytes: t.length, shape, headers: hs, file: name };
    log.push(row);
    console.log(r.status, ep, t.length, shape, JSON.stringify(hs));
    if (r.status === 401 || r.status === 403) console.log('  refused: not retried');
  } catch (e) {
    console.log('ERR', ep, e.message);
    log.push({ ep, error: e.message });
  }
  await sleep(400);
}
fs.writeFileSync(path.join(OUT, `_log-${Date.now()}.json`), JSON.stringify({ at: new Date().toISOString(), log }, null, 2));
