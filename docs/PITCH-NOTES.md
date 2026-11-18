# Elevated Dreams: redesign pitch notes

A design concept for **Elevated Dreams LLC**, 190 South Plank Road, Unit 10, Newburgh, NY 12550
(license OCM-CAURD-26-000353). Built 2026-11-18 from the live site, https://elevateddreamscannabisny.com/.
The preview is `noindex`; it is a pitch, not the client's official website.

## Round 5 (owner review, 2026-11-18)

- **Hero E "One sky" is the home hero.** Shop Our Menu now follows it directly, then the compliance signs and Tonight's
  deals, all under one sky that runs from golden hour to night.
- **Motion rebuilt for smoothness:** scroll-linked movement and crossfades run on the browser's compositor, the dusk and
  night grades are pre-baked, the page's own sky stops while the hero's sky covers it, and reveals and page changes no
  longer animate filters. The intro is about one second, once per visitor.
- **The "13"** no longer shows a glow cut off by its fill.
- **Sign cards:** three directions at `/lab/cards/` (Dream cards, Street signs at dusk, Adrift on the clouds), wording
  unchanged, awaiting a pick.

## Round 4 (owner review, 2026-11-18)

- **Display font = the live logo's font, Rockwell Bold** (chosen from four pairings at `/lab/fonts/`). Verified with
  Chrome's platform-font report: the live logo's CSS asks for Clarendon, Rockwell, "Roboto Slab", Georgia at 700, and
  renders Rockwell-Bold (Clarendon is never loaded). Rockwell is a commercial Monotype face, so the preview uses the
  visitor's installed copy (Macs, PCs with Microsoft Office) and otherwise Roboto Slab Bold, the next font in the live
  stack. **A Rockwell web-font license is needed before launch.** UI and body stay Barlow Condensed and Barlow.
- **Hero wordmark:** ELEVATED and DREAMS left-aligned with each other and lowered, clear of the menu.
- **Pre-Rolls category image** is now a real product photo from an earlier studio build, picked in review as the most
  convincing one (background removed, turned to a diagonal, metadata stripped). That store's operator supplied it for
  their own site, so **clear its use or swap in an Elevated Dreams product photo before launch.**
- **Eyebrows carry no dashes** (owner rule): the short line drawn before every eyebrow is gone, and the hero eyebrow
  reads PREMIUM LICENSED DISPENSARY · NEWBURGH, NY (the em dash became the middle dot the site already uses).
- **Two more hero options with seamless transitions** into the bars above and the sections below: D "Open sky" and
  E "One sky, golden hour to night", at `/lab/hero-d/` and `/lab/hero-e/`.

## Round 3 (owner review, 2026-11-18)

- **Hero background:** the store's own storefront photo, edited to golden hour with the ground replaced by a sea of
  clouds so the building floats (fal Nano Banana Pro edit; the building, the "Elevated Dreams" sign, the window
  banners, door and handrail kept as photographed and checked at full size). Also made from it: a phone crop, the same
  shot after dark, the sky with the building removed, and a cut-out of the building, for the layout options.
  Request ids: golden-wide-b 01a1ec45-770d-7c33-89f0-f68768b2ac52, golden-wide-a 01a1ec45-7605-7e22-8dc6-77c7217a8dd1,
  golden-tall 01a1ec45-7605-7fb3-8f4d-0d4d748dcff3, night-wide-b 01a1ec47-9f88-71b0-9342-6676c9ca7607,
  plate-wide-b 01a1ec47-9f7e-7ec0-9639-06783a4967ea, cut-out (BiRefNet v2) 01a1ec47-a04e-7c80-9dde-2ee9186ea146.
  List price about $0.90. The client should approve showing an edited image of their storefront.
- **Chosen (owner, 2026-11-18): Hero A "Levitate" + Splash 1 "Through the clouds"**, now on the site: the home
  hero is Levitate (`src/lib/hero-a.mjs`); the splash replaces the smoke loader on the first page of every visit and
  hands off to the age check (`src/lib/splash.mjs`, `src/styles/splash.css`).
- **Hero layout and splash: three options each** at `/lab/` on the preview (Levitate, Portal, Golden hour to after
  dark; Through the clouds, Golden horizon, Wake into the dream). The home page shows the storefront on the right with
  the copy on the left until one is chosen.
- **Removed:** floating objects in every hero (home and inner pages; the category tiles keep their products because
  they label the categories), the lit-windows building for "Shop by feeling" (now four skies, afternoon to after
  dark), the giant "CLOUD 9" footer and its cloud-sea image (now the brand name, outlined), gold on the logo (white
  with a violet glow everywhere; gold stays only on buttons and accents).
- **Quieter:** the background skylines (about a fifth of their former strength, windows dimmed).

## The idea: Levitation Noir

New York after dark, seen from a store that refused to stay shut. The live site's own palette is kept and pushed
harder: near-black plum ground, electric violet (#7B6AC4, the live primary) as neon spill, gold (#EAD59A, the live
accent) as streetlight and brass, sodium orange as the street glow. The live slab-serif headline idea is kept as a
fat Clarendon slab (Ultra), paired with a tight condensed grotesk (Barlow Condensed) and Barlow for reading.

- **Levitation.** "ELEVATED" hovers above "DREAMS" and casts a hard shadow on it. Products and the pre-roll float
  over the page with a shadow on the ground that shrinks as they rise; anything levitating lifts a few pixels when the
  cursor comes near.
- **Altitude.** A fixed altimeter counts up as you scroll ("ALT 0 FT, STREET LEVEL" at the hero, "ELEVATED" at the
  footer) while the backdrop rises: street glow, then rooftops falling away, then stars and a moon.
- **Dream haze (round 2).** Night fog is the connective tissue. The first visit opens with the wordmark condensing
  out of smoke (once per session, about a second, any input skips it). A site-wide WebGL fog layer drifts behind
  every page and changes with the altitude: orange streetlight haze at street level, a violet cloud layer midway,
  clearing to stars at the top. The cursor or a finger parts it anywhere. Haze rolls across the
  hero skyline and the floating products, drifts in front of the lit "Shop by feeling" windows, pools under every
  levitating category object and dissolves the seams between sections. Page changes never wait: the old page drifts
  into haze as the link fires and the new one clears out of it. The age check is smoked glass with haze inside.
  Ambient fog only: it never comes off a product or a person, so nothing reads as consumption.
- **Dream logic.** A mirrored, upside-down skyline rippling in the river under the hero; a slow WebGL smoke field the
  cursor parts; an impossible (Penrose) staircase on Our Story with a light that climbs it forever.
- **Rise from the ground up (the one elevator).** Our Story is a 13-floor climb: the car rises month by month
  ("RENT PAID · MONTH 07"), the floor indicator steps through the Planning Board, the public hearing, the December
  2025 testimony, and at the penthouse the steel doors open on the real storefront and a neon OPEN. The elevator lives
  only here, where the 13 months of locked doors make it literal; round 1 used it site-wide and it was cut back.
- **Compliance in the brand.** License as a brass building plaque, warnings as an enamel street sign, HOPEline as a
  transit information panel. All wording verbatim from the live site.

## Every Shop button lands on products

Every Shop, Order Online, category tile, "Shop by feeling" window, mega-menu category and sticky-bar button opens the
client's live online store (Sweed) at `/locations/newburgh/menu`: the page with the products and the cart. There is
no intermediate category page anywhere on the site. Deals buttons open the store's discounts page; account and
rewards buttons open the customer account page. These are the live site's own store links.

**One thing to confirm from a US connection:** the Sweed store answers 403 outside the US, so the per-category paths
inside it (e.g. the Vapes listing) could not be read from here. Every category tile therefore opens the full live
menu rather than a guessed URL. Once the category paths are known, one edit in `src/content/site.mjs` points each
tile straight at its own listing.

## Kept exactly

- The live words on the live URLs: home (offers, members, menu, pickup, story, inside, why, first visit, learn,
  community, ready to shop), `/about`, `/education`, `/learn` and all 20 Learn articles at `/learn/<slug>`, `/deals`,
  `/rewards`, `/community`, `/contact`, `/menu`. Titles and meta descriptions carried from the live pages and the
  articles' own SEO fields.
- The license, warning and HOPEline text, the hours, address and phone, the LocalBusiness facts.
- Every real photo: the storefront, interior, showroom, window area, reception and the montage (graded into the night
  palette with CSS only; pixels untouched), and the 20 article images.
- The live motion, upgraded: the delivery marquee is now an LED zipper; the rotating compliance block became the
  placard wall; the fade-up reveals now "levitate in" (rise, unblur, light on); click-to-enlarge is kept as a
  lightbox; the first-visit steps light up as elevator call buttons.

## New (for the client's approval)

- **Page types the reference sites carry and the live site lacks:** a shop hub with category shortcuts (`/menu`),
  store page (`/visit`), pickup (`/pickup`), delivery (`/delivery`), first visit (`/first-visit`), FAQ (`/faq`),
  social equity (`/social-equity`), New York rules (`/new-york-cannabis-rules`), terpene glossary
  (`/learn/terpenes`), areas near us (`/areas` plus Newburgh, New Windsor, Beacon and Walden pages), privacy and
  terms placeholders (the live age gate already refers to both), an HTML site map and a 404.
- **New lines**, all from the operator's brief or the brand study: "Dreams take work. Welcome in.", the 13-month
  story, the four feelings (Daydream, Social, Wind Down, Lights Out) with a note that they name a moment, not a
  promised effect.
- **Original copy on the new pages** is built from the live site's own facts and words. Nothing invented: no prices,
  products, reviews, delivery zones, minimums or events. Where the live site says "coming soon" (parking, community
  events), the preview says the same.

## Not built, on purpose

| page type | why |
|---|---|
| product, brand and strain pages | they need menu data; the live store (Sweed) owns products and the cart |
| reviews | the client has no published reviews to show; none are invented |
| events calendar, careers, press | no events, openings or coverage published |
| `/admin`, `/sign-in`, `/forgot-password` | staff-only admin screens of the current platform; the public Admin footer link is removed |
| owner portrait | no photo of Shawn exists in the capture; the slot says "Portrait to be photographed in the store. No stand-ins." |

## Questions for the client

1. How much of the 13-month story is Shawn comfortable telling publicly? (The preview tells it from public record.)
2. A short photo shoot: Shawn, the team, the counter, the sign at night. The owner slot and the story are waiting.
3. The Sweed category URLs (from a US connection), so each category tile opens its own listing.
4. Delivery area, minimums, fees and hours; parking details (the live site says "coming soon").
5. The contact email: the live contact page shows `hello@elevateddreams.com`, a different domain from the website.
6. Final privacy policy and terms text; social media handles to link.
7. A compliance read of the new copy and of warning and age-gate placement against current OCM advertising rules.
8. Confirm the hours everywhere (the live site says Mon to Sat 10 AM to 9 PM; one directory lists 6 PM).

## Live-site defects found during capture

- The online store returns 403 to visitors outside the US (fine for customers; it hides the menu from review).
- An expired offer is still live ("ROVE 30% off ... until October 31, 2026"); the preview hides expired offers by date.
- `/menu` says "Our category shortcuts are being configured."
- "Visit Our Store" links to an on-page anchor, not directions.
- A public "Admin" link in the footer.
- `/pages/privacy-policy` and `/pages/terms` render empty while the age gate refers to them.
- The 404 page reads "Did you forget to add the page to the router?".
- The settings API carries template defaults (a Los Angeles address, (555) 420-0001) and five sample products.
- "Education" and "Learn" overlap; "Community" is a coming-soon page.

## Imagery

Real client media is used as captured. Generated media is mood and category illustration only: no people, no text,
no logos, no stand-in for the store, the owner or a real product. Every generated `<img>` carries `data-ai="generated"`.

| asset | model | request id |
|---|---|---|
| hero river and bridge (wide + tall) | fal flux-pro v1.1 ultra | 01a1ebf6-0e43-7eb3-ac69-5a29a0662878, 01a1ebf6-0e48-7771-a1b6-e83a2f686f0f |
| hero film (5 s seamless loop, first frame = last frame) | fal kling-video v2.5 turbo pro, image-to-video | 01a1ebf6-d23a-7050-a49e-f34fe2fa7859 |
| rooftops water tower, fire escape, cloud sea | fal flux-pro v1.1 ultra | 01a1ebf6-0e4b-7440-8c3c-6bd476c4bf3c, 01a1ebf6-3939-7830-a938-3e03fbb1ad59, 01a1ebf6-3932-7532-9570-a93693846a6c |
| 7 levitating category objects | fal flux-pro v1.1 ultra, cut out with fal BiRefNet v2 | see `tools/gen/jobs.json`; ids in the build log |

Rejected: a wet-street scene (pseudo-text in the shop signs). Smoke wisps detached from three object renders were
removed in post (only the largest alpha component is kept), so nothing reads as consumption.
List-price spend: about $1.20 (13 stills at $0.06, 7 cut-outs, one 5-second video at $0.07/s).

## What was checked

- Every page rendered headless at 1440 and 390 px: no script errors, no failed requests, no sideways overflow, one H1.
- Interactions driven in a browser: loader, age gate (focus, routing, close), mega menu, pickup bar (past the hero,
  hidden at the footer), altimeter ("ELEVATED" at the bottom), smoke loader, page haze (navigation is never
  delayed), fog layer, phone drawer. Re-run after round 2 (dream haze), 2026-11-18.
- Not checked: the site-reforge gate (this is a pitch preview, not a handoff package), a Lighthouse run, and the live
  Sweed category pages (403 from outside the US).
