// fetch-fonts.mjs: self-host the open fonts this design uses (latin subset only), writing src/assets/fonts/*.woff2
// and src/styles/fonts.css. Ultra (a fat Clarendon slab, the live site's own slab idea), Barlow Condensed (UI,
// kickers, placards), Barlow (body).
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('src/assets/fonts');
fs.mkdirSync(OUT, { recursive: true });
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Ultra&family=Barlow+Condensed:ital,wght@0,500;0,600;0,700;0,800;1,700&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&display=swap';
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' };
const css = await fetch(CSS_URL, { headers: UA }).then((r) => r.text());
const blocks = css.split('@font-face').slice(1);
let out = '/* Self-hosted, latin subset. Ultra (SIL OFL), Barlow + Barlow Condensed (SIL OFL). */\n';
for (const b of blocks) {
  const pre = css.slice(0, css.indexOf('@font-face' + b)).match(/\/\*\s*([\w-]+)\s*\*\/\s*$/);
  const subset = pre ? pre[1] : '';
  if (subset !== 'latin') continue;
  const fam = b.match(/font-family:\s*'([^']+)'/)[1];
  const style = b.match(/font-style:\s*(\w+)/)[1];
  const weight = b.match(/font-weight:\s*(\d+)/)[1];
  const url = b.match(/url\(([^)]+)\)/)[1];
  const range = b.match(/unicode-range:\s*([^;]+);/)[1];
  const name = `${fam.toLowerCase().replace(/\s+/g, '-')}-${weight}${style === 'italic' ? 'i' : ''}.woff2`;
  const buf = Buffer.from(await fetch(url, { headers: UA }).then((r) => r.arrayBuffer()));
  fs.writeFileSync(path.join(OUT, name), buf);
  out += `@font-face{font-family:'${fam}';font-style:${style};font-weight:${weight};font-display:swap;src:url(../assets/fonts/${name}) format('woff2');unicode-range:${range};}\n`;
  console.log(name, buf.length);
}
fs.mkdirSync('src/styles', { recursive: true });
fs.writeFileSync('src/styles/fonts.css', out);
