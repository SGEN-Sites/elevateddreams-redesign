// story.mjs: /about (Our Story: the climb from locked doors to open doors) and /community.
import { esc, u, icon, img, btn, shopBtn, kicker, asset } from '../lib/html.mjs';
import { penrose } from '../lib/skyline.mjs';
import { pageHero, sectionHead, finale, crumbsSchema } from '../lib/sections.mjs';
import { store, about, climb, community, contact, home, SHOP } from '../content/site.mjs';

export default function storyPages() {
  const pages = [];
  const climbHtml = `<section class="climb" data-climb aria-labelledby="climb-t">
  <div class="climb__sticky">
    <div class="climb__shaft" aria-hidden="true">
      <div class="climb__ind"><span class="climb__arrow">▲</span><span class="climb__floor" data-climb-floor>B</span></div>
      <div class="climb__rail"><span class="climb__car" data-climb-car></span></div>
      <ol class="climb__months">${Array.from({ length: 13 }, (_, i) => `<li style="--m:${i}"><span>${String(i + 1).padStart(2, '0')}</span></li>`).join('')}</ol>
      <p class="climb__rent"><span data-climb-rent>RENT PAID · MONTH 01</span></p>
    </div>
    <div class="climb__stage">
      <h2 class="climb__h" id="climb-t">Thirteen months, one floor at a time</h2>
      <ol class="climb__steps">${climb.map((c, i) => `<li class="climb__step" data-step="${i}" data-floor="${c.floor}"><p class="climb__lbl"><b>${c.floor === 'B' ? 'LOBBY' : c.floor === 'PH' ? 'PENTHOUSE' : 'FLOOR ' + c.floor}</b> · ${esc(c.label)}</p><h3 class="climb__t">${esc(c.t)}</h3><p class="climb__d">${esc(c.d)}</p></li>`).join('')}</ol>
    </div>
    <div class="climb__open" aria-hidden="true">
      <div class="climb__doors"><span></span><span></span></div>
      <div class="climb__reveal">${img('live-exterior-close', { alt: '', sizes: '(max-width: 760px) 80vw, 460px', cls: 'graded' })}<p>OPEN.</p></div>
    </div>
  </div>
</section>`;

  pages.push({
    path: '/about/', title: 'Our Story | Elevated Dreams LLC, Newburgh NY',
    desc: 'Elevated Dreams is a social-equity (CAURD) dispensary on South Plank Road in Newburgh, NY. Owner Shawn Campbell paid rent on a locked store for 13 months and never quit.',
    bodyClass: 'is-story', scripts: [],
    schema: [crumbsSchema([['Home', '/'], ['Our Story', '/about/']]), { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Our Story', about: { '@id': 'https://elevateddreamscannabisny.com/#business' } }],
    body: `${pageHero({ k: 'OUR STORY · NEWBURGH, NY', title: 'Thirteen months of locked doors. <em>Then the doors opened.</em>', lede: esc(about.lede), crumbs: [['Home', '/'], ['Our Story', '/about/']], art: 'scene-fire-escape' })}
<section class="band band--intro" aria-labelledby="intro-t"><div class="band__in narrow">
  <h2 class="bigline" id="intro-t" data-words>Built by an owner who would not quit.</h2>
  <p class="shead__lede">Elevated Dreams holds a CAURD license: New York's first-round adult-use retail license, created for people and families harmed by past cannabis enforcement. It is owner-operated by ${esc(store.owner)}. It is not a chain or a multi-state operator.</p>
</div></section>
${climbHtml}
<section class="band band--stairs" aria-labelledby="stairs-t">
  <div class="band__in stairs">
    <div class="stairs__art" aria-hidden="true">${penrose()}</div>
    <div class="stairs__txt">
      ${kicker('TWO REGULATORS, ONE DOOR')}
      <h2 class="shead__t" id="stairs-t" data-words>Stairs that climb forever and land where they started.</h2>
      <p class="shead__lede">The town would not issue a building permit without full state licensure. The state wanted the town's certificate of occupancy first. Each side waited on the other. ${esc(store.owner)} kept climbing.</p>
    </div>
  </div>
</section>
<section class="band band--values" aria-labelledby="values-t"><div class="band__in">
  ${sectionHead({ k: 'WHAT WE STAND ON', t: 'Three things we built on', id: 'values-t' })}
  <ul class="plaques plaques--3" role="list">${about.values.map((v, i) => `<li class="plaque" data-reveal style="--i:${i}" data-lift><span class="plaque__n" aria-hidden="true">${['I', 'II', 'III'][i]}</span><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></li>`).join('')}</ul>
</div></section>
<section class="band band--owner" aria-labelledby="owner-t"><div class="band__in owner">
  <figure class="owner__frame" data-reveal>
    <div class="owner__plate"><p class="owner__cert">CERTIFICATE OF INSPECTION</p><p class="owner__role">OWNER ON DUTY</p><p class="owner__name">${esc(store.owner)}</p><p class="owner__note">Portrait to be photographed in the store. No stand-ins.</p></div>
  </figure>
  <div class="owner__txt">${kicker('THE STORE')}<h2 class="shead__t" id="owner-t">Real photos, real place</h2>
    <p class="shead__lede">${esc(home.insideLede)}</p>
    <ul class="strip" role="list">${['live-exterior-close', 'live-interior-display', 'live-showroom-wide', 'live-window-area'].map((id, i) => `<li data-reveal style="--i:${i}"><button class="strip__btn" type="button" data-lb-open data-src="${asset(`img/live/${id}.webp`)}" data-cap="${esc(home.gallery[Math.min(i, 3)].title)}">${img(id, { alt: ['Elevated Dreams LLC dispensary storefront and exterior signage', 'Inside Elevated Dreams LLC dispensary with retail display counters', 'Elevated Dreams LLC dispensary showroom with product display counters', 'Elevated Dreams LLC dispensary window area and retail display'][i], sizes: '200px', cls: 'graded' })}</button></li>`).join('')}</ul>
    <div class="owner__cta">${shopBtn(about.cta)}${btn('Visit the store', '/visit/', { kind: 'ghost' })}</div>
  </div>
</div></section>
${finale()}`,
  });

  pages.push({
    path: '/community/', title: 'Community | Elevated Dreams LLC, Newburgh NY',
    desc: 'Rooted in Newburgh: Elevated Dreams supports responsible cannabis education, local partnerships and a welcoming retail experience for the Newburgh community.',
    bodyClass: 'is-community', schema: [crumbsSchema([['Home', '/'], ['Community', '/community/']])],
    body: `${pageHero({ k: 'NEWBURGH, NY', title: esc(community.title), lede: esc(community.lede), crumbs: [['Home', '/'], ['Community', '/community/']], art: 'scene-rooftops' })}
<section class="band band--lobby" aria-labelledby="lobby-t"><div class="band__in">
  ${sectionHead({ k: community.soonKicker, t: community.expectTitle, id: 'lobby-t', lede: esc(community.soon) })}
  <div class="lobby" data-reveal>
    <p class="lobby__head" aria-hidden="true">DIRECTORY · 190 SOUTH PLANK RD</p>
    <ul class="lobby__rows" role="list">${community.expect.map((e, i) => `<li class="lobby__row" style="--i:${i}"><h3>${esc(e.t)}</h3><p>${esc(e.d)}</p><span class="lobby__soon">COMING SOON</span></li>`).join('')}</ul>
  </div>
</div></section>
<section class="band band--caurd" aria-labelledby="caurd-t"><div class="band__in split">
  <div>${kicker('SOCIAL EQUITY')}<h2 class="shead__t" id="caurd-t">A license built for the neighborhood</h2>
  <p class="shead__lede">Elevated Dreams holds a CAURD license, New York's Conditional Adult-Use Retail Dispensary license: the state's first-round retail license, created for people and families harmed by past cannabis enforcement.</p>
  <p>License number ${store.license}. Owner-operated by ${esc(store.owner)} on South Plank Road.</p>${btn('Read our story', '/about/', { kind: 'ghost' })}</div>
  <figure class="split__img" data-reveal>${img('live-exterior-wide', { alt: 'Elevated Dreams LLC dispensary storefront with exterior sign', sizes: '(max-width: 760px) 92vw, 520px', cls: 'graded' })}</figure>
</div></section>
<section class="band band--stay" aria-labelledby="stay-t"><div class="band__in split">
  <div>${kicker('GET INVOLVED')}<h2 class="shead__t" id="stay-t">${esc(community.stayTitle)}</h2><p class="shead__lede">${esc(community.stay)}</p>${btn(community.stayCta, '/contact/')}</div>
  <form class="news glass" data-preview-form aria-labelledby="news-t">
    <h3 id="news-t">${esc(contact.newsTitle)}</h3><p>${esc(contact.news)}</p>
    <label class="fld"><span>Email</span><input type="email" name="email" autocomplete="email" required></label>
    <label class="chk"><input type="checkbox" required> <span>${esc(contact.newsConsent)}</span></label>
    <button class="btn btn--gold" type="submit"><span>${esc(contact.newsCta)}</span>${icon('arrow')}</button>
    <p class="fine" data-form-note>Preview build: form submissions are disabled.</p>
  </form>
</div></section>
${finale()}`,
  });
  return pages;
}
