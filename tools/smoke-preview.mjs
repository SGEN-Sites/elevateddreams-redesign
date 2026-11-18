// smoke-preview.mjs: check the published preview. Every page answers 200 with its own title and noindex, the
// assets answer, and in a real browser the gate, the home render and the shop links behave. Read-only.
//   node tools/smoke-preview.mjs [baseUrl]
import fs from 'node:fs';
import path from 'node:path';
import { chromium, sleep } from './pw.mjs';

const BASE = (process.argv[2] || 'https://sgen-sites.github.io/elevateddreams-redesign/').replace(/\/?$/, '/');
const pages = [];
const walk = (d, rel = '') => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p, rel + f + '/'); else if (f === 'index.html') pages.push(rel); } };
walk(path.resolve('dist-preview'));
const out = { at: new Date().toISOString(), base: BASE, pages: [], assets: [], browser: {} };
let fails = 0;
for (const rel of pages.sort()) {
  const r = await fetch(BASE + rel); const t = await r.text();
  const title = (t.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const noindex = /<meta name="robots" content="noindex, nofollow">/.test(t);
  const ok = r.status === 200 && !!title && noindex;
  if (!ok) fails++;
  out.pages.push({ rel, status: r.status, title, noindex, ok });
}
for (const a of ['assets/css/site.css', 'assets/js/site.js', 'assets/js/smoke.js', 'assets/fonts/ultra-400.woff2', 'assets/video/hero-river.mp4', 'assets/img/gen/obj-flower.webp', 'assets/img/live/live-exterior-wide.webp', 'robots.txt', 'nope-404-check/']) {
  const r = await fetch(BASE + a); const b = await r.arrayBuffer();
  const ok = a.startsWith('nope') ? r.status === 404 : r.status === 200 && b.byteLength > 0;
  if (!ok) fails++;
  out.assets.push({ a, status: r.status, bytes: b.byteLength, ok });
}
const br = await chromium.launch();
const ctx = await br.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); const errs = [];
p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
await p.goto(BASE, { waitUntil: 'networkidle' }); await sleep(2600);
out.browser.gateShown = await p.evaluate(() => document.documentElement.classList.contains('gate-on'));
await p.click('[data-gate-yes]'); await sleep(400); await p.click('[data-gate-mode="browse"]'); await sleep(800);
out.browser.gateClosed = await p.evaluate(() => !document.documentElement.classList.contains('gate-on'));
out.browser.h1 = await p.evaluate(() => document.querySelector('h1').textContent.trim());
const shop = await p.evaluate(() => [...document.querySelectorAll('[data-shop]')].map((a) => a.href));
out.browser.shopLinks = shop.length; out.browser.shopTargets = [...new Set(shop)];
out.browser.internalBroken = await p.evaluate(async () => { const hrefs = [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => h.startsWith(location.origin)))]; const bad = []; for (const h of hrefs) { const r = await fetch(h, { method: 'GET' }); if (r.status >= 400) bad.push(r.status + ' ' + h); } return { checked: hrefs.length, bad }; });
await p.screenshot({ path: path.resolve('private/shots/live-preview-home.png') });
out.browser.errors = errs;
await br.close();
if (!out.browser.gateShown || !out.browser.gateClosed || errs.length || out.browser.internalBroken.bad.length) fails++;
fs.mkdirSync('audit', { recursive: true });
fs.writeFileSync('audit/preview-smoke.json', JSON.stringify(out, null, 1));
console.log(`pages ${out.pages.filter((x) => x.ok).length}/${out.pages.length} ok · assets ${out.assets.filter((x) => x.ok).length}/${out.assets.length} ok`);
console.log('browser', JSON.stringify({ gateShown: out.browser.gateShown, gateClosed: out.browser.gateClosed, h1: out.browser.h1, shopLinks: out.browser.shopLinks, shopTargets: out.browser.shopTargets, internal: out.browser.internalBroken, errors: errs }));
out.pages.filter((x) => !x.ok).forEach((x) => console.log('FAIL', x.rel, x.status, x.noindex));
out.assets.filter((x) => !x.ok).forEach((x) => console.log('FAIL', x.a, x.status));
console.log(fails ? `SMOKE: ${fails} FAIL` : 'SMOKE: PASS');
