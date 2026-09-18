# Portfolio Site Design — Rupom Morol, Graphic Designer

Date: 2026-09-18
Status: Approved

## Purpose

A personal portfolio website for graphic designer Rupom Morol. Goals, in order:

1. **Showcase the work** — large, well-presented imagery across a broad and still-growing set of disciplines (branding, print, and others as they accumulate).
2. **Make the work easy to add** — new projects are a copy-file-and-drop-images operation, not an HTML edit. The body of work is mixed: some pieces finished, some in progress, some not yet started.
3. **Generate contact** — a visible, low-friction path for both freelance inquiries and general visibility. Balanced emphasis; no hard sell.

## Architecture

Static site built with **Astro**, no UI framework, deployed as plain static files (Netlify / Vercel / GitHub Pages — free tier). No backend, no database, no CMS.

- **Pages** (`src/pages/`): `index.astro` (home), `work.astro` (gallery), `work/[slug].astro` (project detail), `about.astro`, `contact.astro`.
- **Content** (`src/content/projects/*.md`): one markdown file per project, validated by an Astro content-collection schema.
- **Images**: per-project folder (`src/assets/projects/<slug>/`), consumed through Astro's image pipeline for optimized responsive output.
- **Styles**: hand-written CSS (`src/styles/`), no CSS framework.
- **Interactivity**: small vanilla JS modules — category filter, lightbox, scroll-reveal observer. No animation libraries, no npm runtime dependencies beyond Astro itself.

### Content schema (per project)

```yaml
title: string
category: string        # free-form; categories derive from the files themselves
year: number
cover: image path
status: published | wip
client: string?         # optional
order: number?          # optional manual ordering; default reverse-chronological
```

Body = the project description. Adding a project = copy a template file, fill the frontmatter, write the description, drop images in the folder. A new category value needs zero code changes.

## Pages

- **Home** — Name, tagline ("Graphic Designer"), one-line intro, teaser grid of 4–6 selected works ("Get in touch" CTA). Hero uses oversized display typography.
- **Work** — Responsive card grid (cover image, title, category, year) with category filter tabs derived from content. In-progress pieces carry a visible "In progress" badge.
- **Project detail** (`/work/<slug>/`) — Image gallery with lightbox, description, metadata (category, year, client). WIP badge carried through.
- **About** — Bio, skills/services list, optional portrait.
- **Contact** — Email (mailto link) and social links. No form backend; a real form may be added later if wanted.

## Visual direction — expressive minimal

- White background, near-black text, one confident accent color used sparingly (links, hover states, badges).
- Strong typographic identity: distinctive display font for headings, clean sans for body.
- Generous whitespace, strict grid.
- Motion layer (hand-written CSS + vanilla JS only): scroll-reveal animations on grids and sections; project-card hover with image zoom and title underline-draw; lightbox with smooth transitions; subtle page-fade transitions; WIP badge styled as a deliberate accent.
- Fully responsive, mobile-first. Respect `prefers-reduced-motion`.

## Launch content

~6 realistic placeholder projects across Branding and Print, clearly marked as placeholders, so every layout, filter, and state is exercised from day one. Placeholder bio and contact links to be swapped by the user.

## Error handling / edge cases

- Content-collection schema validation fails the build on malformed frontmatter (bad field, missing image) — errors surface at build time, never in production.
- Missing/wrong image paths fail the build via Astro's image pipeline.
- Empty filter results are impossible by construction (tabs are generated from existing categories).
- No runtime data sources → no runtime error states to handle.

## Testing

- Build verification (`astro build`) as the correctness gate: schema validation, image optimization, all pages generated.
- Visual check of key pages (home, work grid with filters, project detail, mobile viewport) against this design before delivery.
- No unit-test suite — inappropriate ceremony for a static portfolio.

## Out of scope (YAGNI)

- CMS / dashboard editing
- Contact-form backend or form service
- Blog
- Animation/interaction libraries
- Dark mode (can be added later as an enhancement)
- i18n
