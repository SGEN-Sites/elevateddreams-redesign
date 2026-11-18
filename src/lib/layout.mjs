// layout.mjs: the page shell. Head, elevator loader, routing age gate, altitude stage, chrome, footer, pickup bar.
import { esc, u, asset, icon, img, imgSrc, btn, shopAttrs, statusLine } from './html.mjs';
import { skyline } from './skyline.mjs';
import { store, SHOP, compliance, nav, categories, feelings, home, areas, STORE_ORIGIN } from '../content/site.mjs';

const SITE = 'https://elevateddreamscannabisny.com';
const brandMark = (cls = 'logo') => `<span class="${cls}__lock" aria-hidden="true"><span class="${cls}__top">ELEVATED</span><span class="${cls}__shadow"></span><span class="${cls}__base">DREAMS</span></span>`;

function head(p, ctx) {
  const canonical = SITE + (p.canonical ?? (p.path === '/' ? '/' : p.path.replace(/\/$/, '')));
  const ld = (p.schema || []).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  const og = p.ogImage || imgSrc('scene-hero-river', 1400);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="${ctx.preview ? 'noindex, nofollow' : 'index, follow'}">
<link rel="canonical" href="${canonical}">
<meta property="og:site_name" content="Elevated Dreams">
<meta property="og:type" content="${p.ogType || 'website'}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1A1424">
<link rel="icon" type="image/svg+xml" href="${asset('img/favicon.svg')}">
<link rel="preload" href="${asset('fonts/ultra-400.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset('fonts/barlow-condensed-700.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset('fonts/barlow-400.woff2')}" as="font" type="font/woff2" crossorigin>
${p.preload || ''}
<link rel="stylesheet" href="${asset('css/site.css')}">
<script>(function(d,w){var h=d.documentElement,c='js';try{var rm=w.matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm)c+=' rm';var ss=w.sessionStorage,ls=w.localStorage;if(!rm&&!ss.getItem('ed.lift'))c+=' lift-on';if(ls.getItem('ed.age')!=='1')c+=' gate-on';if(!rm&&ss.getItem('ed.door')==='1'){c+=' is-arriving';ss.removeItem('ed.door');}}catch(e){}h.className+=' '+c;w.setTimeout(function(){if(!h.classList.contains('site-ready')){h.classList.remove('gate-on','lift-on','is-arriving');h.classList.add('reveal-all');}},4000);})(document,window);</script>
${ld}
</head>`;
}

function megaShop() {
  return `<div class="mega" id="mega-shop" data-mega hidden>
  <div class="mega__in">
    <div class="mega__col mega__col--cats">
      <p class="mega__h">Shop by category <span>opens the live menu</span></p>
      <ul class="mega__cats">${categories.map((c) => `<li><a href="${SHOP.menu}" ${shopAttrs} data-cat="${c.id}">${img(c.img, { alt: '', cls: 'mega__obj', sizes: '56px' })}<span>${esc(c.label)}</span>${icon('ne')}</a></li>`).join('')}
        <li><a href="${SHOP.menu}" ${shopAttrs} class="mega__all"><span>All Products</span>${icon('ne')}</a></li></ul>
    </div>
    <div class="mega__col">
      <p class="mega__h">Shop by feeling</p>
      <ul class="mega__list">${feelings.map((f) => `<li><a href="${SHOP.menu}" ${shopAttrs}><b>${f.floor}</b> ${esc(f.label)}${icon('ne')}</a></li>`).join('')}</ul>
      <p class="mega__h">Save</p>
      <ul class="mega__list"><li><a href="${u('/deals/')}">Tonight's deals${icon('arrow')}</a></li><li><a href="${SHOP.discounts}" ${shopAttrs}>Live discounts${icon('ne')}</a></li><li><a href="${u('/rewards/')}">Elevated Rewards${icon('arrow')}</a></li></ul>
    </div>
    <a class="mega__card" href="${u('/menu/')}">${img('scene-rooftops', { alt: '', sizes: '320px' })}<span class="mega__cardtxt"><b>The whole shop, one tap away</b><span>Every category, every feeling, the live menu.</span></span></a>
  </div>
</div>`;
}
function megaLearn() {
  return `<div class="mega" id="mega-learn" data-mega hidden>
  <div class="mega__in mega__in--3">
    <div class="mega__col"><p class="mega__h">Start here</p><ul class="mega__list">
      <li><a href="${u('/first-visit/')}">Your first visit${icon('arrow')}</a></li>
      <li><a href="${u('/education/')}">Cannabis Education${icon('arrow')}</a></li>
      <li><a href="${u('/faq/')}">FAQ${icon('arrow')}</a></li></ul></div>
    <div class="mega__col"><p class="mega__h">Guides</p><ul class="mega__list">
      <li><a href="${u('/learn/')}">All Learn articles${icon('arrow')}</a></li>
      <li><a href="${u('/learn/first-time-dispensary-shopper-cannabis-guide/')}">First-time shoppers${icon('arrow')}</a></li>
      <li><a href="${u('/learn/high-thc-cannabis-labels-elevated-dreams/')}">Reading labels${icon('arrow')}</a></li>
      <li><a href="${u('/learn/licensed-new-york-cannabis-dispensary-matters/')}">New York cannabis${icon('arrow')}</a></li></ul></div>
    <a class="mega__card" href="${u('/learn/')}">${img('scene-fire-escape', { alt: '', sizes: '320px' })}<span class="mega__cardtxt"><b>Learn at your own pace</b><span>Written for people, not product hype.</span></span></a>
  </div>
</div>`;
}
function megaVisit() {
  return `<div class="mega" id="mega-visit" data-mega hidden>
  <div class="mega__in mega__in--3">
    <div class="mega__col"><p class="mega__h">The store</p><ul class="mega__list">
      <li><a href="${u('/visit/')}">Store, hours &amp; directions${icon('arrow')}</a></li>
      <li><a href="${u('/pickup/')}">Order for pickup${icon('arrow')}</a></li>
      <li><a href="${u('/delivery/')}">Delivery${icon('arrow')}</a></li>
      <li><a href="${u('/contact/')}">Contact${icon('arrow')}</a></li></ul></div>
    <div class="mega__col"><p class="mega__h">Around Newburgh</p><ul class="mega__list">
      <li><a href="${u('/community/')}">Community${icon('arrow')}</a></li>
      ${areas.map((a) => `<li><a href="${u(`/areas/${a.slug}-ny/`)}">Near ${esc(a.short)}${icon('arrow')}</a></li>`).join('')}</ul></div>
    <div class="mega__card mega__card--store">${img('live-exterior-close', { alt: 'Elevated Dreams LLC dispensary storefront and exterior signage', sizes: '320px' })}<span class="mega__cardtxt"><b>${esc(store.street)}</b><span>${store.city}, ${store.regionLong} ${store.zip}</span>${statusLine()}</span></div>
  </div>
</div>`;
}

function header(p) {
  const cur = (href) => (p.path === href || (href !== '/' && p.path.startsWith(href)) ? ' aria-current="page"' : '');
  const megas = { shop: megaShop(), learn: megaLearn(), visit: megaVisit() };
  return `<div class="topbar" role="region" aria-label="Licence and store status">
  <div class="topbar__in">
    <p class="topbar__lic">${icon('shield')}<span>NYS licensed adult-use dispensary</span> <b>${store.license}</b> <span class="topbar__21">21+</span></p>
    <p class="topbar__mid">${statusLine()}</p>
    <p class="topbar__links"><a href="tel:${compliance.hopeTel}">HOPEline ${compliance.hopeCall}</a><a href="tel:${store.tel}">${icon('phone')}${store.phone}</a></p>
  </div>
</div>
<div class="ticker" role="status" aria-label="Delivery now available">
  <div class="ticker__track" aria-hidden="true">${Array.from({ length: 2 }, () => `<span>DELIVERY NOW AVAILABLE</span><i>✦</i><span>ORDER ONLINE FOR PICKUP</span><i>✦</i><span>15% OFF YOUR FIRST VISIT</span><i>✦</i><span>BUY 3 PRE-ROLLS, GET 1 FREE</span><i>✦</i><span>FRI + SAT: 20% OFF ALL EDIBLES</span><i>✦</i><span>190 SOUTH PLANK ROAD · NEWBURGH</span><i>✦</i>`).join('')}</div>
  <span class="sr-only">Delivery now available. Order online for pickup.</span>
</div>
<header class="hdr" data-hdr>
  <div class="hdr__in">
    <a class="logo" href="${u('/')}" aria-label="Elevated Dreams, home">${brandMark('logo')}<span class="logo__sub">NEWBURGH · NY</span></a>
    <nav class="nav" aria-label="Main">
      <ul class="nav__list">${nav.map((n) => `<li class="nav__item${n.mega ? ' has-mega' : ''}"${n.mega ? ` data-mega-item="${n.mega}"` : ''}><a class="nav__link" href="${u(n.href)}"${cur(n.href)}>${esc(n.label)}</a>${n.mega ? `<button class="nav__more" type="button" aria-expanded="false" aria-controls="mega-${n.mega}" aria-label="${esc(n.label)} menu">${icon('chev')}</button>${megas[n.mega]}` : ''}</li>`).join('')}</ul>
    </nav>
    <div class="hdr__act">
      <a class="hdr__acct" href="${SHOP.account}" ${shopAttrs} aria-label="Customer account">${icon('user')}</a>
      <a class="btn btn--gold btn--sm hdr__shop" href="${SHOP.menu}" ${shopAttrs} data-magnet><span>Shop menu</span>${icon('ne')}</a>
      <button class="hdr__burger" type="button" aria-expanded="false" aria-controls="drawer" data-burger><span class="sr-only">Menu</span>${icon('menu')}</button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" data-drawer hidden>
  <div class="drawer__doors" aria-hidden="true"><i></i><i></i></div>
  <div class="drawer__in">
    <div class="drawer__top"><span class="drawer__floor" aria-hidden="true"><b>▲</b> MENU</span><button class="drawer__x" type="button" data-drawer-close aria-label="Close menu">${icon('close')}</button></div>
    <ul class="drawer__nav">
      <li><a href="${u('/')}">Home</a></li>
      ${nav.map((n, i) => `<li style="--i:${i + 1}"><a href="${u(n.href)}"${cur(n.href)}>${esc(n.label)}</a></li>`).join('')}
      <li style="--i:7"><a href="${u('/education/')}">Education</a></li>
      <li style="--i:8"><a href="${u('/community/')}">Community</a></li>
      <li style="--i:9"><a href="${u('/contact/')}">Contact</a></li>
    </ul>
    <div class="drawer__cats">${categories.map((c) => `<a href="${SHOP.menu}" ${shopAttrs}>${esc(c.label)}</a>`).join('')}<a href="${SHOP.menu}" ${shopAttrs}>All Products</a></div>
    <div class="drawer__foot">${btn('Shop the live menu', SHOP.menu, { shop: true })}
      <p>${statusLine()}</p>
      <p><a href="tel:${store.tel}">${icon('phone')} ${store.phone}</a> · <a href="${store.maps}" target="_blank" rel="noopener">${icon('pin')} Directions</a></p></div>
  </div>
</div>`;
}

const placards = () => `<div class="placards" data-reveal-group>
  <article class="placard placard--plaque" data-reveal data-tilt>
    <span class="screw screw--tl"></span><span class="screw screw--tr"></span><span class="screw screw--bl"></span><span class="screw screw--br"></span>
    <h2 class="placard__h">${compliance.licenseTitle}</h2>
    <p class="placard__p">${esc(compliance.licenseLine)}</p>
    <p class="placard__lic">${store.license}</p>
  </article>
  <article class="placard placard--sign" data-reveal data-tilt>
    <p class="placard__badge">21+ ONLY</p>
    <h2 class="placard__h">${compliance.warningTitle}</h2>
    <p class="placard__p">${esc(compliance.warning)}</p>
    <h3 class="placard__h2">${compliance.addTitle}</h3>
    <p class="placard__p">${esc(compliance.additional)}</p>
  </article>
  <article class="placard placard--transit" data-reveal data-tilt>
    <h2 class="placard__h"><span class="placard__dot" aria-hidden="true">H</span>${compliance.hopeTitle}</h2>
    <ul class="placard__rows">
      <li><span>CALL</span><a href="tel:${compliance.hopeTel}">${compliance.hopeCall}</a></li>
      <li><span>TEXT</span><a href="sms:${compliance.hopeTextTo}?body=${compliance.hopeText}">${compliance.hopeText} to ${compliance.hopeTextTo}</a></li>
      <li><span>WEB</span><a href="${compliance.hopeUrl}" target="_blank" rel="noopener">${compliance.hopeWeb}</a></li>
    </ul>
  </article>
</div>`;
export { placards };

function footer(ctx) {
  const col = (title, links) => `<details class="ftr__col" open><summary>${esc(title)}${icon('chev')}</summary><ul>${links.map(([l, h, ext]) => `<li><a href="${esc(/^https?:/.test(h) ? h : u(h))}"${ext ? ` ${shopAttrs}` : ''}>${esc(l)}${ext ? ' ↗' : ''}</a></li>`).join('')}</ul></details>`;
  return `<footer class="ftr" data-ftr>
  <div class="ftr__sky" aria-hidden="true">${img('scene-sky', { alt: '', sizes: '100vw' })}</div>
  <div class="ftr__cloud9" aria-hidden="true"><span>CLOUD</span><b>9</b></div>
  <div class="band__in ftr__in">
    <div class="ftr__brand">
      <a class="logo logo--ftr" href="${u('/')}" aria-label="Elevated Dreams, home">${brandMark('logo')}</a>
      <p class="ftr__blurb">${esc(home.footerBlurb)}</p>
      <p class="ftr__21">21+ Only</p>
      <address class="ftr__addr"><a href="${store.maps}" target="_blank" rel="noopener">${icon('pin')}<span>${esc(store.street)}<br>${store.city}, ${store.regionLong} ${store.zip}</span></a><a href="tel:${store.tel}">${icon('phone')}<span>${store.phone}</span></a></address>
      <div class="ftr__hours"><p class="ftr__h">HOURS</p><ul><li>${esc(store.hoursShort[0])}</li><li>${esc(store.hoursShort[1])}</li></ul>${statusLine()}</div>
    </div>
    <div class="ftr__cols">
      ${col('Shop', [['Live Menu', SHOP.menu, 1], ['Discounts', SHOP.discounts, 1], ['Customer Account', SHOP.account, 1], ['Shop hub', '/menu/'], ['Current Deals', '/deals/'], ['Elevated Rewards', '/rewards/']])}
      ${col('Visit', [['Store & hours', '/visit/'], ['Order for pickup', '/pickup/'], ['Delivery', '/delivery/'], ['Areas near us', '/areas/'], ['Contact', '/contact/']])}
      ${col('Learn', [['Your first visit', '/first-visit/'], ['Education', '/education/'], ['Learn', '/learn/'], ['FAQ', '/faq/']])}
      ${col('Company', [['Our Story', '/about/'], ['Community', '/community/'], ['Site map', '/sitemap/'], ['Privacy Policy', '/privacy-policy/'], ['Terms of Service', '/terms-of-service/']])}
    </div>
  </div>
  <div class="band__in ftr__legal">
    <div class="ftr__lic"><p class="ftr__h">LEGAL</p><p>OCM License Number: <b>${store.license}</b></p><p>${esc(compliance.footerLegal)}</p></div>
    <div class="ftr__help"><p class="ftr__h">NEED HELP?</p><p><b>New York State HOPEline</b></p><p>Call: <a href="tel:${compliance.hopeTel}">${compliance.hopeCall}</a> (${compliance.hopeCallDigits})</p><p>Text: <a href="sms:${compliance.hopeTextTo}?body=${compliance.hopeText}">${compliance.hopeText}</a> to ${compliance.hopeTextTo}</p><p>Web: <a href="${compliance.hopeUrl}" target="_blank" rel="noopener">${compliance.hopeWeb}</a></p></div>
    <a class="ftr__qr" href="${compliance.hopeUrl}" target="_blank" rel="noopener" aria-label="QR code linking to the New York State HOPEline website (opens in new tab)"><img src="${asset('img/hopeline-qr.svg')}" alt="" width="104" height="104" loading="lazy"><span>SCAN FOR HOPELINE</span></a>
  </div>
  <div class="band__in ftr__base">
    <p class="ftr__caps">${compliance.footerCaps}</p>
    <p>© 2026 Elevated Dreams LLC. All rights reserved.</p>
    ${ctx.preview ? '<p class="ftr__preview">Design concept preview, not the official Elevated Dreams website. Menu, discount and account links open the live Elevated Dreams online store.</p>' : ''}
  </div>
</footer>`;
}

const gate = () => `<div class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-q" data-gate>
  <div class="gate__panel">
    <div class="gate__ind" aria-hidden="true"><span>▲</span><b data-gate-floor>21</b></div>
    <p class="gate__brand">${brandMark('logo')}</p>
    <p class="kicker">AGE VERIFICATION</p>
    <div class="gate__step" data-gate-step="age">
      <h2 class="gate__q" id="gate-q">Are you 21 or older?</h2>
      <div class="gate__btns">
        <button class="gate__call" type="button" data-gate-yes><span class="gate__btn">21+</span><span>Yes, Enter</span></button>
        <button class="gate__call gate__call--no" type="button" data-gate-no><span class="gate__btn">✕</span><span>No, Leave</span></button>
      </div>
      <p class="gate__fine">${esc(compliance.ageGate)}</p>
    </div>
    <div class="gate__step" data-gate-step="route" hidden>
      <h2 class="gate__q" tabindex="-1" data-gate-route-h>Where to tonight?</h2>
      <div class="gate__floors">
        <a class="gate__floor" href="${SHOP.menu}" ${shopAttrs} data-gate-mode="pickup"><span class="gate__btn">P</span><span><b>Pickup</b><small>Order ahead, collect on South Plank Road</small></span></a>
        <a class="gate__floor" href="${u('/delivery/')}" data-gate-mode="delivery"><span class="gate__btn">D</span><span><b>Delivery</b><small>Delivery now available</small></span></a>
        <button class="gate__floor" type="button" data-gate-mode="browse"><span class="gate__btn">B</span><span><b>Just browsing</b><small>Look around the building first</small></span></button>
      </div>
    </div>
    <div class="gate__step" data-gate-step="no" hidden>
      <h2 class="gate__q" tabindex="-1">Come back when you're 21.</h2>
      <p class="gate__fine">This site is for adults 21 and older.</p>
    </div>
  </div>
</div>`;

const loader = () => `<div class="lift" aria-hidden="true" data-lift-loader>
  <div class="lift__doors"><i></i><i></i></div>
  <div class="lift__panel"><span class="lift__arrow">▲</span><span class="lift__floor" data-lift-floor>G</span></div>
  <p class="lift__brand">${brandMark('logo')}</p>
</div>`;

const sky = () => `<div class="sky" aria-hidden="true">
  <div class="sky__street"></div>
  <div class="sky__stars"></div>
  <div class="sky__moon"></div>
  <div class="sky__city sky__city--far">${skyline({ seed: 21, windows: true })}</div>
  <div class="sky__city sky__city--near">${skyline({ seed: 7, windows: true })}</div>
  <div class="sky__clouds"></div>
</div>`;

const pbar = () => `<aside class="pbar" data-pbar hidden aria-label="Order ahead">
  <div class="pbar__in">
    <p class="pbar__where"><span class="pbar__mode"><span class="pbar__long" data-pbar-mode>Pickup at Elevated Dreams</span><span class="pbar__short" data-pbar-short>Order pickup</span></span><span class="pbar__st" data-open-short>190 South Plank Road</span></p>
    <div class="pbar__acts">
      <a class="btn btn--gold btn--sm" href="${SHOP.menu}" ${shopAttrs} data-pbar-cta><span>Shop the menu</span>${icon('ne')}</a>
      <a class="pbar__ic" href="tel:${store.tel}" aria-label="Call ${store.phone}">${icon('phone')}</a>
      <a class="pbar__ic" href="${store.maps}" target="_blank" rel="noopener" aria-label="Directions to the store">${icon('pin')}</a>
    </div>
    <button class="pbar__x" type="button" data-pbar-close aria-label="Hide this bar">${icon('close')}</button>
  </div>
</aside>`;

const altimeter = () => `<div class="alt" aria-hidden="true" data-alt>
  <span class="alt__k">ALT</span><span class="alt__v" data-alt-v>0</span><span class="alt__u">FT</span>
  <span class="alt__z" data-alt-z>STREET LEVEL</span>
  <span class="alt__track"><i data-alt-bar></i></span>
</div>`;

export function layout(p, ctx) {
  return `${head(p, ctx)}
<body class="${p.bodyClass || ''}">
<a class="skip" href="#main">Skip to content</a>
${loader()}
${gate()}
${sky()}
${header(p)}
<main id="main" tabindex="-1">
${p.body}
</main>
${p.noPlacards ? '' : `<section class="band band--brick band--placards" aria-label="License, warnings and HOPEline"><div class="band__in">${placards()}</div></section>`}
${footer(ctx)}
${pbar()}
${altimeter()}
<div class="doors" aria-hidden="true"><i></i><i></i></div>
<dialog class="lb" data-lb aria-label="Photo"><button class="lb__x" type="button" data-lb-close aria-label="Close photo">${icon('close')}</button><figure><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure></dialog>
<script src="${asset('js/site.js')}" defer></script>
${(p.scripts || []).map((s) => `<script src="${asset('js/' + s)}" defer></script>`).join('\n')}
</body>
</html>
`;
}
