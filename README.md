# StatNusa — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/FajarRizikAinulyakin/makefun-best-national-statistics-site-20261126-0539-2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/FajarRizikAinulyakin/makefun-best-national-statistics-site-20261126-0539-2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An independent national statistics site for Indonesia: population, economy,
employment, prices and all 38 provinces — charts, tables and the source of
every figure. Built for the [make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
"Make the best national statistics site" (free entry, $50 prize pool, 1st–10th place $5 each).

## The site

Six pages, all reached by links in the header, all working offline from the
site's own files:

| Page | What's on it |
| --- | --- |
| Overview (`#/`) | Headline KPIs, a switchable trend chart, latest releases |
| Population (`#/population`) | 281.6 million people, growth since 2015, age structure |
| Economy (`#/economy`) | GDP, growth, industries, trade with the world |
| Employment (`#/employment`) | Labour force, unemployment trend, jobs by sector |
| Prices (`#/prices`) | Inflation by year and month, food prices, an inflation calculator |
| Regions (`#/regions`) | All 38 provinces — searchable, sortable table |

Every control does what it says: chart switchers redraw the chart, the
regions table searches and sorts, and the inflation calculator compounds the
annual CPI rates. Charts are plain canvas — no libraries, no network.

## Figures

Compiled from public releases of Statistics Indonesia (BPS) and the World
Bank, rounded for display; each page names its source and reference year.
Headline figures for 2024: population 281.6 million, GDP Rp 22,139 trillion
(+5.03% real growth), GDP per capita US$4,960, inflation 1.57%,
unemployment 4.91%, poverty 8.57%.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Open http://localhost:8080 in desktop Chrome, or resize to a phone width —
the layout adapts. No build step, no network request.

## Hand in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
