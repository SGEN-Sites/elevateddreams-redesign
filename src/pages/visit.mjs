// visit.mjs: /visit (store page), /pickup, /delivery, /contact, /areas + area pages (local SEO landing pages).
import { esc, u, icon, img, btn, shopBtn, kicker, statusLine, lev } from '../lib/html.mjs';
import { pageHero, sectionHead, finale, visitBlock, faqList, faqSchema, crumbsSchema, localBusiness, catsGrid, dealsGrid } from '../lib/sections.mjs';
import { store, SHOP, home, contact, areas, education, compliance } from '../content/site.mjs';

const dirFrom = (origin) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent('190 South Plank Road Unit 10, Newburgh, NY 12550')}`;

const localFaq = [
  ['Where is Elevated Dreams?', `<p>${esc(store.street)}, ${store.city}, ${store.regionLong} ${store.zip}, in ${esc(store.plaza)}. <a href="${store.maps}" target="_blank" rel="noopener">Get Directions</a>.</p>`],
  ['What are the hours?', '<p>Monday – Saturday 10:00 AM – 9:00 PM. Sunday 11:00 AM – 7:00 PM.</p>'],
  ['What do I need to bring?', `<p>${esc(education.sections.find((s) => s.id === 'what-to-bring').d)}</p>`],
  ['Is there parking?', `<p>${esc(home.parking)}. Call <a href="tel:${store.tel}">${store.phone}</a> before you come if you have a question.</p>`],
  ['Can I order ahead?', `<p>${esc(home.pickupHow)}</p>`],
];

export default function visitPages() {
  const pages = [];
  pages.push({
    path: '/visit/', title: 'Visit Elevated Dreams | 190 South Plank Road, Newburgh NY',
    desc: 'Elevated Dreams, 190 South Plank Road, Unit 10, Newburgh, NY 12550. Open Mon to Sat 10 AM to 9 PM, Sun 11 AM to 7 PM. Directions, pickup and delivery.',
    bodyClass: 'is-visit', schema: [localBusiness(), crumbsSchema([['Home', '/'], ['Visit', '/visit/']])],
    body: `${pageHero({ k: `${store.plaza.toUpperCase()} · NEWBURGH, NY`, title: '190 South Plank Road. <em>Come on up.</em>', lede: `${esc(store.street)}, ${store.city}, ${store.regionLong} ${store.zip}. Pickup, delivery and walk-ins, 21+ with valid ID.`, crumbs: [['Home', '/'], ['Visit', '/visit/']], art: 'scene-hero-river', cta: `${btn('Get Directions', store.maps)}${btn(`Call ${store.phone}`, `tel:${store.tel}`, { kind: 'ghost' })}`, extra: `<p class="phero__status">${statusLine()}</p>` })}
<section class="band band--visit" aria-labelledby="visit-t"><div class="band__in">${visitBlock().replace('class="shead__t"', 'class="shead__t" id="visit-t"')}</div></section>
<section class="band band--inside" aria-labelledby="look-t"><div class="band__in split">
  <div>${kicker(home.insideKicker)}<h2 class="shead__t" id="look-t">${esc(home.insideTitle)}</h2><p class="shead__lede">${esc(home.insideLede)}</p>
  <ul class="strip" role="list">${['live-showroom-wide', 'live-window-area', 'live-reception', 'live-interior-display'].map((id, i) => `<li data-reveal style="--i:${i}"><button class="strip__btn" type="button" data-lb-open data-src="${u(`/assets/img/live/${id}.webp`)}" data-cap="${esc(['Our Showroom', 'A Bright, Comfortable Space', 'Reception & Service', 'Take a Look Inside'][i])}">${img(id, { alt: ['Elevated Dreams LLC dispensary showroom with product display counters', 'Elevated Dreams LLC dispensary window area and retail display', 'Elevated Dreams LLC dispensary reception and showroom', 'Inside Elevated Dreams LLC dispensary with retail display counters'][i], sizes: '200px', cls: 'graded' })}</button></li>`).join('')}</ul></div>
  <figure class="split__img" data-reveal>${img('live-exterior-close', { alt: 'Elevated Dreams LLC dispensary storefront and exterior signage', sizes: '(max-width: 760px) 92vw, 520px', cls: 'graded' })}<figcaption>The storefront at ${esc(store.plaza)}.</figcaption></figure>
</div></section>
<section class="band band--how" aria-labelledby="ways-t"><div class="band__in">${sectionHead({ k: 'THREE WAYS IN', t: 'Walk in, pick up, or stay in', id: 'ways-t' })}
<ul class="ways" role="list">
  <li class="way glass" data-reveal style="--i:0">${icon('store')}<h3>Walk in</h3><p>${esc(home.steps[0])}. ${esc(home.steps[3])}.</p>${btn('Get Directions', store.maps, { kind: 'ghost' })}</li>
  <li class="way glass" data-reveal style="--i:1">${icon('bag')}<h3>Order for pickup</h3><p>${esc(home.pickupHow)}</p>${btn('Pickup', '/pickup/', { kind: 'ghost' })}</li>
  <li class="way glass" data-reveal style="--i:2">${icon('truck')}<h3>Delivery</h3><p>Delivery now available. Order online through our secure online storefront.</p>${btn('Delivery', '/delivery/', { kind: 'ghost' })}</li>
</ul></div></section>
<section class="band band--cats" aria-labelledby="cats-t"><div class="band__in">${catsGrid().replace('class="shead__t"', 'class="shead__t" id="cats-t"')}</div></section>
<section class="band band--faq" aria-labelledby="vfq-t"><div class="band__in narrow">${sectionHead({ k: 'BEFORE YOU COME', t: 'Visiting, answered', id: 'vfq-t' })}${faqList(localFaq)}</div></section>
${finale()}`,
  });

  const pf = [
    ['How do I order for pickup?', `<p>${esc(home.pickupHow)}</p>`],
    ['What do I need when I arrive?', `<p>${esc(education.sections.find((s) => s.id === 'what-to-bring').d)}</p>`],
    ['When can I pick up?', '<p>During store hours: Monday – Saturday 10:00 AM – 9:00 PM, Sunday 11:00 AM – 7:00 PM.</p>'],
    ['Where do I go?', `<p>${esc(store.street)}, ${store.city}, ${store.regionLong} ${store.zip}. <a href="${store.maps}" target="_blank" rel="noopener">Get Directions</a>. ${esc(home.parking)}.</p>`],
  ];
  pages.push({
    path: '/pickup/', title: 'Order Online for Pickup | Elevated Dreams LLC, Newburgh NY',
    desc: 'Order cannabis online for pickup at Elevated Dreams, 190 South Plank Road, Newburgh, NY. Select pickup at checkout and bring a valid 21+ ID.',
    bodyClass: 'is-pickup', schema: [crumbsSchema([['Home', '/'], ['Visit', '/visit/'], ['Pickup', '/pickup/']]), faqSchema(pf)],
    body: `${pageHero({ k: 'ONLINE PICKUP ORDERS', title: 'Order ahead. <em>Skip the wait.</em>', lede: esc(home.pickupHow), crumbs: [['Home', '/'], ['Visit', '/visit/'], ['Pickup', '/pickup/']], art: 'scene-rooftops', obj: 'obj-flower', cta: shopBtn('Start a pickup order') })}
<section class="band band--how" aria-labelledby="pk-t"><div class="band__in">${sectionHead({ k: 'HOW PICKUP WORKS', t: 'Four floors, no waiting', id: 'pk-t' })}
<ol class="howto howto--4" role="list">
  <li class="howto__step glass" data-reveal style="--i:0"><span class="howto__n">1</span><h3>Browse</h3><p>${esc(home.steps[2])}.</p></li>
  <li class="howto__step glass" data-reveal style="--i:1"><span class="howto__n">2</span><h3>Choose pickup</h3><p>Place your order through our online storefront and select pickup at checkout.</p></li>
  <li class="howto__step glass" data-reveal style="--i:2"><span class="howto__n">3</span><h3>Bring your ID</h3><p>Bring a valid ID when you arrive. ${esc(home.steps[1])}.</p></li>
  <li class="howto__step glass" data-reveal style="--i:3"><span class="howto__n">4</span><h3>Collect</h3><p>${esc(store.street)}, ${store.city}. ${esc(home.steps[3])}.</p></li>
</ol></div></section>
<section class="band band--cats" aria-labelledby="cats-t"><div class="band__in">${catsGrid().replace('class="shead__t"', 'class="shead__t" id="cats-t"')}</div></section>
<section class="band band--faq" aria-labelledby="pfq-t"><div class="band__in narrow">${sectionHead({ k: 'QUESTIONS', t: 'Pickup, answered', id: 'pfq-t' })}${faqList(pf)}</div></section>
${finale()}`,
  });

  const df = [
    ['Do you deliver?', `<p>Yes. Delivery now available from Elevated Dreams in Newburgh.</p>`],
    ['How do I order delivery?', '<p>Order through our secure online storefront and choose delivery. Live products, pricing, discounts, customer accounts, and checkout are managed through our secure online store.</p>'],
    ['Where do you deliver, and is there a minimum?', `<p>The delivery area, minimums and timing are confirmed in the online store and by our team. Call <a href="tel:${store.tel}">${store.phone}</a> with any question.</p>`],
    ['Do I need ID for delivery?', `<p>${esc(education.sections.find((s) => s.id === 'what-to-bring').d.split('. ')[0])}.</p>`],
  ];
  pages.push({
    path: '/delivery/', title: 'Cannabis Delivery from Newburgh | Elevated Dreams LLC',
    desc: 'Delivery now available from Elevated Dreams, a licensed adult-use dispensary on South Plank Road in Newburgh, NY. Order online; 21+ with valid ID.',
    bodyClass: 'is-delivery', schema: [crumbsSchema([['Home', '/'], ['Visit', '/visit/'], ['Delivery', '/delivery/']]), faqSchema(df)],
    body: `${pageHero({ k: 'DELIVERY NOW AVAILABLE', title: 'The shop comes down <em>to your door.</em>', lede: 'Order online through our secure online storefront and choose delivery. Licensed, 21+, from South Plank Road.', crumbs: [['Home', '/'], ['Visit', '/visit/'], ['Delivery', '/delivery/']], art: 'scene-hero-river', obj: 'obj-concentrate', cta: `${shopBtn('Order delivery')}${btn(`Call ${store.phone}`, `tel:${store.tel}`, { kind: 'ghost' })}` })}
<section class="band band--how" aria-labelledby="dl-t"><div class="band__in">${sectionHead({ k: 'HOW DELIVERY WORKS', t: 'Three steps from the menu to your door', id: 'dl-t' })}
<ol class="howto" role="list">
  <li class="howto__step glass" data-reveal style="--i:0"><span class="howto__n">1</span><h3>Shop the live menu</h3><p>Browse live inventory across all categories through our secure online storefront.</p></li>
  <li class="howto__step glass" data-reveal style="--i:1"><span class="howto__n">2</span><h3>Choose delivery</h3><p>Check out in the online store. Delivery details are confirmed there and by our team.</p></li>
  <li class="howto__step glass" data-reveal style="--i:2"><span class="howto__n">3</span><h3>Have your ID ready</h3><p>Customers must be 21 years of age or older, with valid government-issued photo ID.</p></li>
</ol></div></section>
<section class="band band--deals" aria-labelledby="deals-t"><div class="band__in">${dealsGrid({ compact: true }).replace('class="shead__t"', 'class="shead__t" id="deals-t"')}</div></section>
<section class="band band--faq" aria-labelledby="dfq-t"><div class="band__in narrow">${sectionHead({ k: 'QUESTIONS', t: 'Delivery, answered', id: 'dfq-t' })}${faqList(df)}</div></section>
${finale()}`,
  });

  pages.push({
    path: '/contact/', title: 'Contact | Elevated Dreams LLC, Newburgh NY',
    desc: 'Contact Elevated Dreams in Newburgh, NY: 190 South Plank Road, Unit 10. Call 845-245-3716. Questions about our menu or a product, we are here.',
    bodyClass: 'is-contact', schema: [localBusiness(), crumbsSchema([['Home', '/'], ['Contact', '/contact/']])],
    body: `${pageHero({ k: 'CONTACT', title: esc(contact.title), lede: esc(contact.lede), crumbs: [['Home', '/'], ['Contact', '/contact/']], art: 'scene-rooftops', small: true })}
<section class="band band--contact"><div class="band__in contact">
  <div class="contact__info glass" data-reveal>
    <h2 class="vcard__t">${esc(contact.visit)}</h2>
    <dl class="contact__dl">
      <dt>Address</dt><dd><a href="${store.maps}" target="_blank" rel="noopener">${esc(store.street)}<br>${store.city}, ${store.regionLong} ${store.zip}</a></dd>
      <dt>Phone</dt><dd><a href="tel:${store.tel}">${store.phone}</a></dd>
      <dt>Email</dt><dd><a href="mailto:${store.email}">${store.email}</a></dd>
      <dt>Hours</dt><dd>Mon-Sat: 10am - 9pm<br>Sun: 11am - 7pm<br>${statusLine()}</dd>
    </dl>
    <div class="contact__map"><iframe title="Map: Elevated Dreams, 190 South Plank Road, Newburgh" src="${store.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
  <form class="contact__form glass" data-preview-form aria-labelledby="send-t" data-reveal>
    <h2 class="vcard__t" id="send-t">${esc(contact.send)}</h2>
    <label class="fld"><span>Name</span><input name="name" autocomplete="name" required></label>
    <label class="fld"><span>Email</span><input type="email" name="email" autocomplete="email" required></label>
    <label class="fld"><span>Message</span><textarea name="message" rows="5" required></textarea></label>
    <label class="chk"><input type="checkbox" required> <span>${esc(contact.consent)}</span></label>
    <button class="btn btn--gold" type="submit"><span>Send Message</span>${icon('arrow')}</button>
    <p class="fine" data-form-note>Preview build: form submissions are disabled.</p>
  </form>
</div></section>
<section class="band band--stay"><div class="band__in narrow">
  <form class="news glass" data-preview-form aria-labelledby="news-t">
    <h2 id="news-t">${esc(contact.newsTitle)}</h2><p>${esc(contact.news)}</p>
    <label class="fld"><span>Email</span><input type="email" name="email" autocomplete="email" required></label>
    <label class="chk"><input type="checkbox" required> <span>${esc(contact.newsConsent)}</span></label>
    <button class="btn btn--gold" type="submit"><span>${esc(contact.newsCta)}</span>${icon('arrow')}</button>
    <p class="fine" data-form-note>Preview build: form submissions are disabled.</p>
  </form>
</div></section>`,
  });

  // ---------------- /areas hub + area landing pages (local SEO) ----------------
  pages.push({
    path: '/areas/', title: 'Dispensary near Newburgh, Beacon, New Windsor & Walden | Elevated Dreams',
    desc: 'Elevated Dreams on South Plank Road in Newburgh, NY is a licensed adult-use dispensary close to the City of Newburgh, New Windsor, Beacon, Walden and Montgomery.',
    bodyClass: 'is-areas', schema: [crumbsSchema([['Home', '/'], ['Areas near us', '/areas/']])],
    body: `${pageHero({ k: 'AREAS NEAR US', title: 'One store. <em>The whole valley’s skyline.</em>', lede: 'Elevated Dreams is on South Plank Road in the Town of Newburgh. Here is how to reach us from nearby towns.', crumbs: [['Home', '/'], ['Areas near us', '/areas/']], art: 'scene-sky', small: true })}
<section class="band"><div class="band__in"><ul class="areas" role="list">${areas.map((a, i) => `<li data-reveal style="--i:${i}"><a class="area glass" href="${u(`/areas/${a.slug}-ny/`)}" data-tilt><span class="area__k">NEAR</span><span class="area__n">${esc(a.short)}</span><span class="area__l">${esc(a.line)}</span><span class="area__go">Directions &amp; store info ${icon('arrow')}</span></a></li>`).join('')}</ul></div></section>
${finale()}`,
  });
  areas.forEach((a, i) => {
    pages.push({
      path: `/areas/${a.slug}-ny/`, title: `Dispensary near ${a.short}, NY | Elevated Dreams, Newburgh`,
      desc: `Looking for a dispensary near ${a.short}, NY? Elevated Dreams is a licensed adult-use dispensary at 190 South Plank Road, Newburgh. Pickup, delivery and daily deals.`,
      bodyClass: 'is-area', schema: [localBusiness(), crumbsSchema([['Home', '/'], ['Areas near us', '/areas/'], [`Near ${a.short}`, `/areas/${a.slug}-ny/`]])],
      body: `${pageHero({ k: `NEAR ${a.short.toUpperCase()}, NY`, title: `A dispensary near ${esc(a.name)}`, lede: esc(a.line), crumbs: [['Home', '/'], ['Areas near us', '/areas/'], [`Near ${a.short}`, `/areas/${a.slug}-ny/`]], art: ['scene-hero-river', 'scene-rooftops', 'scene-hero-river', 'scene-sky'][i], obj: ['obj-preroll', 'obj-flower', 'obj-vape', 'obj-edibles'][i], cta: `${btn(`Directions from ${a.short}`, dirFrom(a.origin))}${shopBtn('Shop the menu', 'ghost')}` })}
<section class="band band--visit" aria-labelledby="av-t"><div class="band__in">${visitBlock({ head: false })}</div></section>
<section class="band band--why" aria-labelledby="aw-t"><div class="band__in">${sectionHead({ k: 'WHY THE DRIVE', t: home.whyTitle, id: 'aw-t' })}
  <ul class="plaques plaques--3" role="list">${home.why.map((w, j) => `<li class="plaque" data-reveal style="--i:${j}" data-lift><span class="plaque__n" aria-hidden="true">${['I', 'II', 'III'][j]}</span><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></li>`).join('')}</ul></div></section>
<section class="band band--cats" aria-labelledby="cats-t"><div class="band__in">${catsGrid().replace('class="shead__t"', 'class="shead__t" id="cats-t"')}</div></section>
<section class="band band--deals" aria-labelledby="deals-t"><div class="band__in">${dealsGrid({ compact: true }).replace('class="shead__t"', 'class="shead__t" id="deals-t"')}</div></section>
<section class="band band--faq" aria-labelledby="afq-t"><div class="band__in narrow">${sectionHead({ k: `FROM ${a.short.toUpperCase()}`, t: 'Questions before the trip', id: 'afq-t' })}${faqList([[`How do I get to Elevated Dreams from ${a.short}?`, `<p>${esc(a.line)} <a href="${dirFrom(a.origin)}" target="_blank" rel="noopener">Directions from ${esc(a.short)}</a>.</p>`], ...localFaq.slice(1)])}</div></section>
<section class="band band--mini"><div class="band__in mini"><div><p class="kicker">ORDER AHEAD</p><h2 class="shead__t">Pickup or delivery from Newburgh</h2><p>${esc(home.pickupHow)}</p></div><div class="mini__cta">${btn('Pickup', '/pickup/', { kind: 'ghost' })}${btn('Delivery', '/delivery/', { kind: 'ghost' })}</div></div></section>
${finale()}`,
    });
  });
  return pages;
}
