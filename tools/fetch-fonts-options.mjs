// fetch-fonts-options.mjs: self-host the open fonts for the font-pairing options (latin subset only), writing
// src/assets/fonts/opt/*.woff2 and src/content/font-options.json (family, weight, style, file, unicode-range).
// Option D's display face (Rockwell, the live logo's rendered font) is commercial and is NOT downloaded: the page
// uses the visitor's installed copy via local() and falls back to Roboto Slab (the next font in the live site's stack).
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('src/assets/fonts/opt');
fs.mkdirSync(OUT, { recursive: true });
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Archivo+Narrow:wght@500;600;700&family=Archivo:wght@400;500;600&family=Zilla+Slab:wght@700&family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=Roboto+Slab:wght@700&display=swap';
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' };
const css = await fetch(CSS_URL, { headers: UA }).then((r) => r.text());
const faces = [];
const re = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
let m;
while ((m = re.exec(css))) {
  if (m[1] !== 'latin') continue;
  const b = m[2];
  const fam = b.match(/font-family:\s*'([^']+)'/)[1];
  const style = b.match(/font-style:\s*(\w+)/)[1];
  const weight = b.match(/font-weight:\s*(\d+)/)[1];
  const url = b.match(/url\(([^)]+)\)/)[1];
  const range = b.match(/unicode-range:\s*([^;]+);/)[1];
  const file = `${fam.toLowerCase().replace(/\s+/g, '-')}-${weight}${style === 'italic' ? 'i' : ''}.woff2`;
  const buf = Buffer.from(await fetch(url, { headers: UA }).then((r) => r.arrayBuffer()));
  fs.writeFileSync(path.join(OUT, file), buf);
  faces.push({ family: fam, weight, style, file: `fonts/opt/${file}`, range, bytes: buf.length });
  console.log(file, buf.length);
}
fs.writeFileSync('src/content/font-options.json', JSON.stringify(faces, null, 1));
console.log(faces.length, 'faces');
