// lab/hero-b.mjs: HERO B "Portal". A full-screen ELEVATED / DREAMS wordmark with the golden-hour storefront seen
// through an arched doorway in the middle. Scroll (pinned) opens the doorway to full bleed while the words part and
// warm clouds roll in; then the copy settles in on a dark cinematic grade. Inside the doorway the scene drifts
// opposite the cursor (fine pointers only), like looking through a window.
// One rAF-throttled scroll handler writes --hxb-p (0..1); every phase is derived from it in CSS.
// No JS / reduced motion: --hxb-p stays 1, so the page shows the end state (full-bleed image + copy), no pinning.
import { asset, img, btn, shopBtn, icon, esc, statusLine, IMG } from '../lib/html.mjs';
import { store, home } from '../content/site.mjs';
import { dealsGrid } from '../lib/sections.mjs';

const tall = IMG['hero-golden-tall'];
const tallSet = tall.variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');
const fog = (n) => `url(${asset(`img/fog-${n}.svg`)})`;
// phones, and portrait tablets: the tall photo, the copy below the doorway (used by <source>, CSS and JS alike)
const TALL = '(max-width: 760px), (max-width: 1100px) and (max-aspect-ratio: 4/5)';
const word = (cls) =>`<div class="hxb-word ${cls}" aria-hidden="true"><span class="hxb-w hxb-w--e">ELEVATED</span><span class="hxb-w hxb-w--d">DREAMS</span></div>`;

export default function () {
  const body = `
<section class="hxb" data-hero data-hxb aria-labelledby="hxb-h1">
  <div class="hxb-stage">
    <div class="hxb-ground" aria-hidden="true"></div>
    <div class="hxb-spill" aria-hidden="true"></div>
    ${word('hxb-word--solid')}
    <div class="hxb-rim" aria-hidden="true"></div>
    <div class="hxb-portal" aria-hidden="true">
      <div class="hxb-scene">
        <picture>
          <source media="${TALL}" srcset="${tallSet}" sizes="100vw" width="${tall.w}" height="${tall.h}">
          ${img('hero-golden-b', { alt: '', sizes: '100vw', eager: true, cls: 'hxb-img' })}
        </picture>
      </div>
      <div class="hxb-fog hxb-wisps"><i></i><i></i></div>
      <div class="hxb-fog hxb-roll"><i></i><i></i><i></i></div>
      <div class="hxb-grade"></div>
    </div>
    <div class="hxb-fade" aria-hidden="true"></div>
    <div class="hxb-ghost" aria-hidden="true">${word('hxb-word--ghost')}</div>
    <div class="hxb-copy">
      <div class="hxb-in">
        <div class="hxb-col">
          <p class="hxb-kicker hxb-rv" style="--i:0">${esc(home.heroKicker)}</p>
          <h1 class="hxb-h1 hxb-rv" id="hxb-h1" style="--i:1">Dreams take work. <em>Welcome in.</em></h1>
          <p class="hxb-lede hxb-rv" style="--i:2">${esc(home.heroLede)}</p>
          <div class="hxb-cta hxb-rv" style="--i:3">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
          <p class="hxb-meta hxb-rv" style="--i:4"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
        </div>
      </div>
    </div>
    <div class="hxb-cue" aria-hidden="true"><span>Scroll to step inside</span><i></i></div>
  </div>
</section>
<section class="band band--deals"><div class="band__in">${dealsGrid()}</div></section>`;

  const inlineCss = `
/* ---------- HERO B: Portal ---------- */
.hxb{--hxb-p:1;position:relative;isolation:isolate;overflow:clip;margin-top:calc(-1*var(--hdr-h));background:#0e0a14;
  --hxb-o:clamp(0,calc(var(--hxb-p)/.62),1);
  --hxb-e:calc(var(--hxb-o)*var(--hxb-o)*(3 - 2*var(--hxb-o)));
  --hxb-k:calc(1 - var(--hxb-e));
  --hxb-wr:clamp(0,calc(var(--hxb-p)/.5),1);
  --hxb-we:calc(var(--hxb-wr)*var(--hxb-wr)*(3 - 2*var(--hxb-wr)));
  --hxb-cr:clamp(0,calc((var(--hxb-p) - .26)/.5),1);
  --hxb-ce:calc(var(--hxb-cr)*var(--hxb-cr)*(3 - 2*var(--hxb-cr)));
  --hxb-gr:clamp(0,calc((var(--hxb-p) - .38)/.36),1);
  --hxb-ge:calc(var(--hxb-gr)*var(--hxb-gr)*(3 - 2*var(--hxb-gr)));
  --hxb-aw:clamp(260px,25vw,480px);
  --hxb-at:calc(var(--hdr-h) + 8svh);
  --hxb-ab:0px;
  --hxb-fs:min(14.2vw,28svh);
  --hxb-gap:calc(var(--hxb-fs)*.5);
  --hxb-wy:calc(50svh + var(--hdr-h)/2 - (var(--top-h) + var(--tick-h))/2);
  --hxb-sx:-15.5vw;--hxb-sy:-2svh;--hxb-sz:.06;
  --hxb-r:calc((var(--hxb-aw)/2 + (50vw - var(--hxb-aw)/2)*var(--hxb-e))*(1 - var(--hxb-e)*var(--hxb-e)));
  --hxb-side:calc((50% - var(--hxb-aw)/2)*var(--hxb-k));
  --hxb-clip:inset(calc(var(--hxb-at)*var(--hxb-k)) var(--hxb-side) calc(var(--hxb-ab)*var(--hxb-k)) var(--hxb-side) round var(--hxb-r) var(--hxb-r) 0 0)}
html.js:not(.rm) .hxb{--hxb-p:0;height:220svh}
html.js:not(.rm) .hxb:not(.is-live){animation:hxb-failsafe 0s linear 3s forwards}
@keyframes hxb-failsafe{to{--hxb-p:1}}
.hxb-stage{position:relative;display:grid;align-items:center;min-height:100svh;padding:calc(var(--hdr-h) + 24px) 0 6svh;overflow:clip;isolation:isolate}
html.js:not(.rm) .hxb-stage{position:sticky;top:0;height:100svh}
.hxb-ground,.hxb-spill,.hxb-rim,.hxb-portal,.hxb-ghost{position:absolute;inset:0;pointer-events:none}
.hxb-ground{z-index:0;background:radial-gradient(70% 55% at 50% 0%,rgba(123,106,196,.24),transparent 70%),radial-gradient(90% 60% at 50% 100%,rgba(70,44,88,.5),transparent 70%),linear-gradient(180deg,#0f0a16,#150f1e 60%,#1a1424)}
.hxb-ground::after{content:"";position:absolute;inset:0;background:var(--grain);opacity:.06;mix-blend-mode:overlay}
.hxb-spill{z-index:1;opacity:var(--hxb-k);background:radial-gradient(calc(var(--hxb-aw)*1.6) 74svh at 50% 64%,rgba(255,178,112,.24),rgba(255,140,96,.08) 46%,transparent 72%)}
.hxb-word{position:absolute;left:0;right:0;top:var(--hxb-wy);display:grid;justify-items:center;row-gap:var(--hxb-gap);transform:translateY(-50%);font-family:var(--f-display);font-weight:400;line-height:.74;letter-spacing:0;white-space:nowrap;pointer-events:none;user-select:none}
.hxb-word--solid{z-index:2}
.hxb-w{display:block;will-change:transform,opacity}
.hxb-w--e{font-size:var(--hxb-fs);transform:translateY(calc(var(--hxb-we)*-66svh)) scale(calc(1 + var(--hxb-we)*.14));opacity:calc(1 - var(--hxb-we)*1.3)}
.hxb-w--d{font-size:calc(var(--hxb-fs)*1.184);transform:translateY(calc(var(--hxb-we)*66svh)) scale(calc(1 + var(--hxb-we)*.14));opacity:calc(1 - var(--hxb-we)*1.3)}
.hxb-word--solid .hxb-w{color:#F3EEFB;text-shadow:0 0 34px rgba(123,106,196,.55),0 0 120px rgba(123,106,196,.4),0 8px 34px rgba(6,4,10,.55)}
.hxb-word--ghost .hxb-w{color:rgba(255,250,242,.12);-webkit-text-stroke:1.5px rgba(255,252,246,.88);text-shadow:none}
.hxb-rim{z-index:3;opacity:var(--hxb-k);background:linear-gradient(180deg,#fff0d8,#d9cfff 40%,rgba(169,155,240,.55));clip-path:inset(calc(var(--hxb-at)*var(--hxb-k) - 2px) calc(var(--hxb-side) - 2px) calc(var(--hxb-ab)*var(--hxb-k) - 2px) calc(var(--hxb-side) - 2px) round calc(var(--hxb-r) + 2px) calc(var(--hxb-r) + 2px) 0 0)}
.hxb-portal{z-index:4;clip-path:var(--hxb-clip);overflow:hidden;background:#2a1d33}
.hxb-scene{position:absolute;inset:-3%;transform-origin:65% 51%;transform:translate(calc(var(--hxb-sx)*var(--hxb-k) + var(--hxb-mx,0)*-16px),calc(var(--hxb-sy)*var(--hxb-k) + var(--hxb-ey,0px) + var(--hxb-my,0)*-10px)) scale(calc(1 + var(--hxb-sz)*var(--hxb-k) + var(--hxb-ez,0)));will-change:transform}
.hxb-scene picture,.hxb-scene img{display:block;width:100%;height:100%}
.hxb-scene img{object-fit:cover;object-position:60% 50%}
.hxb-fog{position:absolute;left:0;right:0;overflow:hidden;pointer-events:none}
.hxb-fog i{position:absolute;top:0;bottom:0;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;mix-blend-mode:screen;will-change:transform;animation:hxb-drift 90s linear infinite}
@keyframes hxb-drift{to{transform:translate3d(-1200px,0,0)}}
.hxb-wisps{left:-60px;right:-60px;bottom:-4%;height:60%;transform:translate(calc(var(--hxb-mx,0)*-40px),calc(var(--hxb-my,0)*-14px));-webkit-mask-image:linear-gradient(180deg,transparent,#000 45%);mask-image:linear-gradient(180deg,transparent,#000 45%)}
.hxb-wisps i:nth-child(1){background-image:${fog('silver')};opacity:.42;animation-duration:70s}
.hxb-wisps i:nth-child(2){background-image:${fog('sodium')};opacity:.4;animation-duration:110s;animation-direction:reverse}
.hxb-roll{bottom:0;height:50%;opacity:var(--hxb-ce);transform:translateY(calc((1 - var(--hxb-ce))*70%));-webkit-mask-image:linear-gradient(180deg,transparent,#000 40%);mask-image:linear-gradient(180deg,transparent,#000 40%)}
.hxb-roll::before{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(255,196,140,.42),rgba(255,170,120,.12) 55%,transparent);mix-blend-mode:screen}
.hxb-roll i:nth-child(1){background-image:${fog('sodium')};opacity:.8;animation-duration:60s}
.hxb-roll i:nth-child(2){background-image:${fog('silver')};opacity:.55;animation-duration:84s;animation-direction:reverse}
.hxb-roll i:nth-child(3){background-image:${fog('sodium')};opacity:.45;background-size:1200px 140%;animation-duration:130s}
.hxb-grade{position:absolute;inset:0;opacity:var(--hxb-ge);background:radial-gradient(58% 80% at 16% 54%,rgba(12,8,18,.8),rgba(12,8,18,.52) 45%,rgba(12,8,18,0) 75%),linear-gradient(90deg,rgba(12,8,18,.74) 0%,rgba(12,8,18,.56) 30%,rgba(12,8,18,.2) 52%,rgba(12,8,18,0) 66%),linear-gradient(180deg,rgba(12,8,18,.55) 0%,rgba(12,8,18,0) 22%)}
@media (min-width: 1600px){.hxb-grade{background:radial-gradient(900px 80% at calc((100% - var(--max))/2 + 260px) 54%,rgba(12,8,18,.82),rgba(12,8,18,.55) 45%,rgba(12,8,18,0) 78%),linear-gradient(90deg,rgba(12,8,18,.76) 0%,rgba(12,8,18,.6) calc((100% - var(--max))/2 + 520px),rgba(12,8,18,.22) calc((100% - var(--max))/2 + 860px),rgba(12,8,18,0) calc((100% - var(--max))/2 + 1080px)),linear-gradient(180deg,rgba(12,8,18,.55) 0%,rgba(12,8,18,0) 22%)}}
.hxb-fade{position:absolute;left:0;right:0;bottom:-4px;z-index:4;height:calc(22% + 4px);pointer-events:none;opacity:var(--hxb-e);background:linear-gradient(180deg,rgba(25,19,35,0),rgba(25,19,35,.9) 70%,#191323 96%)}
.hxb-ghost{z-index:5;clip-path:var(--hxb-clip)}
.hxb-copy{position:relative;z-index:7;width:100%}
.hxb.is-pre .hxb-copy{pointer-events:none}
.hxb-in{width:100%;max-width:var(--max);margin:0 auto;padding:0 var(--gutter)}
.hxb-col{max-width:min(720px,56vw)}
.hxb-rv{--hxb-t:clamp(0,calc((var(--hxb-p) - .5 - var(--i,0)*.045)/.3),1);opacity:var(--hxb-t);transform:translateY(calc((1 - var(--hxb-t))*34px))}
.hxb-kicker{display:flex;align-items:center;gap:.7em;margin:0 0 16px;font:700 .9rem/1.2 var(--f-ui);letter-spacing:.22em;text-transform:uppercase;color:#DCD3FF}
.hxb-h1{margin:0 0 16px;font-family:var(--f-display);font-size:clamp(2.2rem,3.3vw,3.7rem);line-height:1.02;color:#fff;text-shadow:0 2px 30px rgba(8,5,12,.55)}
.hxb-h1 em{display:block;font-style:normal;color:#CFC3FF;text-shadow:0 0 30px rgba(123,106,196,.75),0 2px 30px rgba(8,5,12,.55)}
.hxb-lede{max-width:44ch;margin:0;font-size:clamp(1.02rem,1.25vw,1.18rem);line-height:1.6;color:#DDD5EA}
.hxb-cta{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0 18px}
.hxb-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 22px;margin:0;font:600 1rem var(--f-ui);letter-spacing:.06em}
.hxb-meta a{display:inline-flex;gap:.45em;align-items:center;text-decoration:none;color:var(--text)}
.hxb-meta a:hover{color:var(--violet-hi)}
.hxb-cue{position:absolute;left:50%;bottom:calc(var(--top-h) + var(--tick-h) + 52px);z-index:8;display:grid;justify-items:center;gap:10px;padding:10px 18px 12px;border-radius:999px;transform:translateX(-50%);opacity:calc(1 - var(--hxb-p)*10);background:rgba(14,10,20,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:inset 0 0 0 1px rgba(207,195,255,.22);font:700 .78rem/1 var(--f-ui);letter-spacing:.3em;text-transform:uppercase;color:#E6DFFF;pointer-events:none}
.hxb-cue i{position:relative;width:1px;height:26px;overflow:hidden;background:rgba(207,195,255,.25)}
.hxb-cue i::after{content:"";position:absolute;left:0;top:0;width:1px;height:12px;background:#fff;animation:hxb-cue 1.8s var(--ease-io) infinite}
@keyframes hxb-cue{from{transform:translateY(-12px)}to{transform:translateY(26px)}}
html:not(.js) .hxb-cue,html.rm .hxb-cue{display:none}
.hxb.is-off .hxb-fog i,.hxb.is-off .hxb-cue i::after{animation-play-state:paused}

@media ${TALL}{
  .hxb{--hxb-o:clamp(0,calc(var(--hxb-p)/.75),1);--hxb-wr:clamp(0,calc(var(--hxb-p)/.6),1);--hxb-cr:clamp(0,calc((var(--hxb-p) - .3)/.6),1);
    --hxb-aw:58vw;--hxb-at:calc(var(--hdr-h) + 3svh);--hxb-ab:calc(var(--hxb-ch,340px) + 2svh);
    --hxb-fs:14.2vw;--hxb-gap:calc(var(--hxb-fs)*.8);--hxb-wy:calc((100svh + var(--hxb-at) - var(--hxb-ab))/2);
    --hxb-sx:4vw;--hxb-sy:calc(8.5svh + (var(--hdr-h) + 1svh - var(--hxb-ch,340px))/2 - 4px);--hxb-sz:.02;--hxb-ey:-4.5svh;--hxb-ez:.04}
  html.js:not(.rm) .hxb{height:160svh}
  .hxb-w--e{transform:translateY(calc(var(--hxb-we)*-50svh)) scale(calc(1 + var(--hxb-we)*.14));opacity:calc(1 - var(--hxb-we)*2)}
  .hxb-w--d{transform:translateY(calc(var(--hxb-we)*40svh)) scale(calc(1 + var(--hxb-we)*.14));opacity:calc(1 - var(--hxb-we)*2)}
  .hxb-stage{align-items:end;padding:calc(var(--hdr-h) + 24px) 0 max(22px,env(safe-area-inset-bottom))}
  .hxb-scene{transform-origin:46% 46%}
  .hxb-scene img{object-position:50% 50%}
  .hxb-wisps{bottom:auto;top:30%;height:44%}
  .hxb-roll{height:44%;bottom:var(--hxb-ch,340px);-webkit-mask-image:linear-gradient(180deg,transparent,#000 40%,#000 70%,transparent);mask-image:linear-gradient(180deg,transparent,#000 40%,#000 70%,transparent)}
  .hxb-grade{opacity:var(--hxb-e);background:linear-gradient(0deg,rgba(12,8,18,.96) 0%,rgba(12,8,18,.9) calc(var(--hxb-ch,340px) - 40px),rgba(12,8,18,.5) calc(var(--hxb-ch,340px) + 50px),rgba(12,8,18,0) calc(var(--hxb-ch,340px) + 150px)),linear-gradient(180deg,rgba(12,8,18,.5),rgba(12,8,18,0) 18%)}
  .hxb-fade{height:calc(8% + 4px)}
  .hxb-col{max-width:600px}
  .hxb-rv{opacity:1;transform:none}
  .hxb.is-pre .hxb-copy{pointer-events:auto}
  .hxb-kicker{font-size:.76rem;letter-spacing:.18em;margin-bottom:10px}
  .hxb-h1{font-size:clamp(1.75rem,8.4vw,2.3rem);margin-bottom:10px}
  .hxb-lede{font-size:.98rem;line-height:1.5}
  .hxb-cta{gap:10px;margin:16px 0 12px}
  .hxb-cta .btn{--h:48px;flex:1 1 auto;padding:0 1em;font-size:.92rem}
  .hxb-meta{gap:6px 16px;font-size:.92rem}
  .hxb-cue{display:none}
}
@media (prefers-reduced-motion: reduce){
  html.js:not(.rm) .hxb{--hxb-p:1 !important;height:auto}
  html.js:not(.rm) .hxb-stage{position:relative;height:auto}
  .hxb-fog i,.hxb-cue i::after{animation:none}
}`;

  const inlineJs = `(function () {
  var d = document, W = window, root = d.documentElement;
  var hero = d.querySelector('[data-hxb]');
  if (!hero || !root.classList.contains('js') || root.classList.contains('rm') || W.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var stage = hero.querySelector('.hxb-stage'), copy = hero.querySelector('.hxb-copy');
  var phone = W.matchMedia('${TALL}');
  var ticking = false, lastP = -1;
  hero.classList.add('is-live');
  /* phones: the copy band (its top edge to the stage bottom) sets where the doorway ends */
  function measure() { hero.style.setProperty('--hxb-ch', Math.round(stage.offsetHeight - copy.offsetTop) + 'px'); }
  function span(r) { return Math.max(1, r.height - stage.offsetHeight); }
  function update() {
    ticking = false;
    var r = hero.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, -r.top / span(r)));
    if (Math.abs(p - lastP) < 0.0002) return;
    lastP = p;
    hero.style.setProperty('--hxb-p', p.toFixed(4));
    hero.classList.toggle('is-pre', p < 0.55);
  }
  function onScroll() { if (!ticking) { ticking = true; W.requestAnimationFrame(update); } }
  W.addEventListener('scroll', onScroll, { passive: true });
  W.addEventListener('resize', function () { measure(); lastP = -1; onScroll(); }, { passive: true });
  measure(); update();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { measure(); lastP = -1; onScroll(); });
  /* keyboard: tabbing into the copy before it has settled jumps to the revealed state */
  copy.addEventListener('focusin', function () {
    if (lastP > 0.97 || phone.matches) return;
    var r = hero.getBoundingClientRect();
    W.scrollTo(0, W.scrollY + r.top + span(r));
  });
  /* the cloud loops rest while the hero is off-screen */
  if ('IntersectionObserver' in W) new IntersectionObserver(function (en) { hero.classList.toggle('is-off', !en[0].isIntersecting); }).observe(hero);
  /* cursor: the scene behind the doorway drifts opposite the pointer, like looking through a window */
  if (W.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    var loop = function () {
      cx += (tx - cx) * 0.075; cy += (ty - cy) * 0.075;
      stage.style.setProperty('--hxb-mx', cx.toFixed(4)); stage.style.setProperty('--hxb-my', cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.0015 || Math.abs(ty - cy) > 0.0015) W.requestAnimationFrame(loop); else running = false;
    };
    var kick = function () { if (!running) { running = true; W.requestAnimationFrame(loop); } };
    W.addEventListener('pointermove', function (e) {
      if (hero.classList.contains('is-off')) return;
      tx = Math.max(-1, Math.min(1, e.clientX / W.innerWidth * 2 - 1)); ty = Math.max(-1, Math.min(1, e.clientY / W.innerHeight * 2 - 1)); kick();
    }, { passive: true });
    root.addEventListener('pointerleave', function () { tx = 0; ty = 0; kick(); });
  }
})();`;

  return {
    path: '/lab/hero-b/',
    title: 'Hero B: Portal | Elevated Dreams redesign',
    desc: 'Design option B: the ELEVATED DREAMS wordmark with the golden-hour storefront seen through an arched doorway that opens on scroll.',
    bodyClass: 'is-lab is-home',
    body,
    inlineCss,
    inlineJs,
    replay: false,
  };
}
