// home.mjs: Hero E (one sky), then straight to the menu (owner, round 4), the compliance signs, tonight's deals, then the
// rest of the live home's story (feelings, story, inside, why, members, learn, visit, community, ready).
import { esc, u, icon, img, lev, btn, shopBtn, kicker, statusLine, asset } from '../lib/html.mjs';
import { skyline } from '../lib/skyline.mjs';
import { placards } from '../lib/layout.mjs';
import { dealsGrid, catsGrid, feelingsFacade, visitBlock, stepsPanel, learnCards, finale, sectionHead, localBusiness } from '../lib/sections.mjs';
import { store, SHOP, home } from '../content/site.mjs';
import { heroE } from '../lib/hero-e.mjs';

export default function homePage({ articles }) {
  const latest = articles.slice(0, 3);
  const hero = heroE();
  const body = `
${hero.section}

<section class="band band--cats" aria-labelledby="cats-t">
  <div class="band__in">${catsGrid().replace('class="shead__t"', 'class="shead__t" id="cats-t"')}
  <p class="center"><a class="link" href="${u('/learn/')}">Not sure where to start? Read our product guides ${icon('arrow')}</a></p></div>
</section>

<section class="band band--brick band--placards band--placards-top" aria-label="License, warnings and HOPEline">
  <div class="band__in">${placards()}</div>
</section>

<section class="band band--deals" id="tonight" aria-labelledby="deals-t">
  <div class="band__in">${dealsGrid().replace('class="shead__t"', 'class="shead__t" id="deals-t"')}
  <p class="center"><a class="link" href="${u('/deals/')}">${esc('See all offers')} ${icon('arrow')}</a></p></div>
</section>

<section class="band band--feel" aria-labelledby="feel-t">
  <div class="band__in">${feelingsFacade().replace('class="shead__t"', 'class="shead__t" id="feel-t"')}</div>
</section>

<section class="band band--story" aria-labelledby="t13">
  <div class="band__in thirteen">
    <div class="thirteen__num" aria-hidden="true" data-thirteen><span class="thirteen__out">13</span><span class="thirteen__fill">13</span><span class="thirteen__unit">MONTHS</span></div>
    <div class="thirteen__txt">
      ${kicker(home.storyKicker)}
      <h2 class="thirteen__t" id="t13" data-words>Thirteen months of rent on a door that would not open.</h2>
      <p class="thirteen__lede">${esc(store.owner)} fought the town and the state for permission to open Elevated Dreams. He kept paying rent on an empty store, and he never quit. The doors are open now.</p>
      <h3 class="thirteen__h3">${esc(home.storyTitle)}</h3>
      <p>${esc(home.story)}</p>
      <div class="thirteen__cta">${btn('Read our story', '/about/')}${btn(home.storyCta, '/about/', { kind: 'ghost' })}</div>
    </div>
    <figure class="thirteen__photo" data-reveal>
      <div class="sdoors" data-sdoors>${img('live-exterior-wide', { alt: 'Elevated Dreams LLC dispensary storefront with exterior sign', sizes: '(max-width: 760px) 92vw, 520px', cls: 'graded' })}<span class="sdoors__l" aria-hidden="true"></span><span class="sdoors__r" aria-hidden="true"></span></div>
      <figcaption>190 South Plank Road. The real door, open.</figcaption>
    </figure>
  </div>
</section>

<section class="band band--inside" aria-labelledby="inside-t">
  <div class="band__in">
    ${sectionHead({ k: home.insideKicker, t: home.insideTitle, lede: home.insideLede, id: 'inside-t' })}
    <ul class="reel" role="list">
      ${home.gallery.map((g, i) => `<li class="reel__item reel__item--${i}" data-reveal style="--i:${i}">
        <button class="reel__btn" type="button" data-lb-open data-src="${asset(`img/live/${g.img}.webp`)}" data-cap="${esc(g.title)}. ${esc(g.text)}" data-tilt>
          ${img(g.img, { alt: g.alt, sizes: '(max-width: 760px) 80vw, 520px', cls: 'graded' })}
          <span class="reel__cap"><b>${esc(g.title)}</b><span>${esc(g.text)}</span><em>CLICK TO ENLARGE</em></span>
        </button></li>`).join('')}
    </ul>
  </div>
</section>

<section class="band band--why" aria-labelledby="why-t">
  <div class="band__in why">
    <div class="why__col">
      ${sectionHead({ k: 'WHY US', t: home.whyTitle, id: 'why-t' })}
      <ul class="plaques" role="list">${home.why.map((w, i) => `<li class="plaque" data-reveal style="--i:${i}" data-lift><span class="plaque__n" aria-hidden="true">${['I', 'II', 'III'][i]}</span><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></li>`).join('')}</ul>
    </div>
    <div class="why__col">
      ${stepsPanel()}
      <div class="why__first"><p><b>New here?</b> 15% off your first visit. Show the offer at checkout.</p>${btn(home.newCta, '/first-visit/')}</div>
    </div>
  </div>
</section>

<section class="band band--members" aria-labelledby="members-t">
  <div class="band__in members">
    <div class="members__stage" aria-hidden="true">
      <div class="mcard" data-tilt data-lift>
        <span class="mcard__chip"></span>
        <span class="mcard__brand">ELEVATED<br>REWARDS</span>
        <span class="mcard__no">MEMBER · NEWBURGH NY</span>
        <span class="mcard__mono">ED</span>
      </div>
      <span class="mcard__shadow"></span>
    </div>
    <div class="members__txt">
      ${kicker(home.membersKicker)}
      <h2 class="shead__t" id="members-t" data-words>${esc(home.membersTitle)}</h2>
      <p class="shead__lede">${esc(home.members)}</p>
      <div class="members__cta">${btn('Log In', SHOP.account, { shop: true, kind: 'ghost' })}${btn('Sign Up Free', SHOP.account, { shop: true })}</div>
      <p class="fine"><a class="link" href="${u('/rewards/')}">How Elevated Rewards works ${icon('arrow')}</a></p>
    </div>
  </div>
</section>

<section class="band band--learn" aria-labelledby="learn-t">
  <div class="band__in">
    ${sectionHead({ k: 'EDUCATION', t: home.learnTitle, id: 'learn-t', lede: 'Written for people, not product hype.' })}
    ${learnCards()}
    <div class="arts">
      ${latest.map((a, i) => `<a class="art" href="${u(`/learn/${a.slug}/`)}" data-reveal style="--i:${i}"><span class="art__img">${img('learn-' + a.slug, { alt: a.featuredImageAlt || '', sizes: '(max-width: 760px) 90vw, 360px' })}</span><span class="art__meta">${esc(a.category)} · ${a.readingTimeMinutes} min read</span><span class="art__t">${esc(a.title)}</span></a>`).join('')}
    </div>
    <p class="center">${btn('All Learn articles', '/learn/', { kind: 'ghost' })}</p>
  </div>
</section>

<section class="band band--visit" id="store-information" aria-labelledby="visit-t">
  <div class="band__in">${visitBlock().replace('class="shead__t"', 'class="shead__t" id="visit-t"')}</div>
</section>

<section class="band band--rooted" aria-labelledby="rooted-t">
  <div class="band__in rooted">
    <div class="rooted__art" aria-hidden="true">${img('scene-fire-escape', { alt: '', sizes: '(max-width: 760px) 90vw, 440px' })}</div>
    <div class="rooted__txt">
      ${kicker(home.rootedKicker)}
      <h2 class="shead__t" id="rooted-t" data-words>${esc(home.rootedTitle)}</h2>
      <p class="shead__lede">${esc(home.rooted)}</p>
      <p>Elevated Dreams holds a CAURD license, New York's first-round adult-use retail license, created for people and families harmed by past cannabis enforcement. It is neighborhood owned, not a chain.</p>
      ${btn(home.rootedCta, '/community/', { kind: 'ghost' })}
    </div>
  </div>
</section>

${finale()}`;
  return [{
    path: '/', title: 'Elevated Dreams LLC | Newburgh NY Dispensary',
    desc: 'Visit Elevated Dreams LLC, a Newburgh, NY dispensary for adult-use cannabis, delivery, pickup, product education, and daily deals. Order online today.',
    bodyClass: 'is-home hxe-page', body, noPlacards: true, inlineCss: hero.css, inlineJs: hero.js,
    preload: hero.preload,
    schema: [localBusiness(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Elevated Dreams', url: 'https://elevateddreamscannabisny.com/' }],
  }];
}
