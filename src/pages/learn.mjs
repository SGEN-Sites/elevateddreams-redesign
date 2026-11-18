// learn.mjs: /education, /learn (hub + 20 captured articles), /first-visit, /faq.
import { esc, u, icon, img, btn, shopBtn, kicker, md, statusLine } from '../lib/html.mjs';
import { pageHero, sectionHead, finale, faqList, faqSchema, crumbsSchema, eduSection, stepsPanel, activeDeals } from '../lib/sections.mjs';
import { education, learn, home, store, SHOP, compliance, rewards, dealsCopy } from '../content/site.mjs';

const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'long', day: 'numeric', year: 'numeric' });
const ARTS = ['scene-fire-escape', 'scene-rooftops', 'scene-hero-river', 'scene-sky'];

export default function learnPages({ articles }) {
  const pages = [];
  // ---------------- /education (live words, laid out as floors) ----------------
  pages.push({
    path: '/education/', title: 'Cannabis Education | Elevated Dreams LLC, Newburgh NY',
    desc: 'Cannabis education from Elevated Dreams in Newburgh, NY: product types, responsible use, safe storage, THC and CBD, edibles onset time and New York adult-use rules.',
    bodyClass: 'is-education', schema: [crumbsSchema([['Home', '/'], ['Education', '/education/']])],
    body: `${pageHero({ k: 'EDUCATION', title: esc(education.title), lede: esc(education.lede), crumbs: [['Home', '/'], ['Education', '/education/']], art: 'scene-fire-escape', obj: 'obj-cbd' })}
<section class="band band--floors" aria-label="Education topics"><div class="band__in floors-wrap">
  <nav class="floors__nav" aria-label="On this page"><p class="kicker">FLOORS</p><ol>${education.sections.map((s, i) => `<li><a href="#${s.id}"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(s.t)}</a></li>`).join('')}</ol></nav>
  <div class="floors">${education.sections.map(eduSection).join('')}
    <p class="disclaimer glass">${esc(education.disclaimer)}</p>
  </div>
</div></section>
<section class="band band--mini"><div class="band__in mini"><div><h2 class="shead__t">${esc(education.readyTitle)}</h2><p><a class="link" href="${u('/contact/')}">${esc(education.contact)}</a></p></div><div class="mini__cta">${btn('Order Online / Delivery Available', SHOP.menu, { shop: true })}${btn('Learn articles', '/learn/', { kind: 'ghost' })}</div></div></section>`,
  });

  // ---------------- /learn hub ----------------
  const cats = [...new Set(articles.map((a) => a.category))].sort();
  pages.push({
    path: '/learn/', title: 'Learn | Elevated Dreams LLC',
    desc: 'Practical guides to cannabis products, labels, and responsible adult-use shopping from Elevated Dreams in Newburgh, NY. Written for people, not product hype.',
    bodyClass: 'is-learn', schema: [crumbsSchema([['Home', '/'], ['Learn', '/learn/']])],
    body: `${pageHero({ k: learn.kicker, title: esc(learn.title), lede: esc(learn.lede), crumbs: [['Home', '/'], ['Learn', '/learn/']], art: 'scene-rooftops', extra: `<p class="fine">${esc(learn.fine)}</p>` })}
<section class="band band--hub" aria-label="Articles"><div class="band__in">
  <div class="chips" role="toolbar" aria-label="Filter articles by topic" data-chips>
    <button class="chip is-on" type="button" data-chip="*" aria-pressed="true">All</button>
    ${cats.map((c) => `<button class="chip" type="button" data-chip="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}
  </div>
  <ul class="hub" role="list" data-hub>${articles.map((a, i) => `<li class="hub__item" data-cat="${esc(a.category)}" data-reveal style="--i:${i % 6}">
    <a class="art art--card" href="${u(`/learn/${a.slug}/`)}"><span class="art__img">${img('learn-' + a.slug, { alt: a.featuredImageAlt || '', sizes: '(max-width: 760px) 90vw, 380px' })}</span>
    <span class="art__meta">${esc(a.category)} · ${a.readingTimeMinutes} min read</span><span class="art__t">${esc(a.title)}</span><span class="art__x">${esc(a.excerpt)}</span>
    <span class="art__foot"><time datetime="${a.publishedAt}">${fmtDate(a.publishedAt)}</time><span>Read article ${icon('arrow')}</span></span></a></li>`).join('')}</ul>
  <p class="hub__none" data-hub-none hidden>No articles in this topic yet.</p>
</div></section>
${finale()}`,
  });

  // ---------------- /learn/<slug> ----------------
  articles.forEach((a, idx) => {
    const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).concat(articles.filter((x) => x.slug !== a.slug && x.category !== a.category)).slice(0, 3);
    const ctas = (a.ctas || []).map((c) => {
      const href = c.href === '/locations/newburgh/menu' ? SHOP.menu : c.href === '/locations/newburgh' ? '/visit/' : c.href;
      return `<aside class="acta glass"><p class="kicker">NEXT STOP</p><h2 class="acta__t">${esc(c.heading)}</h2><p>${esc(c.description)}</p>${btn(c.label, href, { shop: href === SHOP.menu })}</aside>`;
    }).join('');
    const body = md(a.body);
    pages.push({
      path: `/learn/${a.slug}/`, title: a.seoTitle || `${a.title} | Elevated Dreams LLC`, desc: a.seoDescription || a.excerpt,
      bodyClass: 'is-article', ogType: 'article',
      schema: [crumbsSchema([['Home', '/'], ['Learn', '/learn/'], [a.title, `/learn/${a.slug}/`]]), { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt, datePublished: a.publishedAt, author: { '@type': 'Organization', name: 'Elevated Dreams LLC' }, publisher: { '@type': 'Organization', name: 'Elevated Dreams LLC' }, mainEntityOfPage: `https://elevateddreamscannabisny.com/learn/${a.slug}` }],
      body: `${pageHero({ k: `${a.category.toUpperCase()} · ${a.readingTimeMinutes} MIN READ`, title: esc(a.title), lede: esc(a.excerpt), crumbs: [['Home', '/'], ['Learn', '/learn/'], [a.title, `/learn/${a.slug}/`]], art: ARTS[idx % ARTS.length], small: true, extra: `<p class="phero__date"><time datetime="${a.publishedAt}">${fmtDate(a.publishedAt)}</time> · Elevated Dreams LLC</p>` })}
<section class="band band--article"><div class="band__in article">
  <figure class="article__fig">${img('learn-' + a.slug, { alt: a.featuredImageAlt || '', sizes: '(max-width: 760px) 92vw, 420px' })}</figure>
  <div class="prose">${body}</div>
  <div class="article__side">${ctas}<aside class="acta acta--fine glass"><p class="kicker">GOOD TO KNOW</p><p>${esc(learn.fine)}</p><p>${statusLine()}</p></aside></div>
</div></section>
<section class="band band--related" aria-labelledby="rel-t"><div class="band__in">${sectionHead({ k: 'KEEP LEARNING', t: 'More from Learn', id: 'rel-t' })}
  <div class="arts">${related.map((r, i) => `<a class="art" href="${u(`/learn/${r.slug}/`)}" data-reveal style="--i:${i}"><span class="art__img">${img('learn-' + r.slug, { alt: r.featuredImageAlt || '', sizes: '(max-width: 760px) 90vw, 360px' })}</span><span class="art__meta">${esc(r.category)} · ${r.readingTimeMinutes} min read</span><span class="art__t">${esc(r.title)}</span></a>`).join('')}</div>
  <p class="center">${btn('All Learn articles', '/learn/', { kind: 'ghost' })}</p></div></section>`,
    });
  });

  // ---------------- /first-visit (new page type: first-timer guide) ----------------
  const first = activeDeals().find((d) => d.id === 'first');
  const ff = [
    ['What do I need to bring?', `<p>${esc(education.sections.find((s) => s.id === 'what-to-bring').d)}</p>`],
    ['Can I look at the menu before I come in?', `<p>Yes. Browse live products online before visiting. ${esc(home.pickupHow)}</p>`],
    ['Is there a first-time discount?', `<p>${esc(first ? first.title + ': ' + first.desc : '')}</p>`],
    ['I have questions about a product. Who do I ask?', `<p>${esc(home.steps[3])}. ${esc(education.lede)}</p>`],
  ];
  pages.push({
    path: '/first-visit/', title: 'Your First Visit | Elevated Dreams LLC, Newburgh NY',
    desc: 'First time at a dispensary? What to bring, what to expect and how to start at Elevated Dreams in Newburgh, NY. 15% off your first visit.',
    bodyClass: 'is-first', schema: [crumbsSchema([['Home', '/'], ['Your first visit', '/first-visit/']]), faqSchema(ff)],
    body: `${pageHero({ k: home.newKicker, title: 'First time? <em>Take the elevator.</em>', lede: 'Four floors from the front door to the counter. Ask us anything, we’ve heard it all.', crumbs: [['Home', '/'], ['Your first visit', '/first-visit/']], art: 'scene-hero-river', obj: 'obj-preroll', cta: shopBtn('Browse the live menu') })}
<section class="band band--steps" aria-labelledby="steps-t"><div class="band__in split">
  <div>${stepsPanel({ head: false })}</div>
  <div>${kicker(home.newKicker)}<h2 class="shead__t" id="steps-t">${esc(home.newTitle)}</h2>
    ${first ? `<article class="ticket ticket--solo" data-tilt><span class="ticket__tonight" aria-hidden="true">TONIGHT</span><p class="ticket__badge">${esc(first.badge)}</p><p class="ticket__big" aria-hidden="true"><span>${esc(first.big)}</span><small>${esc(first.unit)}</small></p><h3 class="ticket__t">${esc(first.title)}</h3><p class="ticket__d">${esc(first.desc)}</p></article>` : ''}
    <p>${btn('Read the full first-timer guide', '/learn/first-time-dispensary-shopper-cannabis-guide/', { kind: 'ghost' })}</p></div>
</div></section>
<section class="band band--floors" aria-labelledby="ff-t"><div class="band__in narrow">${sectionHead({ k: 'BEFORE YOU GO', t: 'Good to know', id: 'ff-t' })}
  ${['what-to-bring', 'responsible-use', 'edibles-onset', 'ny-rules'].map((id, i) => eduSection(education.sections.find((s) => s.id === id), i)).join('')}
  <p class="disclaimer glass">${esc(education.disclaimer)}</p></div></section>
<section class="band band--faq" aria-labelledby="ffq-t"><div class="band__in narrow">${sectionHead({ k: 'QUESTIONS', t: 'First-visit questions', id: 'ffq-t' })}${faqList(ff)}</div></section>
${finale()}`,
  });

  // ---------------- /faq (new page type, answers from the live site's own words) ----------------
  const edu = (id) => esc(education.sections.find((s) => s.id === id).d);
  const deals = activeDeals();
  const faq = [
    ['Where is Elevated Dreams?', `<p>${esc(store.street)}, ${store.city}, ${store.regionLong} ${store.zip}. <a href="${store.maps}" target="_blank" rel="noopener">Get Directions</a>.</p>`],
    ['What are your hours?', `<p>Monday – Saturday 10:00 AM – 9:00 PM. Sunday 11:00 AM – 7:00 PM.</p>`],
    ['How old do I have to be?', `<p>Customers must be 21 years of age or older. ${edu('what-to-bring')}</p>`],
    ['Can I order online for pickup?', `<p>${esc(home.pickupHow)} <a href="${SHOP.menu}" target="_blank" rel="noopener">Shop the live menu</a>.</p>`],
    ['Do you deliver?', `<p>Delivery now available. Order online and choose delivery, or call us at <a href="tel:${store.tel}">${store.phone}</a>. <a href="${u('/delivery/')}">Delivery details</a>.</p>`],
    ['What deals do you have right now?', `<p>${deals.map((d) => `${esc(d.title)}: ${esc(d.desc)}`).join(' ')} ${esc(dealsCopy.fine)}</p>`],
    ['Do you have a rewards program?', `<p>${esc(rewards.lede)} ${esc(rewards.fine)}</p>`],
    ['What kinds of products do you carry?', `<p>${edu('product-types')}</p>`],
    ['How much cannabis can I possess in New York?', `<p>${edu('ny-rules')}</p>`],
    ['How long do edibles take to work?', `<p>${edu('edibles-onset')}</p>`],
    ['How should I store cannabis at home?', `<p>${edu('safe-storage')}</p>`],
    ['Is Elevated Dreams licensed?', `<p>Yes. New York State cannabis license ${store.license}, a CAURD (Conditional Adult-Use Retail Dispensary) license.</p>`],
    ['Where can I get help with substance use?', `<p>New York State HOPEline. Call ${compliance.hopeCall} (${compliance.hopeCallDigits}), text ${compliance.hopeText} to ${compliance.hopeTextTo}, or visit <a href="${compliance.hopeUrl}" target="_blank" rel="noopener">${compliance.hopeWeb}</a>.</p>`],
  ];
  pages.push({
    path: '/faq/', title: 'FAQ | Elevated Dreams LLC, Newburgh NY',
    desc: 'Answers about Elevated Dreams in Newburgh, NY: hours, ID and age rules, pickup, delivery, deals, rewards, products, New York possession limits and storage.',
    bodyClass: 'is-faq', schema: [crumbsSchema([['Home', '/'], ['FAQ', '/faq/']]), faqSchema(faq)],
    body: `${pageHero({ k: 'QUESTIONS', title: 'Ask us anything. <em>We’ve heard it all.</em>', lede: 'Hours, ID, pickup, delivery, deals and the rules in New York, answered from one place.', crumbs: [['Home', '/'], ['FAQ', '/faq/']], art: 'scene-sky', small: true })}
<section class="band band--faq"><div class="band__in narrow">${faqList(faq)}
  <p class="disclaimer glass">${esc(education.disclaimer)}</p>
  <p class="center">${btn('Still curious? Contact us', '/contact/', { kind: 'ghost' })}</p></div></section>
${finale()}`,
  });
  return pages;
}
