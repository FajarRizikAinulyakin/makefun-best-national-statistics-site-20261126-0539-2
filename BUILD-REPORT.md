# BUILD-REPORT — StatNusa (best-national-statistics-site-20261126-0539)

Built fresh in this session, which started after the bounty opened
(2026-11-26T05:39:00Z). Every entry file below was written by this session
with the write tool; no file was copied from the earlier pre-opening build
(the old build was deleted before writing began). The only copied file is
`vendor/makefun-frontend.ts`, the kit's own file, which the rules require to
be the kit's copy unchanged (sha256 matches kit.json).

## What was built

StatNusa — an independent national statistics site for Indonesia, static
files under `app/`, no build step, no network request.

- `app/index.html` — shell: navy header with the SN brand mark, six nav
  links, `<main id="app">`, footer with sources and an offline note.
- `app/style.css` — one stylesheet, system fonts only, navy/teal/amber
  palette, responsive down to phone widths (nav scrolls, KPI grid collapses).
- `app/data.js` — every figure on the site, compiled from public BPS and
  World Bank releases: population 2015–2024, 16 age groups, GDP growth and
  nominal GDP 2019–2024, 12 industry shares, trade 2019–2024, unemployment
  2019–2024, employment by sector, inflation annual + monthly 2024, 10 food
  prices, all 38 provinces (population, GRDP per capita, unemployment),
  latest releases.
- `app/charts.js` — plain-canvas chart helpers, no libraries: line, bar,
  horizontal bar and grouped bar charts, with gridlines, axis labels and
  value labels (labels never clip: top values draw below their point).
- `app/views.js` — six hash-routed pages, each with KPI cards, a switchable
  chart, tables and sourced notes:
  - `#/` Overview — 6 KPIs, headline-trend chart (GDP growth / inflation /
    unemployment switcher), latest releases, how-to-read note.
  - `#/population` — growth since 2015, age-structure chart, dependency
    reading.
  - `#/economy` — GDP, growth, industries, trade chart + tables.
  - `#/employment` — labour force, unemployment trend, jobs by sector.
  - `#/prices` — inflation by year/month, food prices, a working inflation
    calculator (compounds annual CPI rates).
  - `#/regions` — all 38 provinces in a searchable, sortable table.
  - Unknown hashes show a "Page not found" page with links.
- `app/main.js` — hash router; sets `window.__shotReady` once a page and
  its charts are drawn; redraws charts on resize.
- `main.ts` — Node 22, stdlib only: copies `app/` + `screenshots/` to the
  output dir and writes `dossier.json` with the vendored library.
- `serve.ts` — stdlib-only static server for local testing (`node serve.ts`,
  port 8080).
- `vendor/makefun-frontend.ts` — kit copy, unchanged.
- `LICENSE` — MIT. `README.md` — badge in the new
  `https://make.fun/badge/<slug>.svg` format, rank/reward info, bounty link.

## Screenshots (re-rendered in this session)

Headless Chromium (`/opt/meta-chromium/chrome`) via CDP, waiting for
`window.__shotReady` on each route, zero console errors on every capture.
This machine's Chromium blocks HTTP navigation to loopback, so the shots
were rendered over `file://` with `--allow-file-access-from-files` — real
renders of the site's own code in a browser. The WebGL policy file had been
wiped from /tmp; it was restored from the image's canonical policy
(`/var/lib/hatch-browser/rootfs-base/usr/share/hatch/chromium/webgl-allowed-domains.txt`,
sha256 `8097045f…`).

| File | Size | Dimensions | Shows |
| --- | --- | --- | --- |
| `screenshots/1-overview.jpg` | 118,980 B | 1280×1050 | Overview: hero, 6 KPIs, GDP-growth chart |
| `screenshots/2-economy.jpg` | 111,630 B | 1280×1000 | Economy: KPIs, growth chart |
| `screenshots/3-regions.jpg` | 97,614 B | 1280×800 | Regions: KPIs, searchable province table |
| `screenshots/4-overview-phone.jpg` | 47,553 B | 390×844 | Overview at phone size |

All four are under the 256 KiB cap; long sides ≤ 1280, short sides ≥ 360.

## Verification (all in this session)

- **Determinism:** `MAKEFUN_OUTPUT_DIR=/tmp/out1 node main.ts` and
  `.../out2` produce byte-identical trees (`diff -r` clean), re-run after
  the final edits. Dossier: 562,914 bytes; text 59,401 bytes (cap 160 KiB);
  first load 6 files, 16,320 bytes gzip-9. All four dossier image sha256s
  match the screenshot files.
- **Gate rows checked locally:** no absolute or protocol-relative URL in
  `app/`; no `fetch`/`XMLHttpRequest`/`WebSocket`/`eval` in `app/`; all four
  app JS files pass `node --check`; `app/index.html` has no inline script.
- **Controls exercised live (CDP, zero console errors):** population
  age-group toggle, employment sector toggle, overview inflation switcher,
  prices calculator (Rp 100,000 in 2023 → Rp 101,570 in 2024), regions
  search ("papua" → 6 of 38 provinces), regions sort by GRDP per capita
  (first row Jakarta), unknown-hash not-found page.
- **Bugs found and fixed in this session:** a `SyntaxError` in views.js
  (apostrophe in "West Java's" inside a single-quoted string); the chart
  tick helper stopped one step short of the data maximum, clipping the
  highest points and their labels (fixed `niceTicks` to ceil the top tick);
  value labels that would clip now draw below their point; "five Papuan
  provinces" corrected to six (West, Southwest, South, Central, Highland,
  Papua).

## Kit check (final, on the finished files)

`node cli/makefun.mjs check --kit <kit> --repo <entry> --worktree`:
**4 passed, 1 failed, 15 skipped, 5 checked at submission.**

- Passed: `competition_open`, `snapshot` (15 files, 527,383 bytes),
  `license_osi` (MIT), `entrypoint` (main.ts, node22).
- Failed: `transcripts_present` — expected at build time; the parent run
  bundles this session's transcripts before submitting.
- At submission (need the repo, parent's job): `repo_public`,
  `repo_owner`, `repo_created_after_open`, `commit_in_repo`,
  `duplicate_snapshot`.
- Note: the kit copy is level 50 while make.fun is at level 51; the parent
  run may want a fresh kit download before bundling/submitting.

## Not done here (parent run)

No GitHub repo was created, nothing was pushed, nothing was submitted —
that is the parent run's job after this build.
