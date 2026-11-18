// misc.mjs: page types the reference sites carry and the live site lacks (social equity, state-rules lander,
// terpene glossary), the legal placeholders the live age gate already refers to, the HTML site map and 404.
import { esc, u, icon, img, btn, shopBtn, kicker } from '../lib/html.mjs';
import { pageHero, sectionHead, finale, crumbsSchema, eduSection, faqList, faqSchema } from '../lib/sections.mjs';
import { store, SHOP, education, compliance } from '../content/site.mjs';

export default function miscPages({ allPages }) {
  const pages = [];
  pages.push({
    path: '/social-equity/', title: 'Social Equity | Elevated Dreams LLC, a CAURD Dispensary in Newburgh NY',
    desc: 'Elevated Dreams holds a CAURD license, New York’s first-round adult-use retail license created for people and families harmed by past cannabis enforcement.',
    bodyClass: 'is-equity', schema: [crumbsSchema([['Home', '/'], ['Our Story', '/about/'], ['Social equity', '/social-equity/']])],
    body: `${pageHero({ k: 'SOCIAL EQUITY · CAURD', title: 'A license with a reason <em>behind it.</em>', lede: 'Elevated Dreams holds a CAURD license: New York’s Conditional Adult-Use Retail Dispensary license.', crumbs: [['Home', '/'], ['Our Story', '/about/'], ['Social equity', '/social-equity/']], art: 'scene-fire-escape', small: true })}
<section class="band"><div class="band__in narrow">
  <article class="floor" data-reveal><span class="floor__n" aria-hidden="true">01</span><div class="floor__body"><h2 class="floor__t">What CAURD means</h2><p>CAURD is New York's first-round adult-use retail license, created for people and families harmed by past cannabis enforcement.</p></div></article>
  <article class="floor" data-reveal><span class="floor__n" aria-hidden="true">02</span><div class="floor__body"><h2 class="floor__t">Who runs Elevated Dreams</h2><p>Elevated Dreams is owner-operated by ${esc(store.owner)}. It is not a chain or a multi-state operator. License number ${store.license}.</p></div></article>
  <article class="floor" data-reveal><span class="floor__n" aria-hidden="true">03</span><div class="floor__body"><h2 class="floor__t">What it took to open</h2><p>${esc(store.owner)} paid rent for 13 months on a store he could not open, while the town and the state each waited on the other. He never quit. <a href="${u('/about/')}">Read the full story</a>.</p></div></article>
  <p class="center">${btn('New York Office of Cannabis Management', 'https://cannabis.ny.gov/', { kind: 'ghost' })}</p>
</div></section>
${finale()}`,
  });

  const rules = ['ny-rules', 'what-to-bring', 'responsible-use', 'safe-storage'].map((id) => education.sections.find((s) => s.id === id));
  const rq = [
    ['Is cannabis legal in New York?', `<p>${esc(rules[0].d.split('. ')[0])}.</p>`],
    ['How much can I possess?', '<p>Adults may possess up to 3 ounces of cannabis flower and 24 grams of concentrated cannabis.</p>'],
    ['Where can I consume?', '<p>It is illegal to consume cannabis in public, in motor vehicles, or anywhere smoking is prohibited.</p>'],
    ['What ID do I need to buy?', `<p>${esc(rules[1].d)}</p>`],
  ];
  pages.push({
    path: '/new-york-cannabis-rules/', title: 'New York Cannabis Rules: Age, ID & Possession Limits | Elevated Dreams',
    desc: 'New York adult-use cannabis rules from Elevated Dreams in Newburgh: who can buy, what ID to bring, possession limits and where you can and cannot consume.',
    bodyClass: 'is-rules', schema: [crumbsSchema([['Home', '/'], ['Learn', '/learn/'], ['New York cannabis rules', '/new-york-cannabis-rules/']]), faqSchema(rq)],
    body: `${pageHero({ k: 'NEW YORK STATE', title: 'The rules of the road, <em>in plain words.</em>', lede: 'What adult-use means in New York State, possession limits, and where consumption is permitted.', crumbs: [['Home', '/'], ['Learn', '/learn/'], ['New York cannabis rules', '/new-york-cannabis-rules/']], art: 'scene-hero-river', small: true })}
<section class="band"><div class="band__in narrow">${rules.map(eduSection).join('')}
  <p class="disclaimer glass">${esc(education.disclaimer)} Rules change; consult current NYS OCM guidelines at <a href="https://cannabis.ny.gov/" target="_blank" rel="noopener">cannabis.ny.gov</a>.</p></div></section>
<section class="band band--faq"><div class="band__in narrow">${sectionHead({ k: 'QUICK ANSWERS', t: 'New York, answered' })}${faqList(rq)}</div></section>
${finale()}`,
  });

  const terps = [
    ['Myrcene', 'Earthy, musky, a little like ripe mango and cloves.'], ['Limonene', 'Bright citrus: lemon and orange peel.'],
    ['Caryophyllene', 'Peppery and spicy, like cracked black pepper.'], ['Pinene', 'Fresh pine needles and rosemary.'],
    ['Linalool', 'Floral, with a lavender note.'], ['Humulene', 'Woody and earthy, like hops.'],
    ['Terpinolene', 'Herbal and fruity, with a hint of pine.'], ['Ocimene', 'Sweet and herbal, with a green, fresh edge.'],
  ];
  pages.push({
    path: '/learn/terpenes/', title: 'Terpenes 101: A Glossary of Cannabis Aromas | Elevated Dreams',
    desc: 'A plain-words glossary of common cannabis terpenes and the aromas they are known for, from Elevated Dreams in Newburgh, NY. Educational content for adults 21+.',
    bodyClass: 'is-terps', schema: [crumbsSchema([['Home', '/'], ['Learn', '/learn/'], ['Terpenes 101', '/learn/terpenes/']])],
    body: `${pageHero({ k: 'GLOSSARY', title: 'Terpenes 101: <em>read the nose.</em>', lede: 'Terpenes are the aroma compounds in cannabis. Labels sometimes list them; this glossary covers the common ones and the scents they are known for.', crumbs: [['Home', '/'], ['Learn', '/learn/'], ['Terpenes 101', '/learn/terpenes/']], art: 'scene-rooftops', obj: 'obj-flower', small: true })}
<section class="band"><div class="band__in"><ul class="terps" role="list">${terps.map(([t, d], i) => `<li class="terp glass" data-reveal style="--i:${i % 4}" data-tilt><span class="terp__sym" aria-hidden="true">${t.slice(0, 2)}</span><h2 class="terp__t">${t}</h2><p>${d}</p></li>`).join('')}</ul>
<p class="disclaimer glass">Aroma notes describe smell, not effects. Effects vary by individual and method of consumption. Always review the product label and ask our staff if you have questions. Educational content for adults 21+. Not medical advice.</p>
<p class="center">${btn('Read: Best High-THC Cannabis Products at Elevated Dreams', '/learn/high-thc-cannabis-labels-elevated-dreams/', { kind: 'ghost' })}</p></div></section>
${finale()}`,
  });

  const legal = (path, title, what) => ({
    path, title: `${title} | Elevated Dreams LLC`, desc: `${title} for the Elevated Dreams LLC website.`, bodyClass: 'is-legal',
    schema: [crumbsSchema([['Home', '/'], [title, path]])],
    body: `${pageHero({ k: 'LEGAL', title: esc(title), lede: `Elevated Dreams LLC's ${what} will be published on this page.`, crumbs: [['Home', '/'], [title, path]], art: null, small: true })}
<section class="band"><div class="band__in narrow"><div class="prose glass pad">
<p>The live site's age check refers visitors to our Terms of Service and Privacy Policy. This page holds that document once Elevated Dreams LLC provides the final text.</p>
<p>This preview collects no personal data: its forms are switched off, and the only thing it remembers is your 21+ answer and your pickup or delivery choice, stored in your own browser.</p>
<p>Questions: call <a href="tel:${store.tel}">${store.phone}</a> or visit us at ${esc(store.street)}, ${store.city}, ${store.regionLong} ${store.zip}.</p>
</div></div></section>`,
  });
  pages.push(legal('/privacy-policy/', 'Privacy Policy', 'privacy policy'));
  pages.push(legal('/terms-of-service/', 'Terms of Service', 'terms of service'));
  return pages;
}

export function sitemapPage(allPages) {
  const groups = [
    ['Shop', (p) => ['/menu/', '/deals/', '/rewards/'].includes(p.path)],
    ['Visit', (p) => ['/visit/', '/pickup/', '/delivery/', '/contact/'].includes(p.path) || p.path.startsWith('/areas/')],
    ['Learn', (p) => ['/education/', '/learn/', '/first-visit/', '/faq/', '/new-york-cannabis-rules/'].includes(p.path) || p.path.startsWith('/learn/')],
    ['Company', (p) => ['/', '/about/', '/social-equity/', '/community/', '/privacy-policy/', '/terms-of-service/'].includes(p.path)],
  ];
  return {
    path: '/sitemap/', title: 'Site Map | Elevated Dreams LLC', desc: 'Every page on the Elevated Dreams website.', bodyClass: 'is-sitemap',
    schema: [crumbsSchema([['Home', '/'], ['Site map', '/sitemap/']])],
    body: `${pageHero({ k: 'SITE MAP', title: 'Every floor, <em>one directory.</em>', lede: 'All the pages on this site, plus the live online store.', crumbs: [['Home', '/'], ['Site map', '/sitemap/']], art: null, small: true })}
<section class="band"><div class="band__in"><div class="smap">${groups.map(([g, f]) => `<div class="smap__col glass"><h2>${g}</h2><ul>${allPages.filter(f).map((p) => `<li><a href="${u(p.path)}">${esc(p.title.split(' | ')[0])}</a></li>`).join('')}</ul></div>`).join('')}
<div class="smap__col glass"><h2>Online store</h2><ul><li><a href="${SHOP.menu}" target="_blank" rel="noopener">Live Menu ↗</a></li><li><a href="${SHOP.discounts}" target="_blank" rel="noopener">Discounts ↗</a></li><li><a href="${SHOP.account}" target="_blank" rel="noopener">Customer Account ↗</a></li></ul></div></div></div></section>`,
  };
}

export const notFound = () => ({
  path: '/404.html', file: '404.html', title: 'Wrong floor | Elevated Dreams LLC', desc: 'This page is not on any floor of the building.', bodyClass: 'is-404',
  body: `${pageHero({ k: 'ERROR 404', title: 'Wrong floor.', lede: 'The doors opened on a floor that does not exist. Take the elevator back down.', art: 'scene-sky', cta: `${btn('Back to the lobby', '/')}${shopBtn('Shop the menu', 'ghost')}` })}`,
});
