# Portfolio Site Design — Rupom Morol, Graphic Designer

Date: 2026-09-18
Status: Approved, incorporating reviewer addendum (2026-09-18)

## Purpose

A personal portfolio website for graphic designer Rupom Morol. Goals, in order:

1. **Showcase the work** — large, well-presented imagery across a broad and still-growing set of disciplines (branding, print, and others as they accumulate).
2. **Make the work easy to add** — new projects are a copy-file-and-drop-images operation, not an HTML edit. The body of work is mixed: some pieces finished, some in progress, some not yet started.
3. **Generate contact** — a visible, low-friction path for both freelance inquiries and general visibility. Balanced emphasis; no hard sell.
4. **Convert, not just display** — credibility signals, case-study structure, and SEO plumbing so the site actually gets Rupom hired, not just admired.

## Known facts (supplied by Rupom — verify at launch)

- 8 years of design experience
- Fiverr Level 2 seller (profile URL to be supplied)
- Real email, social handles, resume PDF, and portrait are **not yet supplied** — launch content uses clearly-marked placeholders that the user swaps in. The site must not ship with fabricated contact details.

## Architecture

Static site built with **Astro**, no UI framework, deployed as plain static files (Netlify / Vercel / GitHub Pages — free tier; final host chosen at implementation, auto-deploy on push via the host's git integration or GitHub Actions). No backend, no database, no CMS.

- **Pages** (`src/pages/`): `index.astro` (home), `work.astro` (gallery), `work/[slug].astro` (project detail), `about.astro`, `contact.astro`, `404.astro`.
- **Content** (`src/content/projects/*.md`): one markdown file per project, validated by an Astro content-collection schema.
- **Images**: per-project folder (`src/assets/projects/<slug>/`), consumed through Astro's image pipeline for optimized responsive output.
- **Styles**: hand-written CSS (`src/styles/`), no CSS framework.
- **Interactivity**: small vanilla JS modules — category filter, accessible lightbox, scroll-reveal observer. No animation libraries, no npm runtime dependencies beyond Astro itself.
- **Integrations** (all static-build-time): `@astrojs/sitemap`, `robots.txt`, favicon + web manifest, per-page meta / Open Graph / Twitter card tags, one `schema.org/Person` JSON-LD block on Home/About (name, job title, sameAs → Fiverr + socials).

### Content schema (per project)

```yaml
title: string
category: string        # free-form; categories derive from the files themselves
year: number
cover: image path
coverAlt: string        # REQUIRED — alt text for the cover image
status: published | wip
client: string?         # optional
featured: boolean?      # drives the home-page teaser; home curation independent of the Work grid
tags: string[]?         # tools/software used (Illustrator, Figma, …); enables future filter-by-tool without a schema change
testimonial: string?    # short client quote + attribution (e.g. Fiverr review, with permission)
order: number?          # optional manual ordering; default reverse-chronological
```

Body = the project description following a light **Problem → Approach → Outcome** case-study structure (a few sentences each — this is the single biggest lever for perceived quality). Each gallery image gets alt text via a per-project frontmatter image list (no CMS needed).

Adding a project = copy a template file, fill the frontmatter, write the case study, drop images in the folder. A new category value needs zero code changes.

## Pages

- **Home** — Name, tagline ("Graphic Designer"), one-line intro, hero states years of experience and Fiverr Level 2 as trust signals; teaser grid of 4–6 works drawn from `featured: true`; "Get in touch" CTA. Oversized display typography.
- **Work** — Responsive card grid (cover image, title, category, year) with category filter tabs derived from content. In-progress pieces carry a visible "In progress" badge.
- **Project detail** (`/work/<slug>/`) — Image gallery with lightbox, case-study description, metadata (category, year, client), testimonial near the bottom when present. WIP badge carried through.
- **About** — Bio, years of experience, skills/tools list, Fiverr Level 2 badge with profile link, optional portrait, and a downloadable resume/CV PDF (`public/resume.pdf` placeholder).
- **Contact** — Email and social links **including Fiverr profile**, plus a backend-free contact form (see below) and a current-availability statement ("Currently booking new projects" / "Booked through \<month\>") so the CTA reads as active. Availability lives in one config constant used by Contact and the hero.
- **404** — On-brand not-found page (same typography/accent) with links back to Work and Home.

### Contact form decision

In scope. Backend-free: **Netlify Forms** if the site lands on Netlify (native), otherwise **Formspree free tier** (host-agnostic). The form is a simple name/email/message with graceful fallback text linking the email address if the service is unreachable. No paid tiers, no server code.

## Visual direction — expressive minimal

- White background, near-black text, one confident accent color used sparingly (links, hover states, badges) — accent must pass contrast checks against white.
- Strong typographic identity: distinctive display font for headings, clean sans for body.
- Generous whitespace, strict grid.
- Motion layer (hand-written CSS + vanilla JS only): scroll-reveal animations on grids and sections; project-card hover with image zoom and title underline-draw; lightbox with smooth transitions; subtle page-fade transitions; WIP badge styled as a deliberate accent.
- Fully responsive, mobile-first. Respect `prefers-reduced-motion`.

## Accessibility

- **Lightbox keyboard support**: open/close via keyboard, Esc to close, arrow keys between images, focus trap while open, focus restored on close.
- `coverAlt` and per-image alt text required by schema — enforced at build, not by memory.
- Contrast check on accent color and text at build/visual-check time.
- Semantic landmarks, visible focus states, correct heading hierarchy per page.

## SEO & sharing

- Per-page `<title>` and meta description.
- Open Graph + Twitter card tags; project cover doubles as the share image (placeholder covers produced at ≥1200×630 so previews render well; per-project OG image generation deferred unless covers prove unsuitable).
- `@astrojs/sitemap` + `robots.txt`.
- One `schema.org/Person` JSON-LD block (name, job title, sameAs → Fiverr/socials).
- Favicon + web app manifest.

## Launch content

~6 realistic placeholder projects across Branding and Print, clearly marked as placeholders, exercising every layout, filter, badge, featured, and testimonial state from day one. Placeholder covers at 1200×630+. Placeholder bio, availability, contact links, and resume — all in one obvious place (site config) so the swap to real details is a single pass.

## Error handling / edge cases

- Content-collection schema validation fails the build on malformed frontmatter (bad field, missing image, missing alt text) — errors surface at build time, never in production.
- Missing/wrong image paths fail the build via Astro's image pipeline.
- Empty filter results are impossible by construction (tabs are generated from existing categories).
- Home teaser with fewer than 4 `featured` projects gracefully renders whatever exists.
- No runtime data sources → no runtime error states beyond the 404 page and the contact-form fallback.

## Testing

- Build verification (`astro build`) as the correctness gate: schema validation, image optimization, all pages generated.
- Visual check of key pages (home, work grid with filters, project detail, 404, mobile viewport) against this design before delivery.
- Keyboard walkthrough of the lightbox and nav focus states.
- Lighthouse pass (Performance, Accessibility, SEO ≥ 90 each) as part of the pre-launch check.
- No unit-test suite — inappropriate ceremony for a static portfolio.

## Analytics (deferred, one-line add)

Not wired at launch. When the site is live, add **Cloudflare Web Analytics** (free, no cookies, no consent banner) as a single script tag — chosen over Plausible/Fathom because it is free at this site's scale. Tracked in the implementation plan as an optional final step.

## Out of scope (YAGNI)

- CMS / dashboard editing
- Contact-form backend server code (the hosted free-tier form above is the ceiling)
- Blog
- Animation/interaction libraries
- Dark mode (can be added later as an enhancement)
- i18n
- Per-project OG image generation (deferred unless covers prove unsuitable)
