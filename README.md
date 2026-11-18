# Elevated Dreams: redesign concept

A static, platform-free redesign concept for Elevated Dreams LLC, a social-equity (CAURD) adult-use cannabis
dispensary at 190 South Plank Road, Newburgh, NY. Design concept preview, not the official website: every page is
`noindex`, and every Shop, Deals and Account button opens the client's live online store.

- **Preview:** https://sgen-sites.github.io/elevateddreams-redesign/
- **Pitch notes:** [`docs/PITCH-NOTES.md`](docs/PITCH-NOTES.md) (what was kept, what is new, questions for the client)
- **Change ledger:** [`docs/CHANGE-LOG.md`](docs/CHANGE-LOG.md)

## Build

Node 18+, no dependencies.

```bash
node src/build.mjs                                   # -> dist/ (served from /)
node src/build.mjs --preview --out dist-preview --base /elevateddreams-redesign/   # the GitHub Pages preview
```

`src/content/site.mjs` holds the store's facts and the live site's words; `src/content/articles.json` the 20 captured
Learn articles; `src/pages/*.mjs` the page templates; `src/styles/*.css` (concatenated in order) and
`src/scripts/*.js` the design system and the motion layer. To point category tiles at their own listings in the live
store, edit `SHOP` / `categories` in `src/content/site.mjs`.

## Media

Real client photos and article images are used as captured. Generated images and the hero film are mood and category
illustration only (fal: flux-pro v1.1 ultra, BiRefNet v2, Kling 2.5 turbo); each generated `<img>` carries
`data-ai="generated"`. Fonts: Ultra, Barlow and Barlow Condensed (SIL Open Font License), self-hosted.
