# Behance → Astro Porting Report

Date: 2026-09-18 · Source: 2 Behance profiles (RupomsDesign art + rupomm print) · Nothing committed — awaiting human approval.

## Summary

- **23 projects ported** (24 URLs given; 99196501 was listed twice — de-duplicated; 101096607 resolved to "Sale flyer", a project distinct from 101096379 "Event Flyer").
- **77 images total**: 23 covers (all exactly 1200×630 JPEG q85) + 54 detail images (natural aspect, capped at 1920px, no upscaling; sourced from Behance `project_modules/source/` originals where available).
- **Build: PASS** — `npm run build` completes, 29 pages built, 23 project pages under `/work/<slug>` plus work index. All covers verified ≥1200×630 via sharp metadata loop (0 failures).
- Cover sources: each project's own Behance cover crop (`projects/original/…`), center-cropped to 1.91:1 with sharp `fit: cover`.

## Projects

| # | slug | title | category | year | images (cover+details) | featured | case-study quality |
|---|------|-------|----------|------|------------------------|----------|--------------------|
| 1 | rose-lady | Rose Lady | Illustration | 2020 | 4 | **yes** | DESCRIPTIVE-ONLY (draft) |
| 2 | this-city-is-ours | This City is Ours | Illustration | 2020 | 4 | **yes** | DESCRIPTIVE-ONLY (draft) |
| 3 | leafiesta-logo | Leafiesta logo | Branding | 2019 | 4 | **yes** | DESCRIPTIVE-ONLY (draft) |
| 4 | zews-logo | Zews logo | Branding | 2020 | 4 | **yes** | DESCRIPTIVE-ONLY (draft) |
| 5 | red-girl | RED GIRL | Illustration | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 6 | sparrow | Sparrow | Illustration | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 7 | midnight-owl | Midnight Owl | Illustration | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 8 | swag-lady | Swag Lady | Illustration | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 9 | foxer-logo | Foxer logo | Branding | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 10 | bad-boy | Bad boy | Illustration | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 11 | depict-joker | Depict Joker | Illustration | 2020 | 2 | no | DESCRIPTIVE-ONLY (draft) |
| 12 | flower-with-a-girl | Flower with a girl | Illustration | 2020 | 2 | no | DESCRIPTIVE-ONLY (draft) |
| 13 | christmas-sale | Christmas sale | Print | 2020 | 4 | **yes** | DESCRIPTIVE-ONLY (draft) |
| 14 | pizza-flyer | Pizza Flyer | Print | 2020 | 4 | **yes** | DESCRIPTIVE-ONLY (draft) |
| 15 | restaurant-flyer | Restaurant Flyer | Print | 2020 | 2 | no | DESCRIPTIVE-ONLY (draft) |
| 16 | online-store-flyer | Online store flyer | Print | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 17 | corporate-design | Corporate Design | Print | 2020 | 2 | no | DESCRIPTIVE-ONLY (draft) |
| 18 | food-flyer | Food flyer | Print | 2020 | 2 | no | DESCRIPTIVE-ONLY (draft) |
| 19 | fashion-flyer | Fashion Flyer | Print | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 20 | birthday-invitation-card | Birthday Invitation Card | Print | 2020 | 2 | no | DESCRIPTIVE-ONLY (draft) |
| 21 | quarantine-flyer | Quarantine flyer | Print | 2020 | 4 | no | DESCRIPTIVE-ONLY (draft) |
| 22 | event-flyer | Event Flyer | Print | 2020 | 2 | no | DESCRIPTIVE-ONLY (draft) |
| 23 | sale-flyer | Sale flyer | Print | 2020 | 3 | no | DESCRIPTIVE-ONLY (draft) |

Years are taken from each project's actual `publishedOn` timestamp — all 23 were published in 2020 (2019-id Leafiesta in Aug 2019), so the 2020/2021 fallback rules were not needed.

## Featured picks (6)

Per the owner's engagement stats: **Rose Lady** (7 appreciations / 44 views), **This City is Ours** (6 appr), **Leafiesta logo** (94 views, 4 appr). My 3 picks:

- **Zews logo** — 6 appreciations (tied 2nd-highest on the art profile); the flame-beard mark is the strongest, most professional logo presentation of the three marks.
- **Pizza Flyer** — the most polished print piece: art-directed dark mockup photography, clear single-offer hierarchy; best represents the flyer work.
- **Christmas sale** — the most complete project (8 Behance modules), with a genuinely clever idea (discount tiers as gift tags in the tree).

## Needs enrichment (all 23 carry `<!-- DRAFT: thin source material — Rupom should enrich -->`)

Every Behance description was 0–33 characters, so all case studies were written as restrained descriptive copy based on title/tags/visible artwork — no clients, metrics, outcomes or process were invented. Highest-value items for Rupom to rewrite into real stories:

1. rose-lady, this-city-is-ours, leafiesta-logo, zews-logo (the 4 featured art pieces)
2. pizza-flyer, christmas-sale (featured print pieces)
3. swag-lady ("Mostly for a Clothing brand"), corporate-design ("Corporate conference flyer design"), restaurant-flyer (Shera Tong) — these have real clients that can be named/confirmed

## Skipped / resolved duplicates

- `99196501` appeared twice in the brief (Corporate-Design) → ported once as `corporate-design`.
- `101096607` (given as "Event-Flyer" and "Sale-flyer") → fetched; the page title is **"Sale flyer"** → written as `sale-flyer`. It is a distinct project from `101096379` "Event Flyer" ("The Opening" white party), so no `event-flyer-2` slug was needed. No duplicate slugs exist.

## Other notes

- Bare gallery-ID URLs (no slug) return Behance 404s; all fetches used full `/gallery/<id>/<slug>` paths.
- Module images were re-fetched from the `project_modules/source/` variant (full resolution, e.g. 3000–6000px on the flyer pieces) after the first pass returned 600px `disp` files.
- RED GIRL's Behance cover original is only 808×632; its cover.jpg was upscaled within the crop to meet the 1200×630 minimum (slight softness acceptable for a banner crop). Zews module images are inherently small (667px) but the cover source is 1712×1223.
- Tools mapped from Behance "tools" field (Photoshop/Illustrator). Tags omitted for red-girl (only "Behance Mobile" listed), food-flyer and fashion-flyer (no tools listed).
- No commits made; `.tmp/` scratch dir (fetches, meta JSON, raw images) is left in the repo root for review and can be deleted.
