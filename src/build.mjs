// build.mjs: render every page into a static site. Node builtins only.
//   node src/build.mjs [--out dist] [--base /] [--preview]
// --preview stamps noindex on every page, a robots Disallow, and the footer's "design concept preview" line.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d; };
const OUT = path.resolve(ROOT, arg('--out', 'dist'));
const BASE = arg('--base', '/');
const preview = process.argv.includes('--preview');

// articles: the live API capture, frozen into src/content/articles.json so the repo rebuilds without audit/
const artFile = path.join(ROOT, 'src/content/articles.json');
if (!fs.existsSync(artFile)) {
  const dir = path.join(ROOT, 'audit/api/articles');
  const list = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/api/api_articles.json'), 'utf8'));
  const full = list.map((a) => JSON.parse(fs.readFileSync(path.join(dir, `api_articles_${a.slug}.json`), 'utf8')));
  fs.writeFileSync(artFile, JSON.stringify(full, null, 1));
}
const articles = JSON.parse(fs.readFileSync(artFile, 'utf8')).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const { setBase } = await import('./lib/html.mjs');
setBase(BASE);
const { layout } = await import('./lib/layout.mjs');
const home = (await import('./pages/home.mjs')).default;
const shop = (await import('./pages/shop.mjs')).default;
const story = (await import('./pages/story.mjs')).default;
const learn = (await import('./pages/learn.mjs')).default;
const visit = (await import('./pages/visit.mjs')).default;
const misc = await import('./pages/misc.mjs');

const pages = [...home({ articles }), ...shop(), ...story(), ...learn({ articles }), ...visit()];
pages.push(...misc.default({ allPages: pages }));
pages.push(misc.sitemapPage(pages));
pages.push(misc.notFound());

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const ctx = { preview };
for (const p of pages) {
  const html = layout(p, ctx);
  const file = p.file ? path.join(OUT, p.file) : path.join(OUT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// assets
const copyDir = (src, dst) => { fs.mkdirSync(dst, { recursive: true }); for (const f of fs.readdirSync(src)) { const s = path.join(src, f); const d = path.join(dst, f); if (fs.statSync(s).isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d); } };
copyDir(path.join(ROOT, 'src/assets/fonts'), path.join(OUT, 'assets/fonts'));
copyDir(path.join(ROOT, 'src/assets/img'), path.join(OUT, 'assets/img'));
copyDir(path.join(ROOT, 'src/assets/video'), path.join(OUT, 'assets/video'));
const CSS = ['fonts', 'tokens', 'base', 'chrome', 'components', 'home', 'pages', 'signature', 'dream', 'fix'];
const css = CSS.map((n) => { const f = path.join(ROOT, `src/styles/${n}.css`); return fs.existsSync(f) ? `/* ${n}.css */\n` + fs.readFileSync(f, 'utf8') : ''; }).join('\n').replace(/url\(\.\.\/assets\/fonts\//g, 'url(../fonts/');
fs.mkdirSync(path.join(OUT, 'assets/css'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'assets/css/site.css'), css);
fs.mkdirSync(path.join(OUT, 'assets/js'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'src/scripts'))) fs.copyFileSync(path.join(ROOT, 'src/scripts', f), path.join(OUT, 'assets/js', f));
fs.writeFileSync(path.join(OUT, 'assets/img/favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1A1424"/><text x="32" y="30" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="20" fill="#EAD59A">E</text><rect x="18" y="35" width="28" height="3" rx="1.5" fill="#7B6AC4"/><text x="32" y="55" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="17" fill="#F1ECF8">D</text></svg>`);

// robots + sitemap
const SITE = 'https://elevateddreamscannabisny.com';
fs.writeFileSync(path.join(OUT, 'robots.txt'), preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
const urls = pages.filter((p) => !p.file).map((p) => `<url><loc>${SITE}${p.path === '/' ? '/' : p.path.replace(/\/$/, '')}</loc></url>`).join('\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log(`built ${pages.length} pages -> ${path.relative(ROOT, OUT)} (base ${BASE}${preview ? ', preview' : ''})`);
