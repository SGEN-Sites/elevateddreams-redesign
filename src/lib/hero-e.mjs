// hero-e.mjs: the home hero, "One sky, golden hour to night" (owner's pick, round 4; first built as lab option E). The
// Levitate scene (floating storefront, brand words behind it, a front cloud bank, drifting haze) under ONE sky that starts
// at the very top of the page and ends under the deals: golden hour behind the top bars, dusk behind the menu and the
// compliance signs, the site's night ground by "Tonight's deals". The hero art feathers into it, so no straight edge exists.
// SMOOTHNESS: everything tied to the scroll (the lift, the sinking clouds, the passing of time) is a CSS scroll-driven
// animation of translate or opacity, which the browser runs on the compositor, locked to the scroll, with no script per
// frame; browsers without scroll timelines get the same result from one rAF. Cursor depth is a transform eased by a CSS
// transition, retargeted about 20 times a second. The dusk and night grades are pre-baked images (tools/gen/bake-hero-e.py):
// no colour filter runs in the browser. No JS / reduced motion: the static golden-hour scene, same layout.
import { asset, img, btn, shopBtn, icon, esc, statusLine, IMG } from './html.mjs';
import { store, home } from '../content/site.mjs';

const RATIO = 2752 / 1536; // the golden-b frame the cut-out box was measured in
const srcset = (id) => IMG[id].variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');
// a smoothstep alpha ramp between two CSS lengths, as mask stops: a plain linear fade shows a band where it ends
const ramp = (from, to, up = true, n = 8) => Array.from({ length: n + 1 }, (_, i) => {
  const t = i / n; const s = t * t * (3 - 2 * t);
  return `rgba(0,0,0,${(up ? s : 1 - s).toFixed(3)}) calc(${from} + (${to} - (${from}))*${t.toFixed(3)})`;
}).join(',');
const maskY = (stops) => `-webkit-mask-image:linear-gradient(180deg,${stops});mask-image:linear-gradient(180deg,${stops})`;

export function heroE() {
  const b = IMG['hero-building-b-box'];
  const pc = (v) => `${(v * 100).toFixed(3)}%`;
  const plateSizes = '(max-width: 760px) 210vw, 106vw';
  const bldSizes = '(max-width: 760px) 106vw, 54vw';
  const cut = asset('img/gen/hero-building-b-900.webp'); // the cut-out's alpha doubles as the night building's mask
  const plate = (cls, eager = false, id = 'hero-plate-b') => img(id, { alt: '', sizes: plateSizes, eager, cls: `hxe-plate ${cls}` });
  const dusk = () => plate('hxe-pl--dusk', false, 'hero-plate-dusk'), dark = () => plate('hxe-pl--night', false, 'hero-plate-night');
  const night = () => img('hero-night-b', { alt: '', sizes: plateSizes, cls: 'hxe-backimg' });

  const body = `
<section class="hxe" data-hero data-hxe aria-labelledby="hxe-h1">
  <div class="hxe-sky" aria-hidden="true">
    <div class="hxe-sky__top"></div>
    <div class="hxe-sky__warm"></div>
    <div class="hxe-sky__clouds"><div class="hxe-sky__cl">${img('hero-sky-dusk', { alt: '', sizes: plateSizes, cls: 'hxe-sky__img hxe-sky__img--dusk' })}${img('hero-sky-night', { alt: '', sizes: plateSizes, cls: 'hxe-sky__img hxe-sky__img--night' })}</div></div>
    <div class="hxe-sky__mist"><i></i><i></i><i></i></div>
    <div class="hxe-sky__stars"><i></i><i></i></div>
    <i class="hxe-sky__end"></i>
  </div>
  <div class="hxe-stage" aria-hidden="true">
    <div class="hxe-f hxe-sk">${plate('hxe-pl--gold', true)}${dusk()}${dark()}</div>
    <div class="hxe-nightsky"></div>
    <div class="hxe-skygrade"></div>
    <div class="hxe-words"><p class="hxe-wbox"><span class="hxe-w hxe-w1"><span class="hxe-wi">ELEVATED</span></span><span class="hxe-w hxe-w2"><span class="hxe-wi">DREAMS</span></span></p></div>
    <div class="hxe-f hxe-bld"><div class="hxe-bob"><div class="hxe-lift"><span class="hxe-back">${img('hero-golden-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxe-backimg' })}</span>${img('hero-building-b', { alt: '', sizes: bldSizes, eager: true, cls: 'hxe-bimg' })}<span class="hxe-night"><span class="hxe-back">${night()}</span><span class="hxe-nbld">${night()}</span></span></div></div><div class="hxe-wisp">${plate('hxe-pl--gold')}${dark()}</div></div>
    <div class="hxe-f hxe-bank">${plate('hxe-pl--gold', true)}${dark()}</div>
    <div class="hxe-fog"><i class="hxe-fw"></i><i class="hxe-fw"></i><i class="hxe-fv"></i><b class="hxe-haze"></b></div>
  </div>
  <div class="hxe-in">
    <div class="hxe-copy">
      <p class="hxe-kicker">${esc(home.heroKicker)}</p>
      <h1 class="hxe-h1" id="hxe-h1">Dreams take work. <em>Welcome in.</em></h1>
      <p class="hxe-lede">${esc(home.heroLede)}</p>
      <div class="hxe-cta">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
      <p class="hxe-meta"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
    </div>
  </div>
</section>`;

  const on = 'html.js:not(.rm)';
  /* scroll-linked movement: translate, so the cursor's transform stays independent */
  const sy = (sel, k, range = 'var(--hxe-h)') => `${on} ${sel}{--dy:calc(${range}*${k});animation:hxe-y linear both;animation-timeline:scroll(root);animation-range:0 ${range}}`;
  /* scroll-linked crossfades: a..b are fractions of the hero's height */
  const sf = (sel, a, b, o0, o1) => `${on} ${sel}{--o0:${o0};--o1:${o1};animation:hxe-o ease-in-out both;animation-timeline:scroll(root);animation-range:calc(var(--hxe-h)*${a}) calc(var(--hxe-h)*${b})}`;
  const fogI = (n, loop, o0, o1) => `${on} .hxe-fog i:nth-child(${n}){--o0:${o0};--o1:${o1};animation:hxe-drift ${loop},hxe-o ease-in-out both;animation-timeline:auto,scroll(root);animation-range:normal,calc(var(--hxe-h)*.04) calc(var(--hxe-h)*.85)}`;
  const MOTION = `/* motion: only with JS and without a reduced-motion preference; loops pause while off screen */
@media (prefers-reduced-motion: no-preference){
  ${on} .hxe-lift{animation:hxe-rise 1.5s var(--ease) .05s both}
  ${on} .hxe-wi{animation:hxe-wordin 1.1s var(--ease) .12s both}
  ${on} .hxe-w2 .hxe-wi{animation-delay:.24s}
  ${on} .hxe-copy{animation:hxe-copyin .9s var(--ease) .16s both}
  ${on} .hxe-bob{animation:hxe-bob 6.5s var(--ease-io) 1.5s infinite alternate}
  ${on} .hxe-fog i{animation:hxe-drift 110s linear infinite}
  ${on} .hxe-fog i:nth-child(2){animation-duration:74s;animation-direction:reverse}
  ${on} .hxe-fog i:nth-child(3){animation-duration:150s}
  ${on} .hxe-sky__mist i{animation:hxe-drift 130s linear infinite}
  ${on} .hxe-sky__mist i:nth-child(2){animation-duration:90s;animation-direction:reverse}
  ${on} .hxe-sky__stars i:nth-child(2){animation:hxe-twinkle 5.5s ease-in-out infinite alternate}
  /* cursor depth: the compositor eases each layer to where the script last pointed it */
  @media (hover: hover) and (pointer: fine){
    ${on} .hxe-sk,${on} .hxe-words,${on} .hxe-bld,${on} .hxe-bank,${on} .hxe-fog,${on} .hxe-sky__cl{transition:transform .62s cubic-bezier(.2,.72,.28,1)}
  }
  /* the scroll: lifts, sinks and the passing of time, all on the compositor */
  @supports (animation-timeline: scroll()){
    ${sy('.hxe-sk', '.16')}
    ${sy('.hxe-words', '-.08')}
    ${sy('.hxe-w1', '-.05')}
    ${sy('.hxe-w2', '.04')}
    ${sy('.hxe-bld', '-.24')}
    ${sy('.hxe-bank', '.14')}
    ${sy('.hxe-fog', '.08')}
    ${sy('.hxe-sky__cl', '.1', '(var(--hxe-h) + min(var(--hxe-pl),600px))')}
    ${sf('.hxe-sk .hxe-pl--dusk', '.03', '.5', 0, 1)}
    ${sf('.hxe-sk .hxe-pl--night', '.32', '.92', 0, 1)}
    ${sf('.hxe-nightsky', '.38', '.95', 0, '.9')}
    ${sf('.hxe-night', '.1', '.56', 0, 1)}
    ${sf('.hxe-bank .hxe-pl--night', '.1', '.82', 0, 1)}
    ${sf('.hxe-wisp .hxe-pl--night', '.1', '.82', 0, 1)}
    ${sf('.hxe-sky__warm', '.04', '.85', 1, '.18')}
    ${sf('.hxe-haze', '.25', '1', 0, '.75')}
    ${fogI(1, '110s linear infinite', '.6', '.09')}
    ${fogI(2, '74s linear infinite reverse', '.48', '.072')}
    ${fogI(3, '150s linear infinite', 0, '.62')}
  }
  ${on} .hxe.hxe-off .hxe-bob,${on} .hxe.hxe-off .hxe-fog i,${on} .hxe.hxe-skyoff .hxe-sky__mist i,${on} .hxe.hxe-skyoff .hxe-sky__stars i{animation-play-state:paused}
}
@keyframes hxe-y{to{translate:0 var(--dy)}}
@keyframes hxe-o{from{opacity:var(--o0)}to{opacity:var(--o1)}}
@keyframes hxe-rise{from{transform:translate3d(0,12%,0);opacity:0}35%{opacity:1}to{transform:none;opacity:1}}
@keyframes hxe-wordin{from{transform:translate3d(0,.3em,0);opacity:0}to{transform:none;opacity:1}}
@keyframes hxe-copyin{from{transform:translate3d(0,16px,0);opacity:0}to{transform:none;opacity:1}}
@keyframes hxe-bob{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-1.7%,0)}}
@keyframes hxe-drift{to{transform:translate3d(-1200px,0,0)}}
@keyframes hxe-twinkle{from{opacity:.25}to{opacity:.85}}
`;

  const inlineCss = `
/* ===================== HERO E: one sky, golden hour to night (hero rules scoped to .hxe) ===================== */
/* --hxe-up: page top to hero top; --hxe-h: the hero's height; --hxe-pl: hero bottom to deals top (the menu and the signs);
   --hxe-dl: the deals band. The script measures all four; these are the no-JS fallbacks. */
.hxe{--hxe-up:110px;--hxe-h:820px;--hxe-pl:1560px;--hxe-dl:835px;--hxe-pad:max(var(--gutter),calc((100cqw - 1360px)/2 + var(--gutter)));--hxe-cw:min(540px,calc(41.5cqw - var(--hxe-pad) - 30px));position:relative;isolation:isolate;container-type:inline-size;margin-top:calc(-1*var(--hdr-h));min-height:max(600px,calc(100svh - var(--top-h) - var(--tick-h)));display:grid;align-items:center;padding:calc(var(--hdr-h) + 28px) 0 clamp(76px,11vh,128px)}

/* ---------- the one sky: a tall backdrop behind the chrome, the hero and the next two bands ---------- */
/* --a hero top, --b end of the golden clouds (the hero bottom; the art bottom when stacked), --h hero bottom, --c deals top */
.hxe-sky{--a:var(--hxe-up);--h:calc(100% - var(--hxe-pl) - var(--hxe-dl));--b:var(--h);--c:calc(100% - var(--hxe-dl));position:absolute;left:0;right:0;top:calc(-1*var(--hxe-up));bottom:calc(-1*(var(--hxe-pl) + var(--hxe-dl)));z-index:-1;overflow:clip;pointer-events:none;
  /* the base is the cool (dusk) sky everywhere below the header; the golden-hour warmth near the clouds lives in
     .hxe-sky__warm, which the script cools as you scroll, so the sky never stays warm under a night hero */
  background:linear-gradient(180deg,#2a1e2c 0,#3a2a38 calc(var(--a) - 70px),#533a45 var(--a),#6f5258 calc(var(--a) + var(--hdr-h)),#94797f calc(var(--a) + var(--hdr-h) + 140px),#8c7590 calc(var(--a) + (var(--b) - var(--a))*.55),#7e6480 calc(var(--b) - 200px),#6e5470 calc(var(--b) - 70px),#5f4664 var(--b),#4c3858 calc(var(--b) + 170px),#3b2c50 calc(var(--b) + (var(--c) - var(--b))*.55),#241b34 var(--c),#1a1424 calc(var(--c) + 260px),#1a1424 100%);
  -webkit-mask-image:linear-gradient(180deg,#000 calc(100% - var(--hxe-dl)*.6),transparent calc(100% - var(--hxe-dl)*.04));mask-image:linear-gradient(180deg,#000 calc(100% - var(--hxe-dl)*.6),transparent calc(100% - var(--hxe-dl)*.04))}
.hxe-sky > *{position:absolute;left:0;right:0}
/* behind the chrome: the upper sky, warmer on the sun's side, cooler and deeper on the right */
.hxe-sky__top{top:0;height:calc(var(--a) + var(--hdr-h) + 170px);background:radial-gradient(46% 100% at 18% 100%,rgba(236,170,118,.4),rgba(236,170,118,0) 72%),radial-gradient(34% 80% at 62% 100%,rgba(226,150,120,.2),rgba(226,150,120,0) 72%),linear-gradient(90deg,rgba(140,90,92,.26),rgba(140,90,92,0) 46%,rgba(26,24,52,0) 66%,rgba(26,24,52,.16));${maskY(ramp('55%', '100%', false))}}
/* the afterglow under the clouds (the script cools it as you scroll) */
.hxe-sky__warm{top:calc(var(--b) - 320px);height:calc(320px + min((var(--c) - var(--b))*.8,420px));will-change:opacity;background:radial-gradient(52% 40% at 22% 40%,rgba(255,178,116,.42),rgba(255,160,110,.14) 58%,rgba(255,160,110,0) 80%),radial-gradient(40% 36% at 84% 44%,rgba(196,120,150,.26),rgba(196,120,150,0) 75%),linear-gradient(180deg,rgba(198,134,94,0),rgba(198,134,94,.72) 24%,rgba(184,116,96,.66) 40%,rgba(146,90,104,.3) 64%,rgba(146,90,104,0))}
/* the cloud sea continues below the hero (the plate's own clouds, mirrored and graded to dusk), thinning as it darkens;
   the mask rides on the moving element, so the parallax never slides an image edge into view */
.hxe-sky__clouds{top:calc(var(--b) - 150px);height:min(980px,calc((var(--c) - var(--b))*.9 + 150px))}
.hxe-sky__cl{position:absolute;left:-6%;top:0;width:112%;aspect-ratio:2752/1536;will-change:transform,translate;${maskY(`${ramp('0%', '20%')},rgba(0,0,0,.8) 28%,rgba(0,0,0,.5) 38%,rgba(0,0,0,.22) 50%,rgba(0,0,0,.06) 58%,transparent 64%`)}}
.hxe-sky__img{position:absolute;inset:0;width:100%;height:100%;max-width:none;transform:scaleY(-1)}
.hxe-sky__img--dusk{opacity:.9}
.hxe-sky__img--night{${maskY(ramp('14%', '40%'))}}
/* haze drifting across the dusk: one tile wider than its box, sliding exactly one tile */
.hxe-sky__mist{top:calc(var(--b) - 40px);height:min(680px,calc((var(--c) - var(--b)) + 120px));left:-24px;right:-24px;-webkit-mask-image:linear-gradient(180deg,transparent,#000 22%,rgba(0,0,0,.7) 55%,transparent);mask-image:linear-gradient(180deg,transparent,#000 22%,rgba(0,0,0,.7) 55%,transparent)}
.hxe-sky__mist i{position:absolute;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;mix-blend-mode:screen;will-change:transform;-webkit-mask-image:linear-gradient(180deg,transparent,#000 35%,#000 70%,transparent);mask-image:linear-gradient(180deg,transparent,#000 35%,#000 70%,transparent)}
.hxe-sky__mist i:nth-child(1){top:0;height:46%;background-image:url(${asset('img/fog-sodium.svg')});opacity:.3}
.hxe-sky__mist i:nth-child(2){top:18%;height:52%;background-image:url(${asset('img/fog-violet.svg')});opacity:.55}
.hxe-sky__mist i:nth-child(3){top:44%;height:50%;background-image:url(${asset('img/fog-violet.svg')});background-size:1200px 130%;opacity:.4}
/* stars come out as the sky darkens toward the deals */
.hxe-sky__stars{top:calc(var(--c) - min(var(--hxe-pl)*.75,400px));bottom:0;${maskY(ramp('0px', 'min(var(--hxe-pl)*.7,360px)'))}}
/* where the sky starts fading out: the script watches this to know when the page's own sky can be seen again */
.hxe-sky__end{top:calc(100% - var(--hxe-dl)*.6);height:1px}
.hxe-sky__stars i{position:absolute;inset:0}
.hxe-sky__stars i:nth-child(1){background-image:radial-gradient(1.2px 1.2px at 7% 14%,#fff 50%,transparent 52%),radial-gradient(1px 1px at 23% 41%,#fff 50%,transparent 52%),radial-gradient(1.4px 1.4px at 38% 9%,#fff3d2 50%,transparent 52%),radial-gradient(1px 1px at 52% 63%,#fff 50%,transparent 52%),radial-gradient(1.2px 1.2px at 67% 27%,#d9d0ff 50%,transparent 52%),radial-gradient(1px 1px at 81% 72%,#fff 50%,transparent 52%),radial-gradient(1.3px 1.3px at 93% 18%,#fff 50%,transparent 52%),radial-gradient(1px 1px at 15% 84%,#d9d0ff 50%,transparent 52%);background-size:560px 420px;opacity:.85}
.hxe-sky__stars i:nth-child(2){background-image:radial-gradient(1.6px 1.6px at 31% 22%,#fff 50%,transparent 52%),radial-gradient(1.2px 1.2px at 74% 53%,#fff3d2 50%,transparent 52%),radial-gradient(1px 1px at 12% 61%,#fff 50%,transparent 52%),radial-gradient(1.4px 1.4px at 88% 86%,#d9d0ff 50%,transparent 52%);background-size:880px 640px;background-position:130px 90px;opacity:.7}

/* ---------- the hero art (the Levitate scene), feathered into the sky at the top and the bottom ---------- */
/* frame geometry, resolved against the stage (a size container): --fw width, --fl left, --ft top of the golden-b
   frame; --wf the brand words' size (its third limit keeps both lines above the roof's left end on short screens) */
.hxe-stage{--fw:max(103cqw,184.5cqh);--fl:calc((100cqw - var(--fw))*.415);--ft:calc((100cqh - var(--fw)/${RATIO.toFixed(4)})*.12);--wf:min(calc(var(--fw)*.081),calc((58.5cqw - var(--gutter))/6.25),calc((var(--ft) + var(--fw)*.232 - var(--hdr-h) - max(7cqh,56px))/1.692));position:absolute;inset:0;z-index:0;container-type:size;overflow:clip;pointer-events:none;${maskY(ramp('100% - 300px', '100%', false))}}
.hxe-f{position:absolute;left:var(--fl);top:var(--ft);width:var(--fw);aspect-ratio:2752/1536;will-change:transform,translate}
.hxe-plate{position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;object-fit:cover}
/* the sky plate fades in under the header, so the sky above it (behind the chrome) runs straight on into the photo */
.hxe-sk{${maskY(ramp('var(--hdr-h)*.25', 'var(--hdr-h) + 170px'))}}
/* the passing of time: pre-graded copies of the same plate, crossfaded by opacity only */
.hxe-pl--dusk,.hxe-pl--night{opacity:0;will-change:opacity}
.hxe-nightsky{position:absolute;inset:0;opacity:0;will-change:opacity;background:radial-gradient(34% 40% at 12% 8%,rgba(214,208,255,.22),rgba(214,208,255,0) 70%),linear-gradient(180deg,rgba(12,12,38,.62) 0%,rgba(20,18,52,.3) 38%,rgba(20,18,52,0) 64%);${maskY(ramp('0px', 'var(--hdr-h) + 180px'))}}
/* the cinematic grade sits UNDER the words and the building: one soft plum pool behind the copy, fading out in every
   direction (no band across the page), and easing in from the hero's top so the chrome's sky never steps darker */
.hxe-skygrade{position:absolute;inset:0;background:radial-gradient(calc((var(--hxe-pad) + var(--hxe-cw))*1.52) 78% at calc((var(--hxe-pad) + var(--hxe-cw))*.36) 54%,rgba(32,21,50,.86) 0,rgba(32,21,50,.84) 42%,rgba(32,21,50,.7) 54%,rgba(32,21,50,.42) 66%,rgba(32,21,50,.16) 76%,rgba(32,21,50,.04) 81%,rgba(32,21,50,0) 84%);${maskY(ramp('0px', 'var(--hdr-h) + 150px'))}}
/* the brand words, behind the building, left-aligned with each other; never past the hero's gutter, and their cap
   line stays at least 40px clear of the header (the box top sits about .11em below the glyph tops' line) */
.hxe-words{position:absolute;inset:0;will-change:transform,translate}
.hxe-wbox{position:absolute;top:max(calc(var(--ft) + var(--fw)*.2071 - 1.55*var(--wf)),calc(var(--hdr-h) + max(7cqh,56px)));right:max(calc(100cqw - var(--fl) - var(--fw)*.934),var(--gutter));margin:0;font:400 calc(var(--wf)*.94)/.9 var(--f-display);text-align:left;white-space:nowrap}
.hxe-w{display:block;will-change:translate}
.hxe-wi{display:block;color:#fff;letter-spacing:.004em;text-shadow:0 2px 0 rgba(26,20,36,.16),0 16px 44px rgba(26,20,36,.42),0 0 54px rgba(169,155,240,.62)}
.hxe-w2 .hxe-wi{color:#F3EEFF;text-shadow:0 2px 0 rgba(26,20,36,.16),0 16px 44px rgba(26,20,36,.42),0 0 64px rgba(123,106,196,.72)}
/* the building: exactly where it sits in the golden-b frame; its ragged base fades out under the cloud bank */
.hxe-bob{position:absolute;left:${pc(b.x)};top:${pc(b.y)};width:${pc(b.w)};height:${pc(b.h)}}
.hxe-lift{position:absolute;inset:0;-webkit-mask-image:linear-gradient(180deg,#000 74%,rgba(0,0,0,.55) 86%,transparent 97%);mask-image:linear-gradient(180deg,#000 74%,rgba(0,0,0,.55) 86%,transparent 97%)}
.hxe-bimg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}
/* the cut-out's alpha holes are filled with the edit's own pixels, clipped inside the walls */
.hxe-back{position:absolute;inset:0;overflow:hidden;clip-path:polygon(11.2% 36%,93.6% 17%,93.6% 66%,72% 72%,70% 93%,11.2% 93%)}
.hxe-backimg{position:absolute;max-width:none;width:${pc(1 / b.w)};height:${pc(1 / b.h)};left:${pc(-b.x / b.w)};top:${pc(-b.y / b.h)}}
/* after dark: the same storefront from hero-night-b (lit windows, lit sign), cut by the cut-out's own alpha */
.hxe-night{position:absolute;inset:0;opacity:0;will-change:opacity}
.hxe-nbld{position:absolute;inset:0;overflow:hidden;-webkit-mask:url(${cut}) 0 0/100% 100% no-repeat;mask:url(${cut}) 0 0/100% 100% no-repeat}
/* a wisp of the same clouds rides up with the building, so its ragged base stays wrapped as the sea sinks away */
.hxe-wisp{position:absolute;inset:0;-webkit-mask-image:radial-gradient(22% 9.5% at 57% 84%,#000 40%,transparent),radial-gradient(23% 10.5% at 80% 82.5%,#000 45%,transparent);mask-image:radial-gradient(22% 9.5% at 57% 84%,#000 40%,transparent),radial-gradient(23% 10.5% at 80% 82.5%,#000 45%,transparent)}
/* front cloud bank: the same plate, only on the building's side, below a cloud line that climbs to the right */
.hxe-bank{-webkit-mask-image:linear-gradient(90deg,transparent 36%,#000 44%),radial-gradient(26% 21% at 91% 79%,#000 35%,rgba(0,0,0,.55) 62%,transparent 100%),linear-gradient(180deg,transparent 69%,rgba(0,0,0,.7) 76%,#000 82%);-webkit-mask-composite:source-in,source-over,source-over;mask-image:linear-gradient(90deg,transparent 36%,#000 44%),radial-gradient(26% 21% at 91% 79%,#000 35%,rgba(0,0,0,.55) 62%,transparent 100%),linear-gradient(180deg,transparent 69%,rgba(0,0,0,.7) 76%,#000 82%);mask-composite:intersect,add,add}
/* drifting haze in front of everything: warm strips at golden hour, a violet one after dark */
.hxe-fog{position:absolute;left:-24px;right:-24px;bottom:-12px;height:56%;mix-blend-mode:screen;will-change:transform,translate;-webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,.18) 18%,#000 52%),linear-gradient(180deg,transparent,#000 42%);-webkit-mask-composite:source-in,source-over;mask-image:linear-gradient(90deg,rgba(0,0,0,.18) 18%,#000 52%),linear-gradient(180deg,transparent,#000 42%);mask-composite:intersect,add}
.hxe-fog i{position:absolute;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;will-change:transform;-webkit-mask-image:linear-gradient(180deg,transparent,#000 38%,#000 72%,transparent);mask-image:linear-gradient(180deg,transparent,#000 38%,#000 72%,transparent)}
.hxe-fog i:nth-child(1){bottom:0;height:78%;background-image:url(${asset('img/fog-sodium.svg')});opacity:.6}
.hxe-fog i:nth-child(2){bottom:14%;height:58%;background-image:url(${asset('img/fog-silver.svg')});opacity:.48}
.hxe-fog i:nth-child(3){bottom:-6%;height:66%;background-image:url(${asset('img/fog-violet.svg')});background-size:1200px 130%;opacity:0}
.hxe-haze{position:absolute;inset:0;opacity:0;will-change:opacity;background:radial-gradient(70% 70% at 60% 100%,rgba(196,182,255,.5),rgba(150,130,220,.2) 45%,transparent 75%)}
/* copy */
.hxe-in{position:relative;z-index:2;width:100%;padding:0 var(--hxe-pad)}
.hxe-copy{max-width:var(--hxe-cw);text-shadow:0 2px 20px rgba(10,7,14,.5)}
/* the eyebrow: words only (owner rule: no dash in the text, no rule drawn beside it) */
.hxe-kicker{margin:0 0 18px;font:700 .86rem/1.3 var(--f-ui);letter-spacing:.24em;text-transform:uppercase;color:var(--text-2)}
.hxe-h1{margin:0 0 18px;font-family:var(--f-display);font-size:min(2.75rem,calc(var(--hxe-cw)/12.1));line-height:1.04;letter-spacing:.004em;color:var(--text);text-wrap:balance}
.hxe-h1 em{display:block;font-style:normal;color:var(--violet-hi);text-shadow:0 0 30px rgba(123,106,196,.7),0 2px 18px rgba(10,7,14,.5)}
.hxe-lede{max-width:44ch;margin:0;font-size:clamp(1.02rem,1.25vw,1.14rem);line-height:1.62;color:var(--text);text-wrap:pretty}
.hxe-cta{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0 20px;text-shadow:none}
.hxe-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px;margin:0;font:600 1rem var(--f-ui);letter-spacing:.06em}
.hxe-meta a{display:inline-flex;gap:.45em;align-items:center;color:var(--text);text-decoration:none;border-radius:6px}
.hxe-meta a:hover{color:var(--violet-hi)}
.hxe-meta .ic{width:1.1em;height:1.1em}
.hxe-meta .status{color:var(--text)}
.hxe :focus-visible{outline:2px solid var(--violet-neon);outline-offset:4px}

/* ---------- the chrome on this page: translucent strips on the sky, no bars, no border lines ---------- */
body.hxe-page .topbar{background:linear-gradient(180deg,rgba(255,238,228,.06),rgba(255,238,228,0));border-bottom:0;color:var(--text)}
/* on this sky the small print is white and lilac (gold stays a button accent), and quiet tints step up for contrast */
body.hxe-page .topbar b,body.hxe-page .topbar__21{color:var(--text)}
body.hxe-page .topbar__21{border-color:rgba(241,236,248,.55)}
body.hxe-page .topbar .ic{color:var(--violet-neon)}
body.hxe-page .topbar__links a:hover{color:var(--violet-neon)}
body.hxe-page .logo__sub{color:var(--text);border-left-color:rgba(241,236,248,.26)}
body.hxe-page .nav__more{color:var(--text-2)}
body.hxe-page .nav__link::after{background:var(--violet-neon);box-shadow:0 0 10px rgba(187,170,255,.8)}
body.hxe-page .nav__item.is-open .nav__more .ic{color:var(--violet-neon)}
body.hxe-page .hdr__acct{color:var(--text);box-shadow:inset 0 0 0 1px rgba(241,236,248,.3)}
body.hxe-page .hdr__acct:hover{color:var(--violet-neon);box-shadow:inset 0 0 0 1px var(--violet-neon)}
body.hxe-page .ticker{background:linear-gradient(180deg,rgba(10,6,14,0),rgba(10,6,14,.1) 14%,rgba(10,6,14,.24) 32%,rgba(10,6,14,.3) 50%,rgba(10,6,14,.24) 68%,rgba(10,6,14,.1) 86%,rgba(10,6,14,0));border-bottom:0}
body.hxe-page .ticker::after{-webkit-mask-image:linear-gradient(180deg,transparent,#000 35%,#000 65%,transparent);mask-image:linear-gradient(180deg,transparent,#000 35%,#000 65%,transparent)}
/* the sticky header's glass, once the page moves: tinted and frosted over the whole bar, then feathered out in a
   short apron below it (no border line) */
body.hxe-page .hdr::before{bottom:-36px;background:linear-gradient(180deg,rgba(22,15,32,.84),rgba(22,15,32,.74) 62%,rgba(22,15,32,.56));border-bottom:0;${maskY(ramp('100% - 46px', '100%', false))}}
/* ...and only once the header has reached the top of the window: while the ticker is still above it, the glass's top
   edge would be a straight line on the open sky. Without JS there is no glass at all, so the header simply scrolls away */
body.hxe-page .hdr.is-solid:not(.hxe-stuck):not(.mega-open)::before{opacity:0}
html:not(.js) body.hxe-page .hdr{position:relative}
/* the compliance signs float on the dusk: no brick wall, a soft violet halo that never reaches the band's edges */
body.hxe-page .band--placards-top::before{background:radial-gradient(48% 44% at 50% 50%,rgba(123,106,196,.2),rgba(123,106,196,.06) 55%,rgba(123,106,196,0) 92%);opacity:1}
/* the menu sits straight on the sky: no scrim, and no rooftop ledge up here */
body.hxe-page .band--cats::before{background:none}
body.hxe-page .ledge{display:none}

/* far off screen the heavy layers leave the compositor altogether */
.hxe.hxe-off .hxe-stage,.hxe.hxe-skyoff .hxe-sky{visibility:hidden}

${MOTION}

/* ---------- stacked: phones and portrait screens. The art on top, the copy on the dusk below it ---------- */
@media (max-width: 760px), (max-aspect-ratio: 11/10){
  /* --hxe-art: art height above the copy; --hxe-fwq: frame width; --hxe-bt: building top below the header */
  .hxe{--hxe-up:74px;--hxe-pl:2600px;--hxe-dl:1350px;--hxe-art:min(87cqw,56svh);--hxe-fwq:max(150cqw,min(207cqw,133svh));--hxe-bt:min(24cqw,15.4svh);--hxe-cw:calc(100cqw - 2*var(--hxe-pad));align-items:start;padding:calc(var(--hdr-h) + var(--hxe-art)) 0 40px}
  .hxe-stage{--fw:var(--hxe-fwq);--fl:calc(50cqw - var(--fw)*.666);--ft:calc(var(--hdr-h) + var(--hxe-bt) - var(--fw)*.1697);--wf:calc(var(--fw)*.0655);${maskY(ramp('var(--hdr-h) + var(--hxe-art) - 118px', 'var(--hdr-h) + var(--hxe-art) - 2px', false))}}
  .hxe-sk{${maskY(ramp('var(--hdr-h)*.1', 'var(--hdr-h) + 84px'))}}
  .hxe-wbox{right:auto;left:calc(var(--fl) + var(--fw)*.666);top:calc(var(--ft) + var(--fw)*.086);transform:translateX(-50%);text-align:left;line-height:.88}
  /* stacked, the copy sits on the dusk below the art: the grade only settles the sky behind the header */
  .hxe-skygrade{background:linear-gradient(180deg,rgba(32,21,50,.5),rgba(32,21,50,.46) var(--hdr-h),rgba(32,21,50,0) calc(var(--hdr-h) + 100px));${maskY(ramp('0px', 'var(--hdr-h)*.55'))}}
  .hxe-fog{height:calc(var(--hdr-h) + var(--hxe-art) + 40px);bottom:auto;top:0;-webkit-mask-image:linear-gradient(180deg,transparent 52%,#000 74%,transparent);mask-image:linear-gradient(180deg,transparent 52%,#000 74%,transparent)}
  /* the golden clouds end at the art; the copy and the signs sit on the dusk, the deals on the night */
  .hxe-sky{--b:calc(var(--a) + var(--hdr-h) + var(--hxe-art));
    background:linear-gradient(180deg,#2a1e2c 0,#3a2a38 calc(var(--a) - 40px),#533a45 var(--a),#6f5258 calc(var(--a) + var(--hdr-h)),#94797f calc(var(--a) + var(--hdr-h) + 80px),#7a6080 calc(var(--b) - 130px),#5a4464 calc(var(--b) - 44px),#463450 var(--b),#3b2c4c calc(var(--b) + 110px),#352841 calc(var(--b) + 300px),#33263f var(--h),#2a2039 calc(var(--h) + var(--hxe-pl)*.55),#221a31 var(--c),#1a1424 calc(var(--c) + 260px),#1a1424 100%)}
  /* the afterglow stops just above the eyebrow, and the copy sits on a clean dusk (the clouds resume below it) */
  .hxe-sky__warm{top:calc(var(--b) - 230px);height:300px;background:radial-gradient(60% 40% at 30% 44%,rgba(255,178,116,.4),rgba(255,160,110,0) 75%),linear-gradient(180deg,rgba(198,134,94,0),rgba(198,134,94,.66) 42%,rgba(186,116,94,.4) 60%,rgba(186,116,94,0) 76%)}
  .hxe-sky__clouds{top:calc(var(--h) - 70px);height:min(calc(var(--hxe-pl)*.6),560px)}
  .hxe-sky__cl{left:-55%;width:210%;${maskY(`${ramp('0%', '30%')},rgba(0,0,0,.7) 38%,rgba(0,0,0,.4) 48%,rgba(0,0,0,.14) 58%,transparent 66%`)}}
  .hxe-sky__mist{top:calc(var(--h) - 160px);height:min(calc(var(--hxe-pl)*.85 + 160px),920px)}
  .hxe-sky__mist i:nth-child(1){opacity:.14}
  .hxe-sky__mist i:nth-child(2){opacity:.3}
  .hxe-sky__mist i:nth-child(3){opacity:.22}
}
@media (min-width: 761px) and (max-aspect-ratio: 11/10){
  .hxe{--hxe-up:150px;--hxe-pl:1900px;--hxe-dl:1050px;--hxe-art:min(64cqw,48svh);--hxe-fwq:max(150cqw,min(165cqw,124svh));--hxe-bt:min(17.5cqw,13.1svh);--hxe-cw:min(640px,calc(100cqw - 2*var(--hxe-pad)))}
}
/* short phones: a smaller building so the buttons still reach the first screen */
@media (max-width: 760px) and (max-height: 700px){
  .hxe{--hxe-art:72.5cqw;--hxe-fwq:180cqw;--hxe-bt:19.5cqw}
}
@media (max-width: 760px){
  .hxe-kicker{font-size:.74rem;letter-spacing:.16em;margin-bottom:12px}
  .hxe-h1{font-size:min(2.05rem,calc(var(--hxe-cw)/12.05));margin-bottom:12px}
  .hxe-lede{font-size:.98rem;line-height:1.52}
  .hxe-cta{gap:10px;margin:18px 0 14px}
  .hxe-cta .btn{--h:50px;flex:1 1 auto;padding:0 .9em;font-size:.95rem;letter-spacing:.06em}
  .hxe-meta{gap:6px 18px;font-size:.95rem}
}
@media (max-width: 380px){ .hxe-cta .btn .ic{display:none} }`;

  const inlineJs = `(function(){
  var hero=document.querySelector('[data-hxe]');if(!hero)return;
  var W=window,D=document,root=D.documentElement,dl=D.querySelector('.band--deals'),pl=D.querySelector('.band--placards-top'),hdr=D.querySelector('[data-hdr]'),end=hero.querySelector('.hxe-sky__end');
  var bands=[],n=hero.nextElementSibling;while(n){bands.push(n);if(n===dl)break;n=n.nextElementSibling;}
  var upY=0,H=hero.offsetHeight||1,PL=0,was={},onMeasure=null;
  function put(k,v){if(was[k]!==v){was[k]=v;hero.style.setProperty(k,v);}}
  /* the header's glass waits until the header has reached the top of the window */
  function stuck(){if(hdr)hdr.classList.toggle('hxe-stuck',(W.pageYOffset||0)>=upY-6);}
  /* the sky spans page top to the deals band's bottom, and the scroll animations run over the hero's height: measure those (layout only, so it also runs under reduced motion) */
  function measure(){
    var y=W.pageYOffset||0,r=hero.getBoundingClientRect(),top=r.top+y,dt=dl?dl.getBoundingClientRect().top+y:top+r.height;
    H=Math.max(1,Math.round(r.height));PL=Math.max(0,Math.round(dt-top-r.height));upY=Math.max(0,Math.round(top));
    put('--hxe-up',upY+'px');put('--hxe-h',H+'px');put('--hxe-pl',PL+'px');if(dl)put('--hxe-dl',dl.offsetHeight+'px');
    stuck();if(onMeasure)onMeasure();
  }
  measure();
  W.addEventListener('scroll',stuck,{passive:true});
  if('ResizeObserver' in W){var ro=new ResizeObserver(measure);[hero].concat(bands).forEach(function(e){ro.observe(e);});}
  else W.addEventListener('resize',measure,{passive:true});
  W.addEventListener('load',measure);
  /* while this sky fills the window the page's own sky and fog canvas have nothing to show: they stop */
  if(end&&'IntersectionObserver' in W)new IntersectionObserver(function(en){var e=en[en.length-1],c=!e.isIntersecting&&e.boundingClientRect.top>0;if(root.classList.contains('sky-covered')!==c){root.classList.toggle('sky-covered',c);W.dispatchEvent(new Event('ed:skycover'));}},{rootMargin:'0px 0px 320px 0px'}).observe(end);
  var vis={hero:true};
  if('IntersectionObserver' in W){
    var seen=new Map(),io=new IntersectionObserver(function(en){
      en.forEach(function(e){seen.set(e.target,e.isIntersecting);});
      vis.hero=seen.get(hero)!==false;
      var any=false;seen.forEach(function(v){any=any||v;});
      hero.classList.toggle('hxe-off',!vis.hero);
      hero.classList.toggle('hxe-ploff',!pl||!seen.get(pl));
      hero.classList.toggle('hxe-skyoff',!any);
      if(onMeasure)onMeasure();
    },{rootMargin:'160px 0px'});
    [hero].concat(bands).forEach(function(e){io.observe(e);});
  }
  if(W.matchMedia('(prefers-reduced-motion: reduce)').matches||root.classList.contains('rm'))return;
  var FINE=W.matchMedia('(hover: hover) and (pointer: fine)').matches,SDA=!!(W.CSS&&CSS.supports&&CSS.supports('animation-timeline: scroll()'));
  var q=function(s){return hero.querySelector(s);};
  var L={sky:q('.hxe-sk'),words:q('.hxe-words'),bld:q('.hxe-bld'),bank:q('.hxe-bank'),fog:q('.hxe-fog'),dusk:q('.hxe-sky__cl')};
  /* depth per layer: [cursor x px, cursor y px, scroll factor]; negative = rises faster than the page, positive = sinks */
  var DP={sky:[5,3,.16],words:[9,5,-.08],bld:[14,8,-.24],bank:[18,10,.14],fog:[22,12,.08],dusk:[4,2,.1]};
  if(FINE){
    var tx=0,ty=0,tm=0;
    var push=function(){tm=0;for(var k in DP)if(L[k])L[k].style.transform='translate3d('+(-tx*DP[k][0]).toFixed(1)+'px,'+(-ty*DP[k][1]).toFixed(1)+'px,0)';};
    var soon=function(){if(!tm)tm=W.setTimeout(push,48);};
    W.addEventListener('pointermove',function(e){if(e.pointerType==='touch'||!vis.hero)return;tx=e.clientX/W.innerWidth*2-1;ty=e.clientY/W.innerHeight*2-1;soon();},{passive:true});
    D.addEventListener('mouseleave',function(){tx=0;ty=0;soon();});
  }
  if(SDA)return;
  /* no scroll timelines: the same motion from one rAF, and on touch screens only the crossfades (a scripted lift would trail the finger) */
  var w1=q('.hxe-w1'),w2=q('.hxe-w2'),X={dusk:q('.hxe-sk .hxe-pl--dusk'),night:q('.hxe-sk .hxe-pl--night'),nsky:q('.hxe-nightsky'),nbld:q('.hxe-night'),nbank:q('.hxe-bank .hxe-pl--night'),nwisp:q('.hxe-wisp .hxe-pl--night'),warm:q('.hxe-sky__warm'),haze:q('.hxe-haze')};
  var fw=hero.querySelectorAll('.hxe-fw'),fv=q('.hxe-fv'),raf=0;
  function ss(a,b,x){x=(x-a)/(b-a);x=x<0?0:x>1?1:x;return x*x*(3-2*x);}
  function op(el,v){if(el)el.style.opacity=v.toFixed(3);}
  function ty2(el,y){if(el&&FINE)el.style.translate='0 '+y.toFixed(1)+'px';}
  function frame(){
    raf=0;var y=W.pageYOffset||0,s=Math.max(0,Math.min(y,H+Math.min(PL,600))),sh=Math.min(s,H),p=sh/H;
    for(var k in DP)ty2(L[k],(k==='dusk'?s:sh)*DP[k][2]);
    ty2(w1,-sh*.05);ty2(w2,sh*.04);
    var c=ss(.04,.85,p);
    op(X.dusk,ss(.03,.5,p));op(X.night,ss(.32,.92,p));op(X.nsky,ss(.38,.95,p)*.9);
    op(X.nbld,ss(.1,.56,p));op(X.nbank,ss(.1,.82,p));op(X.nwisp,ss(.1,.82,p));op(X.warm,1-c*.82);op(X.haze,ss(.25,1,p)*.75);
    for(var i=0;i<fw.length;i++)op(fw[i],(i?.48:.6)*(1-c*.85));
    op(fv,c*.62);
  }
  function kick(){if(!raf&&vis.hero)raf=W.requestAnimationFrame(frame);}
  onMeasure=kick;W.addEventListener('scroll',kick,{passive:true});kick();
})();`;

  return {
    section: body,
    css: inlineCss,
    js: inlineJs,
    preload: `<link rel="preload" as="image" imagesrcset="${srcset('hero-plate-b')}" imagesizes="${plateSizes}" fetchpriority="high"><link rel="preload" as="image" imagesrcset="${srcset('hero-building-b')}" imagesizes="${bldSizes}">`,
  };
}
