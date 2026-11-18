// lab/splash-1.mjs: SPLASH 1 "Through the clouds". The page opens inside warm, sunlit cloud (three left/right pairs
// cut from the golden-hour cloud plate, plus luminous haze); the ELEVATED / DREAMS wordmark rises up through the
// clouds, then the pairs part (left ones left, right ones right, drifting up and zooming at three speeds) onto the
// storefront hero, which settles as the clouds clear. 1.75 s; any key, click, touch or wheel skips it; it then
// removes itself. Shown by CSS only when the head script has set html.js and not .rm (so: never without JS, never
// under reduced motion); a CSS failsafe hides it at 2.6 s even if this page's script failed. window.labReplay replays.
import { asset, img, btn, shopBtn, icon, esc, statusLine, IMG } from '../lib/html.mjs';
import { store, home } from '../content/site.mjs';
import { dealsGrid } from '../lib/sections.mjs';

const srcset = (id) => IMG[id].variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');

export default function () {
  const plate = asset('img/gen/hero-plate-b-2400.webp'); // the clouds are shown 1.6-2.4x the plate's height: use the largest
  const heroSizes = '(max-width: 760px) 100vw, 106vw';
  const body = `
<section class="sp1-hero" data-hero data-sp1-hero aria-labelledby="sp1-h1">
  <picture class="sp1-bg" aria-hidden="true">
    <source media="(max-width: 760px)" srcset="${srcset('hero-golden-tall')}" sizes="100vw">
    ${img('hero-golden-b', { alt: '', sizes: heroSizes, eager: true, cls: 'sp1-img' })}
  </picture>
  <div class="sp1-grade" aria-hidden="true"></div>
  <div class="sp1-in">
    <div class="sp1-plate">
      <p class="sp1-kicker">${esc(home.heroKicker)}</p>
      <h1 class="sp1-h1" id="sp1-h1">Dreams take work. <em>Welcome in.</em></h1>
      <p class="sp1-lede">${esc(home.heroLede)}</p>
      <div class="sp1-cta">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
      <p class="sp1-meta"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
    </div>
  </div>
</section>
<section class="band band--deals"><div class="band__in">${dealsGrid()}</div></section>
<div class="sp1" data-sp1 aria-hidden="true">
  <div class="sp1-base"></div>
  <div class="sp1-c sp1-c--l0"></div><div class="sp1-c sp1-c--r0"></div>
  <div class="sp1-sun"></div>
  <div class="sp1-c sp1-c--l1"></div><div class="sp1-c sp1-c--r1"></div>
  <p class="sp1-mark"><span class="sp1-w">ELEVATED</span><span class="sp1-w sp1-w2">DREAMS</span></p>
  <div class="sp1-c sp1-c--l2"></div><div class="sp1-c sp1-c--r2"></div>
</div>`;

  const inlineCss = `
/* ===================== SPLASH 1: Through the clouds (all rules scoped to .sp1 / .sp1-*) ===================== */
/* ---------- the hero under the splash: the golden-hour storefront, the copy on dark glass ---------- */
.sp1-hero{--sp1-pad:max(var(--gutter),calc((100cqw - 1360px)/2 + var(--gutter)));position:relative;isolation:isolate;overflow:clip;container-type:inline-size;margin-top:calc(-1*var(--hdr-h));min-height:max(600px,calc(100svh - var(--top-h) - var(--tick-h)));display:grid;align-items:center;padding:calc(var(--hdr-h) + 28px) 0 clamp(72px,10vh,120px)}
.sp1-bg{position:absolute;inset:0;z-index:-2;display:block;-webkit-mask-image:linear-gradient(180deg,#000 calc(100% - 120px),transparent);mask-image:linear-gradient(180deg,#000 calc(100% - 120px),transparent)}
.sp1-img{width:100%;height:100%;max-width:none;object-fit:cover;object-position:66% 50%;transform-origin:68% 58%}
.sp1-grade{position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(16,11,24,.6) 0,rgba(16,11,24,.2) calc(var(--hdr-h) + 20px),rgba(16,11,24,0) calc(var(--hdr-h) + 100px)),linear-gradient(90deg,rgba(17,11,25,.62) 0%,rgba(17,11,25,.5) 30%,rgba(17,11,25,.16) 44%,rgba(17,11,25,0) 54%),linear-gradient(0deg,rgba(22,16,30,.9) 0%,rgba(22,16,30,.55) 10%,rgba(22,16,30,0) 28%)}
.sp1-in{width:100%;padding:0 var(--sp1-pad)}
.sp1-plate{position:relative;width:min(540px,calc(43cqw - var(--sp1-pad)));padding:clamp(24px,2.3vw,34px) clamp(22px,2.4vw,36px);border-radius:28px;background:linear-gradient(160deg,rgba(40,30,58,.66),rgba(14,10,20,.62));-webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);box-shadow:inset 0 0 0 1px rgba(187,170,255,.24),inset 0 1px 0 rgba(255,255,255,.08),0 40px 90px -30px rgba(0,0,0,.85)}
.sp1-plate::before{content:"";position:absolute;inset:7px;border-radius:22px;box-shadow:inset 0 0 0 1px rgba(187,170,255,.1);pointer-events:none}
.sp1-kicker{display:flex;align-items:center;gap:.8em;margin:0 0 16px;font:700 .84rem/1.3 var(--f-ui);letter-spacing:.22em;text-transform:uppercase;color:var(--text-2)}
.sp1-kicker::before{content:"";flex:none;width:30px;height:2px;border-radius:2px;background:var(--violet-hi);box-shadow:0 0 12px rgba(169,155,240,.9)}
.sp1-h1{margin:0 0 16px;font-family:var(--f-display);font-size:min(2.6rem,calc((min(540px,calc(43cqw - var(--sp1-pad))) - 2*clamp(22px,2.4vw,36px))/12.05));line-height:1.05;color:var(--text);text-wrap:balance}
.sp1-h1 em{display:block;font-style:normal;color:var(--violet-hi);text-shadow:0 0 30px rgba(123,106,196,.7)}
.sp1-lede{margin:0;font-size:clamp(1rem,1.2vw,1.12rem);line-height:1.6;color:var(--text);text-wrap:pretty}
.sp1-cta{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0 18px}
.sp1-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 22px;margin:0;font:600 1rem var(--f-ui);letter-spacing:.06em}
.sp1-meta a{display:inline-flex;gap:.45em;align-items:center;color:var(--text);text-decoration:none;border-radius:6px}
.sp1-meta a:hover{color:var(--violet-hi)}
.sp1-meta .ic{width:1.1em;height:1.1em}
.sp1-meta .status{color:var(--text)}
.sp1-hero :focus-visible{outline:2px solid var(--violet-neon);outline-offset:4px}
@media (max-width: 760px){
  .sp1-hero{align-items:start;padding:calc(var(--hdr-h) + 72cqw) 0 30px}
  .sp1-bg{bottom:auto;top:-28cqw;height:auto;-webkit-mask-image:linear-gradient(180deg,#000 78%,transparent);mask-image:linear-gradient(180deg,#000 78%,transparent)}
  .sp1-img{height:auto;aspect-ratio:1080/1935;object-fit:cover;transform-origin:50% 42%}
  .sp1-grade{background:linear-gradient(180deg,rgba(16,11,24,.5) 0,rgba(16,11,24,0) calc(var(--hdr-h) + 40px)),linear-gradient(0deg,rgba(22,16,30,.9) 0%,rgba(22,16,30,.4) 40%,rgba(22,16,30,0) 60%)}
  .sp1-plate{width:auto;padding:20px 18px 18px;border-radius:22px}
  .sp1-plate::before{border-radius:16px}
  .sp1-kicker{font-size:.72rem;letter-spacing:.15em;gap:.6em;margin-bottom:10px}
  .sp1-kicker::before{width:18px}
  .sp1-h1{font-size:min(1.95rem,calc((100cqw - 2*var(--gutter) - 36px)/12.05));margin-bottom:10px}
  .sp1-lede{font-size:.96rem;line-height:1.5}
  .sp1-cta{gap:10px;margin:16px 0 12px}
  .sp1-cta .btn{--h:48px;flex:1 1 auto;padding:0 .9em;font-size:.95rem}
  .sp1-meta{gap:4px 16px;font-size:.94rem}
}
/* the storefront settles as the clouds clear (in step with the splash; replayed by the script) */
@media (prefers-reduced-motion: no-preference){
  html.js:not(.rm) .sp1-img{animation:sp1-arrive 1.75s cubic-bezier(.3,.1,.2,1) both}
}
@keyframes sp1-arrive{0%,50%{transform:scale(1.12)}100%{transform:none}}

/* ---------- the splash: hidden unless JS ran the head script and motion is allowed ---------- */
.sp1{position:fixed;inset:0;z-index:250;display:none;overflow:hidden;contain:strict;pointer-events:auto;--sp1-cloud:url(${plate})}
html.js:not(.rm) .sp1{display:block;animation:sp1-failsafe .01s 2.6s forwards}
@media (prefers-reduced-motion: reduce){.sp1{display:none!important}}
.sp1.is-skip{opacity:0;transition:opacity .3s var(--ease-io)}
@keyframes sp1-failsafe{to{opacity:0;visibility:hidden}}
.sp1-base{position:absolute;inset:0;background:radial-gradient(80% 70% at 50% 40%,#f8cf9e 0%,#eeb27f 34%,#d99376 60%,#b07a86 84%,#7a6190 100%)}
.sp1-c{position:absolute;top:-6%;bottom:-6%;width:66%;will-change:transform;background-image:var(--sp1-cloud);background-repeat:no-repeat}
.sp1-c--l0,.sp1-c--l1,.sp1-c--l2{left:-5%;transform-origin:0 50%}
.sp1-c--r0,.sp1-c--r1,.sp1-c--r2{right:-5%;transform-origin:100% 50%}
/* back pair: the cloud sea filling the screen (the lower 44% of the plate, the sun-lit side left, the bank right) */
/* inner edges are a soft ramp OR'd with the fog texture, so each bank parts with a ragged cloud edge, not a wipe */
.sp1-c--l0,.sp1-c--r0{width:70%;--sp1-edge:url(${asset('img/fog-silver.svg')})}
.sp1-c--l0{background-size:auto 228%;background-position:17% 100%;-webkit-mask-image:linear-gradient(90deg,#000 62%,transparent 88%),var(--sp1-edge),linear-gradient(90deg,transparent 52%,#000 66%,#000 82%,transparent 98%);-webkit-mask-size:100% 100%,50% 130%,100% 100%;-webkit-mask-position:0 0,100% 40%,0 0;-webkit-mask-repeat:no-repeat;-webkit-mask-composite:source-over,source-in;mask-image:linear-gradient(90deg,#000 62%,transparent 88%),var(--sp1-edge),linear-gradient(90deg,transparent 52%,#000 66%,#000 82%,transparent 98%);mask-size:100% 100%,50% 130%,100% 100%;mask-position:0 0,100% 40%,0 0;mask-repeat:no-repeat;mask-composite:add,intersect}
.sp1-c--r0{background-size:auto 228%;background-position:88% 100%;-webkit-mask-image:linear-gradient(270deg,#000 62%,transparent 88%),var(--sp1-edge),linear-gradient(270deg,transparent 52%,#000 66%,#000 82%,transparent 98%);-webkit-mask-size:100% 100%,50% 130%,100% 100%;-webkit-mask-position:0 0,0 60%,0 0;-webkit-mask-repeat:no-repeat;-webkit-mask-composite:source-over,source-in;mask-image:linear-gradient(270deg,#000 62%,transparent 88%),var(--sp1-edge),linear-gradient(270deg,transparent 52%,#000 66%,#000 82%,transparent 98%);mask-size:100% 100%,50% 130%,100% 100%;mask-position:0 0,0 60%,0 0;mask-repeat:no-repeat;mask-composite:add,intersect}
/* sun bloom between the back clouds and the wordmark */
.sp1-sun{position:absolute;left:50%;top:44%;width:120vmax;height:120vmax;margin:-60vmax 0 0 -60vmax;border-radius:50%;background:radial-gradient(closest-side,rgba(255,246,222,.95),rgba(255,214,160,.5) 30%,rgba(255,190,140,.16) 55%,transparent 72%);mix-blend-mode:screen;will-change:transform,opacity}
/* mid pair: luminous haze */
.sp1-c--l1,.sp1-c--r1{width:74%;background-image:url(${asset('img/fog-silver.svg')}),url(${asset('img/fog-sodium.svg')});background-size:1300px 100%,1100px 100%;background-repeat:repeat-x;mix-blend-mode:screen;opacity:.8}
.sp1-c--l1{background-position:0 0,-300px 0;-webkit-mask-image:linear-gradient(90deg,#000 50%,transparent);mask-image:linear-gradient(90deg,#000 50%,transparent)}
.sp1-c--r1{background-position:-500px 0,-800px 0;-webkit-mask-image:linear-gradient(270deg,#000 50%,transparent);mask-image:linear-gradient(270deg,#000 50%,transparent)}
/* the wordmark: white with a violet glow and a soft plum shade, so it reads on sun-lit cloud */
.sp1-mark{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;margin:0;font:400 min(14.4vw,19vh)/.9 var(--f-display);white-space:nowrap;will-change:transform,opacity,filter}
.sp1-w{display:block;color:#fff;text-shadow:0 2px 0 rgba(90,62,110,.25),0 10px 34px rgba(64,40,84,.5),0 0 70px rgba(123,106,196,.75)}
.sp1-w2{color:#F4EFFF}
/* front pair: the nearest bank along the bottom; the wordmark rises from behind it */
.sp1-c--l2,.sp1-c--r2{top:auto;bottom:-8%;height:58%;width:70%;background-size:auto 300%}
.sp1-c--l2{background-position:28% 100%;-webkit-mask-image:linear-gradient(0deg,#000 46%,transparent 96%),linear-gradient(90deg,#000 56%,transparent);-webkit-mask-composite:source-in;mask-image:linear-gradient(0deg,#000 46%,transparent 96%),linear-gradient(90deg,#000 56%,transparent);mask-composite:intersect}
.sp1-c--r2{background-position:80% 100%;-webkit-mask-image:linear-gradient(0deg,#000 46%,transparent 96%),linear-gradient(270deg,#000 56%,transparent);-webkit-mask-composite:source-in;mask-image:linear-gradient(0deg,#000 46%,transparent 96%),linear-gradient(270deg,#000 56%,transparent);mask-composite:intersect}
/* portrait: wider banks with a longer overlap, so no straight seam shows down the middle; a smaller sun */
@media (max-aspect-ratio: 4/5){
  .sp1-c--l0,.sp1-c--r0{width:84%}
  .sp1-c--l0{-webkit-mask-image:linear-gradient(90deg,#000 46%,transparent 96%),var(--sp1-edge),linear-gradient(90deg,transparent 40%,#000 56%,#000 80%,transparent 98%);mask-image:linear-gradient(90deg,#000 46%,transparent 96%),var(--sp1-edge),linear-gradient(90deg,transparent 40%,#000 56%,#000 80%,transparent 98%);-webkit-mask-size:100% 100%,62% 120%,100% 100%;mask-size:100% 100%,62% 120%,100% 100%}
  .sp1-c--r0{-webkit-mask-image:linear-gradient(270deg,#000 46%,transparent 96%),var(--sp1-edge),linear-gradient(270deg,transparent 40%,#000 56%,#000 80%,transparent 98%);mask-image:linear-gradient(270deg,#000 46%,transparent 96%),var(--sp1-edge),linear-gradient(270deg,transparent 40%,#000 56%,#000 80%,transparent 98%);-webkit-mask-size:100% 100%,62% 120%,100% 100%;mask-size:100% 100%,62% 120%,100% 100%}
  .sp1-c--l0,.sp1-c--r0{background-size:auto 180%}
  .sp1-sun{width:150vw;height:150vw;margin:-75vw 0 0 -75vw;top:30%;opacity:.8}
}
/* the timeline (1.75 s): rise 0.05-0.7 s, hold, part 0.91-1.75 s (the warm base only thins once the gap is opening) */
.sp1-base{animation:sp1-base 1.75s linear both}
.sp1-sun{animation:sp1-sun 1.75s linear both}
.sp1-c--l0{animation:sp1-l0 1.75s linear both}.sp1-c--r0{animation:sp1-r0 1.75s linear both}
.sp1-c--l1{animation:sp1-l1 1.75s linear both}.sp1-c--r1{animation:sp1-r1 1.75s linear both}
.sp1-c--l2{animation:sp1-l2 1.75s linear both}.sp1-c--r2{animation:sp1-r2 1.75s linear both}
.sp1-mark{animation:sp1-mark 1.75s linear both}
@keyframes sp1-base{0%,58%{opacity:1}78%,100%{opacity:0}}
@keyframes sp1-sun{0%{opacity:.55;transform:scale(.9)}44%{opacity:1;transform:scale(1)}56%{opacity:1;transform:scale(1.04);animation-timing-function:cubic-bezier(.5,0,.6,1)}82%,100%{opacity:0;transform:scale(1.25)}}
@keyframes sp1-l0{0%{transform:translate3d(0,0,0) scale(1);animation-timing-function:cubic-bezier(.3,.4,.6,1)}52%{transform:translate3d(-2.5vw,-.6vh,0) scale(1.03);animation-timing-function:cubic-bezier(.4,0,.2,1)}100%{transform:translate3d(-66vw,-6vh,0) scale(1.16)}}
@keyframes sp1-r0{0%{transform:translate3d(0,0,0) scale(1);animation-timing-function:cubic-bezier(.3,.4,.6,1)}52%{transform:translate3d(2.5vw,-.6vh,0) scale(1.03);animation-timing-function:cubic-bezier(.4,0,.2,1)}100%{transform:translate3d(66vw,-6vh,0) scale(1.16)}}
@keyframes sp1-l1{0%{transform:translate3d(0,0,0) scale(1);animation-timing-function:cubic-bezier(.3,.4,.6,1)}52%{transform:translate3d(-4vw,-1vh,0) scale(1.04);animation-timing-function:cubic-bezier(.4,0,.2,1)}100%{transform:translate3d(-82vw,-8vh,0) scale(1.24)}}
@keyframes sp1-r1{0%{transform:translate3d(0,0,0) scale(1);animation-timing-function:cubic-bezier(.3,.4,.6,1)}52%{transform:translate3d(4vw,-1vh,0) scale(1.04);animation-timing-function:cubic-bezier(.4,0,.2,1)}100%{transform:translate3d(82vw,-8vh,0) scale(1.24)}}
@keyframes sp1-l2{0%{transform:translate3d(0,2vh,0) scale(1);animation-timing-function:cubic-bezier(.3,.4,.6,1)}52%{transform:translate3d(-5vw,0,0) scale(1.05);animation-timing-function:cubic-bezier(.4,0,.2,1)}100%{transform:translate3d(-98vw,-3vh,0) scale(1.38)}}
@keyframes sp1-r2{0%{transform:translate3d(0,2vh,0) scale(1);animation-timing-function:cubic-bezier(.3,.4,.6,1)}52%{transform:translate3d(5vw,0,0) scale(1.05);animation-timing-function:cubic-bezier(.4,0,.2,1)}100%{transform:translate3d(98vw,-3vh,0) scale(1.38)}}
@keyframes sp1-mark{0%,3%{opacity:0;transform:translate3d(0,17vh,0) scale(.94);filter:blur(14px);animation-timing-function:cubic-bezier(.16,1,.3,1)}40%{opacity:1;transform:translate3d(0,0,0) scale(1);filter:blur(0)}56%{opacity:1;transform:translate3d(0,-1vh,0) scale(1.02);filter:blur(0);animation-timing-function:cubic-bezier(.5,0,.75,.5)}82%,100%{opacity:0;transform:translate3d(0,-7vh,0) scale(1.16);filter:blur(10px)}}`;

  const inlineJs = `(function(){
  var d=document,W=window,root=d.documentElement;
  var el=d.querySelector('[data-sp1]'),hero=d.querySelector('[data-sp1-hero]');
  if(!el)return;
  var tpl=el.cloneNode(true),host=el.parentNode,timer=0,armT=0,armed=false;
  var EV=['keydown','pointerdown','wheel','touchstart'];
  var still=function(){return W.matchMedia('(prefers-reduced-motion: reduce)').matches||root.classList.contains('rm')||!root.classList.contains('js');};
  function disarm(){if(!armed)return;armed=false;EV.forEach(function(e){W.removeEventListener(e,skip,true);});}
  function arm(){armed=true;EV.forEach(function(e){W.addEventListener(e,skip,{capture:true,passive:true});});}
  function finish(){W.clearTimeout(timer);W.clearTimeout(armT);disarm();if(el&&el.parentNode)el.parentNode.removeChild(el);el=null;}
  function skip(){if(!el||el.classList.contains('is-skip'))return;disarm();el.classList.add('is-skip');W.clearTimeout(timer);timer=W.setTimeout(finish,320);}
  function start(){timer=W.setTimeout(finish,1800);armT=W.setTimeout(arm,60);}
  W.labReplay=function(){
    if(still())return;
    finish();
    el=tpl.cloneNode(true);host.appendChild(el);
    var im=hero&&hero.querySelector('.sp1-img');
    if(im){im.style.animation='none';void im.offsetWidth;im.style.animation='';}
    start();
  };
  if(still()){finish();return;}
  start();
})();`;

  return {
    path: '/lab/splash-1/',
    title: 'Splash 1: Through the clouds | Elevated Dreams redesign',
    desc: 'Splash option 1: the page opens inside warm golden-hour clouds; the Elevated Dreams wordmark rises through them and the clouds part onto the storefront.',
    bodyClass: 'is-lab is-home',
    preload: `<link rel="preload" as="image" href="${plate}" fetchpriority="high"><link rel="preload" as="image" imagesrcset="${srcset('hero-golden-b')}" imagesizes="${heroSizes}" media="(min-width: 761px)"><link rel="preload" as="image" imagesrcset="${srcset('hero-golden-tall')}" imagesizes="100vw" media="(max-width: 760px)">`,
    body,
    inlineCss,
    inlineJs,
    replay: true,
  };
}
