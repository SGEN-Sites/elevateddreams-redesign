// hero-a.mjs: the home hero, "Levitate" (round 3 pick; built as lab option A). The real storefront, cut out of the golden-hour edit, floats in front of the
// brand words over a sea of clouds. Five depths: sky plate, words, building, a front cloud bank (a masked copy of the
// same plate, so real clouds cover the cut-out's ragged base) and drifting haze. Fine pointers tilt the depths with
// the cursor; scrolling lifts the building off the clouds while the clouds sink and thicken and the words part.
// Every art layer is placed in CSS from container units, so the static page (no JS, reduced motion) is the same scene.
import { asset, img, btn, shopBtn, icon, esc, statusLine, IMG } from './html.mjs';
import { store, home } from '../content/site.mjs';

const RATIO = 2752 / 1536; // the golden-b frame the cut-out box was measured in (2400x1340 renders the same ratio)
const srcset = (id) => IMG[id].variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');

export function heroA() {
  const b = IMG['hero-building-b-box'];
  const pc = (v) => `${(v * 100).toFixed(3)}%`;
  const plateSizes = '(max-width: 760px) 210vw, 106vw';
  const bldSizes = '(max-width: 760px) 106vw, 54vw';

  const body = `
<section class="hxa" data-hero data-hxa aria-labelledby="hxa-h1">
  <div class="hxa-stage" aria-hidden="true">
    <div class="hxa-f hxa-sky">${img('hero-plate-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxa-plate' })}${img('hero-plate-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxa-plate hxa-under' })}</div>
    <div class="hxa-skygrade"></div>
    <div class="hxa-words"><p class="hxa-wbox"><span class="hxa-w hxa-w1"><span class="hxa-wi">ELEVATED</span></span><span class="hxa-w hxa-w2"><span class="hxa-wi">DREAMS</span></span></p></div>
    <div class="hxa-f hxa-bld"><div class="hxa-bob"><div class="hxa-lift"><span class="hxa-back">${img('hero-golden-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxa-backimg' })}</span>${img('hero-building-b', { alt: '', sizes: bldSizes, eager: true, cls: 'hxa-bimg' })}</div></div></div>
    <div class="hxa-f hxa-bank">${img('hero-plate-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxa-plate' })}</div>
    <div class="hxa-fog"><i></i><i></i><i></i><b class="hxa-haze"></b></div>
    <div class="hxa-grade"></div>
  </div>
  <div class="hxa-in">
    <div class="hxa-copy">
      <p class="hxa-kicker">${esc(home.heroKicker)}</p>
      <h1 class="hxa-h1" id="hxa-h1">Dreams take work. <em>Welcome in.</em></h1>
      <p class="hxa-lede">${esc(home.heroLede)}</p>
      <div class="hxa-cta">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
      <p class="hxa-meta"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
    </div>
  </div>
</section>`;

  const inlineCss = `
/* ===================== HERO A: Levitate (all rules scoped to .hxa) ===================== */
.hxa{--hxa-pad:max(var(--gutter),calc((100cqw - 1360px)/2 + var(--gutter)));--hxa-cw:min(540px,calc(41.5cqw - var(--hxa-pad) - 30px));position:relative;isolation:isolate;overflow:clip;container-type:inline-size;margin-top:calc(-1*var(--hdr-h));min-height:max(600px,calc(100svh - var(--top-h) - var(--tick-h)));display:grid;align-items:center;padding:calc(var(--hdr-h) + 28px) 0 clamp(76px,11vh,128px);background:linear-gradient(180deg,#76697f 0%,#a48d99 30%,rgba(58,44,68,0) 70%)}
/* the art dissolves at the bottom into the page's own sky, so the hand-off into the next band has no seam */
/* frame geometry, resolved against the stage (a size container) wherever it is used:
   --fw width, --fl left, --ft top of the golden-b frame; --wf the brand words' size */
.hxa-stage{--fw:max(103cqw,184.5cqh);--fl:calc((100cqw - var(--fw))*.415);--ft:calc((100cqh - var(--fw)/${RATIO.toFixed(4)})*.12);--wf:min(calc(var(--fw)*.081),calc((58.5cqw - var(--gutter))/6.25));position:absolute;inset:0;z-index:0;container-type:size;overflow:clip;pointer-events:none;-webkit-mask-image:linear-gradient(180deg,#000 calc(100% - 120px),transparent);mask-image:linear-gradient(180deg,#000 calc(100% - 120px),transparent)}
/* the golden-b frame: covers the hero, its left 41.5% anchored so the building's left edge always sits at 41.5% of the hero */
.hxa-f{position:absolute;left:var(--fl);top:var(--ft);width:var(--fw);aspect-ratio:2752/1536;will-change:transform}
.hxa-plate{position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;object-fit:cover}
.hxa-under{display:none}
/* the cinematic grade sits UNDER the words and the building (neither is dimmed): header scrim + a plum pool behind the copy */
.hxa-skygrade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(16,11,24,.58) 0,rgba(16,11,24,.22) calc(var(--hdr-h) + 20px),rgba(16,11,24,0) calc(var(--hdr-h) + 90px)),radial-gradient(44% 60% at 22% 58%,rgba(18,12,28,.62),rgba(18,12,28,0) 100%),linear-gradient(90deg,rgba(17,11,25,.7) 0%,rgba(17,11,25,.62) 25%,rgba(17,11,25,.56) 37%,rgba(17,11,25,.32) 45%,rgba(17,11,25,.1) 51%,rgba(17,11,25,0) 56%)}
/* the brand words, behind the building: DREAMS sits on the roof line; right-aligned to the frame, but never past the
   hero's gutter and never wider than the space right of the copy (narrow landscape screens crop the frame) */
.hxa-words{position:absolute;inset:0;will-change:transform}
.hxa-wbox{position:absolute;top:max(calc(var(--ft) + var(--fw)*.2071 - 1.55*var(--wf)),calc(var(--hdr-h) + 5.5cqh));right:max(calc(100cqw - var(--fl) - var(--fw)*.934),var(--gutter));margin:0;font:400 calc(var(--wf)*.94)/.9 var(--f-display);text-align:left;white-space:nowrap}
.hxa-w{display:block;will-change:transform}
.hxa-wi{display:block;color:#fff;letter-spacing:.004em;text-shadow:0 2px 0 rgba(26,20,36,.16),0 16px 44px rgba(26,20,36,.42),0 0 54px rgba(169,155,240,.62)}
.hxa-w2 .hxa-wi{color:#F3EEFF;text-shadow:0 2px 0 rgba(26,20,36,.16),0 16px 44px rgba(26,20,36,.42),0 0 64px rgba(123,106,196,.72)}
/* the building: exactly where it sits in the golden-b frame; its ragged base fades out under the cloud bank */
.hxa-bob{position:absolute;left:${pc(b.x)};top:${pc(b.y)};width:${pc(b.w)};height:${pc(b.h)}}
.hxa-lift{position:absolute;inset:0;-webkit-mask-image:linear-gradient(180deg,#000 74%,rgba(0,0,0,.55) 86%,transparent 97%);mask-image:linear-gradient(180deg,#000 74%,rgba(0,0,0,.55) 86%,transparent 97%)}
.hxa-bimg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}
/* the AI cut-out has alpha holes (under and beside the sign, between the windows); the original edit's own pixels,
   clipped inside the walls and moving with the building, fill them so the sky never shows through the brick */
.hxa-back{position:absolute;inset:0;overflow:hidden;clip-path:polygon(11.2% 36%,93.6% 17%,93.6% 66%,72% 72%,70% 93%,11.2% 93%)}
.hxa-backimg{position:absolute;max-width:none;width:${pc(1 / b.w)};height:${pc(1 / b.h)};left:${pc(-b.x / b.w)};top:${pc(-b.y / b.h)}}
/* front cloud bank: the same plate, only on the building's side, below a cloud line that climbs to the right like
   the original edit: (right-side mask) AND (base line OR a raised bank at the right) */
.hxa-bank{-webkit-mask-image:linear-gradient(90deg,transparent 36%,#000 44%),radial-gradient(26% 21% at 91% 79%,#000 35%,rgba(0,0,0,.55) 62%,transparent 100%),linear-gradient(180deg,transparent 69%,rgba(0,0,0,.7) 76%,#000 82%);-webkit-mask-composite:source-in,source-over,source-over;mask-image:linear-gradient(90deg,transparent 36%,#000 44%),radial-gradient(26% 21% at 91% 79%,#000 35%,rgba(0,0,0,.55) 62%,transparent 100%),linear-gradient(180deg,transparent 69%,rgba(0,0,0,.7) 76%,#000 82%);mask-composite:intersect,add,add}
/* drifting haze in front of everything: one tile wider than its box, sliding exactly one tile */
.hxa-fog{position:absolute;left:-24px;right:-24px;bottom:-12px;height:56%;mix-blend-mode:screen;will-change:transform,opacity;-webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,.18) 18%,#000 52%),linear-gradient(180deg,transparent,#000 42%);-webkit-mask-composite:source-in,source-over;mask-image:linear-gradient(90deg,rgba(0,0,0,.18) 18%,#000 52%),linear-gradient(180deg,transparent,#000 42%);mask-composite:intersect,add}
.hxa-fog i{position:absolute;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;will-change:transform;-webkit-mask-image:linear-gradient(180deg,transparent,#000 38%,#000 72%,transparent);mask-image:linear-gradient(180deg,transparent,#000 38%,#000 72%,transparent)}
.hxa-fog i:nth-child(1){bottom:0;height:78%;background-image:url(${asset('img/fog-sodium.svg')});opacity:.62}
.hxa-fog i:nth-child(2){bottom:14%;height:58%;background-image:url(${asset('img/fog-silver.svg')});opacity:.5}
.hxa-fog i:nth-child(3){bottom:-8%;height:62%;background-image:url(${asset('img/fog-silver.svg')});background-size:1200px 130%;opacity:.42}
.hxa-haze{position:absolute;inset:0;opacity:0;background:radial-gradient(70% 70% at 62% 100%,rgba(255,236,206,.75),rgba(255,214,170,.3) 45%,transparent 75%)}
/* front grade: the hand-off into the page (above every layer, so nothing shows an edge) */
.hxa-grade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(22,16,30,.92) 0%,rgba(22,16,30,.66) 9%,rgba(22,16,30,0) 26%)}
/* copy */
.hxa-in{position:relative;z-index:2;width:100%;padding:0 var(--hxa-pad)}
.hxa-copy{max-width:var(--hxa-cw);text-shadow:0 2px 20px rgba(10,7,14,.5)}
.hxa-kicker{display:flex;align-items:center;gap:.8em;margin:0 0 18px;font:700 .86rem/1.3 var(--f-ui);letter-spacing:.24em;text-transform:uppercase;color:var(--text-2)}
.hxa-h1{margin:0 0 18px;font-family:var(--f-display);font-size:min(2.75rem,calc(var(--hxa-cw)/12.1));line-height:1.04;letter-spacing:.004em;color:var(--text);text-wrap:balance}
.hxa-h1 em{display:block;font-style:normal;color:var(--violet-hi);text-shadow:0 0 30px rgba(123,106,196,.7),0 2px 18px rgba(10,7,14,.5)}
.hxa-lede{max-width:44ch;margin:0;font-size:clamp(1.02rem,1.25vw,1.14rem);line-height:1.62;color:var(--text);text-wrap:pretty}
.hxa-cta{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0 20px;text-shadow:none}
.hxa-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px;margin:0;font:600 1rem var(--f-ui);letter-spacing:.06em}
.hxa-meta a{display:inline-flex;gap:.45em;align-items:center;color:var(--text);text-decoration:none;border-radius:6px}
.hxa-meta a:hover{color:var(--violet-hi)}
.hxa-meta .ic{width:1.1em;height:1.1em}
.hxa-meta .status{color:var(--text)}
.hxa :focus-visible{outline:2px solid var(--violet-neon);outline-offset:4px}

/* motion: only with JS and without a reduced-motion preference; paused while the hero is off screen */
@media (prefers-reduced-motion: no-preference){
  html.js:not(.rm) .hxa-lift{animation:hxa-rise 1.7s var(--ease) .05s both}
  html.js:not(.rm) .hxa-wi{animation:hxa-wordin 1.25s var(--ease) .15s both}
  html.js:not(.rm) .hxa-w2 .hxa-wi{animation-delay:.32s}
  html.js:not(.rm) .hxa-copy{animation:hxa-copyin .95s var(--ease) .2s both}
  html.js:not(.rm) .hxa-bob{animation:hxa-bob 6.5s var(--ease-io) 1.6s infinite alternate}
  html.js:not(.rm) .hxa-fog i{animation:hxa-drift 110s linear infinite}
  html.js:not(.rm) .hxa-fog i:nth-child(2){animation-duration:74s;animation-direction:reverse}
  html.js:not(.rm) .hxa-fog i:nth-child(3){animation-duration:150s}
  html.js:not(.rm) .hxa.hxa-off .hxa-bob,html.js:not(.rm) .hxa.hxa-off .hxa-fog i{animation-play-state:paused}
}
@keyframes hxa-rise{from{transform:translate3d(0,12%,0);opacity:0}35%{opacity:1}to{transform:none;opacity:1}}
@keyframes hxa-wordin{from{transform:translate3d(0,.3em,0);opacity:0;filter:blur(10px)}to{transform:none;opacity:1;filter:none}}
@keyframes hxa-copyin{from{transform:translate3d(0,16px,0);opacity:0}to{transform:none;opacity:1}}
@keyframes hxa-bob{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-1.7%,0)}}
@keyframes hxa-drift{to{transform:translate3d(-1200px,0,0)}}

/* ---------- stacked: phones and portrait screens. The art sits on top, the copy flows below it ---------- */
@media (max-width: 760px), (max-aspect-ratio: 11/10){
  /* --hxa-art: art height above the copy; --hxa-fwq: frame width; --hxa-bt: building top below the header */
  .hxa{--hxa-art:84cqw;--hxa-fwq:207cqw;--hxa-bt:21cqw;--hxa-cw:calc(100cqw - 2*var(--hxa-pad));align-items:start;padding:calc(var(--hdr-h) + var(--hxa-art)) 0 34px}
  .hxa-stage{--fw:var(--hxa-fwq);--fl:calc(50cqw - var(--fw)*.666);--ft:calc(var(--hdr-h) + var(--hxa-bt) - var(--fw)*.1697);--wf:calc(var(--fw)*.0655)}
  .hxa-under{display:block;top:100%;transform:scaleY(-1)}
  .hxa-wbox{right:auto;left:calc(var(--fl) + var(--fw)*.666);top:calc(var(--ft) + var(--fw)*.086);transform:translateX(-50%);text-align:left;line-height:.88}
  .hxa-skygrade{background:linear-gradient(180deg,rgba(16,11,24,.55) 0,rgba(16,11,24,0) calc(var(--hdr-h) + 40px))}
  .hxa-grade{background:linear-gradient(180deg,rgba(18,13,25,0) 0%,rgba(18,13,25,0) calc(var(--hdr-h) + var(--hxa-art) - 84px),rgba(18,13,25,.5) calc(var(--hdr-h) + var(--hxa-art) - 34px),rgba(18,13,25,.8) calc(var(--hdr-h) + var(--hxa-art) - 4px),rgba(18,13,25,.86) calc(var(--hdr-h) + var(--hxa-art) + 120px),rgba(18,13,25,.92) 100%)}
  .hxa-fog{height:calc(var(--hdr-h) + var(--hxa-art) + 40px);bottom:auto;top:0;-webkit-mask-image:linear-gradient(180deg,transparent 52%,#000 74%,transparent);mask-image:linear-gradient(180deg,transparent 52%,#000 74%,transparent)}
}
@media (min-width: 761px) and (max-aspect-ratio: 11/10){
  .hxa{--hxa-art:62cqw;--hxa-fwq:165cqw;--hxa-bt:15cqw;--hxa-cw:min(640px,calc(100cqw - 2*var(--hxa-pad)))}
}
/* short phones: a smaller building so the buttons still reach the first screen */
@media (max-width: 760px) and (max-height: 700px){
  .hxa{--hxa-art:70cqw;--hxa-fwq:180cqw;--hxa-bt:17cqw}
}
@media (max-width: 760px){
  .hxa-kicker{font-size:.74rem;letter-spacing:.16em;gap:.6em;margin-bottom:12px}
  .hxa-h1{font-size:min(2.05rem,calc(var(--hxa-cw)/12.05));margin-bottom:12px}
  .hxa-lede{font-size:.98rem;line-height:1.52}
  .hxa-cta{gap:10px;margin:18px 0 14px}
  .hxa-cta .btn{--h:50px;flex:1 1 auto;padding:0 .9em;font-size:.95rem;letter-spacing:.06em}
  .hxa-meta{gap:6px 18px;font-size:.95rem}
}
@media (max-width: 380px){ .hxa-cta .btn .ic{display:none} }`;

  const inlineJs = `(function(){
  var hero=document.querySelector('[data-hxa]');if(!hero)return;
  var W=window,root=document.documentElement;
  if(W.matchMedia('(prefers-reduced-motion: reduce)').matches||root.classList.contains('rm'))return;
  var FINE=W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var q=function(s){return hero.querySelector(s);};
  var L={sky:q('.hxa-sky'),words:q('.hxa-words'),bld:q('.hxa-bld'),bank:q('.hxa-bank'),fog:q('.hxa-fog')};
  var w1=q('.hxa-w1'),w2=q('.hxa-w2'),haze=q('.hxa-haze');
  /* depth per layer: [cursor x px, cursor y px, scroll factor]; negative scroll factor = rises faster than the page */
  var D={sky:[5,3,.18],words:[9,5,.12],bld:[14,8,-.2],bank:[18,10,.1],fog:[22,12,.05]};
  var tx=0,ty=0,cx=0,cy=0,raf=0,inView=true,H=hero.offsetHeight||1;
  function tf(el,x,y){if(el)el.style.transform='translate3d('+x.toFixed(2)+'px,'+y.toFixed(2)+'px,0)';}
  function frame(){
    raf=0;cx+=(tx-cx)*.075;cy+=(ty-cy)*.075;
    var s=Math.max(0,Math.min(W.scrollY||0,H)),p=s/H;
    for(var k in D)tf(L[k],-cx*D[k][0],-cy*D[k][1]+s*D[k][2]);
    tf(w1,0,-s*.05);tf(w2,0,s*.05);
    if(L.fog)L.fog.style.opacity=(.8+p*.2).toFixed(3);
    if(haze)haze.style.opacity=Math.min(1,p*1.6).toFixed(3);
    if(Math.abs(tx-cx)>.002||Math.abs(ty-cy)>.002)raf=W.requestAnimationFrame(frame);
  }
  function kick(){if(!raf&&inView)raf=W.requestAnimationFrame(frame);}
  W.addEventListener('scroll',kick,{passive:true});
  W.addEventListener('resize',function(){H=hero.offsetHeight||1;kick();},{passive:true});
  if(FINE){
    W.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;tx=e.clientX/W.innerWidth*2-1;ty=e.clientY/W.innerHeight*2-1;kick();},{passive:true});
    document.addEventListener('mouseleave',function(){tx=0;ty=0;kick();});
  }
  if('IntersectionObserver' in W)new IntersectionObserver(function(en){inView=en[0].isIntersecting;hero.classList.toggle('hxa-off',!inView);if(inView)kick();}).observe(hero);
  kick();
})();`;

  return { section: body, css: inlineCss, js: inlineJs, preload: `<link rel="preload" as="image" imagesrcset="${srcset('hero-plate-b')}" imagesizes="${plateSizes}" fetchpriority="high"><link rel="preload" as="image" imagesrcset="${srcset('hero-building-b')}" imagesizes="${bldSizes}">` };
}
