// shop.mjs: /menu (shop hub), /deals, /rewards. Every category, feeling and Shop button opens the live store.
import { esc, u, icon, img, btn, shopBtn, kicker, statusLine } from '../lib/html.mjs';
import { pageHero, sectionHead, dealsGrid, catsGrid, feelingsFacade, finale, faqList, faqSchema, crumbsSchema, activeDeals } from '../lib/sections.mjs';
import { SHOP, shopCopy, deals, dealsCopy, rewards, home, store } from '../content/site.mjs';

const howOrder = () => `<ol class="howto" role="list">
  <li class="howto__step glass" data-reveal style="--i:0"><span class="howto__n">1</span><h3>Browse the live menu</h3><p>Pick a category or a feeling. Live products, pricing, discounts and checkout are in our secure online store.</p></li>
  <li class="howto__step glass" data-reveal style="--i:1"><span class="howto__n">2</span><h3>Choose pickup or delivery</h3><p>Select pickup at checkout, or delivery now that it is available.</p></li>
  <li class="howto__step glass" data-reveal style="--i:2"><span class="howto__n">3</span><h3>Bring your ID</h3><p>Bring a valid ID when you arrive. Customers must be 21 years of age or older.</p></li>
</ol>`;

export default function shopPages() {
  const pages = [];
  // ---------------- /menu: the shop hub (live URL kept) ----------------
  pages.push({
    path: '/menu/', title: 'Shop the Menu | Elevated Dreams LLC, Newburgh NY',
    desc: 'Shop Elevated Dreams in Newburgh, NY: flower, pre-rolls, edibles, vapes, concentrates, CBD and accessories. Live menu, pickup and delivery.',
    bodyClass: 'is-shop',
    schema: [crumbsSchema([['Home', '/'], ['Shop', '/menu/']])],
    body: `${pageHero({ k: shopCopy.hubKicker, title: shopCopy.hubTitle, lede: shopCopy.hubLede, crumbs: [['Home', '/'], ['Shop', '/menu/']], art: 'scene-rooftops', obj: 'obj-vape', cta: `${shopBtn('Shop the live menu')}${btn('Tonight’s deals', '/deals/', { kind: 'ghost' })}` })}
<section class="band band--cats" aria-labelledby="cats-t"><div class="band__in">${catsGrid({ guides: true }).replace('class="shead__t"', 'class="shead__t" id="cats-t"')}</div></section>
<section class="band band--feel" aria-labelledby="feel-t"><div class="band__in">${feelingsFacade().replace('class="shead__t"', 'class="shead__t" id="feel-t"')}</div></section>
<section class="band band--how" aria-labelledby="how-t"><div class="band__in">${sectionHead({ k: 'HOW ORDERING WORKS', t: 'Three steps to the counter', id: 'how-t' })}${howOrder()}
  <p class="center">${btn('Order for pickup', '/pickup/', { kind: 'ghost' })} ${btn('Delivery', '/delivery/', { kind: 'ghost' })}</p></div></section>
<section class="band band--deals" aria-labelledby="deals-t"><div class="band__in">${dealsGrid({ compact: true }).replace('class="shead__t"', 'class="shead__t" id="deals-t"')}</div></section>
${finale()}`,
  });

  // ---------------- /deals ----------------
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const act = activeDeals();
  const week = `<ol class="week" role="list" data-week>${[1, 2, 3, 4, 5, 6, 0].map((d) => `<li class="week__day" data-day="${d}"><b>${days[d].slice(0, 3)}</b><ul>${act.filter((x) => x.days.includes(d)).map((x) => `<li>${esc(x.title)}</li>`).join('')}</ul></li>`).join('')}</ol>`;
  pages.push({
    path: '/deals/', title: 'Current Deals | Elevated Dreams LLC, Newburgh NY',
    desc: 'Current promotions at Elevated Dreams in Newburgh, NY: 15% off your first visit, buy 3 pre-rolls get 1 free, and 20% off edibles every Friday and Saturday.',
    bodyClass: 'is-deals', schema: [crumbsSchema([['Home', '/'], ['Deals', '/deals/']])],
    body: `${pageHero({ k: dealsCopy.kicker, title: dealsCopy.title, lede: dealsCopy.lede, crumbs: [['Home', '/'], ['Deals', '/deals/']], art: 'scene-hero-river', obj: 'obj-edibles', cta: btn(dealsCopy.cta, SHOP.discounts, { shop: true }) })}
<section class="band band--deals" aria-labelledby="deals-t"><div class="band__in">${dealsGrid().replace('class="shead__t"', 'class="shead__t" id="deals-t"')}</div></section>
<section class="band band--week" aria-labelledby="week-t"><div class="band__in">${sectionHead({ k: 'THE WEEK AT A GLANCE', t: 'Which deals run which night', id: 'week-t', lede: 'Today is lit. Offers may change; the live store has the final word on availability, eligibility and pricing.' })}${week}</div></section>
<section class="band band--members-mini"><div class="band__in mini"><div><p class="kicker">${esc(home.membersKicker)}</p><h2 class="shead__t">${esc(home.membersTitle)}</h2><p>${esc(home.members)}</p></div><div class="mini__cta">${btn('Sign Up Free', SHOP.account, { shop: true })}${btn('Elevated Rewards', '/rewards/', { kind: 'ghost' })}</div></div></section>
${finale()}`,
  });

  // ---------------- /rewards ----------------
  const rfaq = [
    ['How do I join Elevated Rewards?', `<p>${esc(rewards.lede)}</p>`],
    ['Where are accounts and rewards managed?', `<p>${esc(rewards.fine)}</p>`],
    ['What do members get?', `<p>${esc(home.members)}</p>`],
  ];
  pages.push({
    path: '/rewards/', title: 'Elevated Rewards | Elevated Dreams LLC, Newburgh NY',
    desc: 'Elevated Rewards: create a free account in the Elevated Dreams online store for member-exclusive discounts, loyalty rewards and early access to new products.',
    bodyClass: 'is-rewards', schema: [crumbsSchema([['Home', '/'], ['Rewards', '/rewards/']]), faqSchema(rfaq)],
    body: `${pageHero({ k: home.membersKicker, title: rewards.title, lede: rewards.lede, crumbs: [['Home', '/'], ['Rewards', '/rewards/']], art: 'scene-sky', cta: `${btn(rewards.cta, SHOP.account, { shop: true })}`, extra: `<p class="fine">${esc(rewards.fine)}</p>` })}
<section class="band band--members" aria-labelledby="members-t">
  <div class="band__in members">
    <div class="members__stage" aria-hidden="true"><div class="mcard" data-tilt data-lift><span class="mcard__chip"></span><span class="mcard__brand">ELEVATED<br>REWARDS</span><span class="mcard__no">MEMBER · NEWBURGH NY</span><span class="mcard__mono">ED</span></div><span class="mcard__shadow"></span></div>
    <div class="members__txt">${kicker(home.membersKicker)}<h2 class="shead__t" id="members-t">${esc(home.membersTitle)}</h2><p class="shead__lede">${esc(home.members)}</p>
      <div class="members__cta">${btn('Log In', SHOP.account, { shop: true, kind: 'ghost' })}${btn('Sign Up Free', SHOP.account, { shop: true })}</div></div>
  </div>
</section>
<section class="band band--how" aria-labelledby="rhow-t"><div class="band__in">${sectionHead({ k: 'HOW IT WORKS', t: 'Join in three steps', id: 'rhow-t' })}
<ol class="howto" role="list">
  <li class="howto__step glass" data-reveal style="--i:0"><span class="howto__n">1</span><h3>Create a free account</h3><p>Sign up or log in through our secure online storefront.</p></li>
  <li class="howto__step glass" data-reveal style="--i:1"><span class="howto__n">2</span><h3>Shop as a member</h3><p>Access eligible offers, account features, and available rewards.</p></li>
  <li class="howto__step glass" data-reveal style="--i:2"><span class="howto__n">3</span><h3>Get more</h3><p>Member-exclusive discounts, loyalty rewards, early access to new products, and personalized recommendations.</p></li>
</ol></div></section>
<section class="band band--faq" aria-labelledby="rfaq-t"><div class="band__in narrow">${sectionHead({ k: 'QUESTIONS', t: 'Rewards, answered', id: 'rfaq-t' })}${faqList(rfaq)}</div></section>
${finale()}`,
  });
  return pages;
}
