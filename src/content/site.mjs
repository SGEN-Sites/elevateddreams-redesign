// site.mjs: the store's facts and the live site's own words, in one place. Nothing here is typed from memory:
// every string marked LIVE was captured from https://elevateddreamscannabisny.com/ on 2026-11-18 (audit/render,
// audit/api); FACTS strings trace to facts/client-facts.json. New words are neutral glue (labels, button text).

export const STORE_ORIGIN = 'https://elevateddreamscannabisny.com';
// The live online store (Sweed). Every Shop / category / feeling button goes here: these pages carry the products
// and the cart. The category paths inside Sweed could not be read from this connection (403 outside the US), so
// every category points at the menu itself rather than at a guessed URL. One edit here retargets them all.
export const SHOP = {
  menu: `${STORE_ORIGIN}/locations/newburgh/menu`,
  discounts: `${STORE_ORIGIN}/locations/newburgh/menu/discounts?promo=deals`,
  account: `${STORE_ORIGIN}/locations/newburgh`,
};

export const store = {
  name: 'Elevated Dreams', // consumer-facing; the legal name stays in the licence lines
  legal: 'Elevated Dreams LLC',
  street: '190 South Plank Road, Unit 10',
  city: 'Newburgh', region: 'NY', regionLong: 'New York', zip: '12550',
  plaza: 'Algonquin Plaza', // FACTS
  phone: '845-245-3716', tel: '+18452453716',
  email: 'hello@elevateddreams.com', // LIVE contact page (flagged in pitch notes: different domain)
  license: 'OCM-CAURD-26-000353',
  owner: 'Shawn Campbell', // FACTS
  maps: 'https://www.google.com/maps/search/?api=1&query=190+South+Plank+Road+Unit+10+Newburgh+New+York+12550',
  mapsEmbed: 'https://www.google.com/maps?q=190+South+Plank+Road+Unit+10,+Newburgh,+NY+12550&output=embed',
  // LIVE hours. 0 = Sunday. [open, close] in 24h, America/New_York.
  hours: { 0: [11, 19], 1: [10, 21], 2: [10, 21], 3: [10, 21], 4: [10, 21], 5: [10, 21], 6: [10, 21] },
  hoursRows: [['Monday – Saturday', '10:00 AM – 9:00 PM'], ['Sunday', '11:00 AM – 7:00 PM']],
  hoursShort: ['Mon – Sat: 10:00 AM – 9:00 PM', 'Sun: 11:00 AM – 7:00 PM'],
};

// LIVE compliance copy, verbatim (home compliance carousel + footer).
export const compliance = {
  licenseTitle: 'NEW YORK STATE CANNABIS LICENSE',
  licenseLine: 'Elevated Dreams LLC · 190 South Plank Road, Unit 10, Newburgh, New York 12550',
  warningTitle: 'WARNING',
  warning: 'For use only by persons 21 years of age and older. Keep out of reach of children and pets. If someone accidentally consumes cannabis, contact the Poison Center. Consume responsibly.',
  addTitle: 'ADDITIONAL WARNING',
  additional: 'Cannabis can impair concentration and coordination. Do not operate a vehicle or machinery under the influence of cannabis.',
  hopeTitle: 'NEW YORK STATE HOPELINE',
  hopeCall: '1-877-8-HOPENY', hopeCallDigits: '1-877-846-7369', hopeTel: '18778467369',
  hopeText: 'HOPENY', hopeTextTo: '467369', hopeWeb: 'oasas.ny.gov/hopeline', hopeUrl: 'https://oasas.ny.gov/hopeline',
  footerLegal: 'For use only by persons 21 years of age and older. Keep out of reach of children and pets. Consume responsibly.',
  footerCaps: 'CANNABIS IS FOR USE ONLY BY ADULTS 21 AND OLDER. KEEP OUT OF REACH OF CHILDREN. PURCHASE ONLY WHERE LEGAL.',
  ageGate: 'By entering this site, you agree to our Terms of Service and Privacy Policy. You must be 21+ to view this content.',
};

// LIVE deals (/api/deals + home). `expires` is read from the live badge text; expired offers are hidden by the
// build and again by the page script (the Rove offer ended October 31, 2026: ledger REMOVE, see docs/CHANGE-LOG.md).
export const deals = [
  { id: 'first', badge: 'NEW CUSTOMER', title: '15% Off First Visit', desc: 'Show this card at checkout. One-time discount for new customers.', big: '15%', unit: 'OFF', days: [0, 1, 2, 3, 4, 5, 6] },
  { id: 'preroll', badge: 'BUNDLE DEAL', title: 'Pre-Roll Bundle', desc: 'Buy any 3 pre-rolls, get 1 free. Mix and match your favorites.', big: '3+1', unit: 'PRE-ROLLS', days: [0, 1, 2, 3, 4, 5, 6] },
  { id: 'edible', badge: 'WEEKEND', title: 'Edible Weekend Deal', desc: 'Every Friday and Saturday: 20% off all edibles.', big: '20%', unit: 'OFF EDIBLES', days: [5, 6] },
  { id: 'rove', badge: 'UNTIL OCTOBER 31,2026', title: 'ROVE', desc: '30% off all Rove Products', big: '30%', unit: 'OFF ROVE', days: [0, 1, 2, 3, 4, 5, 6], expires: '2026-10-31' },
];
export const dealsCopy = {
  kicker: 'OFFERS & SAVINGS', title: 'Current promotions',
  lede: 'See offers shared by our team. Availability and eligibility can change; confirm details in the live store.',
  fine: 'Offers may change. Check the live ordering flow for current availability, eligibility, and final pricing.',
  cta: 'Check live discounts', all: 'See all offers',
};

// LIVE category grid (home "Shop Our Menu"). Images: generated levitation stills (gen/), the live stock photo kept
// as the fallback record in private/live.
export const categories = [
  { id: 'flower', label: 'Flower', img: 'obj-flower', guide: 'cannabis-flower-to-explore-elevated-dreams' },
  { id: 'pre-rolls', label: 'Pre-Rolls', img: 'obj-preroll', guide: 'pre-rolls-to-explore-newburgh' },
  { id: 'edibles', label: 'Edibles', img: 'obj-edibles', guide: 'edibles-to-explore-elevated-dreams' },
  { id: 'vapes', label: 'Vapes', img: 'obj-vape', guide: 'cannabis-vapes-to-explore-elevated-dreams' },
  { id: 'concentrates', label: 'Concentrates', img: 'obj-concentrate', guide: 'high-thc-cannabis-labels-elevated-dreams' },
  { id: 'cbd', label: 'CBD', img: 'obj-cbd', guide: 'cannabis-tinctures-to-explore' },
  { id: 'accessories', label: 'Accessories', img: 'obj-accessory', guide: null },
];
export const shopCopy = {
  title: 'Shop Our Menu', lede: 'Browse live inventory across all categories through our secure online storefront.',
  hubKicker: 'SHOP ELEVATED DREAMS LLC', hubTitle: 'Live selection, powered by Sweed.',
  hubLede: 'Choose a category to browse live availability, pricing, and ordering through the Elevated Dreams LLC Sweed storefront.',
  all: 'All Products', allCta: 'View Full Menu →',
};

// Operator brief + brand study: four moods, each a lit window. They go to the live menu (products + cart).
export const feelings = [
  { id: 'daydream', label: 'Daydream', line: 'Slow afternoons. Open notebooks. Nowhere to be.', floor: '4' },
  { id: 'social', label: 'Social', line: 'The crew is coming over. Something to pass around.', floor: '3' },
  { id: 'wind-down', label: 'Wind Down', line: 'Shoes off. Porch light on. Volume low.', floor: '2' },
  { id: 'lights-out', label: 'Lights Out', line: 'Last call is at home tonight.', floor: '1' },
];
export const feelingsNote = 'Feelings name the moment, not a promised effect. Effects vary from person to person; ask our team before you buy.';

// LIVE home blocks.
export const home = {
  heroKicker: 'PREMIUM LICENSED DISPENSARY · NEWBURGH, NY',
  liveH1: 'Elevate Your Experience',
  heroLede: 'Discover premium cannabis, knowledgeable service, and convenient online ordering at Elevated Dreams LLC in Newburgh.',
  storyKicker: 'OUR STORY', storyTitle: 'Welcome to Elevated Dreams LLC',
  story: 'Elevated Dreams LLC is committed to providing a welcoming, knowledgeable, and responsible cannabis retail experience for the Newburgh community. Our goal is to help customers make informed choices while offering convenient access to carefully selected products through our secure online storefront.',
  storyCta: 'Learn More About Us',
  insideKicker: 'VISIT ELEVATED DREAMS LLC', insideTitle: 'Take a Look Inside',
  insideLede: 'Get a feel for our storefront, showroom, and welcoming customer experience before you visit.',
  gallery: [
    { img: 'live-showroom-wide', title: 'Our Showroom', text: 'Explore the welcoming showroom and thoughtfully arranged product displays.', alt: 'Elevated Dreams LLC dispensary showroom with product display counters' },
    { img: 'live-window-area', title: 'A Bright, Comfortable Space', text: 'A calm window area designed for a comfortable visit.', alt: 'Elevated Dreams LLC dispensary window area and retail display' },
    { img: 'live-reception', title: 'Reception & Service', text: 'Meet the team and get guidance in a welcoming retail environment.', alt: 'Elevated Dreams LLC dispensary reception and showroom' },
    { img: 'live-montage', title: 'Take a Look Inside', text: 'A collection of views from inside and outside Elevated Dreams LLC.', alt: 'Elevated Dreams LLC dispensary storefront and interior photo montage' },
  ],
  whyTitle: 'Why Elevated Dreams LLC',
  why: [
    { t: 'Premium Selection', d: 'Carefully selected products from trusted New York cannabis brands and cultivators.' },
    { t: 'Knowledgeable Guidance', d: 'A welcoming experience designed to help customers understand products and make informed decisions.' },
    { t: 'Community Focus', d: 'Built to serve Newburgh with responsible education, access, and local engagement.' },
  ],
  newKicker: 'NEW CUSTOMERS', newTitle: 'First Time Visiting?',
  steps: ['Bring valid government-issued identification', 'Customers must be 21 years of age or older', 'Browse live products online before visiting', 'Ask our team for guidance when you arrive'],
  newCta: 'Read the Visitor Guide',
  membersKicker: 'MEMBERS GET MORE', membersTitle: 'Elevate Your Experience & Unlock Exclusive Deals',
  members: 'Create a free account to access member-exclusive discounts, loyalty rewards, early access to new products, and personalized recommendations — all through our secure online store.',
  learnTitle: 'Learn Before You Shop',
  learnCards: [
    { t: 'Understanding Product Types', d: 'Learn the difference between flower, edibles, vapes, concentrates, and CBD products.', a: 'product-types' },
    { t: 'Responsible Cannabis Use', d: 'General guidance on dosing, safe storage, and avoiding common first-time mistakes.', a: 'responsible-use' },
    { t: 'New York Cannabis Rules', d: 'What adult-use means in New York State, possession limits, and where consumption is permitted.', a: 'ny-rules' },
  ],
  pickupKicker: 'PICKUP AT', pickupTitle: 'Elevated Dreams LLC · Newburgh',
  parking: 'Parking details coming soon',
  pickupHow: 'Place your order through our online storefront and select pickup at checkout. Bring a valid ID when you arrive.',
  rootedKicker: 'NEWBURGH, NY', rootedTitle: 'Rooted in Newburgh',
  rooted: 'Elevated Dreams LLC is proud to support responsible cannabis education, local partnerships, and a welcoming retail experience for the Newburgh community.',
  rootedCta: 'Community Updates',
  readyTitle: 'Ready to Shop?',
  ready: 'Browse live inventory, current discounts, and available pickup options through the Elevated Dreams LLC online storefront in Newburgh.',
  readyFine: 'Live products, pricing, discounts, customer accounts, and checkout are managed through our secure online store.',
  footerBlurb: 'A premium cannabis retail experience serving the Newburgh community with care, education, and responsibility.',
};

// LIVE /about.
export const about = {
  title: 'Our Story',
  lede: 'Elevated Dreams LLC is a Newburgh dispensary focused on premium products, safe education, and a smooth customer experience. We believe cannabis should be approachable, stigma-free, and curated for your lifestyle.',
  values: [
    { t: 'Premium Quality', d: 'Lab-tested products from trusted cultivators. We hand-select every flower, edible, and concentrate to ensure exceptional purity and potency.' },
    { t: 'Education First', d: 'Our staff are trained to guide you to the right product. Whether you seek relief, relaxation, or creativity, we help you navigate with confidence.' },
    { t: 'Community', d: 'Built for our neighborhood, by our neighborhood. We strive to be a positive presence, supporting local initiatives and fostering safe access.' },
  ],
  cta: 'Shop Our Menu Online',
};

// LIVE /education, verbatim.
export const education = {
  title: 'Cannabis Education',
  lede: 'General information to help customers make informed choices. Our staff is always available to answer questions in person.',
  sections: [
    { id: 'product-types', t: 'Cannabis Product Types', d: 'Cannabis products fall into several general categories: flower (the dried plant), pre-rolls (ready-to-use), edibles (food and beverages), vapes (oil cartridges and pens), concentrates (high-potency extracts), tinctures and CBD products. Each type has different onset times, durations, and potency levels. Understanding the basics helps you make informed choices.' },
    { id: 'responsible-use', t: 'Responsible Use', d: 'Start with a low dose and go slow, especially with edibles and concentrates. Effects vary by individual and method of consumption. Never drive or operate heavy machinery after using cannabis. Keep products away from children and pets. Avoid use if pregnant, nursing, or taking medications that may interact.' },
    { id: 'safe-storage', t: 'Safe Storage', d: 'Store cannabis products in a secure, cool, dark location, out of reach of children and pets. Use child-resistant containers. Keep edibles in their original labeled packaging to avoid confusion with regular food. Proper storage preserves quality and prevents accidental access.' },
    { id: 'thc-cbd', t: 'Understanding THC and CBD', d: 'THC (tetrahydrocannabinol) is the primary intoxicating compound in cannabis. CBD (cannabidiol) is non-intoxicating and is found in both cannabis and hemp. Products vary widely in their THC and CBD content. Always review the product label and ask our staff if you have questions about potency.' },
    { id: 'edibles-onset', t: 'Edibles and Onset Time', d: 'Unlike inhaled products, edibles are absorbed through the digestive system and can take 30 minutes to 2 hours to produce effects. Effects may also last significantly longer. It is important to wait before consuming more. Starting with a low dose is strongly recommended, especially for first-time edible consumers.' },
    { id: 'ny-rules', t: 'New York Adult-Use Rules', d: 'In New York State, adults 21 and older may legally purchase and possess cannabis from licensed retailers. It is illegal to consume cannabis in public, in motor vehicles, or anywhere smoking is prohibited. Adults may possess up to 3 ounces of cannabis flower and 24 grams of concentrated cannabis. Home cultivation may be permitted under state rules — consult current NYS OCM guidelines.' },
    { id: 'what-to-bring', t: 'What to Bring to the Store', d: "All customers must present a valid, government-issued photo ID confirming they are 21 years of age or older. Accepted forms include a driver's license, state ID, or passport. Expired identification is not accepted. You may also want to browse the live menu online before visiting to plan your purchase." },
  ],
  disclaimer: 'Disclaimer: The information on this page is for general educational purposes only. It does not constitute medical advice, and cannabis products have not been evaluated by the Food and Drug Administration. Cannabis does not diagnose, cure, prevent, or treat any medical condition. Consult a qualified healthcare provider with any health-related questions.',
  readyTitle: 'Ready to explore our selection?', contact: 'Have a question? Contact us →',
};

// LIVE /learn hub.
export const learn = {
  kicker: 'ELEVATED DREAMS LLC · NEWBURGH, NY', title: 'Learn at your own pace',
  lede: 'Practical guides to cannabis products, labels, and responsible adult-use shopping. Written for people, not product hype.',
  fine: 'Educational content for adults 21+. Not medical advice.',
};

// LIVE /community.
export const community = {
  title: 'Rooted in Newburgh',
  lede: 'Elevated Dreams LLC is proud to support responsible cannabis education, local partnerships, and a welcoming retail experience for the Newburgh community.',
  soonKicker: 'COMING SOON',
  soon: 'Community updates are coming soon. Elevated Dreams LLC is preparing local events, educational resources, and partnership announcements for the Newburgh community.',
  expectTitle: 'What to Expect',
  expect: [
    { t: 'Events', d: 'Educational workshops, community gatherings, and in-store events hosted by Elevated Dreams LLC.' },
    { t: 'Partnerships', d: 'Local business collaborations and community organization partnerships in the Newburgh area.' },
    { t: 'Store Updates', d: 'New products, store hours, promotions, and announcements direct from Elevated Dreams LLC.' },
    { t: 'Newburgh Initiatives', d: 'Community programs, responsible cannabis education, and local engagement efforts.' },
  ],
  stayTitle: 'Stay Connected',
  stay: 'Have a question, partnership idea, or want to get involved? Reach out through our contact page.',
  stayCta: 'Contact Us',
};

// LIVE /contact.
export const contact = {
  title: 'Get in Touch',
  lede: "Questions about our menu? Need help finding the right product? We're here.",
  visit: 'Visit Us', send: 'Send a Message',
  consent: 'I consent to Elevated Dreams LLC using my details to respond to this message.',
  newsTitle: 'Stay in the loop',
  news: 'Join our newsletter for store news and updates. We’ll only use your email for communications you consent to.',
  newsConsent: 'I agree to receive newsletter updates from Elevated Dreams LLC.',
  newsCta: 'Join newsletter',
};

// LIVE /rewards.
export const rewards = {
  title: 'Elevated Rewards',
  lede: 'Create an account or log in through our online storefront to access eligible offers, account features, and available rewards.',
  cta: 'Log In or Sign Up',
  fine: 'Accounts and rewards are managed through the secure Elevated Dreams LLC online storefront.',
};

// FACTS: the climb (Our Story). Only what the sources say; nothing added.
export const climb = [
  { floor: 'B', label: 'Lobby', t: 'A signed lease. A locked door.', d: 'Unit 10, Algonquin Plaza, 190 South Plank Road. The rent was due every month. The doors could not open.' },
  { floor: '4', label: 'May 1, 2025', t: 'The Planning Board.', d: 'The Town of Newburgh treated the store as a special use. It came before the Planning Board on May 1, 2025.' },
  { floor: '7', label: 'August 7, 2025', t: 'A public hearing.', d: 'A public hearing followed on August 7, 2025. The rent kept coming due.' },
  { floor: '13', label: 'December 2025', t: 'Thirteen months of rent.', d: 'Shawn Campbell told the state Cannabis Control Board he had paid rent for 13 months without being able to open. The town would not issue a building permit without full state licensure. The state wanted the town’s certificate of occupancy first.' },
  { floor: 'PH', label: '2026', t: 'The doors open.', d: 'License OCM-CAURD-26-000353. Elevated Dreams is open on South Plank Road. He never quit.' },
];

export const nav = [
  { label: 'Shop', href: '/menu/', mega: 'shop' },
  { label: 'Deals', href: '/deals/' },
  { label: 'Learn', href: '/learn/', mega: 'learn' },
  { label: 'Our Story', href: '/about/' },
  { label: 'Visit', href: '/visit/', mega: 'visit' },
  { label: 'Rewards', href: '/rewards/' },
];

export const areas = [
  { slug: 'newburgh', name: 'the City of Newburgh', short: 'Newburgh', origin: 'Newburgh, NY',
    line: 'Elevated Dreams sits on South Plank Road in the Town of Newburgh, next door to the City of Newburgh.' },
  { slug: 'new-windsor', name: 'New Windsor', short: 'New Windsor', origin: 'New Windsor, NY',
    line: 'New Windsor borders the Town of Newburgh to the south. Elevated Dreams is on South Plank Road, Unit 10.' },
  { slug: 'beacon', name: 'Beacon', short: 'Beacon', origin: 'Beacon, NY',
    line: 'Beacon sits across the Hudson from Newburgh, joined by the Newburgh–Beacon Bridge. Elevated Dreams is on South Plank Road, Unit 10.' },
  { slug: 'walden', name: 'Walden and Montgomery', short: 'Walden', origin: 'Walden, NY',
    line: 'Walden and Montgomery sit west of the Town of Newburgh in Orange County. Elevated Dreams is on South Plank Road, Unit 10.' },
];
