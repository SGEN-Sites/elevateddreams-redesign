# Elevated Dreams: redesign pitch notes

A design concept for **Elevated Dreams LLC**, 190 South Plank Road, Unit 10, Newburgh, NY 12550
(license OCM-CAURD-26-000353). Built 2026-11-18 from the live site, https://elevateddreamscannabisny.com/.
The preview is `noindex`; it is a pitch, not the client's official website.

## The idea: Levitation Noir

New York after dark, seen from a store that refused to stay shut. The live site's own palette is kept and pushed
harder: near-black plum ground, electric violet (#7B6AC4, the live primary) as neon spill, gold (#EAD59A, the live
accent) as streetlight and brass, sodium orange as the street glow. The live slab-serif headline idea is kept as a
fat Clarendon slab (Ultra), paired with a tight condensed grotesk (Barlow Condensed) and Barlow for reading.

- **Levitation.** "ELEVATED" hovers above "DREAMS" and casts a hard shadow on it. Products and the pre-roll float
  over the page with a shadow on the ground that shrinks as they rise; anything levitating lifts a few pixels when the
  cursor comes near.
- **Altitude.** A fixed altimeter counts up as you scroll ("ALT 0 FT, STREET LEVEL" at the hero, "CLOUD 9" at the
  footer) while the backdrop rises: street glow, then rooftops falling away, then stars, a moon and a cloud sea.
- **Elevator.** The first visit opens on brushed-steel doors under a floor indicator counting G to ED (once per
  session, any input skips it). The age check is an elevator panel with brass call buttons. The phone menu opens
  as steel doors; moving between pages closes the doors and opens them on the next floor, with a brief chromatic
  shift and film grain.
- **Dream logic.** A mirrored, upside-down skyline rippling in the river under the hero; a slow WebGL smoke field the
  cursor parts; an impossible (Penrose) staircase on Our Story with a light that climbs it forever.
- **Rise from the ground up.** Our Story is a 13-floor climb: the car rises month by month ("RENT PAID · MONTH 07"),
  the floor indicator steps through the Planning Board, the public hearing, the December 2025 testimony, and at the
  penthouse the steel doors open on the real storefront and a neon OPEN.
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
  hidden at the footer), altimeter ("CLOUD 9" at the bottom), page doors, phone drawer.
- Not checked: the site-reforge gate (this is a pitch preview, not a handoff package), a Lighthouse run, and the live
  Sweed category pages (403 from outside the US).
