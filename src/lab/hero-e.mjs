// lab/hero-e.mjs: review page for HERO E "One sky" (the owner's pick; the home page uses the same module).
import { heroE } from '../lib/hero-e.mjs';
import { catsGrid, dealsGrid } from '../lib/sections.mjs';
import { placards } from '../lib/layout.mjs';

export default function () {
  const h = heroE();
  return {
    path: '/lab/hero-e/',
    title: 'Hero E: One sky | Elevated Dreams redesign',
    desc: 'Hero E, now on the home page: one continuous sky from the top of the page to the deals.',
    bodyClass: 'is-lab is-home hxe-page',
    preload: h.preload,
    body: `${h.section}
<section class="band band--cats" aria-labelledby="cats-t"><div class="band__in">${catsGrid().replace('class="shead__t"', 'class="shead__t" id="cats-t"')}</div></section>
<section class="band band--brick band--placards band--placards-top" aria-label="License, warnings and HOPEline"><div class="band__in">${placards()}</div></section>
<section class="band band--deals" id="tonight" aria-labelledby="deals-t"><div class="band__in">${dealsGrid().replace('class="shead__t"', 'class="shead__t" id="deals-t"')}</div></section>`,
    inlineCss: h.css,
    inlineJs: h.js,
    replay: false,
  };
}
