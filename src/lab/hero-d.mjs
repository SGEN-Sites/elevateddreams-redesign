// lab/hero-d.mjs: HERO D "Open sky" (round 4). Levitate (hero A) with no seam above or below it.
// ABOVE: the golden-hour sky starts at the very top of the page. The hero is pulled up under the top bar, the LED
// ticker and the header, and those three become smoked-glass strips floating on the sky (backdrop blur, thin light
// edges); a zenith deepening behind them keeps every line AA.
// BELOW: the cloud sea rises out of the hero and becomes the ground of the next band. The band's own cloud layer climbs
// over the hero's bottom with cumulus-shaped tops (it paints after the hero, so the hero's last pixels are always under
// cloud). The license, warning and HOPEline signs stand in it, a near bank of the same clouds crosses their bases, and
// the brick wall fades in beneath, lit warm, then darkens and dissolves into the site's own night sky: the very thing
// the deals band shows, so there is no edge to find. All of it is pseudo-elements on the home page's own band markup.
// Every art layer is placed in CSS from container units, so the static page (no JS, reduced motion) is the same scene.
import { asset, img, btn, shopBtn, icon, esc, statusLine, IMG } from '../lib/html.mjs';
import { store, home } from '../content/site.mjs';
import { dealsGrid } from '../lib/sections.mjs';
import { placards } from '../lib/layout.mjs';

const RATIO = 2752 / 1536; // the golden-b frame the cut-out box was measured in
const srcset = (id) => IMG[id].variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', ');
const plate = (w) => asset(IMG['hero-plate-b'].variants.find((v) => v.w === w).src);
const fog = (n) => `url(${asset(`img/fog-${n}.svg`)})`;
// a cloud silhouette as a mask tile, drawn 1:1: soft overlapping discs strung along a centre line (wrapped around the
// tile edges, so it repeats without a seam), their rims broken by a noise warp that only moves pixels vertically (red
// channel pinned to .5, sRGB filtering so the noise stays centred). solid: everything below the centre line is filled,
// which gives cloud tops with no underside. The tile's first and last rows stay empty: at a fractional offset the
// browser samples across the tile edge, and a filled last row would draw a hairline along the top.
function puffs({ w, h, n, mid, jitter, r0, r1, seed, warp = 20, solid = false }) {
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  let discs = '';
  for (let i = 0; i < n; i++) {
    const x = (i + rnd()) * w / n, y = mid + (rnd() - .5) * 2 * jitter, r = r0 + (r1 - r0) * rnd() ** 1.5;
    for (const dx of [-w, 0, w]) if (x + dx > -r && x + dx < w + r) discs += `<circle cx='${(x + dx).toFixed(1)}' cy='${y.toFixed(1)}' r='${r.toFixed(1)}'/>`;
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'><defs><radialGradient id='p'><stop offset='.6'/><stop offset='1' stop-opacity='0'/></radialGradient><filter id='f' filterUnits='userSpaceOnUse' x='0' y='0' width='${w}' height='${h}' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.011 .017' numOctaves='3' seed='${seed}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1'/><feDisplacementMap in='SourceGraphic' scale='${warp}' xChannelSelector='R' yChannelSelector='G'/></filter><clipPath id='c'><rect y='3' width='${w}' height='${h - 16}'/></clipPath></defs><g clip-path='url(#c)'><g filter='url(#f)'>${solid ? `<rect y='${mid}' width='${w}' height='${h - mid}'/>` : ''}<g fill='url(#p)'>${discs}</g></g></g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
const CLOUD_L = puffs({ w: 1200, h: 240, n: 30, mid: 112, jitter: 18, r0: 44, r1: 82, seed: 7 }); // near bank, desktop
const CLOUD_S = puffs({ w: 800, h: 150, n: 24, mid: 72, jitter: 11, r0: 28, r1: 54, seed: 12, warp: 14 }); // near bank, phones
const CLOUD_RISE = puffs({ w: 1200, h: 220, n: 26, mid: 150, jitter: 16, r0: 52, r1: 116, seed: 31, warp: 26, solid: true }); // the sea's rising tops

export default function () {
  const b = IMG['hero-building-b-box'];
  const pc = (v) => `${(v * 100).toFixed(3)}%`;
  const plateSizes = '(max-width: 760px) 210vw, 106vw';
  const bldSizes = '(max-width: 760px) 106vw, 54vw';
  const seaWide = `url(${plate(2400)})`;
  // a near cloud bank in front of a row of signs: the plate's densest clouds cut to a cumulus silhouette, sunlit on top.
  // Underneath it falls into shadow (dusk: how deep this row sits, 0 to 1) and dissolves, so on the wall it reads as a
  // soft cast shadow, never as a line. x: where in the silhouette tile this bank starts, so no two banks match.
  const bank = (tile, w, h, down, dusk = 1, x = 0) => {
    const a = (v) => (v * dusk).toFixed(3);
    const cut = `linear-gradient(180deg,#000 54%,transparent 86%)`;
    return `height:${h}px;bottom:-${down}px;background:linear-gradient(180deg,rgba(32,21,46,0) 40%,rgba(30,20,43,${a(.55)}) 57%,rgba(24,16,34,${a(.9)}) 73%,rgba(20,14,29,${a(.98)}) 90%),${seaWide} 50% 100%/max(100%,1800px) auto no-repeat;-webkit-mask:var(${tile}) repeat-x ${x}px 0/${w}px ${h}px,${cut} no-repeat 0 0/100% 100%;-webkit-mask-composite:source-in;mask:var(${tile}) repeat-x ${x}px 0/${w}px ${h}px,${cut} no-repeat 0 0/100% 100%;mask-composite:intersect`;
  };
  // drifting mist: tileable fog, one tile wider than its box
  const mist = (n, o) => `background:${fog(n)} repeat-x 0 0/1200px 100%;mix-blend-mode:screen;opacity:${o};-webkit-mask-image:linear-gradient(180deg,transparent,#000 48%,transparent);mask-image:linear-gradient(180deg,transparent,#000 48%,transparent)`;

  const body = `
<section class="hxd" data-hero data-hxd aria-labelledby="hxd-h1">
  <div class="hxd-stage" aria-hidden="true">
    <div class="hxd-f hxd-sky">${img('hero-plate-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxd-plate' })}${img('hero-plate-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxd-plate hxd-over' })}${img('hero-plate-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxd-plate hxd-under' })}</div>
    <div class="hxd-zenith"></div>
    <div class="hxd-skygrade"></div>
    <div class="hxd-words"><p class="hxd-wbox"><span class="hxd-w hxd-w1"><span class="hxd-wi">ELEVATED</span></span><span class="hxd-w hxd-w2"><span class="hxd-wi">DREAMS</span></span></p></div>
    <div class="hxd-f hxd-bld"><div class="hxd-bob"><div class="hxd-lift"><span class="hxd-back">${img('hero-golden-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxd-backimg' })}</span>${img('hero-building-b', { alt: '', sizes: bldSizes, eager: true, cls: 'hxd-bimg' })}</div></div></div>
    <div class="hxd-f hxd-bank">${img('hero-plate-b', { alt: '', sizes: plateSizes, eager: true, cls: 'hxd-plate' })}</div>
    <div class="hxd-fog"><i></i><i></i><i></i><b class="hxd-haze"></b></div>
    <div class="hxd-grade"></div>
  </div>
  <div class="hxd-in">
    <div class="hxd-copy">
      <p class="hxd-kicker">${esc(home.heroKicker)}</p>
      <h1 class="hxd-h1" id="hxd-h1">Dreams take work. <em>Welcome in.</em></h1>
      <p class="hxd-lede">${esc(home.heroLede)}</p>
      <div class="hxd-cta">${shopBtn('Shop the menu')}${btn('Get Directions', store.maps, { kind: 'ghost' })}</div>
      <p class="hxd-meta"><a href="tel:${store.tel}">${icon('phone')} Call ${store.phone}</a>${statusLine()}</p>
    </div>
  </div>
</section>
<section class="band band--brick band--placards band--placards-top" aria-label="License, warnings and HOPEline"><div class="band__in">${placards()}</div></section>
<section class="band band--deals" id="tonight" aria-labelledby="deals-t"><div class="band__in">${dealsGrid().replace('class="shead__t"', 'class="shead__t" id="deals-t"')}</div></section>`;

  const inlineCss = `
/* ===================== HERO D: Open sky (rules scoped to .hxd-* and body.hxd-page) ===================== */

/* ---------- ABOVE: top bar, LED ticker and header become smoked glass floating on the sky ---------- */
/* each strip is locked to its token height, so pulling the hero up by the token sum is exact */
/* this lab page is short, so the site's altitude moon would rise over the deals; the home page never reaches that altitude here */
body.hxd-page .sky__moon{display:none}
body.hxd-page .topbar{height:var(--top-h);border-bottom:0;background:linear-gradient(180deg,rgba(20,13,32,.44),rgba(20,13,32,.32));-webkit-backdrop-filter:blur(14px) saturate(150%);backdrop-filter:blur(14px) saturate(150%);box-shadow:inset 0 1px 0 rgba(255,255,255,.13),inset 0 -1px 0 rgba(255,255,255,.07);color:#E9E3F3}
body.hxd-page .topbar__in{height:100%;min-height:0}
body.hxd-page .topbar p{white-space:nowrap;min-width:0}
body.hxd-page .topbar .ic{color:var(--violet-hi)}
body.hxd-page .topbar b{color:#fff}
body.hxd-page .topbar__21{border-color:rgba(187,170,255,.6);color:#fff}
body.hxd-page .topbar .status,body.hxd-page .topbar .status.is-open{color:#E9E3F3}
body.hxd-page .topbar__links a:hover{color:var(--violet-neon)}
body.hxd-page .ticker{border-bottom:0;background:linear-gradient(180deg,rgba(10,6,16,.62),rgba(10,6,16,.52));-webkit-backdrop-filter:blur(10px) saturate(140%);backdrop-filter:blur(10px) saturate(140%);box-shadow:inset 0 1px 0 rgba(255,190,120,.16),inset 0 -1px 0 rgba(255,155,66,.24)}
/* the strip's glass runs edge to edge (the site's mask would fade the glass too); only the LED text dims at the ends */
body.hxd-page .ticker{-webkit-mask-image:none;mask-image:none}
body.hxd-page .ticker::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(13,8,20,.94),rgba(13,8,20,0) 7%,rgba(13,8,20,0) 93%,rgba(13,8,20,.94))}
body.hxd-page .ticker::after{z-index:2;background:repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 1px,transparent 1px 3px)}
/* header: clear smoked glass at rest; scrolled (or a menu open) it deepens to the site's night glass (opacity only) */
body.hxd-page .hdr::before{opacity:1;border-bottom:0;background:linear-gradient(180deg,rgba(28,19,44,.26),rgba(28,19,44,.15));-webkit-backdrop-filter:blur(16px) saturate(150%);backdrop-filter:blur(16px) saturate(150%);box-shadow:inset 0 1px 0 rgba(255,255,255,.14),inset 0 -1px 0 rgba(255,255,255,.08),0 24px 40px -32px rgba(12,8,18,.7)}
body.hxd-page .hdr::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(14,10,20,.9),rgba(18,13,25,.74));opacity:0;transition:opacity .45s var(--ease)}
body.hxd-page .hdr.is-solid::after,body.hxd-page .hdr.mega-open::after{opacity:1}
body.hxd-page .nav__link::after{background:var(--violet-hi);box-shadow:0 0 10px rgba(169,155,240,.85)}
body.hxd-page .nav__more{color:#D9D2E6}
body.hxd-page .nav__item.is-open .nav__more .ic{color:var(--violet-hi)}
body.hxd-page .logo__sub{color:#DCD5E8;border-left-color:rgba(255,255,255,.24)}
body.hxd-page .hdr__acct{color:#E9E3F3;box-shadow:inset 0 0 0 1px rgba(255,255,255,.26)}
body.hxd-page .hdr__acct:hover{color:var(--violet-neon);box-shadow:inset 0 0 0 1px var(--violet-hi)}
body.hxd-page .hdr__burger{background:rgba(20,13,32,.34);box-shadow:inset 0 0 0 1px rgba(255,255,255,.24)}
/* without JS nobody adds .is-solid: where scroll timelines exist, scrolling deepens the glass by itself */
@supports (animation-timeline: scroll()){
  html:not(.js) body.hxd-page .hdr::after{animation:hxd-solid linear both;animation-timeline:scroll(root);animation-range:0 48px}
}
@keyframes hxd-solid{from{opacity:0}to{opacity:1}}
/* the strip keeps one line at every width: tighter type first; below 1024 the open status steps aside (the hero repeats it) */
body.hxd-page .topbar .status{font-size:inherit}
@media (max-width: 1180px){ body.hxd-page .topbar{font-size:.84rem;letter-spacing:.05em} body.hxd-page .topbar b{letter-spacing:.08em} }
@media (max-width: 1023px){ body.hxd-page .topbar .topbar__mid{display:none} }
@media (max-width: 900px){ body.hxd-page .topbar{font-size:.82rem} }

/* ---------- the hero ---------- */
/* --hxd-top: where the header starts inside the hero; --hxd-chrome: all three strips; --hxd-sea: the strip at the bottom
   the next band's cloud sea climbs over (the copy never sits there) */
.hxd{--hxd-pad:max(var(--gutter),calc((100cqw - 1360px)/2 + var(--gutter)));--hxd-cw:min(540px,calc(41.5cqw - var(--hxd-pad) - 30px));--hxd-top:calc(var(--top-h) + var(--tick-h));--hxd-chrome:calc(var(--hxd-top) + var(--hdr-h));--hxd-sea:clamp(150px,15vw,220px);position:relative;isolation:isolate;overflow:clip;container-type:inline-size;margin-top:calc(-1*var(--hxd-chrome));min-height:max(660px,100svh);display:grid;align-items:center;padding:calc(var(--hxd-chrome) + 26px) 0 calc(var(--hxd-sea) + 12px);background:#776a82}
/* frame geometry, resolved against the stage (a size container): the scene is the hero below the top bar + ticker, so
   the storefront sits exactly where Levitate puts it; --fw width, --fl left, --ft top of the frame, --wf word size */
.hxd-stage{--sh:calc(100cqh - var(--hxd-top));--fw:max(103cqw,calc(var(--sh)*1.845));--fl:calc((100cqw - var(--fw))*.415);--ft:max(calc(var(--hxd-top) + (var(--sh) - var(--fw)/${RATIO.toFixed(4)})*.12),calc(var(--hxd-chrome) + 44px - var(--fw)*.0804));--wf:min(calc(var(--fw)*.0775),calc((58.5cqw - var(--gutter))/6.25));position:absolute;inset:0;z-index:0;container-type:size;overflow:clip;pointer-events:none}
.hxd-f{position:absolute;left:var(--fl);top:var(--ft);width:var(--fw);aspect-ratio:2752/1536;will-change:transform}
.hxd-plate{position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;object-fit:cover}
/* the plate mirrored above and below itself: its own top row continues the sky up behind the glass, its bottom row
   continues the cloud sea down, so no edge of the photo can ever show */
.hxd-over{top:auto;bottom:100%;transform:scaleY(-1)}
.hxd-under{top:100%;transform:scaleY(-1)}
/* the sky deepens toward the zenith (behind the glass strips), never a band */
.hxd-zenith{position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,16,42,.34) 0,rgba(26,16,42,.25) var(--hxd-top),rgba(26,16,42,.11) var(--hxd-chrome),rgba(26,16,42,0) calc(var(--hxd-chrome) + 150px))}
/* a plum pool behind the copy only: it fades out before the cloud sea, which stays bright edge to edge */
.hxd-skygrade{position:absolute;inset:0;background:radial-gradient(44% 56% at 22% 52%,rgba(18,12,28,.6),rgba(18,12,28,0) 100%),linear-gradient(90deg,rgba(17,11,25,.7) 0%,rgba(17,11,25,.62) 25%,rgba(17,11,25,.56) 37%,rgba(17,11,25,.32) 45%,rgba(17,11,25,.1) 51%,rgba(17,11,25,0) 56%);-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.25) 0,#000 calc(var(--hxd-chrome) + 60px),#000 calc(100% - var(--hxd-sea) + 6px),transparent calc(100% - var(--hxd-sea) + 118px));mask-image:linear-gradient(180deg,rgba(0,0,0,.25) 0,#000 calc(var(--hxd-chrome) + 60px),#000 calc(100% - var(--hxd-sea) + 6px),transparent calc(100% - var(--hxd-sea) + 118px))}
/* the brand words behind the building (white and lilac, never gold); both lines start at the same x. The glyphs rise
   about .12 of the word size above their line box, so the clamp keeps the visible letters 44px under the header */
.hxd-words{position:absolute;inset:0;will-change:transform}
.hxd-wbox{position:absolute;top:max(calc(var(--ft) + var(--fw)*.2071 - 1.55*var(--wf)),calc(var(--hxd-chrome) + 44px + var(--wf)*.12));right:max(calc(100cqw - var(--fl) - var(--fw)*.934),var(--gutter));margin:0;font:400 calc(var(--wf)*.94)/.9 var(--f-display);text-align:left;white-space:nowrap}
.hxd-w{display:block;will-change:transform}
.hxd-wi{display:block;color:#fff;letter-spacing:.004em;text-shadow:0 2px 0 rgba(26,20,36,.16),0 16px 44px rgba(26,20,36,.42),0 0 54px rgba(169,155,240,.62)}
.hxd-w2 .hxd-wi{color:#F3EEFF;text-shadow:0 2px 0 rgba(26,20,36,.16),0 16px 44px rgba(26,20,36,.42),0 0 64px rgba(123,106,196,.72)}
/* the building, exactly where it sits in the frame; its ragged base fades out into the cloud bank */
.hxd-bob{position:absolute;left:${pc(b.x)};top:${pc(b.y)};width:${pc(b.w)};height:${pc(b.h)}}
.hxd-lift{position:absolute;inset:0;-webkit-mask-image:linear-gradient(180deg,#000 74%,rgba(0,0,0,.55) 86%,transparent 97%);mask-image:linear-gradient(180deg,#000 74%,rgba(0,0,0,.55) 86%,transparent 97%)}
.hxd-bimg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}
/* the cut-out's alpha holes are filled with the original edit's own pixels, clipped inside the walls */
.hxd-back{position:absolute;inset:0;overflow:hidden;clip-path:polygon(11.2% 36%,93.6% 17%,93.6% 66%,72% 72%,70% 93%,11.2% 93%)}
.hxd-backimg{position:absolute;max-width:none;width:${pc(1 / b.w)};height:${pc(1 / b.h)};left:${pc(-b.x / b.w)};top:${pc(-b.y / b.h)}}
/* front cloud bank (a masked copy of the plate): climbs to the right like the original edit, and now runs the full
   width at the base so the sea is one surface */
.hxd-bank{-webkit-mask-image:linear-gradient(90deg,transparent 30%,#000 44%),radial-gradient(26% 21% at 91% 79%,#000 35%,rgba(0,0,0,.55) 62%,transparent 100%),linear-gradient(180deg,transparent 69%,rgba(0,0,0,.7) 76%,#000 82%);-webkit-mask-composite:source-in,source-over,source-over;mask-image:linear-gradient(90deg,transparent 30%,#000 44%),radial-gradient(26% 21% at 91% 79%,#000 35%,rgba(0,0,0,.55) 62%,transparent 100%),linear-gradient(180deg,transparent 69%,rgba(0,0,0,.7) 76%,#000 82%);mask-composite:intersect,add,add}
/* drifting haze: each strip one tile wider than its box, sliding exactly one tile */
.hxd-fog{position:absolute;left:-24px;right:-24px;bottom:0;height:50%;mix-blend-mode:screen;will-change:transform,opacity;-webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,.3) 14%,#000 50%),linear-gradient(180deg,transparent,#000 46%);-webkit-mask-composite:source-in,source-over;mask-image:linear-gradient(90deg,rgba(0,0,0,.3) 14%,#000 50%),linear-gradient(180deg,transparent,#000 46%);mask-composite:intersect,add}
.hxd-fog i{position:absolute;left:0;width:calc(100% + 1200px);background-repeat:repeat-x;background-size:1200px 100%;will-change:transform;-webkit-mask-image:linear-gradient(180deg,transparent,#000 38%,#000 72%,transparent);mask-image:linear-gradient(180deg,transparent,#000 38%,#000 72%,transparent)}
.hxd-fog i:nth-child(1){bottom:0;height:78%;background-image:${fog('sodium')};opacity:.6}
.hxd-fog i:nth-child(2){bottom:16%;height:56%;background-image:${fog('silver')};opacity:.5}
.hxd-fog i:nth-child(3){bottom:-6%;height:60%;background-image:${fog('silver')};background-size:1200px 130%;opacity:.44}
.hxd-haze{position:absolute;inset:0;opacity:0;background:radial-gradient(70% 70% at 62% 100%,rgba(255,236,206,.7),rgba(255,214,170,.28) 45%,transparent 75%)}
.hxd-grade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(255,206,150,.12),rgba(255,206,150,0) 30%)}
/* copy */
.hxd-in{position:relative;z-index:2;width:100%;padding:0 var(--hxd-pad)}
.hxd-copy{max-width:var(--hxd-cw);text-shadow:0 2px 20px rgba(10,7,14,.5)}
/* the eyebrow is words only: no rule beside it, no dash in it (owner rule, round 4) */
.hxd-kicker{margin:0 0 18px;font:700 clamp(.74rem,calc(var(--hxd-cw)/31),.86rem)/1.3 var(--f-ui);letter-spacing:clamp(.06em,calc(var(--hxd-cw)/41 - .46em),.24em);text-transform:uppercase;color:var(--text-2)}
.hxd-h1{margin:0 0 18px;font-family:var(--f-display);font-size:min(2.75rem,calc(var(--hxd-cw)/12.1));line-height:1.04;letter-spacing:.004em;color:var(--text);text-wrap:balance}
.hxd-h1 em{display:block;font-style:normal;color:var(--violet-hi);text-shadow:0 0 30px rgba(123,106,196,.7),0 2px 18px rgba(10,7,14,.5)}
.hxd-lede{max-width:44ch;margin:0;font-size:clamp(1.02rem,1.25vw,1.14rem);line-height:1.62;color:var(--text);text-wrap:pretty}
.hxd-cta{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0 20px;text-shadow:none}
.hxd-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px;margin:0;font:600 1rem var(--f-ui);letter-spacing:.06em}
.hxd-meta a{display:inline-flex;gap:.45em;align-items:center;color:var(--text);text-decoration:none;border-radius:6px}
.hxd-meta a:hover{color:var(--violet-hi)}
.hxd-meta .ic{width:1.1em;height:1.1em}
.hxd-meta .status{color:var(--text)}
.hxd :focus-visible{outline:2px solid var(--violet-neon);outline-offset:4px}

/* ---------- BELOW: the cloud sea becomes the ground the three signs stand on ---------- */
/* --hxd-rise: how far the band's cloud sea climbs over the hero (= the hero's --hxd-sea, so they always overlap) */
body.hxd-page{--hxd-cl:${CLOUD_L};--hxd-cs:${CLOUD_S};--hxd-rm:${CLOUD_RISE}}
body.hxd-page .band--placards-top{--hxd-rise:clamp(150px,15vw,220px);--hxd-rw:1200px;margin-top:0;padding:clamp(26px,3vw,46px) 0 clamp(230px,22vw,330px)}
/* the brick wall, measured up from the band's bottom so it holds at every width: absent at the top, it fades in beneath
   the clouds, lit warm by their glow, darkens, and dissolves into the night sky the deals band also shows */
body.hxd-page .band--placards-top::before{opacity:1;background:radial-gradient(82% 200px at 50% calc(100% - 226px),rgba(255,160,86,.36),rgba(255,160,86,.13) 46%,rgba(255,160,86,0) 78%),linear-gradient(180deg,rgba(30,20,40,.08) calc(100% - 340px),rgba(25,17,34,.26) calc(100% - 210px),rgba(19,13,27,.68) calc(100% - 100px),rgba(16,11,22,.92) 100%),var(--brick);background-size:auto,auto,56px 28px;-webkit-mask-image:linear-gradient(180deg,transparent calc(100% - 640px),rgba(0,0,0,.6) calc(100% - 470px),#000 calc(100% - 340px),#000 calc(100% - 236px),rgba(0,0,0,.74) calc(100% - 176px),rgba(0,0,0,.42) calc(100% - 112px),rgba(0,0,0,.15) calc(100% - 50px),transparent 100%);mask-image:linear-gradient(180deg,transparent calc(100% - 640px),rgba(0,0,0,.6) calc(100% - 470px),#000 calc(100% - 340px),#000 calc(100% - 236px),rgba(0,0,0,.74) calc(100% - 176px),rgba(0,0,0,.42) calc(100% - 112px),rgba(0,0,0,.15) calc(100% - 50px),transparent 100%)}
/* the cloud sea itself: the plate's own clouds, nearer (so larger), climbing over the hero's last pixels and thinning
   to show the wall as it sinks toward dusk */
body.hxd-page .band--placards-top::after{content:"";position:absolute;z-index:-1;pointer-events:none;left:-72px;right:-72px;top:calc(-1*var(--hxd-rise));bottom:30%;background:linear-gradient(180deg,rgba(40,26,58,0) 0%,rgba(40,26,58,0) 38%,rgba(38,25,54,.34) 68%,rgba(30,20,42,.62) 100%),${seaWide} 50% 100%/max(100%,3100px) auto no-repeat;-webkit-mask-image:var(--hxd-rm),linear-gradient(180deg,#000 0,#000 62%,transparent 100%);-webkit-mask-size:var(--hxd-rw) calc(var(--hxd-rise) - 8px),100% calc(100% - var(--hxd-rise) + 48px);-webkit-mask-position:0 0,0 100%;-webkit-mask-repeat:repeat-x,no-repeat;-webkit-mask-composite:source-over;mask-image:var(--hxd-rm),linear-gradient(180deg,#000 0,#000 62%,transparent 100%);mask-size:var(--hxd-rw) calc(var(--hxd-rise) - 8px),100% calc(100% - var(--hxd-rise) + 48px);mask-position:0 0,0 100%;mask-repeat:repeat-x,no-repeat;mask-composite:add;translate:calc(var(--hxd-mx,0)*-24px) calc(var(--hxd-my,0)*-10px)}
/* the signs stand in it: a little more base for the near clouds to cover without touching a word */
/* no perspective on the row: with the clouds inside it WebKit clips the 21+ badge, and each sign's tilt carries its own */
body.hxd-page .band--placards-top .placards{position:relative;perspective:none}
body.hxd-page .band--placards-top .placard{padding-bottom:78px;box-shadow:0 30px 50px -26px rgba(20,10,30,.7)}
body.hxd-page .band--placards-top .placard--plaque{box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -3px 8px rgba(0,0,0,.35),inset 0 0 0 6px rgba(0,0,0,.06),0 30px 50px -26px rgba(20,10,30,.7)}
body.hxd-page .band--placards-top .placard--sign{box-shadow:inset 0 0 0 5px #2e1c45,inset 0 0 0 7px rgba(255,255,255,.9),0 30px 50px -26px rgba(20,10,30,.7)}
body.hxd-page .band--placards-top .placard--transit{box-shadow:inset 0 6px 0 var(--violet),inset 0 0 0 1px rgba(255,255,255,.08),0 30px 50px -26px rgba(20,10,30,.7)}
/* the license number holds one line, sized to the plaque it sits on (the plaque is the container) */
body.hxd-page .band--placards-top .placard--plaque{container-type:inline-size;padding-left:20px;padding-right:20px}
body.hxd-page .band--placards-top .placard__lic{font-size:min(1.6rem,calc(100cqw/13.6));white-space:nowrap}
/* near clouds across the bases: anchored to the bottom of a grid row (an absolutely placed box takes the grid area named
   by BOTH its row lines; an auto end line would mean the container's edge), so they sit on the bases whether the signs
   stand in a row or in a stack. Row 1 always has a bank of real cloud; the second pseudo-element is drifting mist on a
   single row and the second bank once the signs stack */
body.hxd-page .band--placards-top .placards::before,body.hxd-page .band--placards-top .placards::after{content:"";position:absolute;z-index:4;pointer-events:none;grid-column:1/-1;grid-row:1/2}
body.hxd-page .band--placards-top .placards::before{left:calc(50% - 50vw - 100px);width:calc(100vw + 200px);${bank('--hxd-cl', 1200, 240, 144)};translate:calc(var(--hxd-mx,0)*-34px) 0}
body.hxd-page .band--placards-top .placards::after{left:calc(50% - 50vw);width:calc(100vw + 1200px);bottom:-70px;height:170px;${mist('sodium', '.3')}}
/* a last veil of mist where the lowest sign meets the wall */
body.hxd-page .band--placards-top .band__in::after{content:"";position:absolute;z-index:4;pointer-events:none;left:calc(50% - 50vw);width:calc(100vw + 1200px);bottom:-120px;height:190px;${mist('silver', '.2')}}
/* the deals continue from the same night ground */
body.hxd-page .band--deals{padding-top:clamp(40px,4.4vw,70px)}

/* motion: only with JS and without a reduced-motion preference; paused while off screen */
@media (prefers-reduced-motion: no-preference){
  html.js:not(.rm) .hxd-lift{animation:hxd-rise 1.7s var(--ease) .05s both}
  html.js:not(.rm) .hxd-wi{animation:hxd-wordin 1.25s var(--ease) .15s both}
  html.js:not(.rm) .hxd-w2 .hxd-wi{animation-delay:.32s}
  html.js:not(.rm) .hxd-copy{animation:hxd-copyin .95s var(--ease) .2s both}
  html.js:not(.rm) .hxd-bob{animation:hxd-bob 6.5s var(--ease-io) 1.6s infinite alternate}
  html.js:not(.rm) .hxd-fog i{animation:hxd-drift 110s linear infinite}
  html.js:not(.rm) .hxd-fog i:nth-child(2){animation-duration:74s;animation-direction:reverse}
  html.js:not(.rm) .hxd-fog i:nth-child(3){animation-duration:150s}
  html.js:not(.rm) body.hxd-page .band--placards-top .placards::before{animation:hxd-sway 34s var(--ease-io) infinite alternate}
  html.js:not(.rm) body.hxd-page .band--placards-top .placards::after{animation:hxd-drift 70s linear infinite reverse}
  html.js:not(.rm) body.hxd-page .band--placards-top .band__in::after{animation:hxd-drift 130s linear infinite}
  html.js:not(.rm) .hxd.hxd-off .hxd-bob,html.js:not(.rm) .hxd.hxd-off .hxd-fog i,html.js:not(.rm) body.hxd-page .band--placards-top.hxd-off .placards::before,html.js:not(.rm) body.hxd-page .band--placards-top.hxd-off .placards::after,html.js:not(.rm) body.hxd-page .band--placards-top.hxd-off .band__in::after{animation-play-state:paused}
}
@keyframes hxd-rise{from{transform:translate3d(0,12%,0);opacity:0}35%{opacity:1}to{transform:none;opacity:1}}
@keyframes hxd-wordin{from{transform:translate3d(0,.3em,0);opacity:0;filter:blur(10px)}to{transform:none;opacity:1;filter:none}}
@keyframes hxd-copyin{from{transform:translate3d(0,16px,0);opacity:0}to{transform:none;opacity:1}}
@keyframes hxd-bob{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-1.7%,0)}}
@keyframes hxd-drift{to{transform:translate3d(-1200px,0,0)}}
@keyframes hxd-sway{from{transform:translate3d(-48px,0,0)}to{transform:translate3d(48px,0,0)}}

/* small laptops: a little more room for the copy so both buttons share a line; the HOPEline address stays on one line */
@media (max-width: 1180px){
  .hxd{--hxd-cw:min(540px,calc(45cqw - var(--hxd-pad) - 16px))}
  /* the copy reaches further across here, so the plum pool behind it does too */
  .hxd-skygrade{background:radial-gradient(52% 58% at 24% 54%,rgba(18,12,28,.62),rgba(18,12,28,0) 100%),linear-gradient(90deg,rgba(17,11,25,.72) 0%,rgba(17,11,25,.66) 30%,rgba(17,11,25,.62) 42%,rgba(17,11,25,.36) 49%,rgba(17,11,25,.1) 55%,rgba(17,11,25,0) 60%)}
  .hxd-cta .btn{padding:0 1.2em;font-size:1rem}
  .hxd-lede{max-width:min(44ch,calc(41.5cqw - var(--hxd-pad) - 14px))}
}
@media (min-width: 1024px) and (max-width: 1180px){
  body.hxd-page .band--placards-top .placard__rows li{grid-template-columns:46px 1fr;gap:8px}
  body.hxd-page .band--placards-top .placard__rows a{font-size:1rem;letter-spacing:.02em}
}

/* ---------- stacked: phones and portrait screens. The art sits on top, the copy flows below it on dusk ---------- */
@media (max-width: 760px), (max-aspect-ratio: 11/10){
  /* --hxd-art: art height under the header; --hxd-fwq: frame width; --hxd-bt: building top under the header. The words
     stand .0837 of the frame width above the building, so the px term in --hxd-bt is their clearance under the header */
  .hxd{--hxd-art:84cqw;--hxd-fwq:207cqw;--hxd-bt:calc(17.3cqw + 25px);--hxd-cw:calc(100cqw - 2*var(--hxd-pad));--hxd-sea:130px;align-items:start;padding:calc(var(--hxd-chrome) + var(--hxd-art)) 0 calc(var(--hxd-sea) + 16px)}
  .hxd-stage{--fw:var(--hxd-fwq);--fl:calc(50cqw - var(--fw)*.666);--ft:calc(var(--hxd-chrome) + var(--hxd-bt) - var(--fw)*.1697);--wf:calc(var(--fw)*.0655)}
  .hxd-wbox{right:auto;left:calc(var(--fl) + var(--fw)*.666);top:calc(var(--ft) + var(--fw)*.086);transform:translateX(-50%);text-align:left;line-height:.88}
  .hxd-skygrade{display:none}
  .hxd-lede{max-width:44ch}
  /* the copy sits on the cloud deck as it falls into dusk; it lightens again where the next band's clouds rise */
  .hxd-grade{background:linear-gradient(180deg,rgba(24,16,36,0) 0%,rgba(24,16,36,0) calc(var(--hxd-chrome) + var(--hxd-art) - 104px),rgba(24,16,36,.5) calc(var(--hxd-chrome) + var(--hxd-art) - 50px),rgba(24,16,36,.78) calc(var(--hxd-chrome) + var(--hxd-art) - 8px),rgba(24,16,36,.8) calc(100% - var(--hxd-sea) - 30px),rgba(24,16,36,.6) 100%)}
  .hxd-fog{height:calc(var(--hxd-chrome) + var(--hxd-art) + 40px);bottom:auto;top:0;-webkit-mask-image:linear-gradient(180deg,transparent 52%,#000 74%,transparent);mask-image:linear-gradient(180deg,transparent 52%,#000 74%,transparent)}
  body.hxd-page .band--placards-top{--hxd-rise:130px}
}
@media (min-width: 761px) and (max-aspect-ratio: 11/10){
  .hxd{--hxd-art:62cqw;--hxd-fwq:165cqw;--hxd-bt:calc(13.8cqw + 32px);--hxd-cw:min(640px,calc(100cqw - 2*var(--hxd-pad)))}
}
/* short phones: a smaller building so the buttons still reach the first screen */
@media (max-width: 760px) and (max-height: 700px){
  .hxd{--hxd-art:70cqw;--hxd-fwq:180cqw;--hxd-bt:calc(15.1cqw + 22px)}
}
@media (max-width: 760px){
  .hxd-kicker{font-size:.74rem;letter-spacing:.16em;margin-bottom:12px;color:var(--text)}
  .hxd-h1{font-size:min(2.05rem,calc(var(--hxd-cw)/12.05));margin-bottom:12px}
  .hxd-h1 em{color:var(--violet-neon)}
  .hxd-lede{font-size:.98rem;line-height:1.52}
  .hxd-cta{gap:10px;margin:18px 0 14px}
  .hxd-cta .btn{--h:50px;flex:1 1 auto;padding:0 .9em;font-size:.95rem;letter-spacing:.06em}
  .hxd-meta{gap:6px 18px;font-size:.95rem}
}
/* stacked signs: the second row gets its own bank of cloud to stand in, and the rows part to make room for it */
@media (max-width: 1023px){
  /* a tall stack would stretch the sea: it keeps a fixed depth, and the photo a fixed scale, so its top is dense cloud */
  body.hxd-page .band--placards-top::after{bottom:auto;height:calc(var(--hxd-rise) + 640px);background-size:auto,auto 2000px;background-position:0 0,58% 100%}
  body.hxd-page .band--placards-top .placards{row-gap:92px}
  body.hxd-page .band--placards-top .placards::before{${bank('--hxd-cl', 1200, 240, 144, .4)}}
  body.hxd-page .band--placards-top .placards::after{grid-row:2/3;left:calc(50% - 50vw - 100px);width:calc(100vw + 200px);opacity:1;mix-blend-mode:normal;${bank('--hxd-cl', 1200, 240, 144, .9, 460)};translate:calc(var(--hxd-mx,0)*-34px) 0}
  @media (prefers-reduced-motion: no-preference){
    html.js:not(.rm) body.hxd-page .band--placards-top .placards::after{animation:hxd-sway 28s var(--ease-io) infinite alternate-reverse}
  }
}
/* phones: smaller clouds to match the smaller signs */
@media (max-width: 760px){
  body.hxd-page .band--placards-top{--hxd-rw:720px}
  body.hxd-page .band--placards-top::after{height:calc(var(--hxd-rise) + 610px);background-position:0 0,64% 100%}
  body.hxd-page .band--placards-top .placards{row-gap:72px}
  body.hxd-page .band--placards-top .placard{padding-bottom:60px}
  body.hxd-page .band--placards-top .placards::before{${bank('--hxd-cs', 800, 150, 94, .28)}}
  body.hxd-page .band--placards-top .placards::after{${bank('--hxd-cs', 800, 150, 94, .55, 310)}}
  /* the lowest sign stands in cloud too */
  body.hxd-page .band--placards-top .band__in::after{left:calc(50% - 50vw - 100px);width:calc(100vw + 200px);opacity:1;mix-blend-mode:normal;${bank('--hxd-cs', 800, 150, 94, .95, 590)};translate:calc(var(--hxd-mx,0)*-34px) 0}
  @media (prefers-reduced-motion: no-preference){
    html.js:not(.rm) body.hxd-page .band--placards-top .band__in::after{animation:hxd-sway 31s var(--ease-io) infinite alternate}
  }
}
@media (max-width: 380px){ .hxd-cta .btn .ic{display:none} }`;

  const inlineJs = `(function(){
  var hero=document.querySelector('[data-hxd]');if(!hero)return;
  var W=window,root=document.documentElement,band=document.querySelector('.band--placards-top');
  if(W.matchMedia('(prefers-reduced-motion: reduce)').matches||root.classList.contains('rm'))return;
  var FINE=W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var q=function(s){return hero.querySelector(s);};
  var L={sky:q('.hxd-sky'),words:q('.hxd-words'),bld:q('.hxd-bld'),bank:q('.hxd-bank'),fog:q('.hxd-fog')};
  var w1=q('.hxd-w1'),w2=q('.hxd-w2'),haze=q('.hxd-haze');
  /* depth per layer: [cursor x px, cursor y px, scroll factor]; a negative scroll factor rises faster than the page */
  var D={sky:[5,3,.18],words:[9,5,.12],bld:[14,8,-.2],bank:[18,10,.1],fog:[22,12,.05]};
  var tx=0,ty=0,cx=0,cy=0,raf=0,heroIn=true,bandIn=false,H=hero.offsetHeight||1;
  function tf(el,x,y){if(el)el.style.transform='translate3d('+x.toFixed(2)+'px,'+y.toFixed(2)+'px,0)';}
  function frame(){
    raf=0;cx+=(tx-cx)*.075;cy+=(ty-cy)*.075;
    if(heroIn){
      var s=Math.max(0,Math.min(W.scrollY||0,H)),p=s/H;
      for(var k in D)tf(L[k],-cx*D[k][0],-cy*D[k][1]+s*D[k][2]);
      tf(w1,0,-s*.05);tf(w2,0,s*.05);
      if(L.fog)L.fog.style.opacity=(.8+p*.2).toFixed(3);
      if(haze)haze.style.opacity=Math.min(1,p*1.6).toFixed(3);
    }
    /* the cloud sea in the next band is the nearest layer: it follows the same cursor, furthest of all */
    if(band&&FINE){band.style.setProperty('--hxd-mx',cx.toFixed(4));band.style.setProperty('--hxd-my',cy.toFixed(4));}
    if(Math.abs(tx-cx)>.002||Math.abs(ty-cy)>.002)raf=W.requestAnimationFrame(frame);
  }
  function kick(){if(!raf&&(heroIn||bandIn))raf=W.requestAnimationFrame(frame);}
  W.addEventListener('scroll',kick,{passive:true});
  W.addEventListener('resize',function(){H=hero.offsetHeight||1;kick();},{passive:true});
  if(FINE){
    W.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;tx=e.clientX/W.innerWidth*2-1;ty=e.clientY/W.innerHeight*2-1;kick();},{passive:true});
    document.addEventListener('mouseleave',function(){tx=0;ty=0;kick();});
  }
  if('IntersectionObserver' in W){
    new IntersectionObserver(function(en){heroIn=en[0].isIntersecting;hero.classList.toggle('hxd-off',!heroIn);kick();}).observe(hero);
    if(band)new IntersectionObserver(function(en){bandIn=en[0].isIntersecting;band.classList.toggle('hxd-off',!bandIn);kick();},{rootMargin:'120px 0px'}).observe(band);
  }
  kick();
})();`;

  return {
    path: '/lab/hero-d/',
    title: 'Hero D: Open sky | Elevated Dreams redesign',
    desc: 'Hero option D: the golden-hour sky runs from the top of the page behind the bars and the menu, and the cloud sea becomes the ground the license, warning and HOPEline signs stand on.',
    bodyClass: 'is-lab is-home hxd-page',
    preload: `<link rel="preload" as="image" imagesrcset="${srcset('hero-plate-b')}" imagesizes="${plateSizes}" fetchpriority="high"><link rel="preload" as="image" imagesrcset="${srcset('hero-building-b')}" imagesizes="${bldSizes}">`,
    body,
    inlineCss,
    inlineJs,
    replay: false,
  };
}
