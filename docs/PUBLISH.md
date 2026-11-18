# Publishing record

- Repository: https://github.com/SGEN-Sites/elevateddreams-redesign (public)
- Preview: https://sgen-sites.github.io/elevateddreams-redesign/ (GitHub Pages from `gh-pages`; every page
  `noindex, nofollow`; robots.txt `Disallow: /`)

## What is public

- `main`: `src/` (including `src/content/articles.json`, the captured Learn articles, so a clone rebuilds without the
  raw capture), the build and capture tools, `docs/`, `facts/`, README.
- `gh-pages`: `node src/build.mjs --preview --out dist-preview --base /elevateddreams-redesign/`.
- Kept out: the raw capture of the live site, research notes, raw generated renders, screenshots and the publish
  scanner.

## Checks before and after publishing (2026-11-18)

| check | result |
|---|---|
| publish scan of both copies: the fal key (whole and in halves), credential shapes, machine paths, operator identity, other clients' and reference brands' names, `noindex` on every page, robots `Disallow: /` | CLEAN, 210 files, 46 HTML pages |
| GitHub Pages build of `gh-pages` 29571ce | built |
| live preview: every page answers 200 with its own title and `noindex` | 45 / 45 (plus the 404 answering 404) |
| live preview: CSS, JS, font, film, a generated and a real image, robots.txt | 9 / 9 |
| live preview in a browser: age gate shows, "Yes" then "Just browsing" closes it, H1 present, no script errors | pass |
| shop destinations on the home page | 47 Shop / category / feeling / deals / account links, all to the live store: `/locations/newburgh/menu`, `/locations/newburgh/menu/discounts?promo=deals`, `/locations/newburgh` |
| internal links on the home page | 31 checked, 0 broken |

Not run: the site-reforge readiness gate (a pitch preview, not a handoff package) and a check of the live store's
category pages, which answer 403 outside the US.
