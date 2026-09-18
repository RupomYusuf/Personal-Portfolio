# Rupom Morol — Portfolio

Static portfolio built with Astro. Content lives in `src/content/projects/`.

## Add a project

1. Drop images into `src/assets/projects/<slug>/` — the cover must be ≥1200×630 (1.91:1) so social previews never crop badly.
2. Copy `docs/project-template.md` to `src/content/projects/<slug>.md`, rename the slug in the copy, and fill the frontmatter (`title`, `category`, `year`, `cover`, `coverAlt`, `status`, optionally `client`, `featured`, `tags`, `testimonial`, `order`, `images`).
3. Write the case-study body: Problem → Approach → Outcome.
4. `status: wip` pages get an "In progress" badge, are hidden from Google, and stay out of the sitemap; flip to `published` when ready.
5. `npm run build` — schema errors fail here, never in production.

`scripts/make-placeholder-covers.mjs` is the generator that produced the original placeholder art — it stays for reference but is not part of the normal flow.

## Remaining launch swaps

- `astro.config.mjs` + `public/robots.txt` — real domain, when purchased (both files, together)
- `public/resume.pdf` — real CV (currently a placeholder binary)
- About-page bio in `src/pages/about.astro` — final copy from the Fiverr bio
- `src/config.ts` — everything real as of launch (email, WhatsApp, Instagram, Behance, Fiverr, availability)

## Deploy

Netlify, auto-deploying on every push to `main`. The contact form is Netlify-native (`data-netlify`) with the submission count activated by the first message; submissions land in the Netlify dashboard (and email notifications if enabled there).

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the build locally
