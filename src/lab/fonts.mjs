// lab/fonts.mjs: font-pairing options, shown on the real home page. A floating switcher swaps the three type
// variables (--f-display, --f-ui, --f-body) live; every component already reads them.
// Option D is the live logo's rendered font: Rockwell Bold (the live CSS asks for Clarendon, Rockwell, "Roboto Slab",
// Georgia; Clarendon is never loaded, so Macs and Office PCs render Rockwell). Rockwell is a commercial Monotype face:
// it is NOT hosted here; the page uses the visitor's installed copy via local() and falls back to Roboto Slab (the
// next font in the live stack). A production build of D needs a Rockwell web-font license.
import fs from 'node:fs';
import { asset, esc } from '../lib/html.mjs';
import homePage from '../pages/home.mjs';
import { home } from '../content/site.mjs';

const FACES = JSON.parse(fs.readFileSync(new URL('../content/font-options.json', import.meta.url), 'utf8'));
const P = [
  { id: 'a', name: 'Ultra', display: 'Ultra', ui: 'Barlow Condensed', body: 'Barlow', note: 'A fat Clarendon-style slab with a signage condensed: loud and poster-like. The build before round 4.' },
  { id: 'b', name: 'Poster', display: 'Alfa Slab One', ui: 'Archivo Narrow', body: 'Archivo', note: 'A heavy geometric slab from boxing and transit posters, with a tight grotesk: more urban, less retro than A.' },
  { id: 'c', name: 'Editorial', display: 'Zilla Slab Bold', ui: 'IBM Plex Sans Condensed', body: 'IBM Plex Sans', note: 'A contemporary slab with a refined condensed grotesk: calmer and more premium.' },
  { id: 'd', name: 'Real logo (chosen)', display: 'Rockwell Bold', ui: 'Barlow Condensed', body: 'Barlow', note: 'The exact font the live site’s logo renders in. Shown with your installed Rockwell; a device without it shows Roboto Slab (the live site’s own next fallback). Going live needs a Rockwell web-font license.' },
];

export default function ({ articles }) {
  const base = homePage({ articles })[0];
  const face = (f) => `@font-face{font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url(${asset(f.file)}) format('woff2');unicode-range:${f.range}}`;
  const file = (fam, w) => asset(FACES.find((f) => f.family === fam && f.weight === w).file);
  const css = `
${FACES.filter((f) => !['Alfa Slab One', 'Zilla Slab', 'Roboto Slab'].includes(f.family)).map(face).join('\n')}
/* display aliases at weight 400 (every heading in the build asks for 400, the weight Ultra ships in) */
@font-face{font-family:'ED Display B';font-weight:400;font-display:swap;src:url(${file('Alfa Slab One', '400')}) format('woff2')}
@font-face{font-family:'ED Display C';font-weight:400;font-display:swap;src:url(${file('Zilla Slab', '700')}) format('woff2')}
@font-face{font-family:'ED Display D';font-weight:400;font-display:swap;src:local('Rockwell Bold'),local('Rockwell-Bold'),url(${file('Roboto Slab', '700')}) format('woff2')}
html[data-fp="b"]{--f-display:'ED Display B',Georgia,serif;--f-ui:'Archivo Narrow','Arial Narrow',sans-serif;--f-body:'Archivo',system-ui,sans-serif}
html[data-fp="c"]{--f-display:'ED Display C',Georgia,serif;--f-ui:'IBM Plex Sans Condensed','Arial Narrow',sans-serif;--f-body:'IBM Plex Sans',system-ui,sans-serif}
html[data-fp="a"]{--f-display:'Ultra',Georgia,serif}
html[data-fp="d"]{--f-display:'ED Display D',Georgia,serif}
/* the switcher */
.fpx-sw{position:fixed;right:14px;top:50%;z-index:96;display:grid;gap:8px;padding:10px;border-radius:999px;background:rgba(18,13,25,.82);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px rgba(241,236,248,.14),0 20px 50px -20px rgba(0,0,0,.9);transform:translateY(-50%)}
.fpx-sw__k{margin:0 0 2px;text-align:center;font:800 .62rem/1 'Barlow Condensed',sans-serif;letter-spacing:.2em;color:var(--text-3)}
.fpx-sw button{position:relative;width:46px;height:46px;border:0;border-radius:50%;background:rgba(241,236,248,.08);color:var(--text);font:800 1.05rem/1 'Barlow Condensed',sans-serif;cursor:pointer;transition:background .3s,transform .3s var(--ease)}
.fpx-sw button:hover{transform:scale(1.06)}
.fpx-sw button[aria-pressed="true"]{background:var(--violet);color:#fff;box-shadow:0 0 22px rgba(123,106,196,.8)}
.fpx-sw button span{position:absolute;right:56px;top:50%;transform:translateY(-50%);white-space:nowrap;padding:6px 10px;border-radius:8px;background:rgba(18,13,25,.92);font:700 .82rem/1 'Barlow Condensed',sans-serif;letter-spacing:.08em;opacity:0;pointer-events:none;transition:opacity .25s}
.fpx-sw button:hover span,.fpx-sw button:focus-visible span{opacity:1}
/* the specimen under the hero */
.fpx{position:relative;padding:clamp(48px,6vw,80px) 0 0}
.fpx__card{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(24px,4vw,60px);align-items:center;padding:clamp(24px,3vw,40px);border-radius:28px;background:linear-gradient(160deg,rgba(52,42,72,.6),rgba(18,13,25,.82));box-shadow:inset 0 0 0 1px rgba(241,236,248,.1),0 40px 80px -40px rgba(0,0,0,.9)}
.fpx__tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}
.fpx__tabs button{min-height:44px;padding:0 16px;border:0;border-radius:999px;background:rgba(241,236,248,.07);box-shadow:inset 0 0 0 1px rgba(241,236,248,.14);color:var(--text-2);font:700 1rem/1 var(--f-ui);letter-spacing:.06em;cursor:pointer}
.fpx__tabs button[aria-pressed="true"]{background:var(--violet);color:#fff;box-shadow:none}
.fpx__lock{margin:0;display:grid;font:400 clamp(2.6rem,6.4vw,5.4rem)/.86 var(--f-display);color:#fff;text-shadow:0 0 50px rgba(123,106,196,.55)}
.fpx__h{margin:18px 0 10px;font:400 clamp(1.6rem,2.6vw,2.3rem)/1.05 var(--f-display)}
.fpx__h em{font-style:normal;color:var(--violet-hi)}
.fpx__ui{margin:0 0 10px;font:700 1rem/1.4 var(--f-ui);letter-spacing:.14em;color:var(--gold)}
.fpx__body{margin:0;color:var(--text-2);font-family:var(--f-body)}
.fpx__names{display:grid;gap:10px;margin:0;font-family:var(--f-body)}
.fpx__names div{display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:baseline;padding:12px 0;border-bottom:1px solid rgba(241,236,248,.1)}
.fpx__names dt{font:700 .8rem/1 'Barlow Condensed',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--text-3)}
.fpx__names dd{margin:0;font-weight:600;color:var(--text)}
.fpx__note{margin:16px 0 0;font-size:.98rem;color:var(--text-2)}
@media (max-width:900px){.fpx__card{grid-template-columns:1fr}}
@media (max-width:760px){.fpx-sw{top:auto;bottom:calc(84px + env(safe-area-inset-bottom));right:10px;transform:none;grid-auto-flow:column;padding:8px}.fpx-sw__k{display:none}.fpx-sw button{width:42px;height:42px}.fpx-sw button span{display:none}}
${base.inlineCss || ''}`;

  const tabs = P.map((p) => `<button type="button" data-fp="${p.id}" aria-pressed="${p.id === 'd'}">${p.id.toUpperCase()} · ${esc(p.name)}</button>`).join('');
  const specimen = `<section class="fpx" aria-labelledby="fpx-t"><div class="band__in">
  <div class="fpx__card">
    <div>
      <h2 class="sr-only" id="fpx-t">Font pairing options</h2>
      <div class="fpx__tabs" role="group" aria-label="Font pairing">${tabs}</div>
      <p class="fpx__lock" aria-hidden="true"><span>ELEVATED</span><span>DREAMS</span></p>
      <p class="fpx__h">Dreams take work. <em>Welcome in.</em></p>
      <p class="fpx__ui">SHOP · DEALS · LEARN · OUR STORY · VISIT · REWARDS</p>
      <p class="fpx__body">${esc(home.heroLede)}</p>
    </div>
    <div>
      <dl class="fpx__names"><div><dt>Display</dt><dd data-fpx="display">Rockwell Bold</dd></div><div><dt>UI</dt><dd data-fpx="ui">Barlow Condensed</dd></div><div><dt>Body</dt><dd data-fpx="body">Barlow</dd></div></dl>
      <p class="fpx__note" data-fpx="note">${esc(P[3].note)}</p>
    </div>
  </div>
</div></section>`;
  const sw = `<div class="fpx-sw" role="group" aria-label="Font pairing"><p class="fpx-sw__k">FONTS</p>${P.map((p) => `<button type="button" data-fp="${p.id}" aria-pressed="${p.id === 'd'}" aria-label="Pairing ${p.id.toUpperCase()}: ${esc(p.name)}">${p.id.toUpperCase()}<span>${esc(p.name)}: ${esc(p.display)}</span></button>`).join('')}</div>`;
  // the specimen goes right after the hero (the hero must stay first: it sits under the overlaying header)
  const i = base.body.indexOf('</section>') + '</section>'.length;
  const body = base.body.slice(0, i) + '\n' + specimen + base.body.slice(i) + '\n' + sw;
  const js = `(function(){
  var P=${JSON.stringify(P)},root=document.documentElement;
  function set(id,save){var p=P.find(function(x){return x.id===id;})||P[0];
    root.setAttribute('data-fp',p.id);
    document.querySelectorAll('[data-fp]').forEach(function(b){if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',String(b.getAttribute('data-fp')===p.id));});
    ['display','ui','body','note'].forEach(function(k){var el=document.querySelector('[data-fpx="'+k+'"]');if(el)el.textContent=p[k];});
    if(save){try{localStorage.setItem('ed.fp',p.id);}catch(e){}}
    try{var u=new URL(location.href);u.searchParams.set('fp',p.id);history.replaceState(null,'',u);}catch(e){}}
  document.addEventListener('click',function(e){var b=e.target.closest('button[data-fp]');if(b)set(b.getAttribute('data-fp'),true);});
  var q=null;try{q=new URLSearchParams(location.search).get('fp')||localStorage.getItem('ed.fp');}catch(e){}
  set(q||'d',false);
})();
${base.inlineJs || ''}`;
  return {
    path: '/lab/fonts/', title: 'Font pairings | Elevated Dreams redesign', desc: 'Four font pairings shown on the real home page; option D is the live logo font.',
    bodyClass: `is-lab ${base.bodyClass}`, preload: base.preload, body, inlineCss: css, inlineJs: js, replay: false,
  };
}
