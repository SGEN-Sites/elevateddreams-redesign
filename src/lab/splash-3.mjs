// lab/splash-3.mjs: Splash 3, "Wake into the dream".
// A fixed overlay (z 250) starts dark: two soft, feathered eyelids part a little, close, then open fully past the screen
// edges. Through the opening the golden storefront is blurred and over-bright, then sharpens into focus while the
// ELEVATED / DREAMS wordmark condenses out of the blur and fades as the lids clear the screen. It ends on the hero
// underneath (the overlay's photo is laid exactly over the hero photo, so the hand-off has no jump). 1.8 s in total;
// any key, click, touch or wheel skips it. Shown only from JS (html.js), never under reduced motion.
// window.labReplay() replays it. The hero below is this page's own: hero-golden-b full-bleed, copy on a glass plate.
//
// Eyelid geometry (all in % of the overlay, so mobile URL bars cannot open a gap): each lid is dark OUTSIDE a large
// ellipse (rx 90vw, ry 75% of the height). The top lid's ellipse sits below the screen, the bottom lid's above it, so
// the view is open only where the two ellipses overlap: a true almond that widens as the lids move apart. Each lid box
// is 84% tall so its own edge always falls inside its ellipse's clear core (no hard lines at any opening).
import { asset, img, btn, shopBtn, icon, esc, statusLine, IMG } from '../lib/html.mjs';
import { store, home } from '../content/site.mjs';
import { dealsGrid } from '../lib/sections.mjs';

export default function () {
  const tall = IMG['hero-golden-tall'].variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');
  const picture = (cls) => `<picture class="${cls}"><source media="(max-width: 760px)" srcset="${tall}" sizes="100vw">${img('hero-golden-b', { alt: '', sizes: '100vw', eager: true })}</picture>`;
  const fogS = asset('img/fog-sodium.svg'), fogW = asset('img/fog-silver.svg');

  const body = `<div class="sp3" data-sp3 aria-hidden="true">
  <div class="sp3-scene"><div class="sp3-shot">${picture('sp3-pic')}</div></div>
  <div class="sp3-word"><span class="sp3-word__a">ELEVATED</span><i class="sp3-word__cast"></i><span class="sp3-word__b">DREAMS</span></div>
  <div class="sp3-lid sp3-lid--top"></div>
  <div class="sp3-lid sp3-lid--bot"></div>
  <div class="sp3-warm"></div>
</div>
<section class="sp3-hero" data-sp3-hero data-hero aria-labelledby="sp3-h1">
  <div class="sp3-hero__media" aria-hidden="true">${picture('sp3-pic')}</div>
  <div class="sp3-hero__shade" aria-hidden="true"></div>
  <div class="sp3-hero__fog" aria-hidden="true"><i></i><i></i></div>
  <div class="sp3-hero__in">
    <div class="sp3-plate">
      <p class="sp3-kicker">${esc(home.heroKicker)}</p>
      <h1 class="sp3-h1" id="sp3-h1">Dreams take work. <em>Welcome in.</em></h1>
      <p class="sp3-lede">${esc(home.heroLede)}</p>
      <div class="sp3-cta">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
      <p class="sp3-meta"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
    </div>
  </div>
</section>
<section class="band band--deals"><div class="band__in">${dealsGrid()}</div></section>`;

  const inlineCss = `
.sp3{--sp3-dark:#07050a;position:fixed;inset:0;z-index:250;display:none;overflow:hidden;background:var(--sp3-dark);contain:strict}
html.js .sp3{display:block;animation:sp3-failsafe .01s linear 4s forwards}
html.js .sp3.is-run{animation:none}
html.rm .sp3{display:none!important}
@keyframes sp3-failsafe{to{visibility:hidden;opacity:0}}
.sp3-scene{--sp3-band:#7a6f78;position:absolute;inset:0;overflow:hidden;transform-origin:50% 50%;background:linear-gradient(180deg,#3b3343 0,var(--sp3-band) var(--sp3-top,12%),#a97c4d 100%);will-change:transform,filter}
.sp3-shot{position:absolute;inset:0}
.sp3-shot::after{content:"";position:absolute;left:0;right:0;top:-1px;height:14%;background:linear-gradient(180deg,var(--sp3-band),transparent)}
.sp3-pic,.sp3-pic img{display:block;width:100%;height:100%;max-width:none}
.sp3-pic img{object-fit:cover;object-position:62% 50%}
.sp3-word{position:absolute;inset:0 0 20% 0;display:grid;place-content:center;justify-items:center;font-family:var(--f-display);line-height:.84;opacity:0;pointer-events:none;will-change:transform,filter,opacity}
.sp3-word::before{content:"";position:absolute;left:50%;top:50%;z-index:-1;width:min(110vw,1200px);height:min(70vh,560px);transform:translate(-50%,-50%);background:radial-gradient(closest-side,rgba(18,11,28,.42),rgba(18,11,28,.14) 60%,transparent)}
.sp3-word span{font-size:min(14vw,12vh,8rem);letter-spacing:.01em;white-space:nowrap;color:#fff;text-shadow:0 2px 0 rgba(26,20,36,.22),0 10px 40px rgba(26,20,36,.45),0 0 60px rgba(169,155,240,.6)}
.sp3-word .sp3-word__b{color:#F1ECF8;text-shadow:0 2px 0 rgba(26,20,36,.22),0 10px 40px rgba(26,20,36,.45),0 0 70px rgba(123,106,196,.8)}
.sp3-word__cast{display:block;width:62%;height:clamp(7px,1.1vw,15px);margin:clamp(6px,1vw,14px) 0 clamp(4px,.55vw,8px);border-radius:50%;background:radial-gradient(closest-side,rgba(12,7,18,.75) 45%,rgba(12,7,18,0))}
.sp3-lid{position:absolute;left:-10vw;width:120vw;height:84%;will-change:transform}
.sp3-lid--top{top:0;background:radial-gradient(75% 89.29% at 50% 151.19%,transparent 84%,rgba(7,5,10,.55) 93%,var(--sp3-dark) 100%)}
.sp3-lid--bot{bottom:0;background:radial-gradient(75% 89.29% at 50% -51.19%,transparent 84%,rgba(7,5,10,.55) 93%,var(--sp3-dark) 100%)}
@media (orientation:portrait){
  .sp3-lid{height:66%}
  .sp3-lid--top{background:radial-gradient(100% 60.61% at 50% 139.39%,transparent 84%,rgba(7,5,10,.55) 93%,var(--sp3-dark) 100%)}
  .sp3-lid--bot{background:radial-gradient(100% 60.61% at 50% -39.39%,transparent 84%,rgba(7,5,10,.55) 93%,var(--sp3-dark) 100%)}
}
.sp3-warm{position:absolute;inset:0;opacity:0;mix-blend-mode:screen;pointer-events:none;background:radial-gradient(60% 46% at 50% 50%,rgba(255,122,74,.26),rgba(140,40,64,.1) 58%,transparent 82%)}
.sp3-hero{position:relative;isolation:isolate;overflow:clip;margin-top:calc(-1*var(--hdr-h));min-height:max(600px,calc(100svh - var(--top-h) - var(--tick-h) - var(--sp3-lab,0px)));padding:calc(var(--hdr-h) + 24px) 0 clamp(40px,7vh,80px);display:grid;align-items:center}
.sp3-hero__media{position:absolute;inset:0;z-index:-3;background:#2a1d33}
.sp3-hero__shade{position:absolute;inset:0;z-index:-2;pointer-events:none;background:linear-gradient(90deg,rgba(16,11,23,.62) 0%,rgba(16,11,23,.34) 30%,rgba(16,11,23,0) 56%),linear-gradient(180deg,rgba(12,8,18,.52) 0%,rgba(12,8,18,0) 22%,rgba(12,8,18,0) 74%,rgba(26,20,36,.94) 100%)}
.sp3-hero__fog{position:absolute;left:0;right:0;bottom:0;height:40%;z-index:-1;overflow:hidden;pointer-events:none;mix-blend-mode:screen;-webkit-mask-image:linear-gradient(180deg,transparent,#000 50%,#000 80%,transparent);mask-image:linear-gradient(180deg,transparent,#000 50%,#000 80%,transparent)}
.sp3-hero__fog i{position:absolute;top:0;bottom:0;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;animation:sp3-drift 110s linear infinite;will-change:transform}
.sp3-hero__fog i:first-child{background-image:url(${fogS});opacity:.42}
.sp3-hero__fog i+i{top:30%;background-image:url(${fogW});opacity:.36;animation-duration:74s;animation-direction:reverse}
@keyframes sp3-drift{to{transform:translate3d(-1200px,0,0)}}
.sp3-hero.is-off .sp3-hero__fog i{animation-play-state:paused}
.sp3-hero__in{position:relative;width:100%;max-width:var(--max);margin:0 auto;padding:0 var(--gutter)}
.sp3-plate{position:relative;max-width:560px;padding:clamp(28px,2.6vw,40px) clamp(28px,2.8vw,42px);border-radius:30px;background:linear-gradient(160deg,rgba(34,25,48,.74),rgba(13,9,19,.8));-webkit-backdrop-filter:blur(20px) saturate(145%);backdrop-filter:blur(20px) saturate(145%);box-shadow:inset 0 0 0 1px rgba(241,236,248,.14),inset 0 1px 0 rgba(255,255,255,.1),0 50px 100px -40px rgba(0,0,0,.9)}
.sp3-kicker{display:flex;align-items:center;gap:.75em;margin:0 0 18px;font:700 .84rem/1.35 var(--f-ui);letter-spacing:.22em;text-transform:uppercase;color:var(--violet-hi);text-wrap:balance}
.sp3-h1{margin:0 0 16px;font-family:var(--f-display);font-size:clamp(1.9rem,2.65vw,2.6rem);line-height:1;letter-spacing:.005em;color:#fff;text-wrap:balance}
.sp3-h1 em{display:block;margin-top:.06em;font-style:normal;color:var(--violet-hi);text-shadow:0 0 30px rgba(123,106,196,.6)}
.sp3-lede{max-width:44ch;margin:0 0 24px;font-size:clamp(1.02rem,1.12vw,1.12rem);line-height:1.6;color:var(--text-2)}
.sp3-cta{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 20px}
.sp3-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 22px;margin:0;font:600 1rem/1.3 var(--f-ui);letter-spacing:.06em}
.sp3-meta a{display:inline-flex;align-items:center;gap:.45em;color:var(--text);text-decoration:none}
.sp3-meta a:hover{color:var(--violet-hi)}
.sp3-meta .ic{width:1.05em;height:1.05em}
.sp3-hero.is-woken .sp3-plate{animation:sp3-rise 1.1s var(--ease) both}
@keyframes sp3-rise{from{opacity:0;transform:translate3d(0,28px,0)}}
@media (max-width:760px){
  .sp3-scene{--sp3-band:#3f3a67;background:linear-gradient(180deg,#221e3a 0,var(--sp3-band) var(--sp3-top,16%),#9f7569 100%)}
  .sp3-hero{display:block;min-height:0;padding:104vw 0 34px}
  .sp3-hero__media,.sp3-hero__shade{bottom:auto;height:auto;aspect-ratio:1080/1935}
  .sp3-hero__shade{background:linear-gradient(180deg,rgba(12,8,18,.5) 0%,rgba(12,8,18,0) 17%,rgba(12,8,18,0) 52%,rgba(26,20,36,.55) 70%,var(--ink) 100%)}
  .sp3-hero__fog{bottom:auto;top:100vw;height:80vw}
  .sp3-plate{padding:22px 18px 20px;border-radius:24px}
  .sp3-kicker{margin-bottom:12px;font-size:.74rem;letter-spacing:.17em;text-wrap:balance}
  .sp3-h1{margin-bottom:12px;font-size:min(6.8vw,2.3rem)}
  .sp3-lede{margin-bottom:18px;font-size:1rem;line-height:1.55}
  .sp3-cta{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:16px}
  .sp3-meta{gap:6px 18px;font-size:.95rem}
}
@media (prefers-reduced-motion:reduce){.sp3-hero__fog i{animation:none}.sp3-hero.is-woken .sp3-plate{animation:none}}`;

  // One IIFE; the only global is window.labReplay. Timeline (D = 1800 ms): 0-90 dark with warm light through the lids;
  // 90-360 lids part a little; 360-612 they close; 612-1440 they open past the edges; the photo sharpens 612-1296;
  // the wordmark focuses by 1044, fades 1188-1512; the overlay fades 1476-1800 and removes itself.
  const inlineJs = `(function(){
var d=document,W=window,hero=d.querySelector('[data-sp3-hero]'),lab=d.querySelector('.labbar');
function fit(){if(hero&&lab)hero.style.setProperty('--sp3-lab',lab.offsetHeight+'px');}
fit();W.addEventListener('resize',fit);
if(hero&&'IntersectionObserver' in W)new IntersectionObserver(function(en){hero.classList.toggle('is-off',!en[0].isIntersecting);}).observe(hero);
var first=d.querySelector('[data-sp3]'),RM=!!(W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches);
var proto=first?first.cloneNode(true):null,live=null,EV=['keydown','pointerdown','mousedown','touchstart','wheel'];
var now=function(){return W.performance&&performance.now?performance.now():Date.now();};
function listen(on,fn){for(var i=0;i<EV.length;i++){if(on)W.addEventListener(EV[i],fn,{capture:true,passive:true});else W.removeEventListener(EV[i],fn,{capture:true});}}
function end(run,fade){if(!run||run.done)return;run.done=true;listen(false,run.skip);W.clearTimeout(run.wake);W.clearTimeout(run.kill);
  if(hero)hero.classList.add('is-woken');var el=run.el;
  var gone=function(){if(el.parentNode)el.parentNode.removeChild(el);if(live===run)live=null;};
  if(!fade){gone();return;}
  el.style.pointerEvents='none';var op=parseFloat(W.getComputedStyle(el).opacity);if(!(op>=0))op=1;
  for(var i=0;i<run.anims.length;i++){try{run.anims[i].pause();}catch(x){}}
  var a=el.animate([{opacity:op},{opacity:0}],{duration:220,easing:'cubic-bezier(.3,0,.2,1)',fill:'forwards'});a.onfinish=gone;
  run.kill=W.setTimeout(gone,600);}
function play(el){var q=function(s){return el.querySelector(s);},scene=q('.sp3-scene'),shot=q('.sp3-shot'),word=q('.sp3-word'),top=q('.sp3-lid--top'),bot=q('.sp3-lid--bot'),warm=q('.sp3-warm');
  el.classList.add('is-run');
  var media=hero&&hero.querySelector('.sp3-hero__media');
  if(media){var r=media.getBoundingClientRect();shot.style.inset='auto';shot.style.top=r.top+'px';shot.style.left=r.left+'px';shot.style.width=r.width+'px';shot.style.height=r.height+'px';scene.style.setProperty('--sp3-top',Math.max(0,r.top)+'px');}
  if(hero)hero.classList.remove('is-woken');
  var D=1800,o={duration:D,fill:'both'},
    lid=function(s){var p=function(v){return 'translate3d(0,'+(s*v)+'%,0)';};return [
      {transform:p(0),offset:0},
      {transform:p(0),offset:.05,easing:'cubic-bezier(.3,0,.25,1)'},
      {transform:p(12),offset:.2,easing:'cubic-bezier(.55,0,.45,1)'},
      {transform:p(0),offset:.32},
      {transform:p(0),offset:.34,easing:'cubic-bezier(.45,.05,.25,1)'},
      {transform:p(110),offset:.8},
      {transform:p(110),offset:1}];};
  var run={el:el,done:false,t:now()};
  run.anims=[top.animate(lid(-1),o),bot.animate(lid(1),o),
    scene.animate([
      {filter:'blur(22px) brightness(1.85) saturate(1.3)',transform:'scale(1.12)',offset:0},
      {filter:'blur(22px) brightness(1.8) saturate(1.3)',transform:'scale(1.1)',offset:.34,easing:'cubic-bezier(.25,.6,.2,1)'},
      {filter:'blur(0px) brightness(1) saturate(1)',transform:'scale(1)',offset:.72},
      {filter:'blur(0px) brightness(1) saturate(1)',transform:'scale(1)',offset:1}],o),
    word.animate([
      {opacity:0,filter:'blur(18px)',transform:'translate3d(0,0,0) scale(1.08)',offset:0},
      {opacity:.7,filter:'blur(16px)',transform:'translate3d(0,0,0) scale(1.07)',offset:.2},
      {opacity:.7,filter:'blur(14px)',transform:'translate3d(0,0,0) scale(1.06)',offset:.34,easing:'cubic-bezier(.25,.6,.2,1)'},
      {opacity:1,filter:'blur(0px)',transform:'translate3d(0,0,0) scale(1)',offset:.58},
      {opacity:1,filter:'blur(0px)',transform:'translate3d(0,0,0) scale(1)',offset:.66,easing:'cubic-bezier(.5,0,.75,0)'},
      {opacity:0,filter:'blur(3px)',transform:'translate3d(0,-2vh,0) scale(1.01)',offset:.84},
      {opacity:0,filter:'blur(3px)',transform:'translate3d(0,-2vh,0) scale(1.01)',offset:1}],o),
    warm.animate([{opacity:0,offset:0},{opacity:.9,offset:.05},{opacity:.45,offset:.2},{opacity:.3,offset:.32},{opacity:0,offset:.46},{opacity:0,offset:1}],o),
    el.animate([{opacity:1,offset:0},{opacity:1,offset:.82,easing:'cubic-bezier(.3,0,.2,1)'},{opacity:0,offset:1}],o)];
  run.skip=function(){if(now()-run.t>120)end(run,true);};
  listen(true,run.skip);
  run.wake=W.setTimeout(function(){if(hero)hero.classList.add('is-woken');},D*.74);
  run.kill=W.setTimeout(function(){end(run,false);},D+40);
  live=run;}
W.labReplay=function(){if(RM||!proto||!proto.animate)return;if(live)end(live,false);
  try{W.scrollTo({top:0,left:0,behavior:'instant'});}catch(x){W.scrollTo(0,0);}
  var el=proto.cloneNode(true),at=hero||d.body.firstChild;at.parentNode.insertBefore(el,at);play(el);};
if(!first)return;
if(RM||!first.animate){first.parentNode.removeChild(first);return;}
play(first);
})();`;

  return {
    path: '/lab/splash-3/',
    title: 'Splash 3: Wake into the dream | Elevated Dreams redesign',
    desc: 'Design option: a slow blink opens onto the golden-hour storefront and the wordmark comes into focus.',
    bodyClass: 'is-lab is-home',
    body,
    inlineCss,
    inlineJs,
    replay: true,
  };
}
