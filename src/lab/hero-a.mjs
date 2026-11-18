// lab/hero-a.mjs: review page for HERO A "Levitate" (chosen in round 3; the home page uses the same module).
import { heroA } from '../lib/hero-a.mjs';
import { dealsGrid } from '../lib/sections.mjs';

export default function () {
  const h = heroA();
  return {
    path: '/lab/hero-a/',
    title: 'Hero A: Levitate | Elevated Dreams redesign',
    desc: 'Hero option A: the real Elevated Dreams storefront lifts off a sea of golden-hour clouds, with depth that follows the cursor and the scroll.',
    bodyClass: 'is-lab is-home',
    preload: h.preload,
    body: `${h.section}\n<section class="band band--deals"><div class="band__in">${dealsGrid()}</div></section>`,
    inlineCss: h.css,
    inlineJs: h.js,
    replay: false,
  };
}
