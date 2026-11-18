// lab/cards.mjs: three directions for the license / warning / HOPEline cards. The compliance words are the live site's,
// verbatim, in every direction. All motion is transform and opacity only (scroll-linked with view timelines where the
// browser has them, so it runs off the main thread); loops pause off screen; reduced motion gets the settled cards.
import { esc, asset } from '../lib/html.mjs';
import { store, compliance as C } from '../content/site.mjs';
import { sun, moon, star, dream } from '../lib/dream-cards.mjs';

const lic = () => `<h3 class="k-h">${C.licenseTitle}</h3><p class="k-p">${esc(C.licenseLine)}</p><p class="k-no">${store.license}</p>`;
const warn = () => `<h3 class="k-h">${C.warningTitle}</h3><p class="k-p">${esc(C.warning)}</p><h4 class="k-h2">${C.addTitle}</h4><p class="k-p">${esc(C.additional)}</p>`;
const hopeRows = () => `<ul class="k-rows"><li><span>CALL</span><a href="tel:${C.hopeTel}">${C.hopeCall}</a></li><li><span>TEXT</span><a href="sms:${C.hopeTextTo}?body=${C.hopeText}">${C.hopeText} to ${C.hopeTextTo}</a></li><li><span>WEB</span><a href="${C.hopeUrl}" target="_blank" rel="noopener">${C.hopeWeb}</a></li></ul>`;
const hope = () => `<h3 class="k-h">${C.hopeTitle}</h3>${hopeRows()}`;
const label = (n, id, t, d) => `<header class="kx-label"><span class="kx-n" aria-hidden="true">${n}</span><div><h2 id="${id}">${t}</h2><p>${d}</p></div></header>`;

const led = `${C.hopeCall} ✦ TEXT ${C.hopeText} TO ${C.hopeTextTo} ✦ ${C.hopeWeb.toUpperCase()} ✦ `;
const hang = (cls, i, face) => `<article class="kb kb--${cls}" style="--i:${i}"><div class="kb-sway"><span class="kb-rod kb-rod--l" aria-hidden="true"></span><span class="kb-rod kb-rod--r" aria-hidden="true"></span><span class="kb-lamp" aria-hidden="true"></span><span class="kb-cone" aria-hidden="true"></span><div class="kb-face" data-kt>${face}<span class="kb-dim" aria-hidden="true"></span><span class="kb-sheen" data-ks aria-hidden="true"></span></div></div></article>`;
const cl = (f, cls) => `<img class="kc-cl ${cls}" src="${asset(`img/gen/${f}.webp`)}" alt="" width="1200" height="560" loading="lazy" decoding="async" aria-hidden="true">`;
const drift = (cls, body, extra = '') => `<article class="kc kc--${cls}"><div class="kc-float">${extra}<div class="kc-in" data-kt>${body}<span class="kc-sheen" data-ks aria-hidden="true"></span></div></div></article>`;

export default function () {
  const body = `<div class="kx-head"><p class="kicker">SIGN CARDS · THREE DIRECTIONS</p><h1>Same words. <em>More life.</em></h1><p class="kx-lede">The license, warning and HOPEline wording stays exactly as it is on the live site. Scroll slowly through each direction and move your cursor over the cards.</p></div>

<section class="kx kx-a" aria-labelledby="ka-t"><span class="kx-stars" aria-hidden="true"></span>
  ${label('A', 'ka-t', 'Dream cards (chosen, now on the site)', 'The Sun for the license, the Moon for the warning, the Star for hope: in the tarot, the Star is the card of hope. They deal out of one deck as you scroll, and foil catches your cursor.')}
  <div class="kx-wrap ka-deck">${dream('sun', sun, 'XIX · THE SUN', lic())}${dream('moon', moon, 'XVIII · THE MOON', warn(), '<p class="ka-badge">21+ ONLY</p>')}${dream('star', star, 'XVII · THE STAR', hope())}</div>
</section>

<section class="kx kx-b" aria-labelledby="kb-t"><span class="kb-rail" aria-hidden="true"></span>
  ${label('B', 'kb-t', 'Street signs at dusk', 'Three real signs hanging off a rail on a Newburgh block. They swing into place, their lamps switch on one by one as you reach them, and the HOPEline runs on an LED strip.')}
  <div class="kx-wrap kb-row">${hang('brass', 0, `<span class="screw screw--tl"></span><span class="screw screw--tr"></span><span class="screw screw--bl"></span><span class="screw screw--br"></span>${lic()}`)}${hang('enamel', 1, `<span class="kb-bulbs" aria-hidden="true"><i></i><i></i></span><p class="kb-badge">21+ ONLY</p>${warn()}`)}${hang('led', 2, `<div class="kb-led" aria-hidden="true"><span>${esc(led)}${esc(led)}</span></div>${hope()}`)}</div>
</section>

<section class="kx kx-c" aria-labelledby="kc-t">${cl('cloud-a', 'kc-b1')}${cl('cloud-b', 'kc-b2')}
  ${label('C', 'kc-t', 'Adrift on the clouds', 'Bright paper cards rising through the same cloud sea as the hero, each at its own depth. Clouds slide past in front of them as you scroll.')}
  <div class="kx-wrap kc-row">${drift('a', lic())}${drift('b', warn(), '<p class="kc-badge">21+ ONLY</p>')}${drift('c', hope())}</div>
  ${cl('cloud-c', 'kc-f1')}${cl('cloud-a', 'kc-f2')}${cl('cloud-b', 'kc-f3')}
</section>`;

  const inlineCss = `
.kx-head{max-width:var(--max);margin:0 auto;padding:clamp(52px,7vw,96px) var(--gutter) clamp(26px,4vw,50px)}
.kx-head h1{margin:0 0 14px;font:400 clamp(2.5rem,5.8vw,4.6rem)/1 var(--f-display)}
.kx-head h1 em{font-style:normal;color:var(--violet-hi)}
.kx-lede{max-width:62ch;margin:0;color:var(--text-2);font-size:1.12rem}
.kx{position:relative;isolation:isolate;overflow:clip;padding:clamp(56px,7vw,104px) 0 clamp(76px,10vw,140px)}
.kx-label{position:relative;z-index:4;display:flex;gap:16px;align-items:center;max-width:var(--max);margin:0 auto clamp(34px,5vw,72px);padding:0 var(--gutter)}
.kx-n{display:grid;place-items:center;flex:none;width:50px;height:50px;border-radius:50%;background:var(--violet);color:#fff;font:800 1.3rem/1 var(--f-ui)}
.kx-label h2{margin:0;font:400 clamp(1.55rem,2.7vw,2.2rem)/1.05 var(--f-display)}
.kx-label p{max-width:74ch;margin:5px 0 0;color:var(--text-2);font-size:1rem;line-height:1.45}
.kx-wrap{position:relative;max-width:1200px;margin:0 auto;padding:0 var(--gutter)}
/* the words, shared */
.k-h{margin:0 0 10px;font:800 1rem/1.25 var(--f-ui);letter-spacing:.16em}
.k-h2{margin:16px 0 6px;font:800 .92rem/1.2 var(--f-ui);letter-spacing:.16em}
.k-p{margin:0;font-size:.97rem;line-height:1.55}
.k-no{margin:14px 0 0;font:400 min(1.6rem,7.3cqw)/1.05 var(--f-display);white-space:nowrap}
.k-rows{list-style:none;display:grid;gap:8px;margin:4px 0 0;padding:0;text-align:left}
.k-rows li{display:grid;grid-template-columns:52px 1fr;gap:10px;align-items:baseline;padding-top:9px;border-top:1px solid rgba(255,255,255,.15)}
.k-rows span{font:800 .8rem var(--f-ui);letter-spacing:.18em;color:var(--violet-hi)}
.k-rows a{color:inherit;font:700 1.08rem var(--f-ui);letter-spacing:.04em;text-decoration:none;overflow-wrap:anywhere}
.k-rows a:hover{color:var(--gold)}
.k-rows a:focus-visible,.kx a:focus-visible{outline:2px solid var(--violet-neon);outline-offset:3px;border-radius:3px}
[data-kt]{transition:transform .5s cubic-bezier(.22,1,.36,1)}
[data-ks]{position:absolute;inset:-45%;z-index:3;pointer-events:none;background:linear-gradient(112deg,transparent 43%,rgba(255,255,255,.24) 50%,transparent 57%);transform:translate3d(-34%,0,0);opacity:0;transition:opacity .35s,transform .5s cubic-bezier(.22,1,.36,1)}
[data-kt]:hover [data-ks]{opacity:1}

/* ================= A: dream cards ================= */
.kx-a{background:radial-gradient(56% 48% at 50% 46%,rgba(123,106,196,.3),rgba(123,106,196,0) 72%),linear-gradient(180deg,#1e1633,#110c1c)}
.kx-stars{position:absolute;inset:0;z-index:-1;background-image:radial-gradient(1.3px 1.3px at 7% 18%,#fff 50%,transparent 52%),radial-gradient(1px 1px at 23% 62%,#fff 50%,transparent 52%),radial-gradient(1.5px 1.5px at 41% 12%,#f6e7bd 50%,transparent 52%),radial-gradient(1px 1px at 59% 80%,#d9d0ff 50%,transparent 52%),radial-gradient(1.3px 1.3px at 78% 28%,#fff 50%,transparent 52%),radial-gradient(1px 1px at 92% 67%,#fff 50%,transparent 52%);background-size:520px 400px;opacity:.75}
.ka-deck{display:grid;grid-template-columns:1fr 1.14fr 1fr;gap:clamp(14px,2.2vw,30px);align-items:stretch}
.ka{--tr:0deg;--ty:0px;--fx:0%;--fr:0deg;position:relative;transform:translate3d(0,var(--ty),0) rotate(var(--tr));will-change:transform}
.ka--sun{--tr:-2.4deg;--ty:16px;--fx:106%;--fr:7deg;z-index:1}
.ka--moon{z-index:2}
.ka--star{--tr:2.4deg;--ty:16px;--fx:-106%;--fr:-7deg;z-index:1}
.ka-float{position:relative;height:100%}
.ka-in{--arch:clamp(130px,15vw,190px);position:relative;display:flex;flex-direction:column;height:100%;box-sizing:border-box;overflow:hidden;container-type:inline-size;padding:clamp(24px,2.8vw,36px) clamp(20px,2.4vw,32px) clamp(26px,2.8vw,36px);border-radius:50% 50% 22px 22px/var(--arch) var(--arch) 22px 22px;text-align:center;box-shadow:0 46px 70px -36px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.12)}
.ka-in::before{content:"";position:absolute;inset:9px;border:1px solid currentColor;border-radius:50% 50% 15px 15px/calc(var(--arch) - 9px) calc(var(--arch) - 9px) 15px 15px;opacity:.42;pointer-events:none}
.ka-art{position:relative;width:clamp(92px,10vw,128px);aspect-ratio:1;margin:4px auto 10px}
.ka-art svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.ka-name{margin:0 0 15px;font:700 .8rem/1 var(--f-ui);letter-spacing:.3em;opacity:.78}
.ka--sun .k-h,.ka--star .k-h{margin-top:auto}.ka--sun .k-no,.ka--star .k-rows{margin-bottom:auto}
.ka--sun .ka-in{background:linear-gradient(165deg,#FBEDC4,#E9CF8E 42%,#C9A25E);color:#2d1f0b}
.ka--moon .ka-in{background:linear-gradient(170deg,#43306f,#2a1d4c 58%,#1c1436);color:#fff}
.ka--moon .ka-art{color:#D9D0FF}
.ka--star .ka-in{background:linear-gradient(170deg,#191630,#0d0b18);color:#fff}
.ka--star .ka-art{color:#F4EFFF}
.ka-badge{position:absolute;top:-10px;right:clamp(0px,1vw,14px);z-index:4;display:grid;place-items:center;width:78px;height:78px;margin:0;border-radius:50%;background:var(--sodium);color:#1A1424;font:800 .98rem/1 var(--f-ui);letter-spacing:.04em;text-align:center;box-shadow:0 0 0 3px #fff,0 14px 26px -10px rgba(0,0,0,.8);transform:rotate(-9deg)}

/* ================= B: street signs at dusk ================= */
.kx-b{background:radial-gradient(70% 60% at 50% 30%,rgba(255,155,66,.1),transparent 72%),linear-gradient(180deg,rgba(17,12,26,.86),rgba(13,9,20,.93)),var(--brick);background-size:auto,auto,56px 28px}
.kb-rail{position:absolute;left:0;right:0;top:clamp(190px,17vw,236px);height:9px;background:linear-gradient(180deg,#6a6372,#37323e 58%,#1d1a23);box-shadow:0 10px 20px rgba(0,0,0,.65)}
.kx-b .kx-label{margin-bottom:clamp(74px,6vw,92px)}
.kb-row{display:grid;grid-template-columns:1fr 1.18fr 1fr;gap:clamp(16px,2.6vw,36px);align-items:start;padding-top:44px}
.kb{--drop:48px;position:relative;transform-origin:50% calc(-1*var(--drop))}
.kb-sway{position:relative;transform-origin:50% calc(-1*var(--drop))}
.kb-rod{position:absolute;top:calc(-1*var(--drop));width:4px;height:var(--drop);background:linear-gradient(90deg,#8a8392,#37323e)}
.kb-rod--l{left:18%}.kb-rod--r{right:18%}
.kb-lamp{position:absolute;left:50%;top:-30px;z-index:2;width:58px;height:14px;margin-left:-29px;border-radius:16px 16px 3px 3px;background:linear-gradient(180deg,#4b4553,#26222c)}
.kb-lamp::after{content:"";position:absolute;left:12px;right:12px;bottom:-3px;height:4px;border-radius:3px;background:#FFE2B0;box-shadow:0 0 12px 3px rgba(255,190,120,.9)}
.kb-cone{position:absolute;left:-16%;right:-16%;top:-18px;height:calc(100% + 96px);background:radial-gradient(58% 54% at 50% 0,rgba(255,200,136,.5),rgba(255,176,104,.15) 56%,rgba(255,176,104,0) 80%);pointer-events:none}
.kb-face{position:relative;z-index:1;overflow:hidden;container-type:inline-size;padding:clamp(24px,2.5vw,32px) clamp(20px,2.3vw,28px);box-shadow:0 34px 54px -28px rgba(0,0,0,.95)}
.kb-dim{position:absolute;inset:0;z-index:2;background:#0a0710;opacity:0;pointer-events:none}
.kb--brass .kb-face{min-height:clamp(230px,23vw,300px);display:grid;align-content:center;justify-items:center;text-align:center;border-radius:10px;background:var(--brass);color:#2a1d0c;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -3px 8px rgba(0,0,0,.35),inset 0 0 0 6px rgba(0,0,0,.06),0 34px 54px -28px rgba(0,0,0,.95)}
.kb--enamel .kb-face{padding-top:clamp(40px,3.6vw,48px);border-radius:16px;background:linear-gradient(180deg,#4a2e69,#2e1c45);color:#fff;box-shadow:inset 0 0 0 4px #2e1c45,inset 0 0 0 6px rgba(255,255,255,.9),0 34px 54px -28px rgba(0,0,0,.95)}
.kb--led .kb-face{border-radius:10px;background:#0c0a10;color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 34px 54px -28px rgba(0,0,0,.95)}
.kb-bulbs{position:absolute;left:18px;right:18px;top:15px;height:10px}
.kb-bulbs i{position:absolute;inset:0;background:radial-gradient(circle 3.4px at 9px 5px,#FFE9C2 0 2.6px,rgba(255,200,130,.45) 3.2px,transparent 3.4px) 0 0/36px 10px repeat-x}
.kb-bulbs i:nth-child(2){background-position:18px 0}
.kb-badge{position:absolute;right:16px;top:clamp(30px,3vw,38px);z-index:1;margin:0;padding:6px 11px;border-radius:999px;background:var(--sodium);color:#1A1424;font:800 .86rem/1 var(--f-ui);letter-spacing:.05em}
.kb-led{overflow:hidden;margin:0 0 18px;padding:8px 0;border-radius:5px;background:#040206;box-shadow:inset 0 0 0 1px rgba(255,255,255,.09);color:#FFB766;font:800 .86rem/1 var(--f-ui);letter-spacing:.16em;white-space:nowrap;text-shadow:0 0 8px rgba(255,155,66,.85)}
.kb-led span{display:inline-block;will-change:transform}

/* ================= C: adrift on the clouds ================= */
.kx-c{padding-bottom:clamp(120px,14vw,200px);background:radial-gradient(60% 30% at 20% 34%,rgba(255,190,136,.3),rgba(255,190,136,0) 72%),linear-gradient(180deg,#6d5470 0%,#6a5380 38%,#54417a 68%,#3e2f57 100%)}
.kx-c::after{content:"";position:absolute;left:0;right:0;bottom:0;z-index:5;height:clamp(90px,10vw,150px);background:linear-gradient(180deg,rgba(18,13,30,0),#120d1e);pointer-events:none}
.kx-c .kx-label p{color:#F4EEF7}
.kc-row{z-index:2;display:grid;grid-template-columns:1fr 1.16fr 1fr;gap:clamp(18px,2.8vw,40px);align-items:start}
.kc{--r:0deg;--y:0px;--from:150px;position:relative;transform:translate3d(0,var(--y),0) rotate(var(--r));will-change:transform}
.kc--a{--r:-1.6deg;--y:26px;--from:230px}
.kc--b{--y:64px;--from:120px}
.kc--c{--r:1.6deg;--y:6px;--from:300px}
.kc-float{position:relative}
.kc-in{position:relative;overflow:hidden;container-type:inline-size;padding:clamp(26px,2.7vw,36px) clamp(22px,2.4vw,32px);border-radius:26px;background:linear-gradient(168deg,#fffdf8,#f7f1fa 62%,#ebe2f5);color:#2a1f3d;box-shadow:0 50px 76px -38px rgba(21,12,38,.85),0 8px 18px -10px rgba(21,12,38,.45),inset 0 0 0 1px rgba(255,255,255,.8)}
.kc--a .kc-in{text-align:center}
.kc-in .k-h{color:#2a1f3d}.kc-in .k-rows li{border-top-color:rgba(42,31,61,.16)}.kc-in .k-rows span{color:#5a47a8}.kc-in .k-rows a:hover{color:#5a47a8}
.kc-in [data-ks],.kc-sheen{background:linear-gradient(112deg,transparent 43%,rgba(123,106,196,.14) 50%,transparent 57%)}
.kc-badge{position:absolute;top:-16px;right:18px;z-index:3;margin:0;padding:9px 14px;border-radius:999px;background:var(--sodium);color:#1A1424;font:800 .92rem/1 var(--f-ui);letter-spacing:.05em;box-shadow:0 10px 20px -10px rgba(21,12,38,.8)}
.kc-cl{position:absolute;display:block;max-width:none;height:auto;pointer-events:none;will-change:transform}
.kc-b1{left:-12%;top:18%;z-index:0;width:66%;opacity:.86}
.kc-b2{right:-14%;top:34%;z-index:0;width:70%;opacity:.8}
.kc-f1{left:-10%;bottom:-3%;z-index:3;width:60%}
.kc-f2{left:30%;bottom:-11%;z-index:3;width:58%}
.kc-f3{right:-13%;bottom:-5%;z-index:3;width:56%}

/* ================= motion: transform and opacity only ================= */
@media (prefers-reduced-motion: no-preference){
  html.js .ka-spin{animation:ka-spin 96s linear infinite}
  html.js .ka-spin--slow{animation-duration:150s;animation-direction:reverse}
  html.js .ka-glint{animation:ka-glint 3.8s ease-in-out infinite alternate}
  html.js .ka-float{animation:ka-float 7s ease-in-out infinite alternate}
  html.js .ka--moon .ka-float{animation-duration:8.4s;animation-delay:-3s}
  html.js .ka--star .ka-float{animation-duration:6.2s;animation-delay:-1.6s}
  html.js .kb-sway{animation:kb-sway 6.8s ease-in-out infinite alternate}
  html.js .kb--enamel .kb-sway{animation-duration:8.1s;animation-delay:-2.4s}
  html.js .kb--led .kb-sway{animation-duration:5.9s;animation-delay:-4s}
  html.js .kb-bulbs i:nth-child(1){animation:kb-chase 1.5s steps(1) infinite}
  html.js .kb-bulbs i:nth-child(2){animation:kb-chase 1.5s steps(1) -.75s infinite}
  html.js .kb-led span{animation:kb-led 24s linear infinite}
  html.js .kc-float{animation:ka-float 8.5s ease-in-out infinite alternate}
  html.js .kc--b .kc-float{animation-duration:10s;animation-delay:-4s}
  html.js .kc--c .kc-float{animation-duration:7.2s;animation-delay:-2s}
  html.js .kx-off .ka-spin,html.js .kx-off .ka-glint,html.js .kx-off .ka-float,html.js .kx-off .kb-sway,html.js .kx-off .kb-bulbs i,html.js .kx-off .kb-led span,html.js .kx-off .kc-float{animation-play-state:paused}
  /* without scroll timelines: one entrance when the section arrives */
  @supports not (animation-timeline: view()){
    html.js .ka,html.js .kc{transition:transform 1.2s cubic-bezier(.22,1,.36,1)}
    html.js .kx:not(.kx-seen) .ka{transform:translate3d(var(--fx),80px,0) rotate(var(--fr)) scale(.95)}
    html.js .kx:not(.kx-seen) .kc{transform:translate3d(0,var(--from),0)}
  }
  @supports (animation-timeline: view()){
    @media (min-width: 901px){
      html.js .ka{animation:ka-deal linear both;animation-timeline:view();animation-range:entry 0% cover 44%}
      html.js .kb{animation:kb-in linear both;animation-timeline:view();animation-range:entry 0% cover calc(30% + var(--i)*7%)}
      html.js .kb-cone{animation:kb-on linear both;animation-timeline:--kb;animation-range:cover calc(16% + var(--i)*8%) cover calc(30% + var(--i)*8%)}
      html.js .kb-dim{animation:kb-undim linear both;animation-timeline:--kb;animation-range:cover calc(16% + var(--i)*8%) cover calc(30% + var(--i)*8%)}
      .kx-b{view-timeline:--kb block}
      html.js .kc{animation:kc-rise linear both;animation-timeline:view();animation-range:entry 0% cover 48%}
    }
    html.js .kc-b1{animation:kc-a linear both;animation-timeline:--kc}
    html.js .kc-b2{animation:kc-b linear both;animation-timeline:--kc}
    html.js .kc-f1{animation:kc-c linear both;animation-timeline:--kc}
    html.js .kc-f2{animation:kc-d linear both;animation-timeline:--kc}
    html.js .kc-f3{animation:kc-e linear both;animation-timeline:--kc}
    .kx-c{view-timeline:--kc block}
  }
}
@keyframes ka-spin{to{transform:rotate(360deg)}}
@keyframes ka-glint{from{opacity:.25;transform:rotate(0) scale(.86)}to{opacity:1;transform:rotate(22deg) scale(1.08)}}
@keyframes ka-float{from{translate:0 5px}to{translate:0 -7px}}
@keyframes ka-deal{from{transform:translate3d(var(--fx),120px,0) rotate(var(--fr)) scale(.93)}to{transform:translate3d(0,var(--ty),0) rotate(var(--tr)) scale(1)}}
@keyframes kb-sway{from{transform:rotate(-.75deg)}to{transform:rotate(.75deg)}}
@keyframes kb-in{from{transform:rotate(-7deg)}55%{transform:rotate(2.2deg)}80%{transform:rotate(-.8deg)}to{transform:none}}
@keyframes kb-on{from{opacity:.04}to{opacity:1}}
@keyframes kb-undim{from{opacity:.62}to{opacity:0}}
@keyframes kb-chase{0%{opacity:1}50%{opacity:.14}}
@keyframes kb-led{to{transform:translate3d(-50%,0,0)}}
@keyframes kc-rise{from{transform:translate3d(0,var(--from),0) rotate(0)}to{transform:translate3d(0,var(--y),0) rotate(var(--r))}}
@keyframes kc-a{from{transform:translate3d(-7%,70px,0)}to{transform:translate3d(7%,-70px,0)}}
@keyframes kc-b{from{transform:translate3d(8%,110px,0)}to{transform:translate3d(-6%,-110px,0)}}
@keyframes kc-c{from{transform:translate3d(-9%,230px,0)}to{transform:translate3d(9%,-90px,0)}}
@keyframes kc-d{from{transform:translate3d(9%,300px,0)}to{transform:translate3d(-7%,-70px,0)}}
@keyframes kc-e{from{transform:translate3d(10%,190px,0)}to{transform:translate3d(-10%,-120px,0)}}

/* ================= tablet and phone: one calm column, every word on screen ================= */
@media (max-width: 900px){
  .ka-deck,.kb-row,.kc-row{grid-template-columns:1fr;max-width:540px;gap:30px}
  .ka,.kc{--tr:0deg;--r:0deg;--ty:0px;--y:0px}
  .kb-row{gap:74px}
  .ka-in{--arch:clamp(120px,36vw,190px)}
  .kb-rail{top:auto;display:none}
  .kx-b .kx-label{margin-bottom:60px}
  .kc-f2{display:none}.kc-f1{width:92%}.kc-f3{width:88%}.kc-b1{width:110%}.kc-b2{width:110%}
}`;

  const inlineJs = `(function(){
  var D=document,W=window,S=[].slice.call(D.querySelectorAll('.kx'));
  if('IntersectionObserver' in W){var io=new IntersectionObserver(function(en){en.forEach(function(e){e.target.classList.toggle('kx-off',!e.isIntersecting);if(e.isIntersecting)e.target.classList.add('kx-seen');});},{rootMargin:'140px 0px'});S.forEach(function(s){io.observe(s);});}
  else S.forEach(function(s){s.classList.add('kx-seen');});
  if(W.matchMedia('(prefers-reduced-motion: reduce)').matches||!W.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  /* the cursor tilts the card and slides its light: two transforms, once per frame, only while the pointer is on the card */
  [].forEach.call(D.querySelectorAll('.kb-face[data-kt],.kc-in[data-kt]'),function(el){
    var sh=el.querySelector('[data-ks]'),r=null,x=.5,y=.5,q=0;
    function ap(){q=0;el.style.transform='perspective(1000px) rotateX('+((.5-y)*7).toFixed(2)+'deg) rotateY('+((x-.5)*9).toFixed(2)+'deg)';if(sh)sh.style.transform='translate3d('+((x-.5)*62).toFixed(1)+'%,'+((y-.5)*18).toFixed(1)+'%,0)';}
    el.addEventListener('pointerenter',function(){r=el.getBoundingClientRect();});
    el.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;if(!r)r=el.getBoundingClientRect();x=(e.clientX-r.left)/r.width;y=(e.clientY-r.top)/r.height;if(!q)q=W.requestAnimationFrame(ap);},{passive:true});
    el.addEventListener('pointerleave',function(){if(q){W.cancelAnimationFrame(q);q=0;}r=null;el.style.transform='';if(sh)sh.style.transform='';});
  });
})();`;

  return { path: '/lab/cards/', title: 'Sign card options | Elevated Dreams redesign', desc: 'Three more creative directions for the license, warning and HOPEline cards.', bodyClass: 'is-lab kx-page', body, inlineCss, inlineJs, replay: false };
}
