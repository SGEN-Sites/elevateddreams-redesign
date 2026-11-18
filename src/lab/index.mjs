// lab/index.mjs: the review page for round 3: three hero layouts and three splash animations, side by side.
import { u, img, icon, esc } from '../lib/html.mjs';

const HEROES = [
  ['hero-a', 'A', 'Levitate', 'The real storefront lifts off a sea of golden-hour clouds. Sky, building and three cloud layers move at different depths as your cursor moves; scrolling lifts the building higher while the clouds sink. The brand name sits behind the building, the clouds in front of both.', 'Reacts to: cursor, scroll'],
  ['hero-b', 'B', 'Portal', 'A full-screen ELEVATED DREAMS wordmark with the golden-hour storefront seen through an arched window in the middle. Look around inside the window with your cursor; scroll and the window opens to full screen while the words part around it.', 'Reacts to: scroll (pinned reveal), cursor'],
  ['hero-c', 'C', 'Golden hour to after dark', 'Headline on the left, the storefront in a large framed scene on the right. Move across the scene (or drag on a phone) and the light sweeps from golden hour to after dark: the same building, the windows lit, the clouds turning to moonlight. Left alone, it cycles slowly.', 'Reacts to: cursor or drag, time'],
];
const SPLASHES = [
  ['splash-1', '1', 'Through the clouds', 'The screen opens inside warm clouds; the wordmark rises through them and the clouds part to reveal the storefront.'],
  ['splash-2', '2', 'Golden horizon', 'A thin line of sunrise draws across a dark screen, the light blooms upward, ELEVATED lifts off DREAMS, and the scene fades up into the hero.'],
  ['splash-3', '3', 'Wake into the dream', 'Darkness, a slow blink: the view opens like eyes waking, blurred golden light sharpens into the storefront, and the wordmark comes into focus.'],
];

export default function () {
  const card = ([slug, n, name, txt, reacts]) => `<li><a class="labx__card" href="${u(`/lab/${slug}/`)}"><span class="labx__n">${n}</span><b>${esc(name)}</b><span>${esc(txt)}</span>${reacts ? `<em>${esc(reacts)}</em>` : ''}<i>Open ${icon('arrow')}</i></a></li>`;
  return {
    path: '/lab/', title: 'Hero and splash options | Elevated Dreams redesign', desc: 'Three hero layouts and three splash animations for review.', bodyClass: 'is-lab',
    body: `<section class="labx">
  <div class="labx__bg" aria-hidden="true">${img('hero-golden-b', { alt: '', sizes: '100vw', eager: true })}</div>
  <div class="band__in labx__in">
    <p class="kicker">ROUND 3 · CHOSEN: HERO A + SPLASH 1, NOW ON THE HOME PAGE</p>
    <h1 class="labx__t">Pick a hero. <em>Pick a splash.</em></h1>
    <p class="labx__lede">All three heroes use the real storefront, relit at golden hour and floating on clouds. Open each one, move the cursor, scroll, and try it on your phone. Splash pages have a Replay button in the bar above.</p>
  </div>
</section>
<section class="band"><div class="band__in">
  <h2 class="shead__t">Hero layouts</h2>
  <ul class="labx__grid" role="list">${HEROES.map(card).join('')}</ul>
  <h2 class="shead__t labx__h2">Splash animations</h2>
  <ul class="labx__grid" role="list">${SPLASHES.map(card).join('')}</ul>
  <h2 class="shead__t labx__h2">Font pairings</h2>
  <ul class="labx__grid" role="list">${card(['fonts', 'Aa', 'Four pairings on the real home page', 'A Current (Ultra), B Poster (Alfa Slab One), C Editorial (Zilla Slab), D the live logo font (Rockwell Bold). Switch with the A/B/C/D buttons on the right edge.', 'Reacts to: the switcher'])}</ul>
  <p class="fine">The storefront image is an AI-edited version of the store's own photo (golden-hour light and clouds added; the building, sign and windows kept). Every option is a working prototype at the live preview's quality bar, not a mock-up.</p>
</div></section>`,
    inlineCss: `
.labx{position:relative;isolation:isolate;overflow:clip;margin-top:calc(-1*var(--hdr-h));padding:calc(var(--hdr-h) + 80px) 0 90px;min-height:62vh;display:grid;align-items:end}
.labx__bg{position:absolute;inset:0;z-index:-1}.labx__bg img{width:100%;height:100%;object-fit:cover;object-position:60% 50%}
.labx__bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,14,28,.85),rgba(20,14,28,.45) 55%,rgba(20,14,28,.15)),linear-gradient(180deg,transparent 60%,var(--ink))}
.labx__t{font-family:var(--f-display);font-size:clamp(2.4rem,6vw,5rem);line-height:.95}
.labx__t em{font-style:normal;color:var(--violet-hi)}
.labx__lede{max-width:60ch;margin-top:18px;color:var(--text-2);font-size:1.15rem}
.labx__grid{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:26px 0 60px}
.labx__h2{margin-top:10px}
.labx__card{display:grid;gap:8px;height:100%;padding:28px;border-radius:22px;text-decoration:none;color:var(--text);background:linear-gradient(160deg,rgba(52,42,72,.6),rgba(18,13,25,.8));box-shadow:inset 0 0 0 1px var(--line-2);transition:transform .5s var(--ease),box-shadow .5s}
.labx__card:hover{transform:translateY(-6px);box-shadow:inset 0 0 0 1px rgba(169,155,240,.6),0 30px 60px -30px rgba(0,0,0,.9)}
.labx__n{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--violet);color:#fff;font:800 1.2rem var(--f-ui)}
.labx__card b{font:400 1.6rem/1.1 var(--f-display)}.labx__card span{color:var(--text-2)}
.labx__card em{font:700 .85rem var(--f-ui);font-style:normal;letter-spacing:.16em;text-transform:uppercase;color:var(--violet-hi)}
.labx__card i{display:inline-flex;gap:.4em;align-items:center;font:700 .95rem var(--f-ui);font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:var(--text)}
.labx__card i .ic{width:16px;height:16px}
@media (max-width:900px){.labx__grid{grid-template-columns:1fr}}`,
  };
}
