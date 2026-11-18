// lab/splash-2.mjs: SPLASH 2 "Golden horizon". On load a near-black overlay: a thin golden horizon line draws out
// from the centre, light blooms upward from it, the wordmark rises from behind the line (ELEVATED lifts off and
// hovers above DREAMS with a soft shadow between them), then the overlay brightens and dissolves into the hero.
// The timeline is pure CSS and starts with the first paint (html.js), so the hero never flashes first; it ends at
// 1.70 s. JS only skips it (any key, click, touch or wheel), removes it, pauses loops off-screen and replays it.
// No JS: no splash (hidden by default). Reduced motion: no splash.
import { asset, img, btn, shopBtn, icon, esc, statusLine, IMG } from '../lib/html.mjs';
import { store, home } from '../content/site.mjs';
import { dealsGrid } from '../lib/sections.mjs';

const tall = IMG['hero-golden-tall'];
const tallSet = tall.variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');
const fog = (n) => `url(${asset(`img/fog-${n}.svg`)})`;
// phones, and portrait tablets: the tall photo, the plate at the bottom
const TALL = '(max-width: 760px), (max-width: 1100px) and (max-aspect-ratio: 4/5)';

export default function () {
  const body = `
<div class="sp2-splash" data-sp2 aria-hidden="true">
  <div class="sp2-ground"></div>
  <div class="sp2-under"></div>
  <div class="sp2-bloom"></div>
  <div class="sp2-spark"></div>
  <div class="sp2-mark"><div class="sp2-rise"><span class="sp2-e">ELEVATED</span><span class="sp2-sh"></span><span class="sp2-d">DREAMS</span></div></div>
  <div class="sp2-line"></div>
  <div class="sp2-flash"></div>
</div>
<section class="sp2-hero" data-hero data-sp2-hero aria-labelledby="sp2-h1">
  <div class="sp2-media" aria-hidden="true">
    <picture>
      <source media="${TALL}" srcset="${tallSet}" sizes="100vw" width="${tall.w}" height="${tall.h}">
      ${img('hero-golden-b', { alt: '', sizes: '100vw', eager: true, cls: 'sp2-img' })}
    </picture>
  </div>
  <div class="sp2-shade" aria-hidden="true"></div>
  <div class="sp2-fog" aria-hidden="true"><i></i><i></i></div>
  <div class="sp2-veil" aria-hidden="true"></div>
  <div class="sp2-in">
    <div class="sp2-plate">
      <p class="sp2-kicker">${esc(home.heroKicker)}</p>
      <h1 class="sp2-h1" id="sp2-h1">Dreams take work. <em>Welcome in.</em></h1>
      <p class="sp2-lede">${esc(home.heroLede)}</p>
      <div class="sp2-cta">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
      <p class="sp2-meta"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
    </div>
  </div>
</section>
<section class="band band--deals"><div class="band__in">${dealsGrid()}</div></section>`;

  const inlineCss = `
/* ---------- SPLASH 2: Golden horizon (overlay) ---------- */
.sp2-splash{--sp2-y:60%;--sp2-fs:min(13.5vw,15svh);position:fixed;inset:0;z-index:250;display:none;overflow:hidden;background:radial-gradient(120% 75% at 50% 62%,#1c1428 0%,#0d0913 55%,#060409 100%)}
html.js .sp2-splash{display:block;animation:sp2-out .46s cubic-bezier(.45,0,.25,1) 1.24s both}
html.rm .sp2-splash{display:none !important}
@keyframes sp2-out{to{opacity:0;visibility:hidden}}
.sp2-ground{position:absolute;left:0;right:0;top:var(--sp2-y);bottom:0;background:linear-gradient(180deg,#0f0a15,#040306)}
.sp2-under{position:absolute;left:50%;top:var(--sp2-y);width:130vw;height:26svh;margin-left:-65vw;transform-origin:50% 0;background:radial-gradient(50% 100% at 50% 0%,rgba(255,190,130,.42),rgba(205,120,110,.12) 45%,transparent 75%);animation:sp2-under 1s var(--ease) .3s both}
@keyframes sp2-under{from{opacity:0;transform:scaleY(0)}to{opacity:1;transform:none}}
.sp2-bloom{position:absolute;left:50%;bottom:calc(100% - var(--sp2-y));width:170vw;height:100svh;margin-left:-85vw;transform-origin:50% 100%;background:radial-gradient(50% 100% at 50% 100%,rgba(255,228,184,.94) 0%,rgba(255,178,106,.64) 15%,rgba(240,128,92,.34) 34%,rgba(156,98,172,.17) 56%,rgba(123,106,196,.06) 72%,transparent 86%);animation:sp2-bloom 1.25s var(--ease) .2s both,sp2-bloom2 .6s cubic-bezier(.5,0,.3,1) 1.08s forwards}
@keyframes sp2-bloom{from{opacity:0;transform:scaleY(.06)}to{opacity:1;transform:scaleY(1)}}
@keyframes sp2-bloom2{from{transform:scaleY(1)}to{transform:scale(1.25,1.9)}}
.sp2-spark{position:absolute;left:50%;top:var(--sp2-y);width:220px;height:220px;margin:-110px 0 0 -110px;border-radius:50%;background:radial-gradient(closest-side,#fffaf0,rgba(255,222,172,.62) 24%,rgba(255,180,110,.2) 54%,transparent);animation:sp2-spark .95s var(--ease) both}
@keyframes sp2-spark{0%{opacity:0;transform:scale(0)}28%{opacity:1;transform:scale(1.25)}100%{opacity:.85;transform:scale(.9)}}
.sp2-mark{position:absolute;left:0;right:0;bottom:calc(100% - var(--sp2-y));height:72svh;overflow:hidden;display:grid;align-content:end;justify-items:center;padding-bottom:calc(var(--sp2-fs)*.07)}
.sp2-rise{display:grid;justify-items:center;font-family:var(--f-display);font-weight:400;font-size:var(--sp2-fs);line-height:.74;white-space:nowrap;animation:sp2-rise .6s var(--ease) .34s both,sp2-exit .48s cubic-bezier(.5,0,.3,1) 1.16s forwards}
@keyframes sp2-rise{from{transform:translateY(calc(100% + .35em))}to{transform:translateY(0)}}
@keyframes sp2-exit{from{transform:translateY(0);opacity:1}to{transform:translateY(-.16em) scale(1.06);opacity:0}}
.sp2-e,.sp2-d{display:block;color:#F6F1FF;text-shadow:0 0 30px rgba(123,106,196,.62),0 0 90px rgba(123,106,196,.36),0 3px 18px rgba(24,12,34,.42)}
.sp2-d{letter-spacing:.04em}
.sp2-e{position:relative;z-index:1;animation:sp2-lift .44s var(--ease) .78s both}
@keyframes sp2-lift{from{transform:translateY(.21em)}to{transform:translateY(-.06em)}}
.sp2-sh{display:block;width:70%;height:.1em;margin:.12em 0 .1em;border-radius:50%;background:radial-gradient(closest-side,rgba(8,4,12,.9),rgba(8,4,12,0));animation:sp2-sh .44s var(--ease) .8s both}
@keyframes sp2-sh{from{opacity:0;transform:scaleX(.4)}to{opacity:.9;transform:none}}
.sp2-line{position:absolute;left:0;right:0;top:var(--sp2-y);height:2px;margin-top:-1px;background:linear-gradient(90deg,rgba(255,196,120,0) 0%,rgba(255,196,120,.55) 16%,#ffe2b0 40%,#fffaf0 50%,#ffe2b0 60%,rgba(255,196,120,.55) 84%,rgba(255,196,120,0) 100%);transform:scaleX(0);animation:sp2-draw .62s cubic-bezier(.7,0,.2,1) .06s both}
.sp2-line::after{content:"";position:absolute;left:0;right:0;top:-21px;height:44px;background:radial-gradient(50% 50% at 50% 50%,rgba(255,214,150,.75),rgba(255,176,104,.2) 46%,transparent 76%)}
@keyframes sp2-draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.sp2-flash{position:absolute;left:50%;top:var(--sp2-y);width:120vmax;height:120vmax;margin:-60vmax 0 0 -60vmax;opacity:0;transform:scale(.14);background:radial-gradient(circle closest-side,#fffaf0 0%,rgba(255,238,208,.97) 12%,rgba(255,212,160,.93) 26%,rgba(250,182,132,.88) 40%,rgba(236,164,136,.74) 54%,rgba(220,154,146,.42) 70%,rgba(210,150,152,.14) 86%,rgba(210,150,152,0) 100%);animation:sp2-flash .5s cubic-bezier(.55,0,.8,.2) 1.02s both}
@keyframes sp2-flash{0%{opacity:0;transform:scale(.14)}30%{opacity:.9}100%{opacity:.94;transform:scale(2.6)}}

/* ---------- SPLASH 2: the hero underneath ---------- */
.sp2-hero{position:relative;isolation:isolate;overflow:clip;margin-top:calc(-1*var(--hdr-h));min-height:max(640px,calc(100svh - var(--top-h) - var(--tick-h)));display:grid;align-items:center;padding:calc(var(--hdr-h) + 32px) 0 clamp(64px,10svh,120px);background:#120d19}
.sp2-media{position:absolute;inset:0;z-index:-3;overflow:hidden}
.sp2-media picture,.sp2-media img{display:block;width:100%;height:100%}
.sp2-media img{object-fit:cover;object-position:62% 50%;transform-origin:62% 56%}
.sp2-shade{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(14,10,20,.62) 0%,rgba(14,10,20,.32) 36%,rgba(14,10,20,0) 58%),linear-gradient(180deg,rgba(14,10,20,.55) 0%,rgba(14,10,20,0) 22%,rgba(14,10,20,0) 72%,rgba(26,20,36,.96) 100%)}
.sp2-fog{position:absolute;left:0;right:0;bottom:0;height:44%;z-index:-1;overflow:hidden;pointer-events:none;-webkit-mask-image:linear-gradient(180deg,transparent,#000 45%,#000 72%,transparent);mask-image:linear-gradient(180deg,transparent,#000 45%,#000 72%,transparent)}
.sp2-fog i{position:absolute;top:0;bottom:0;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;mix-blend-mode:screen;will-change:transform;animation:sp2-drift 96s linear infinite}
.sp2-fog i:nth-child(1){background-image:${fog('sodium')};opacity:.5}
.sp2-fog i:nth-child(2){background-image:${fog('silver')};opacity:.34;animation-duration:70s;animation-direction:reverse}
@keyframes sp2-drift{to{transform:translate3d(-1200px,0,0)}}
.sp2-hero.is-off .sp2-fog i{animation-play-state:paused}
.sp2-veil{position:absolute;inset:0;z-index:-1;opacity:0;pointer-events:none;background:radial-gradient(120% 90% at 50% 60%,rgba(255,240,214,.6),rgba(255,206,160,.32) 55%,rgba(240,180,150,.16))}
.sp2-in{width:100%;max-width:var(--max);margin:0 auto;padding:0 var(--gutter)}
.sp2-plate{position:relative;max-width:610px;padding:clamp(22px,2.4vw,34px) clamp(22px,2.8vw,38px);border-radius:28px;background:linear-gradient(160deg,rgba(34,25,48,.7),rgba(12,8,18,.66));-webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);box-shadow:inset 0 0 0 1px rgba(207,195,255,.2),0 40px 90px -30px rgba(0,0,0,.85)}
.sp2-plate::before{content:"";position:absolute;inset:7px;border-radius:22px;box-shadow:inset 0 0 0 1px rgba(207,195,255,.1);pointer-events:none}
.sp2-kicker{display:flex;align-items:center;gap:.7em;margin:0 0 14px;font:700 .9rem/1.2 var(--f-ui);letter-spacing:.22em;text-transform:uppercase;color:#DCD3FF}
.sp2-kicker::before{content:"";flex:none;width:26px;height:1px;background:var(--violet-hi)}
.sp2-h1{margin:0 0 14px;font-family:var(--f-display);font-size:clamp(2rem,3vw,3.1rem);line-height:1.02;color:#fff}
.sp2-h1 em{display:block;font-style:normal;color:#CFC3FF;text-shadow:0 0 28px rgba(123,106,196,.7)}
.sp2-lede{margin:0;font-size:clamp(1.02rem,1.25vw,1.15rem);line-height:1.6;color:#DDD5EA}
.sp2-cta{display:flex;flex-wrap:wrap;gap:12px;margin:22px 0 16px}
.sp2-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 22px;margin:0;font:600 1rem var(--f-ui);letter-spacing:.06em}
.sp2-meta a{display:inline-flex;gap:.45em;align-items:center;text-decoration:none;color:var(--text)}
.sp2-meta a:hover{color:var(--violet-hi)}
@media (prefers-reduced-motion: no-preference){
  html.js .sp2-img{animation:sp2-in-settle 1.5s var(--ease) 1.18s both}
  html.js .sp2-veil{animation:sp2-in-veil 1.25s cubic-bezier(.33,0,.2,1) 1.18s both}
  html.js .sp2-plate{animation:sp2-in-plate .95s var(--ease) 1.4s both}
}
@keyframes sp2-in-settle{from{transform:scale(1.07)}to{transform:none}}
@keyframes sp2-in-veil{from{opacity:1}to{opacity:0}}
@keyframes sp2-in-plate{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@media ${TALL}{
  .sp2-splash{--sp2-y:58%}
  .sp2-hero{align-items:end;padding-bottom:max(20px,env(safe-area-inset-bottom))}
  .sp2-media img{object-position:50% 40%}
  .sp2-shade{background:linear-gradient(180deg,rgba(14,10,20,.5) 0%,rgba(14,10,20,0) 20%,rgba(14,10,20,0) 40%,rgba(26,20,36,.9) 100%)}
  .sp2-plate{padding:20px;border-radius:22px}
  .sp2-plate::before{border-radius:16px}
  .sp2-kicker{font-size:.76rem;letter-spacing:.16em;margin-bottom:10px;text-wrap:balance}
  .sp2-kicker::before{width:18px}
  .sp2-h1{font-size:clamp(1.75rem,8.4vw,2.3rem);margin-bottom:10px}
  .sp2-lede{font-size:.98rem;line-height:1.5}
  .sp2-cta{gap:10px;margin:16px 0 12px}
  .sp2-cta .btn{--h:48px;flex:1 1 auto;padding:0 1em;font-size:.92rem}
  .sp2-meta{gap:6px 16px;font-size:.92rem}
}
@media (prefers-reduced-motion: reduce){
  .sp2-splash{display:none !important}
  .sp2-fog i{animation:none}
}`;

  const inlineJs = `(function () {
  var d = document, W = window, root = d.documentElement;
  var sp = d.querySelector('[data-sp2]'), hero = d.querySelector('[data-sp2-hero]');
  if (!hero) return;
  var EV = ['keydown', 'pointerdown', 'wheel', 'touchstart'];
  var tpl = sp ? sp.cloneNode(true) : null, cur = null;
  function reduced() { return root.classList.contains('rm') || W.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function entrance() {
    if (!hero.getAnimations) return [];
    return hero.getAnimations({ subtree: true }).filter(function (a) { return a.animationName && a.animationName.indexOf('sp2-in') === 0; });
  }
  function unlisten() { EV.forEach(function (ev) { W.removeEventListener(ev, skip, true); }); }
  function done(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
    if (cur === el) { cur = null; unlisten(); }
  }
  /* any key, click, touch or wheel: the hero's entrance starts now and the overlay dissolves */
  function skip() {
    var el = cur;
    if (!el || el.sp2Skip) return;
    el.sp2Skip = true; el.style.pointerEvents = 'none'; unlisten();
    entrance().forEach(function (a) { var t = a.effect && a.effect.getTiming(); if (t && a.currentTime !== null && a.currentTime < t.delay) a.currentTime = t.delay; });
    if (!el.animate) { done(el); return; }
    var o = parseFloat(W.getComputedStyle(el).opacity); if (isNaN(o)) o = 1;
    var f = el.animate([{ opacity: o }, { opacity: 0 }], { duration: 360, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' });
    f.onfinish = function () { done(el); };
  }
  function play(el) {
    cur = el;
    EV.forEach(function (ev) { W.addEventListener(ev, skip, { passive: true, capture: true }); });
    el.addEventListener('animationend', function (e) { if (e.target === el && e.animationName === 'sp2-out') done(el); });
    W.setTimeout(function () { if (cur === el && !el.sp2Skip) done(el); }, 2200);
  }
  if (sp) { if (reduced()) done(sp); else play(sp); }
  W.labReplay = function () {
    if (reduced() || !tpl) return;
    if (cur) done(cur);
    var el = tpl.cloneNode(true);
    hero.parentNode.insertBefore(el, hero);
    hero.querySelectorAll('.sp2-img, .sp2-veil, .sp2-plate').forEach(function (n) { n.style.animation = 'none'; void n.offsetWidth; n.style.animation = ''; });
    play(el);
  };
  /* the fog loop rests while the hero is off-screen */
  if ('IntersectionObserver' in W) new IntersectionObserver(function (en) { hero.classList.toggle('is-off', !en[0].isIntersecting); }).observe(hero);
})();`;

  return {
    path: '/lab/splash-2/',
    title: 'Splash 2: Golden horizon | Elevated Dreams redesign',
    desc: 'Design option 2: a golden horizon line draws across the dark, light blooms upward, the wordmark rises and the scene fades up into the storefront at golden hour.',
    bodyClass: 'is-lab is-home',
    body,
    inlineCss,
    inlineJs,
    replay: true,
  };
}
