// capture-assets.mjs: download the live site's own images (store photos, category photos, article images, logo,
// favicon) into private/live/ untouched. Sequential, polite, no retries past a 401/403.
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://elevateddreamscannabisny.com';
const OUT = path.resolve('private/live');
fs.mkdirSync(OUT, { recursive: true });
const list = new Set([
  '/assets/00-elevated-dreams-complete-montage-s28GJpne.png',
  '/assets/01-elevated-dreams-exterior-wide-CrhWBN-P.png',
  '/assets/02-elevated-dreams-interior-display-WTu2qFfK.png',
  '/assets/03-elevated-dreams-window-area-CD9I2c-H.png',
  '/assets/04-elevated-dreams-exterior-close-BKQ2P11H.png',
  '/assets/05-elevated-dreams-showroom-wide-DS8-sV6Y.png',
  '/assets/06-elevated-dreams-reception-showroom-BB5bIdYF.png',
  '/assets/flower-DwEpyy_9.jpg', '/assets/pre-rolls-C0qSrc4A.jpg', '/assets/edibles-8Sf42zJV.jpg', '/assets/vapes-DT0FHIKE.png',
  '/assets/concentrates-Cn5XrLOo.jpg', '/assets/cbd-CxBeueFH.jpg', '/assets/accessories-C8B_9ehA.jpg',
  '/logo.svg', '/favicon.svg',
]);
const arts = JSON.parse(fs.readFileSync('audit/api/api_articles.json', 'utf8'));
for (const a of arts) if (a.featuredImageUrl) list.add(a.featuredImageUrl);
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' };
const log = [];
for (const p of list) {
  const file = path.join(OUT, p.replace(/^\//, '').replace(/\//g, '__'));
  if (fs.existsSync(file)) { log.push({ p, skip: true }); continue; }
  try {
    const r = await fetch(ORIGIN + p, { headers: UA });
    const b = Buffer.from(await r.arrayBuffer());
    if (r.ok) fs.writeFileSync(file, b);
    log.push({ p, status: r.status, bytes: b.length, type: r.headers.get('content-type') });
    console.log(r.status, b.length, p);
  } catch (e) { log.push({ p, error: e.message }); console.log('ERR', p, e.message); }
  await new Promise((r) => setTimeout(r, 250));
}
fs.writeFileSync(path.join(OUT, '_log.json'), JSON.stringify({ at: new Date().toISOString(), log }, null, 1));
