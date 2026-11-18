// sections.mjs: shared section builders. Every Shop / category / feeling destination is the live online store.
import { esc, u, icon, img, lev, btn, shopBtn, shopAttrs, kicker, statusLine, breadcrumb } from './html.mjs';
import { store, SHOP, deals, dealsCopy, categories, shopCopy, feelings, feelingsNote, home, education } from '../content/site.mjs';
import { skyline } from './skyline.mjs';

const TODAY = new Date('2026-11-18T12:00:00-05:00'); // build date; the page script re-checks against the visitor's clock
export const activeDeals = () => deals.filter((d) => !d.expires || new Date(d.expires + 'T23:59:59-05:00') >= TODAY);

// Inner-page hero: a graded night plate, a far skyline, the title in the slab, an optional levitating object.
export function pageHero({ kicker: k, title, lede, crumbs, art = 'scene-rooftops', obj = null, objAlt = '', cta = '', h1 = true, small = false, extra = '' }) {
  return `<section class="phero${small ? ' phero--sm' : ''}${obj ? ' phero--obj' : ''}" data-hero>
  <div class="phero__bg" aria-hidden="true">${art ? img(art, { alt: '', sizes: '100vw', eager: true }) : ''}<div class="phero__city">${skyline({ seed: (title.length * 13) % 97 + 3 })}</div></div>
  <div class="fogband fogband--hero" aria-hidden="true"><i></i><i></i></div>
  <div class="band__in phero__in">
    ${crumbs ? breadcrumb(crumbs) : ''}
    ${k ? kicker(k) : ''}
    ${h1 ? `<h1 class="phero__t" data-words>${title}</h1>` : `<p class="phero__t">${title}</p>`}
    ${lede ? `<p class="phero__lede">${lede}</p>` : ''}
    ${cta ? `<div class="phero__cta">${cta}</div>` : ''}
    ${extra}
  </div>
  ${obj ? `<div class="phero__obj" aria-hidden="true">${lev(obj, { alt: objAlt, sizes: '(max-width: 760px) 40vw, 320px', eager: true })}</div>` : ''}
</section>`;
}

export const sectionHead = ({ k, t, lede, cls = '', id = '' , h = 'h2'}) => `<header class="shead ${cls}">${k ? kicker(k) : ''}<${h} class="shead__t"${id ? ` id="${id}"` : ''} data-words>${t}</${h}>${lede ? `<p class="shead__lede">${lede}</p>` : ''}</header>`;

// Deals as lit lightbox signs. Expired offers are dropped at build and again at run time (data-expires).
export function dealsGrid({ withHead = true, compact = false } = {}) {
  const list = activeDeals();
  return `${withHead ? sectionHead({ k: dealsCopy.kicker, t: 'Tonight’s deals', lede: dealsCopy.lede }) : ''}
<div class="tickets${compact ? ' tickets--compact' : ''}">
  ${list.map((d, i) => `<article class="ticket" data-reveal style="--i:${i}" data-tilt data-days="${d.days.join(',')}"${d.expires ? ` data-expires="${d.expires}"` : ''}>
    <span class="ticket__tonight" aria-hidden="true">TONIGHT</span>
    <p class="ticket__badge">${esc(d.badge)}</p>
    <p class="ticket__big" aria-hidden="true"><span>${esc(d.big)}</span><small>${esc(d.unit)}</small></p>
    <h3 class="ticket__t">${esc(d.title)}</h3>
    <p class="ticket__d">${esc(d.desc)}</p>
    <span class="ticket__bulbs" aria-hidden="true"></span>
  </article>`).join('')}
</div>
<div class="tickets__foot"><p class="fine">${esc(dealsCopy.fine)}</p>${btn(dealsCopy.cta, SHOP.discounts, { shop: true, kind: 'violet' })}</div>`;
}

// Categories as objects levitating over a rooftop ledge. Every tile opens the live menu (products + cart).
export function catsGrid({ head = true, guides = false } = {}) {
  return `${head ? sectionHead({ k: 'SHOP BY CATEGORY', t: shopCopy.title, lede: shopCopy.lede }) : ''}
<ul class="cats" role="list">
  ${categories.map((c, i) => `<li class="cat" data-reveal style="--i:${i}">
    <a class="cat__a" href="${SHOP.menu}" ${shopAttrs} data-tilt data-cat="${c.id}">
      <span class="cat__stage">${lev(c.img, { alt: '', sizes: '(max-width: 760px) 34vw, 180px', delay: (i % 4) * 0.7 })}<span class="cat__mist" aria-hidden="true"></span></span>
      <span class="cat__name">${esc(c.label)}</span>
      <span class="cat__go">Shop Now ${icon('ne')}</span>
    </a>
    ${guides && c.guide ? `<a class="cat__guide" href="${u(`/learn/${c.guide}/`)}">Read the guide</a>` : ''}
  </li>`).join('')}
  <li class="cat cat--all" data-reveal style="--i:7">
    <a class="cat__a" href="${SHOP.menu}" ${shopAttrs} data-tilt>
      <span class="cat__stage"><span class="cat__allmark" aria-hidden="true">ALL</span></span>
      <span class="cat__name">${esc(shopCopy.all)}</span>
      <span class="cat__go">${esc(shopCopy.allCta.replace(' →', ''))} ${icon('ne')}</span>
    </a>
  </li>
</ul>
<div class="ledge" aria-hidden="true"></div>`;
}

// Shop by feeling: four lit windows on one building, haze drifting across them.
export function feelingsFacade({ head = true } = {}) {
  return `${head ? sectionHead({ k: 'SHOP BY FEELING', t: 'Pick a window. <em>Every light is on.</em>', lede: 'Four moods, four lit windows. Each one opens the live menu.' }) : ''}
<div class="facade" data-reveal>
  <div class="facade__roof" aria-hidden="true"><span class="facade__tank"></span></div>
  <ul class="facade__grid" role="list">
    ${feelings.map((f, i) => `<li class="win win--${f.id}" style="--i:${i}">
      <a class="win__a" href="${SHOP.menu}" ${shopAttrs} data-lift>
        <span class="win__glass" aria-hidden="true"><span class="win__room"></span><span class="win__blinds"></span><span class="win__sill"></span></span>
        <span class="win__txt"><b>${esc(f.label)}</b><span>${esc(f.line)}</span><em>Shop ${icon('ne')}</em></span>
      </a>
    </li>`).join('')}
  </ul>
  <div class="facade__door" aria-hidden="true"><span>190</span></div>
  <div class="fogband fogband--facade" aria-hidden="true"><i></i><i></i></div>
</div>
<p class="fine fine--center">${esc(feelingsNote)}</p>`;
}

export function visitBlock({ head = true, map = true } = {}) {
  const today = `<table class="hours"><caption class="sr-only">Store hours</caption><tbody>${store.hoursRows.map(([d, h]) => `<tr><th scope="row">${esc(d)}</th><td>${esc(h)}</td></tr>`).join('')}</tbody></table>`;
  return `${head ? sectionHead({ k: home.pickupKicker, t: home.pickupTitle }) : ''}
<div class="visit">
  ${map ? `<div class="visit__map" data-reveal><iframe title="Map: Elevated Dreams, 190 South Plank Road, Newburgh" src="${store.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><span class="visit__pin" aria-hidden="true">${icon('pin')}</span></div>` : ''}
  <div class="visit__cards">
    <article class="vcard glass" data-reveal style="--i:1">
      <h3 class="vcard__t">${icon('pin')} Location &amp; Contact</h3>
      <p class="vcard__addr">${esc(store.street)}<br>${store.city}, ${store.regionLong} ${store.zip}</p>
      <p><a class="vcard__tel" href="tel:${store.tel}">${store.phone}</a></p>
      <p class="fine">${esc(home.parking)}</p>
      <div class="vcard__btns">${btn('Get Directions', store.maps, { kind: 'ghost' })}${shopBtn('Order Online', 'gold')}</div>
    </article>
    <article class="vcard glass" data-reveal style="--i:2">
      <h3 class="vcard__t">${icon('clock')} Hours &amp; Pickup</h3>
      <p class="vcard__sub">Store Hours</p>
      ${today}
      <p>${statusLine()}</p>
      <p class="vcard__sub">Online Pickup Orders</p>
      <p>${esc(home.pickupHow)}</p>
    </article>
  </div>
</div>`;
}

export const stepsPanel = ({ head = true } = {}) => `${head ? sectionHead({ k: home.newKicker, t: home.newTitle }) : ''}
<div class="callpanel" data-reveal data-callpanel>
  <div class="callpanel__plate">
    <p class="callpanel__label" aria-hidden="true">YOUR FIRST VISIT</p>
    <ol class="callpanel__list">
      ${home.steps.map((s, i) => `<li class="callpanel__step" style="--i:${i}"><span class="callpanel__btn" aria-hidden="true">${i + 1}</span><span class="callpanel__txt">${esc(s)}</span></li>`).join('')}
    </ol>
  </div>
</div>`;

export const learnCards = () => `<ul class="lcards" role="list">${home.learnCards.map((c, i) => `<li data-reveal style="--i:${i}"><a class="lcard glass" href="${u(`/education/#${c.a}`)}" data-tilt><span class="lcard__n" aria-hidden="true">0${i + 1}</span><h3 class="lcard__t">${esc(c.t)}</h3><p>${esc(c.d)}</p><span class="lcard__go">Read More ${icon('arrow')}</span></a></li>`).join('')}</ul>`;

export function finale({ title = home.readyTitle, lede = home.ready, fine = home.readyFine } = {}) {
  return `<section class="band band--finale" aria-labelledby="finale-t">
  <div class="band__in finale">
    <p class="finale__alt" aria-hidden="true">YOU ARE NOW AT CLOUD 9</p>
    <h2 class="finale__t" id="finale-t" data-reveal>${esc(title)}</h2>
    <p class="finale__lede">${esc(lede)}</p>
    <div class="finale__cta">${btn('Order Online / Delivery Available', SHOP.menu, { shop: true })}${btn('Plan your visit', '/visit/', { kind: 'ghost' })}</div>
    <p class="fine">${esc(fine)}</p>
  </div>
</section>`;
}

export function faqList(items, { id = 'faq' } = {}) {
  return `<div class="faq" id="${id}">${items.map(([q, a], i) => `<details class="faq__item" data-reveal style="--i:${i % 6}"><summary><span>${esc(q)}</span>${icon('chev')}</summary><div class="faq__a">${a}</div></details>`).join('')}</div>`;
}
export const faqSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });

export const localBusiness = () => ({
  '@context': 'https://schema.org', '@type': 'Store', '@id': 'https://elevateddreamscannabisny.com/#business',
  name: 'Elevated Dreams LLC', alternateName: 'Elevated Dreams',
  description: 'Adult-use cannabis dispensary in Newburgh, New York offering delivery, pickup, product education, and daily deals.',
  url: 'https://elevateddreamscannabisny.com/', telephone: '+1-845-245-3716',
  address: { '@type': 'PostalAddress', streetAddress: '190 South Plank Road, Unit 10', addressLocality: 'Newburgh', addressRegion: 'NY', postalCode: '12550', addressCountry: 'US' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '19:00' },
  ],
});
export const crumbsSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: 'https://elevateddreamscannabisny.com' + (p === '/' ? '/' : p.replace(/\/$/, '')) })) });

export const eduSection = (s, i) => `<article class="floor" id="${s.id}" data-reveal style="--i:${i % 4}">
  <span class="floor__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
  <div class="floor__body"><h2 class="floor__t">${esc(s.t)}</h2><p>${esc(s.d)}</p></div>
</article>`;
export { education };
