// html.mjs: escaping, base-aware URLs, icons, images and the shared component snippets.
import fs from 'node:fs';
import { SHOP, store } from '../content/site.mjs';

export const IMG = JSON.parse(fs.readFileSync(new URL('../content/images.json', import.meta.url), 'utf8'));
let BASE = '/';
export const setBase = (b) => { BASE = b.endsWith('/') ? b : b + '/'; };
export const getBase = () => BASE;
export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// internal page or asset URL under the base path
export const u = (p) => (/^(https?:|mailto:|tel:|sms:|#)/.test(p) ? p : BASE + String(p).replace(/^\//, ''));
export const asset = (p) => u('assets/' + p.replace(/^\//, ''));

const ICONS = {
  arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>',
  ne: '<path d="M7 17 17 7M9 7h8v8"/>',
  phone: '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M6 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4M14 10h4M14 13h3"/>',
  truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  store: '<path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10h18"/><path d="M9 20v-5h6v5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  sms: '<path d="M4 5h16v11H9l-5 4z"/>',
  web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6z"/>',
};
export const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ''}</svg>`;

// <img> for a manifest id. Scenes have variants; everything gets explicit dimensions.
export function img(id, { alt = '', cls = '', sizes = '100vw', eager = false, ai = undefined, style = '' } = {}) {
  const m = IMG[id];
  if (!m) throw new Error('image id missing from images.json: ' + id);
  const isAi = ai ?? !!m.ai;
  const attrs = `${cls ? ` class="${cls}"` : ''} alt="${esc(alt)}" width="${m.w}" height="${m.h}" decoding="async"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}${isAi ? ' data-ai="generated"' : ''}${style ? ` style="${style}"` : ''}`;
  if (m.variants) {
    const srcset = m.variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');
    const def = m.variants[Math.min(1, m.variants.length - 1)];
    return `<img src="${asset(def.src)}" srcset="${srcset}" sizes="${sizes}"${attrs}>`;
  }
  return `<img src="${asset(m.src)}"${attrs}>`;
}
export const imgSrc = (id, w) => { const m = IMG[id]; if (m.variants) { const v = m.variants.find((x) => x.w === w) || m.variants[0]; return asset(v.src); } return asset(m.src); };

// shop links always open the live store (products + cart) in a new tab
export const shopAttrs = 'target="_blank" rel="noopener" data-shop';
export const btn = (label, href, { kind = 'gold', ext = false, shop = false, cls = '', attrs = '' } = {}) => {
  const external = ext || shop || /^https?:/.test(href);
  const target = shop ? ` ${shopAttrs}` : (external && /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '');
  return `<a class="btn btn--${kind} ${cls}" href="${esc(u(href))}"${target} ${attrs} data-magnet><span>${label}</span>${icon(external && /^https?:/.test(href) ? 'ne' : 'arrow')}</a>`;
};
export const shopBtn = (label = 'Shop the menu', kind = 'gold', cls = '') => btn(label, SHOP.menu, { kind, shop: true, cls });

export const kicker = (t, cls = '') => `<p class="kicker ${cls}">${esc(t)}</p>`;

// Levitating object: the object hovers, its hard shadow sits on the ground below and shrinks as it rises.
export const lev = (id, { alt = '', cls = '', sizes = '240px', eager = false, delay = 0 } = {}) =>
  `<span class="lev ${cls}" style="--d:${delay}s" data-lift>${img(id, { alt, cls: 'lev__obj', sizes, eager })}<span class="lev__shadow" aria-hidden="true"></span></span>`;

export const statusLine = () => `<span class="status" data-open><span class="status__dot" aria-hidden="true"></span><span class="status__txt">Mon – Sat 10 AM – 9 PM · Sun 11 AM – 7 PM</span></span>`;

export const breadcrumb = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) => i < items.length - 1 ? `<li><a href="${u(it[1])}">${esc(it[0])}</a></li>` : `<li aria-current="page">${esc(it[0])}</li>`).join('')}</ol></nav>`;

export const telLink = (cls = '') => `<a class="${cls}" href="tel:${store.tel}">${icon('phone')}<span>${store.phone}</span></a>`;

// Tiny markdown for the captured Learn articles (## / ### headings, paragraphs, lists, **bold**, [links](..)).
export function md(src, { linkMap = (h) => h } = {}) {
  const inline = (t) => esc(t)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, a, h) => { const href = linkMap(h); const ext = /^https?:/.test(href); return `<a href="${esc(ext ? href : u(href))}"${ext ? ' target="_blank" rel="noopener"' : ''}>${a}</a>`; });
  const out = []; let list = null;
  for (const raw of String(src).split(/\n/)) {
    const line = raw.trimEnd();
    const li = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
    if (li) { if (!list) { list = /^\s*\d+\./.test(line) ? 'ol' : 'ul'; out.push(`<${list}>`); } out.push(`<li>${inline(li[1])}</li>`); continue; }
    if (list) { out.push(`</${list}>`); list = null; }
    if (!line.trim()) continue;
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) { const lv = h[1].length; const id = h[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); out.push(`<h${lv} id="${id}">${inline(h[2])}</h${lv}>`); continue; }
    out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push(`</${list}>`);
  return out.join('\n');
}
