# Rupom Morol — Portfolio

Static portfolio built with Astro. Content lives in `src/content/projects/`.

## Add a project

1. `npm run covers` after adding your slug to `scripts/make-placeholder-covers.mjs`
   (or drop your own JPGs into `src/assets/projects/<slug>/` — cover must be ≥1200×630).
2. Copy any file in `src/content/projects/`, rename to your slug, fill the
   frontmatter (`title`, `category`, `year`, `cover`, `coverAlt`, `status`,
   optionally `client`, `featured`, `tags`, `testimonial`, `order`, `images`).
3. Write the case study body: Problem → Approach → Outcome.
4. `status: wip` pages are hidden from Google and badged; flip to `published` when ready.
5. `npm run build` — schema errors fail here, never in production.

## Swap placeholders at launch (all in one pass)

- `src/config.ts` — email, Fiverr URL, socials, availability, Formspree ID
- `astro.config.mjs` + `public/robots.txt` — real domain (both files, together)
- `public/resume.pdf` — real CV
- Project files — real case studies replacing the PLACEHOLDER ones

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the build locally
