// lab/hero-c.mjs: Hero C, "Golden hour to after dark".
// The copy sits on a glass plate on the left; the real storefront fills a framed scene that runs off the right edge.
// A feathered terminator follows the cursor (or a drag on touch, or slow time when idle) and sweeps the light from
// golden hour (hero-golden-b) to after dark (hero-night-b). Fog inside the frame is warm by day and violet by night,
// and the hero's own glow, stars and plate rim warm or cool with the scene. No JS / reduced motion: a still diptych.
import { asset, img, btn, shopBtn, icon, esc, statusLine } from '../lib/html.mjs';
import { store, home } from '../content/site.mjs';
import { dealsGrid } from '../lib/sections.mjs';

export default function () {
  const fogS = asset('img/fog-sodium.svg'), fogW = asset('img/fog-silver.svg'), fogV = asset('img/fog-violet.svg');
  const sizes = '(max-width: 1023px) 100vw, 62vw';
  const day = img('hero-golden-b', { alt: '', sizes, eager: true, cls: 'hxc-img' });
  // the night plate is needed on first paint (the still state is a split), so load it normally, not lazily
  const night = img('hero-night-b', { alt: '', sizes, cls: 'hxc-img' }).replace(' loading="lazy"', '');
  const knob = `<span class="hxc-knob"><svg viewBox="0 0 84 24" aria-hidden="true" focusable="false"><path d="M9 7 4 12l5 5M75 7l5 5-5 5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><path d="M42 4a8 8 0 0 0 0 16z" fill="#FFC27A"/><path d="M42 4a8 8 0 0 1 0 16z" fill="#BBAAFF"/></svg></span>`;

  const body = `<section class="hxc" data-hxc data-hero aria-labelledby="hxc-h1">
  <div class="hxc-ground" aria-hidden="true"><i class="hxc-ground__base"></i><i class="hxc-ground__day" data-tint="day"></i><i class="hxc-ground__night" data-tint="night"></i><i class="hxc-ground__stars" data-tint="night"></i></div>
  <div class="hxc-in">
    <div class="hxc-copy">
      <i class="hxc-rim hxc-rim--day" data-tint="day" aria-hidden="true"></i><i class="hxc-rim hxc-rim--night" data-tint="night" aria-hidden="true"></i>
      <p class="hxc-kicker">${esc(home.heroKicker)}</p>
      <h1 class="hxc-h1" id="hxc-h1">Dreams take work. <em>Welcome in.</em></h1>
      <p class="hxc-lede">${esc(home.heroLede)}</p>
      <div class="hxc-cta">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
      <p class="hxc-meta"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
    </div>
  </div>
  <div class="hxc-stage" aria-hidden="true">
    <div class="hxc-holder">
      <div class="hxc-halo"><i class="hxc-halo__day" data-tint="day"></i><i class="hxc-halo__night" data-tint="night"></i></div>
      <div class="hxc-frame">
        <div class="hxc-day">${day}
          <div class="hxc-fog hxc-fog--day"><i></i><i></i></div>
          <span class="hxc-tag hxc-tag--day"><b class="hxc-sun"></b>GOLDEN HOUR</span>
        </div>
        <div class="hxc-night"><div class="hxc-night__in">${night}
          <div class="hxc-fog hxc-fog--night"><i></i><i></i></div>
          <span class="hxc-tag hxc-tag--night"><b class="hxc-moon"></b>AFTER DARK</span>
        </div></div>
        <div class="hxc-edge"><i class="hxc-edge__line"></i>${knob}</div>
        <i class="hxc-glass"></i>
      </div>
      <div class="hxc-mist"><span class="hxc-mist__day" data-tint="day"><i></i></span><span class="hxc-mist__night" data-tint="night"><i></i></span></div>
    </div>
  </div>
</section>
<section class="band band--deals"><div class="band__in">${dealsGrid()}</div></section>`;

  const inlineCss = `
.hxc{--hxc-plate:clamp(470px,42vw,620px);--hxc-pad:clamp(28px,2.6vw,40px);--hxc-ov:clamp(56px,6vw,100px);--hxc-bleed:40px;--hxc-p:54%;--hxc-f:150px;--hxc-op:80%;--hxc-l:max(var(--gutter),calc((100% - var(--max))/2 + var(--gutter)));position:relative;isolation:isolate;overflow:clip;margin-top:calc(-1*var(--hdr-h));min-height:max(600px,calc(100svh - var(--top-h) - var(--tick-h) - var(--hxc-lab,0px)));padding:calc(var(--hdr-h) + 20px) 0 34px;display:grid;align-items:center}
.hxc-ground{position:absolute;inset:0;z-index:-1;pointer-events:none;-webkit-mask-image:linear-gradient(180deg,#000 66%,transparent);mask-image:linear-gradient(180deg,#000 66%,transparent)}
.hxc-ground i{position:absolute;inset:0}
.hxc-ground__base{background:linear-gradient(180deg,rgba(8,5,12,.66) 0%,rgba(8,5,12,.22) 28%,rgba(8,5,12,.14) 72%,rgba(26,20,36,0) 100%)}
.hxc-ground__day{opacity:.46;background:radial-gradient(42% 58% at 72% 52%,rgba(255,146,64,.3),transparent 72%),radial-gradient(36% 40% at 24% 74%,rgba(255,176,104,.12),transparent 70%)}
.hxc-ground__night{opacity:.54;background:radial-gradient(44% 60% at 72% 48%,rgba(123,106,196,.46),transparent 72%),radial-gradient(40% 52% at 8% 12%,rgba(88,70,176,.28),transparent 70%)}
.hxc-ground__stars{inset:0 0 40%;opacity:.54;background-image:radial-gradient(1.2px 1.2px at 7% 22%,#fff 50%,transparent 52%),radial-gradient(1px 1px at 19% 9%,#fff 50%,transparent 52%),radial-gradient(1.3px 1.3px at 33% 31%,#e9e2ff 50%,transparent 52%),radial-gradient(1px 1px at 46% 14%,#fff 50%,transparent 52%),radial-gradient(1.1px 1.1px at 58% 5%,#d9d0ff 50%,transparent 52%),radial-gradient(1px 1px at 27% 47%,#fff 50%,transparent 52%);background-size:560px 320px}
.hxc-in{position:relative;z-index:3;width:100%;max-width:var(--max);margin:0 auto;padding:0 var(--gutter);pointer-events:none}
.hxc-copy{position:relative;isolation:isolate;width:var(--hxc-plate);max-width:100%;padding:clamp(28px,2.6vw,40px) var(--hxc-pad);border-radius:30px;pointer-events:auto;background:linear-gradient(155deg,rgba(42,32,60,.74),rgba(15,11,22,.82));-webkit-backdrop-filter:blur(22px) saturate(150%);backdrop-filter:blur(22px) saturate(150%);box-shadow:inset 0 0 0 1px rgba(241,236,248,.12),inset 0 1px 0 rgba(255,255,255,.1),0 50px 100px -40px rgba(0,0,0,.95)}
.hxc-rim{position:absolute;inset:0;z-index:-1;border-radius:inherit;pointer-events:none}
.hxc-rim--day{opacity:.46;background:linear-gradient(270deg,rgba(255,170,90,.14),transparent 32%);box-shadow:inset -1.5px 0 0 rgba(255,196,130,.6)}
.hxc-rim--night{opacity:.54;background:linear-gradient(270deg,rgba(150,128,255,.17),transparent 32%);box-shadow:inset -1.5px 0 0 rgba(187,170,255,.65)}
.hxc-kicker{display:flex;align-items:center;gap:.75em;margin:0 0 18px;font:700 .84rem/1.35 var(--f-ui);letter-spacing:.22em;text-transform:uppercase;color:var(--violet-hi);text-wrap:balance}
.hxc-kicker::before{content:"";flex:none;width:28px;height:1px;background:currentColor;opacity:.8}
.hxc-h1{margin:0 0 16px;font-family:var(--f-display);font-size:calc((var(--hxc-plate) - 2*var(--hxc-pad))/12.3);line-height:1;letter-spacing:.005em;color:#fff;text-wrap:balance}
.hxc-h1 em{display:block;margin-top:.06em;font-style:normal;color:var(--violet-hi);text-shadow:0 0 30px rgba(123,106,196,.6)}
.hxc-lede{max-width:44ch;margin:0 0 24px;font-size:clamp(1.02rem,1.12vw,1.12rem);line-height:1.6;color:var(--text-2)}
.hxc-cta{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 20px}
.hxc-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 22px;margin:0;font:600 1rem/1.3 var(--f-ui);letter-spacing:.06em}
.hxc-meta a{display:inline-flex;align-items:center;gap:.45em;color:var(--text);text-decoration:none}
.hxc-meta a:hover{color:var(--violet-hi)}
.hxc-meta .ic{width:1.05em;height:1.05em}
.hxc-stage{position:absolute;z-index:1;top:calc(var(--hdr-h) + 12px);bottom:28px;left:calc(var(--hxc-l) + var(--hxc-plate) - var(--hxc-ov));right:0;display:flex;align-items:center}
.hxc-holder{position:relative;flex:none;width:calc(100% + var(--hxc-bleed));aspect-ratio:1.45;max-height:100%}
.hxc-halo{position:absolute;inset:-16% -2% -20% -18%;z-index:-1;pointer-events:none}
.hxc-halo i{position:absolute;inset:0}
.hxc-halo__day{opacity:.46;background:radial-gradient(closest-side,rgba(255,160,80,.32),rgba(255,140,70,.1) 58%,transparent)}
.hxc-halo__night{opacity:.54;background:radial-gradient(closest-side,rgba(140,118,240,.4),rgba(110,90,210,.12) 58%,transparent)}
.hxc-frame{position:absolute;inset:0;overflow:hidden;isolation:isolate;border-radius:32px 0 0 32px;background:#16101f;transform-origin:100% 50%;box-shadow:0 70px 120px -60px rgba(0,0,0,.95),0 30px 60px -30px rgba(0,0,0,.6);touch-action:pan-y;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}
.hxc-day,.hxc-edge{position:absolute;top:0;bottom:0;left:0;right:var(--hxc-bleed)}
.hxc-day,.hxc-night{overflow:hidden}
.hxc-night{position:absolute;top:0;bottom:0;left:0;width:calc(200% - 2*var(--hxc-bleed));transform:translate3d(calc(var(--hxc-p)/2 - var(--hxc-f)/2),0,0);-webkit-mask-image:linear-gradient(90deg,transparent 0,rgba(0,0,0,.1) calc(var(--hxc-f)*.25),rgba(0,0,0,.5) calc(var(--hxc-f)*.5),rgba(0,0,0,.9) calc(var(--hxc-f)*.75),#000 var(--hxc-f));mask-image:linear-gradient(90deg,transparent 0,rgba(0,0,0,.1) calc(var(--hxc-f)*.25),rgba(0,0,0,.5) calc(var(--hxc-f)*.5),rgba(0,0,0,.9) calc(var(--hxc-f)*.75),#000 var(--hxc-f));will-change:transform}
.hxc-night__in{position:absolute;top:0;bottom:0;left:0;width:50%;transform:translate3d(calc(var(--hxc-f)/2 - var(--hxc-p)),0,0);will-change:transform}
.hxc-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:var(--hxc-op) 50%;transform:scale(1.05)}
.hxc-fog{position:absolute;left:-30px;right:-30px;bottom:-2%;height:58%;overflow:hidden;pointer-events:none;mix-blend-mode:screen;-webkit-mask-image:linear-gradient(180deg,transparent,#000 55%);mask-image:linear-gradient(180deg,transparent,#000 55%)}
.hxc-fog i,.hxc-mist i{position:absolute;top:0;bottom:0;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;animation:hxc-drift 92s linear infinite;will-change:transform}
.hxc-fog i+i{top:26%;animation-duration:60s;animation-direction:reverse}
.hxc-fog--day i:first-child{background-image:url(${fogS});opacity:.55}
.hxc-fog--day i+i{background-image:url(${fogW});opacity:.42}
.hxc-fog--night i:first-child{background-image:url(${fogV});opacity:.7}
.hxc-fog--night i+i{background-image:url(${fogW});opacity:.3}
@keyframes hxc-drift{to{transform:translate3d(-1200px,0,0)}}
.hxc-tag{position:absolute;top:clamp(14px,1.8vw,22px);display:inline-flex;align-items:center;gap:.65em;padding:8px 14px 8px 11px;border-radius:999px;font:700 .76rem/1 var(--f-ui);letter-spacing:.24em;color:#fff;white-space:nowrap;background:rgba(16,11,23,.58);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16)}
.hxc-tag--day{left:calc(var(--hxc-ov) + 18px)}
.hxc-tag--night{right:clamp(14px,1.8vw,22px)}
.hxc-sun,.hxc-moon{flex:none;width:10px;height:10px;border-radius:50%}
.hxc-sun{background:#FFC27A;box-shadow:0 0 10px 2px rgba(255,170,90,.75)}
.hxc-moon{box-shadow:inset 3px -2px 0 0 #DCD3FF;transform:rotate(-20deg)}
.hxc-edge{z-index:2;pointer-events:none;transform:translate3d(var(--hxc-p),0,0);will-change:transform}
.hxc-edge__line{position:absolute;top:0;bottom:0;left:-80px;width:160px;background:linear-gradient(90deg,rgba(255,168,88,0) 0,rgba(255,168,88,.2) 48.6%,rgba(255,244,228,.95) 49.4%,rgba(255,244,228,.95) 50.6%,rgba(146,124,255,.24) 51.4%,rgba(146,124,255,0) 100%);-webkit-mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent)}
.hxc-knob{position:absolute;top:76%;left:0;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(18,13,25,.62);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.55),0 0 0 6px rgba(255,255,255,.06),0 10px 26px -8px rgba(0,0,0,.7),0 0 26px rgba(255,236,214,.32)}
.hxc-knob svg{position:absolute;left:50%;top:50%;width:84px;height:24px;max-width:none;margin:-12px 0 0 -42px}
.hxc:not(.is-live) .hxc-knob{display:none}
.hxc-glass{position:absolute;inset:0;z-index:3;pointer-events:none;border-radius:inherit;background:linear-gradient(115deg,rgba(255,255,255,.07),rgba(255,255,255,0) 30%),radial-gradient(120% 90% at 60% 40%,transparent 60%,rgba(10,6,16,.38) 100%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14),inset 0 1px 0 rgba(255,255,255,.18)}
.hxc-mist{position:absolute;z-index:2;left:-8%;right:0;bottom:-9%;height:30%;overflow:hidden;pointer-events:none;mix-blend-mode:screen;-webkit-mask-image:radial-gradient(52% 46% at 54% 52%,#000 45%,transparent);mask-image:radial-gradient(52% 46% at 54% 52%,#000 45%,transparent)}
.hxc-mist span{position:absolute;inset:0}
.hxc-mist__day{opacity:.46}.hxc-mist__day i{background-image:url(${fogS});opacity:.42;animation-duration:130s}
.hxc-mist__night{opacity:.54}.hxc-mist__night i{background-image:url(${fogV});opacity:.5;animation-duration:104s;animation-direction:reverse}
.hxc.is-off .hxc-fog i,.hxc.is-off .hxc-mist i{animation-play-state:paused}
@media (max-width:1180px) and (min-width:1024px){.hxc{--hxc-plate:clamp(450px,44vw,510px)}}
@media (max-width:1023px){
  .hxc{display:block;min-height:0;padding:calc(var(--hdr-h) + 22px) 0 40px;--hxc-op:84%}
  .hxc-in{pointer-events:auto}
  .hxc-copy{width:auto;max-width:640px;padding:0;background:none;-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:none;border-radius:0}
  .hxc-h1{font-size:clamp(2.3rem,5.2vw,3.1rem)}
  .hxc-rim,.hxc-ground__stars{display:none}
  .hxc-stage{position:relative;top:auto;bottom:auto;left:auto;right:auto;display:block;height:min(62vw,560px);margin:32px 0 0 var(--gutter)}
  .hxc-holder{width:calc(100% + var(--hxc-bleed));height:100%;aspect-ratio:auto;max-height:none}
  .hxc-frame{border-radius:28px 0 0 28px}
  .hxc-tag--day{left:clamp(14px,1.8vw,22px)}
}
@media (max-width:760px){
  .hxc{padding:calc(var(--hdr-h) + 14px) 0 30px;--hxc-op:87%}
  .hxc-kicker{margin-bottom:12px;font-size:.74rem;letter-spacing:.17em}
  .hxc-kicker::before{width:20px}
  .hxc-h1{margin-bottom:12px;font-size:min(7.4vw,2.4rem)}
  .hxc-lede{margin-bottom:18px;font-size:1rem;line-height:1.55}
  .hxc-cta{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
  .hxc-cta .btn{--h:50px;min-width:0;padding:0 .7em;font-size:.92rem;letter-spacing:.06em}
  .hxc-meta{gap:6px 18px;font-size:.95rem}
  .hxc-stage{height:min(96vw,440px);margin-top:24px}
  .hxc-frame{border-radius:24px 0 0 24px}
  .hxc-tag{padding:7px 11px 7px 9px;font-size:.68rem;letter-spacing:.2em}
}
@media (max-width:359px){.hxc-cta{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.hxc-fog i,.hxc-mist i{animation:none}}`;

  // One IIFE. Wipe position c is measured in px from the frame's visible left edge: golden hour left of it,
  // after dark right of it. t = how much of the frame is night (0..1) drives every warm/cool tint.
  const inlineJs = `(function(){
var d=document,W=window,hero=d.querySelector('[data-hxc]');if(!hero)return;
var q=function(s){return hero.querySelector(s);},stage=q('.hxc-stage'),frame=q('.hxc-frame'),night=q('.hxc-night'),nightIn=q('.hxc-night__in'),edge=q('.hxc-edge'),copy=q('.hxc-copy');
if(!stage||!frame||!night||!nightIn||!edge)return;
var imgs=hero.querySelectorAll('.hxc-img'),fogs=hero.querySelectorAll('.hxc-fog'),dayT=hero.querySelectorAll('[data-tint="day"]'),nightT=hero.querySelectorAll('[data-tint="night"]'),lab=d.querySelector('.labbar');
var mm=function(m){return !!(W.matchMedia&&W.matchMedia(m).matches);},RM=mm('(prefers-reduced-motion: reduce)'),FINE=mm('(hover: hover) and (pointer: fine)');
var now=function(){return W.performance&&performance.now?performance.now():Date.now();};
var clamp=function(v,a,b){return v<a?a:v>b?b:v;},ease=function(x){return (1-Math.cos(Math.PI*x))/2;};
var T=15000,Wv=1,F=150,ov=0,cur=0,target=0,mode='hold',t0=0,holdTo=0,resumeAt=0,last=0,raf=0,inView=true,offAt=0,dragging=false,hovering=false;
var tx=0,ty=0,gx=0,gy=0,lastC=NaN,lastT=-1,lastTx=NaN,lastTy=NaN;
function idleU(ph){return ph<.14?1:ph<.5?1-ease((ph-.14)/.36):ph<.64?0:ease((ph-.64)/.36);}
function phaseFor(u,toNight){u=clamp(u,0,1);return toNight?.14+.36*Math.acos(2*u-1)/Math.PI:.64+.36*Math.acos(1-2*u)/Math.PI;}
function uToC(u){return -F/2+u*(Wv+F);}function cToU(c){return (c+F/2)/(Wv+F);}
function measure(){if(lab)hero.style.setProperty('--hxc-lab',lab.offsetHeight+'px');Wv=nightIn.offsetWidth||1;F=Math.round(clamp(Wv*.17,80,180));frame.style.setProperty('--hxc-f',F+'px');
  var s=stage.getBoundingClientRect(),c=copy?copy.getBoundingClientRect():null;ov=c&&c.bottom>s.top&&c.top<s.bottom?Math.max(0,c.right-s.left):0;}
function mapX(x){var a=ov+36,b=Wv-36,c=x;if(x<=a)c=a-(a-x)*(a+F/2)/Math.max(1,a-ov);else if(x>=b)c=b+(x-b)*(F/2+36)/36;return clamp(c,-F/2,Wv+F/2);}
function apply(c,force){if(!force&&Math.abs(c-lastC)<.2)return;lastC=c;var x=c-F/2;
  night.style.transform='translate3d('+x.toFixed(1)+'px,0,0)';nightIn.style.transform='translate3d('+(-x).toFixed(1)+'px,0,0)';edge.style.transform='translate3d('+c.toFixed(1)+'px,0,0)';
  var eo=clamp(Math.min(c,Wv-c)/40,0,1);edge.style.opacity=eo>=1?'':eo.toFixed(3);
  var t=clamp(1-c/Wv,0,1),i;if(force||Math.abs(t-lastT)>.003){lastT=t;for(i=0;i<dayT.length;i++)dayT[i].style.opacity=(1-t).toFixed(3);for(i=0;i<nightT.length;i++)nightT[i].style.opacity=t.toFixed(3);}}
function tilt(){if(Math.abs(tx-lastTx)<.0015&&Math.abs(ty-lastTy)<.0015)return;lastTx=tx;lastTy=ty;
  frame.style.transform='perspective(1600px) rotateX('+(-ty*2.6).toFixed(2)+'deg) rotateY('+(tx*3.6).toFixed(2)+'deg)';
  var it='translate3d('+(tx*12).toFixed(1)+'px,'+(ty*8).toFixed(1)+'px,0) scale(1.05)',ft='translate3d('+(tx*5).toFixed(1)+'px,0,0)',i;
  for(i=0;i<imgs.length;i++)imgs[i].style.transform=it;for(i=0;i<fogs.length;i++)fogs[i].style.transform=ft;}
function loop(ts){raf=0;var n=ts||now(),dt=last?Math.min(64,n-last):16;last=n;
  if(mode==='hold'){if(n>=holdTo){mode='idle';t0=n-phaseFor(cToU(cur),false)*T;}}
  if(mode==='idle'){var ph=((n-t0)%T+T)%T/T;cur=uToC(idleU(ph));}
  else if(mode==='pointer'){cur+=(target-cur)*(1-Math.exp(-dt/80));if(!dragging&&!hovering&&n>resumeAt){mode='idle';t0=n-phaseFor(cToU(cur),cToU(cur)>.5)*T;}}
  apply(cur);
  if(FINE){var k=1-Math.exp(-dt/150);tx+=(gx-tx)*k;ty+=(gy-ty)*k;tilt();}
  if(inView&&!d.hidden)raf=W.requestAnimationFrame(loop);}
function kick(){if(!raf&&inView&&!d.hidden&&!RM){last=0;raf=W.requestAnimationFrame(loop);}}
function setTarget(e){var r=stage.getBoundingClientRect();target=mapX(e.clientX-r.left);mode='pointer';if(RM){cur=target;apply(cur);}else kick();}
measure();cur=Wv*.54;apply(cur,true);hero.classList.add('is-live');
if(!RM){holdTo=now()+1300;kick();}else mode='still';
if(FINE){
  stage.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;hovering=true;
    if(!RM){var r=stage.getBoundingClientRect(),w=Math.max(1,r.width-ov);gx=clamp((e.clientX-(r.left+ov+w/2))/(w/2),-1,1);gy=clamp((e.clientY-(r.top+r.height/2))/(r.height/2),-1,1);}
    setTarget(e);});
  stage.addEventListener('pointerleave',function(e){if(e.pointerType!=='mouse')return;hovering=false;gx=0;gy=0;resumeAt=now()+1400;kick();});
}
frame.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;dragging=true;try{frame.setPointerCapture(e.pointerId);}catch(x){}setTarget(e);});
frame.addEventListener('pointermove',function(e){if(dragging)setTarget(e);});
var endDrag=function(){if(!dragging)return;dragging=false;resumeAt=now()+2600;kick();};
frame.addEventListener('pointerup',endDrag);frame.addEventListener('pointercancel',endDrag);frame.addEventListener('lostpointercapture',endDrag);
W.addEventListener('resize',function(){var u=cToU(cur);measure();cur=uToC(u);target=cur;apply(cur,true);});
if('IntersectionObserver' in W)new IntersectionObserver(function(en){var v=en[0].isIntersecting;if(v===inView)return;inView=v;hero.classList.toggle('is-off',!v);if(v){if(offAt){var gap=now()-offAt;t0+=gap;holdTo+=gap;offAt=0;}kick();}else offAt=now();}).observe(hero);
d.addEventListener('visibilitychange',function(){if(d.hidden){offAt=offAt||now();}else{if(offAt&&inView){var gap=now()-offAt;t0+=gap;holdTo+=gap;offAt=0;}kick();}});
})();`;

  return {
    path: '/lab/hero-c/',
    title: 'Hero C: Golden hour to after dark | Elevated Dreams redesign',
    desc: 'Design option C: the real storefront in a framed scene that sweeps from golden hour to after dark as you move across it.',
    bodyClass: 'is-lab is-home',
    body,
    inlineCss,
    inlineJs,
    replay: false,
  };
}
