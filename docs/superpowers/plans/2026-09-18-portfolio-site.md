# Portfolio Site Implementation Plan — Rupom Morol

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch-ready an Astro static portfolio for graphic designer Rupom Morol with markdown-driven projects, expressive-minimal visuals, and SEO/accessibility plumbing.

**Architecture:** Astro 5 static site; one markdown file + one image folder per project via a content-collection schema; hand-written CSS with design tokens; small vanilla JS modules for filter, lightbox, and scroll reveal. Everything builds to plain static files.

**Tech Stack:** Astro 5, `@astrojs/sitemap`, sharp (dev, for placeholder cover rasterization), vanilla JS + CSS. No UI framework, no CSS framework, no animation libraries.

**Spec:** `docs/superpowers/specs/2026-09-18-portfolio-site-design.md` — executors read both. The spec's "Known facts (supplied by Rupom — verify at launch)" section governs placeholder handling.

## Global Constraints

- **Testing model:** there is NO unit-test suite (spec decision). Each task's verification is `npm run build` plus concrete dist/dev-server checks listed in the steps. Run every verification command and confirm the expected output before checking a step off.
- No UI framework, no CSS framework, no animation/interaction libraries, no npm runtime dependencies beyond `astro`, `@astrojs/sitemap`, and dev-time `sharp`.
- All hand-written CSS lives in `src/styles/`; all vanilla JS in `src/scripts/`.
- Every placeholder that stands in for real user data (email, Fiverr URL, socials, resume, portrait) is centralized in `src/config.ts` or `public/`, marked `// PLACEHOLDER — swap at launch`, and uses obviously-fake values (`hello@example.com`, empty URLs). Never invent realistic-looking contact details.
- Cover images: ≥1200×630 (1.91:1), enforced for generated placeholders and stated in the project template.
- `status: wip` pages: `<meta name="robots" content="noindex">` and excluded from the sitemap.
- Accent color must pass contrast against white (`#c9452c` ≈ 4.6:1 — acceptable for links/large text; do not use it for small body text on white).
- All motion respects `prefers-reduced-motion: reduce`.
- Commit after every task, message prefixed `feat:` / `chore:`.

---

### Task 1: Scaffold Astro project + sitemap integration

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (temporary), `.gitignore`
- Create: `src/lib/wip-slugs.js`

**Interfaces:**
- Produces: working `npm run dev` / `npm run build`; `src/lib/wip-slugs.js` exporting `wipSlugs(): string[]` (used again in Task 6).

- [ ] **Step 1: Scaffold**

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --yes
npm install
npm install @astrojs/sitemap
```

- [ ] **Step 2: `.gitignore`**

```gitignore
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 3: `src/lib/wip-slugs.js`**

```js
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Slugs of projects whose frontmatter says `status: wip`. Read directly from
 * disk so astro.config.mjs (outside the Astro runtime) can use it too. */
export function wipSlugs(dir = join(process.cwd(), 'src/content/projects')) {
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return []; // no content dir yet (early tasks)
  }
  return files
    .filter((f) => /^status:\s*wip\s*$/m.test(readFileSync(join(dir, f), 'utf8')))
    .map((f) => f.replace(/\.md$/, ''));
}
```

- [ ] **Step 4: `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { wipSlugs } from './src/lib/wip-slugs.js';

const wip = wipSlugs();

export default defineConfig({
  // PLACEHOLDER — swap with the real domain at launch
  site: 'https://rupommorol.com',
  integrations: [
    sitemap({
      filter: (page) => !wip.some((slug) => page.includes(`/work/${slug}`)),
    }),
  ],
});
```

- [ ] **Step 5: temporary home page** — replace the minimal template's `src/pages/index.astro` body with `<h1>Rupom Morol</h1>` (placeholder; Task 7 replaces it).

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build succeeds; `dist/index.html` contains `Rupom Morol`; `dist/sitemap-index.xml` exists.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with sitemap integration"
```

---

### Task 2: Site config, design tokens, global CSS, fonts

**Files:**
- Create: `src/config.ts`
- Create: `src/styles/global.css`

**Interfaces:**
- Produces: `src/config.ts` exporting `site` — the shape every later task consumes:

```ts
export const site: {
  name: string;
  role: string;
  intro: string;
  yearsExperience: number;
  fiverr: { level: string; url: string };
  availability: string;
  email: string;
  socials: { label: string; url: string }[];
  formspreeId: string;
  featuredCount: number;
};
```

- Produces: CSS custom properties (`--bg`, `--ink`, `--muted`, `--accent`, `--font-display`, `--font-body`, `--space-*`, `--container`) used by all components.

- [ ] **Step 1: `src/config.ts`**

```ts
// Central site configuration. Every PLACEHOLDER here is swapped in one pass
// at launch — see the spec's "Known facts" section.

export const site = {
  name: 'Rupom Morol',
  role: 'Graphic Designer',
  intro:
    'Brand identities and print design, shaped by 8 years of studio and freelance work.',
  yearsExperience: 8,
  fiverr: {
    level: 'Fiverr Level 2 Seller',
    url: '', // PLACEHOLDER — swap at launch (Fiverr profile URL)
  },
  availability: 'Currently booking new projects', // or: 'Booked through March 2027'
  email: 'hello@example.com', // PLACEHOLDER — swap at launch
  socials: [
    { label: 'Behance', url: '' }, // PLACEHOLDER — swap at launch
    { label: 'Instagram', url: '' }, // PLACEHOLDER — swap at launch
    { label: 'LinkedIn', url: '' }, // PLACEHOLDER — swap at launch
  ],
  formspreeId: '', // set at launch to activate the contact form; '' renders the email fallback
  // Ceiling, not a guarantee: home renders however many projects actually carry
  // featured: true, up to this number (may be fewer — that's handled gracefully).
  featuredCount: 6,
} as const;
```

- [ ] **Step 2: `src/styles/global.css`**

```css
:root {
  --bg: #ffffff;
  --ink: #111318;
  --muted: #5a6072;
  --accent: #c9452c;
  --line: #e6e4df;
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --container: 68rem;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 2rem;
  --space-4: 4rem;
  --space-5: 8rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.1;
}

a {
  color: var(--accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

a:hover {
  text-decoration-thickness: 2px;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--space-2);
}

.page {
  min-height: 70vh;
  animation: page-fade 0.35s ease both;
}

@keyframes page-fade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Scroll reveal: elements with [data-reveal] start hidden, .revealed shows them */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  [data-reveal].revealed {
    opacity: 1;
    transform: none;
  }
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds (CSS/TS not yet imported anywhere — that's fine; imports land in Task 3).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: site config and expressive-minimal design tokens"
```

---

### Task 3: Seo component, BaseLayout, Header, Footer, 404

**Files:**
- Create: `src/components/Seo.astro`, `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`
- Create: `src/pages/404.astro`
- Modify: `src/pages/index.astro` (use BaseLayout)

**Interfaces:**
- Produces: `BaseLayout` props `{ title: string; description: string; ogImage?: string; noindex?: boolean }` — every later page consumes this exact signature.

- [ ] **Step 1: `src/components/Seo.astro`**

```astro
---
import { site } from '../config';

interface Props {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

const { title, description, image, noindex = false } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
const ogImage = image ? new URL(image, Astro.site) : undefined;
const fullTitle = title === site.name ? title : `${title} — ${site.name}`;
---

<!-- Primary meta -->
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
{noindex && <meta name="robots" content="noindex" />}

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content={site.name} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
{ogImage && <meta property="og:image" content={ogImage} />}

<!-- Twitter -->
<meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
{ogImage && <meta name="twitter:image" content={ogImage} />}
```

- [ ] **Step 2: `src/components/Header.astro`**

```astro
---
import { site } from '../config';
const links = [
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];
const current = Astro.url.pathname;
---

<header class="site-header">
  <div class="container site-header__inner">
    <a href="/" class="site-header__brand">{site.name}</a>
    <nav aria-label="Main">
      {
        links.map((l) => (
          <a
            href={l.href}
            aria-current={current.startsWith(l.href) ? 'page' : undefined}
          >
            {l.label}
          </a>
        ))
      }
    </nav>
  </div>
</header>

<style>
  .site-header {
    border-bottom: 1px solid var(--line);
  }

  .site-header__inner {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-block: var(--space-2);
  }

  .site-header__brand {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--ink);
    text-decoration: none;
  }

  nav {
    display: flex;
    gap: var(--space-3);
  }

  nav a {
    color: var(--ink);
    text-decoration: none;
  }

  nav a[aria-current='page'] {
    color: var(--accent);
  }
</style>
```

- [ ] **Step 3: `src/components/Footer.astro`**

```astro
---
import { site } from '../config';
const year = new Date().getFullYear();
---

<footer class="site-footer">
  <div class="container">
    <p>© {year} {site.name} — {site.role}</p>
    <p class="site-footer__availability">{site.availability}</p>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid var(--line);
    padding-block: var(--space-3);
    color: var(--muted);
  }

  .site-footer__availability {
    color: var(--accent);
  }
</style>
```

- [ ] **Step 4: `src/layouts/BaseLayout.astro`**

```astro
---
import Seo from '../components/Seo.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

const { title, description, ogImage, noindex } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <Seo title={title} description={description} image={ogImage} noindex={noindex} />
  </head>
  <body>
    <Header />
    <main class="page"><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page not found" description="This page could not be found.">
  <section class="container notfound">
    <h1>Nothing hangs here</h1>
    <p>The page you're after may have been renamed or removed.</p>
    <p><a href="/work/">See the work</a> or <a href="/">go home</a>.</p>
  </section>
</BaseLayout>

<style>
  .notfound {
    padding-block: var(--space-5);
  }

  .notfound h1 {
    color: var(--accent);
    font-size: clamp(3rem, 10vw, 6rem);
  }
</style>
```

- [ ] **Step 6: rewire `src/pages/index.astro` through BaseLayout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../config';
---

<BaseLayout title={site.name} description={site.intro}>
  <h1>{site.name}</h1>
</BaseLayout>
```

- [ ] **Step 7: Verify**

Run: `npm run build`
Expected: build succeeds. Check `dist/index.html` contains `<title>Rupom Morol</title>` and og: tags; `dist/404.html` exists and contains "Nothing hangs here"; header nav contains Work/About/Contact links.

Run: `npx astro preview &` then `curl -s http://localhost:4321/nope | grep -c "Nothing hangs here"` → `1`. Stop the preview server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: base layout, header/footer, SEO meta, 404 page"
```

---

### Task 4: Content schema, placeholder covers, 6 placeholder projects

**Files:**
- Create: `src/content.config.ts`
- Create: `scripts/make-placeholder-covers.mjs`
- Create: `src/content/projects/` — 6 markdown files
- Create: `src/assets/projects/<slug>/cover.jpg` (+ gallery images) — generated
- Modify: `package.json` (dev dep `sharp`, script `covers`)

**Interfaces:**
- Produces: collection `projects`, queryable via `getCollection('projects')`, entries with `entry.id` = slug (filename without `.md`) and `entry.data` = schema below. Later tasks consume: `title`, `category`, `year`, `cover` (ImageMetadata), `coverAlt`, `status`, `client?`, `featured?`, `tags?`, `testimonial? {quote, attribution}`, `order?`, `images? [{src, alt}]`, and `render(entry)` for the body.

- [ ] **Step 1: install sharp + script entry**

```bash
npm install -D sharp
```

Add to `package.json` → `"scripts"`:

```json
"covers": "node scripts/make-placeholder-covers.mjs"
```

- [ ] **Step 2: `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { image } from 'astro:schema';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    year: z.number().int(),
    cover: image(),
    coverAlt: z.string().min(1, 'Cover alt text is required'),
    status: z.enum(['published', 'wip']),
    client: z.string().optional(),
    featured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    testimonial: z
      .object({ quote: z.string(), attribution: z.string() })
      .optional(),
    order: z.number().int().optional(),
    images: z
      .array(z.object({ src: image(), alt: z.string().min(1) }))
      .optional(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 3: `scripts/make-placeholder-covers.mjs`**

Generates one 1200×630 JPG cover per project (solid color field + project title + category label), satisfying the standing cover rule.

```js
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const projects = [
  { slug: 'lumen-coffee-rebrand', title: 'Lumen Coffee Rebrand', category: 'Branding', year: 2025, bg: '#c9452c' },
  { slug: 'northwind-annual-report', title: 'Northwind Annual Report', category: 'Print', year: 2024, bg: '#1f3a5f' },
  { slug: 'atelier-mono-identity', title: 'Atelier Mono Identity', category: 'Branding', year: 2024, bg: '#2f2a26' },
  { slug: 'kite-festival-posters', title: 'Kite Festival Posters', category: 'Print', year: 2025, bg: '#d98e04' },
  { slug: 'verdant-packaging', title: 'Verdant Packaging System', category: 'Branding', year: 2023, bg: '#3f6212' },
  { slug: 'halcyon-editorial', title: 'Halcyon Editorial', category: 'Print', year: 2026, bg: '#7c3aed' },
];

const svg = ({ title, category, year, bg }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${bg}"/>
  <circle cx="1050" cy="120" r="220" fill="rgba(255,255,255,0.12)"/>
  <text x="80" y="120" font-family="Georgia, serif" font-size="28" fill="rgba(255,255,255,0.75)">
    ${category} · ${year} · PLACEHOLDER COVER
  </text>
  <text x="80" y="380" font-family="Georgia, serif" font-weight="bold" font-size="84" fill="#ffffff">${title}</text>
  <text x="80" y="540" font-family="Georgia, serif" font-size="30" fill="rgba(255,255,255,0.7)">
    Rupom Morol — Graphic Designer
  </text>
</svg>`;

for (const p of projects) {
  const out = `src/assets/projects/${p.slug}`;
  mkdirSync(out, { recursive: true });
  await sharp(Buffer.from(svg(p)))
    .jpeg({ quality: 85 })
    .toFile(`${out}/cover.jpg`);
  // second gallery image: same art, cropped square, so the lightbox has >1 frame
  await sharp(Buffer.from(svg(p)))
    .resize(1000, 1000, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 85 })
    .toFile(`${out}/detail-01.jpg`);
  console.log('wrote', p.slug);
}
```

Run: `npm run covers`
Expected: 12 JPGs under `src/assets/projects/<slug>/`.

- [ ] **Step 4: the six project markdown files.** One file per project under `src/content/projects/`, named `<slug>.md` matching the script's slugs. All are clearly-labeled placeholders. `halcyon-editorial.md` is `wip` (exercises badge + noindex); the other five are `published`, and five carry `featured: true`.

Example — `src/content/projects/lumen-coffee-rebrand.md` (the others follow this exact shape with their own title/category/year/slug/colors):

```markdown
---
title: "Lumen Coffee Rebrand"
category: "Branding"
year: 2025
cover: "../../assets/projects/lumen-coffee-rebrand/cover.jpg"
coverAlt: "PLACEHOLDER cover: bold red field with the words Lumen Coffee Rebrand"
status: published
featured: true
client: "Lumen Coffee Co. (placeholder)"
tags: ["Illustrator", "InDesign"]
testimonial:
  quote: "Rupom took our scattered ideas and turned them into a brand we're proud of."
  attribution: "Placeholder review — swap with a real client quote (with permission)"
order: 1
images:
  - src: "../../assets/projects/lumen-coffee-rebrand/detail-01.jpg"
    alt: "PLACEHOLDER detail image: cropped view of the Lumen rebrand artwork"
---

> **PLACEHOLDER PROJECT** — replace this case study with real work.

## Problem

Lumen's packaging had drifted: four roasts, four visual languages, no shelf presence. (Placeholder text.)

## Approach

One typographic system, roast-coded accents, and a logo mark that survives at stamp size. (Placeholder text.)

## Outcome

A 20-SKU system rolled out across bags, cups, and the shop front. (Placeholder text.)
```

The five other files (`northwind-annual-report.md`, `atelier-mono-identity.md`, `kite-festival-posters.md`, `verdant-packaging.md`, `halcyon-editorial.md`) use the same frontmatter keys with values from the script's project list; `halcyon-editorial.md` sets `status: wip`, omits `featured` and `testimonial`, and uses `order: 6`. Give each a unique `order` 1–6.

- [ ] **Step 5: Verify schema + generation**

Run: `npm run build`
Expected: build succeeds. Check `dist/_astro/` contains hashed cover images. Then break-check the schema: temporarily change `coverAlt` in one file to `""`, run `npm run build`, and confirm it FAILS with the "Cover alt text is required" message; revert.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: projects content collection, schema validation, 6 placeholder projects"
```

---

### Task 5: ProjectCard + Work gallery with category filter

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/WipBadge.astro`
- Create: `src/scripts/filter.js`
- Create: `src/pages/work.astro`
- Create: `src/lib/projects.js`

**Interfaces:**
- Consumes: `getCollection('projects')`, `site` config.
- Produces: `src/lib/projects.js` exporting `getProjectsSorted()` (all tasks' canonical ordering: `order` desc? no — ascending `order` first, then `year` descending) and `getFeatured(limit?)`. `WipBadge` — no props. `ProjectCard` props `{ project: CollectionEntry<'projects'> }`.

- [ ] **Step 1: `src/lib/projects.js`**

```js
import { getCollection } from 'astro:content';

/** Canonical ordering: explicit `order` ascending first, then newest year first. */
export async function getProjectsSorted() {
  const projects = await getCollection('projects');
  return projects.sort(
    (a, b) =>
      (a.data.order ?? 999) - (b.data.order ?? 999) ||
      b.data.year - a.data.year,
  );
}

export async function getFeatured(limit) {
  const all = await getProjectsSorted();
  const featured = all.filter((p) => p.data.featured);
  return limit ? featured.slice(0, limit) : featured;
}
```

- [ ] **Step 2: `src/components/WipBadge.astro`**

```astro
---
const { label = 'In progress' } = Astro.props;
---

<span class="wip-badge">{label}</span>

<style>
  .wip-badge {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
  }
</style>
```

- [ ] **Step 3: `src/components/ProjectCard.astro`**

```astro
---
import { Image } from 'astro:assets';
import WipBadge from './WipBadge.astro';

const { project } = Astro.props;
const { title, category, year, cover, coverAlt, status } = project.data;
---

<a href={`/work/${project.id}/`} class="card" data-category={category}>
  <div class="card__media">
    <Image src={cover} alt={coverAlt} width={1200} loading="lazy" />
  </div>
  <div class="card__meta">
    <h3 class="card__title">{title}</h3>
    <p class="card__info">{category} · {year}</p>
    {status === 'wip' && <WipBadge />}
  </div>
</a>

<style>
  .card {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .card__media {
    overflow: hidden;
  }

  .card__media :global(img) {
    transition: transform 0.5s ease;
  }

  .card:hover .card__media :global(img) {
    transform: scale(1.04);
  }

  .card__title {
    margin: var(--space-2) 0 0;
    font-size: 1.3rem;
    display: inline;
    background-image: linear-gradient(var(--accent), var(--accent));
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 0% 2px;
    transition: background-size 0.3s ease;
  }

  .card:hover .card__title {
    background-size: 100% 2px;
  }

  .card__info {
    margin: 0.25rem 0 0;
    color: var(--muted);
  }
</style>
```

- [ ] **Step 4: `src/scripts/filter.js`**

```js
/** Category filter for the Work grid. Tabs carry data-category; cards carry
 * data-category. 'All' shows everything. */
export function initFilter() {
  const tabs = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.filter;
      tabs.forEach((t) =>
        t.setAttribute('aria-pressed', String(t === tab)),
      );
      cards.forEach((card) => {
        const show = target === 'All' || card.dataset.category === target;
        card.hidden = !show;
      });
    });
  });
}
```

- [ ] **Step 5: `src/pages/work.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { getProjectsSorted } from '../lib/projects';

const projects = await getProjectsSorted();
const categories = [...new Set(projects.map((p) => p.data.category))];
const tabs = ['All', ...categories];
---

<BaseLayout
  title="Work"
  description="Branding, print, and more — selected projects by Rupom Morol."
>
  <section class="container">
    <h1>Work</h1>
    <div class="filters" role="group" aria-label="Filter projects by category">
      {
        tabs.map((tab, i) => (
          <button type="button" data-filter={tab} aria-pressed={i === 0}>
            {tab}
          </button>
        ))
      }
    </div>
    <div class="grid" data-reveal>
      {projects.map((p) => <ProjectCard project={p} />)}
    </div>
  </section>
</BaseLayout>

<script>
  import { initFilter } from '../scripts/filter';
  initFilter();
</script>

<style>
  h1 {
    font-size: clamp(3rem, 8vw, 5.5rem);
    margin: var(--space-4) 0 var(--space-3);
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    margin-bottom: var(--space-3);
  }

  .filters button {
    font: inherit;
    padding: 0.4rem 1rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
  }

  .filters button[aria-pressed='true'] {
    background: var(--ink);
    color: var(--bg);
    border-color: var(--ink);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: var(--space-3);
    padding-bottom: var(--space-5);
  }
</style>
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build succeeds; `dist/work/index.html` contains 6 project links (`/work/<slug>/`), filter buttons for All/Branding/Print, and one "In progress" badge (on Halcyon only). Confirm card `<img>` elements have non-empty `alt` attributes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: work gallery with derived category filter and WIP badge"
```

---

### Task 6: Project detail page — case study, gallery, noindex for WIP

**Files:**
- Create: `src/pages/work/[slug].astro`

**Interfaces:**
- Consumes: `getCollection('projects')`, `render()` from `astro:content`, `Image` from `astro:assets`, `WipBadge`, `site` config.
- Produces: route `/work/<slug>/` for every project.

- [ ] **Step 1: `src/pages/work/[slug].astro`**

```astro
---
import { render, type CollectionEntry } from 'astro:content';
import { Image } from 'astro:assets';
import BaseLayout from '../../layouts/BaseLayout.astro';
import WipBadge from '../../components/WipBadge.astro';
import { getProjectsSorted } from '../../lib/projects';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props as { entry: CollectionEntry<'projects'> };
const { Content } = await render(entry);
const d = entry.data;
const isWip = d.status === 'wip';
---

<BaseLayout
  title={d.title}
  description={d.coverAlt}
  ogImage={d.cover.src}
  noindex={isWip}
>
  <article class="container project">
    <p class="project__crumb">{d.category} · {d.year}{d.client ? ` · ${d.client}` : ''}</p>
    <h1>{d.title}</h1>
    {isWip && <WipBadge label="Case study in progress" />}

    <div class="project__cover">
      <Image src={d.cover} alt={d.coverAlt} width={1200} priority />
    </div>

    <div class="project__body">
      <Content />
    </div>

    {d.images && (
      <div class="project__gallery" data-gallery data-reveal>
        {
          d.images.map((img) => (
            <button
              type="button"
              class="project__frame"
              data-lightbox-trigger
              data-full={img.src.src}
              data-alt={img.alt}
            >
              <Image src={img.src} alt={img.alt} width={1200} loading="lazy" />
            </button>
          ))
        }
      </div>
    )}

    {d.tags && (
      <p class="project__tags">
        {d.tags.map((t) => <span class="tag">{t}</span>)}
      </p>
    )}

    {d.testimonial && (
      <blockquote class="project__testimonial">
        <p>“{d.testimonial.quote}”</p>
        <cite>{d.testimonial.attribution}</cite>
      </blockquote>
    )}

    <p class="project__back"><a href="/work/">← All work</a></p>
  </article>
</BaseLayout>

<script>
  import { initLightbox } from '../../scripts/lightbox';
  initLightbox();
</script>

<style>
  .project {
    padding-bottom: var(--space-5);
  }

  .project__crumb {
    color: var(--muted);
    margin-top: var(--space-3);
  }

  h1 {
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    margin: 0 0 var(--space-2);
  }

  .project__cover {
    margin-block: var(--space-3);
  }

  .project__body {
    max-width: 42rem;
  }

  .project__gallery {
    display: grid;
    gap: var(--space-2);
    margin-block: var(--space-3);
  }

  .project__frame {
    border: 0;
    padding: 0;
    background: none;
    cursor: zoom-in;
  }

  .tag {
    display: inline-block;
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.15rem 0.7rem;
    margin-right: 0.4rem;
    font-size: 0.85rem;
    color: var(--muted);
  }

  .project__testimonial {
    border-left: 3px solid var(--accent);
    margin: var(--space-3) 0;
    padding-left: var(--space-2);
    font-family: var(--font-display);
    font-size: 1.3rem;
  }

  .project__testimonial cite {
    display: block;
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--muted);
    margin-top: var(--space-1);
  }
</style>
```

Note: the lightbox script is imported here but created in Task 10. To keep this task green on its own, create a **stub now** at `src/scripts/lightbox.js` containing `export function initLightbox() {}`; Task 10 replaces the body.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds; `dist/work/` contains one directory per project slug.

WIP noindex check — Run: `grep -c "noindex" dist/work/halcyon-editorial/index.html` → `1`
Published clean check — Run: `grep -c "noindex" dist/work/lumen-coffee-rebrand/index.html` → `0`

Sitemap exclusion check — Run: `grep -c "halcyon-editorial" dist/sitemap-0.xml` → `0` (and `grep -c "lumen-coffee-rebrand" dist/sitemap-0.xml` → `1`).

Detail content check — Run: `grep -c "Placeholder review" dist/work/lumen-coffee-rebrand/index.html` → `1` (testimonial rendered).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: project detail pages with case study, gallery, WIP noindex"
```

---

### Task 7: Home page

**Files:**
- Modify: `src/pages/index.astro` (replace placeholder)

**Interfaces:**
- Consumes: `getFeatured(limit)` from `src/lib/projects.js`, `site` config, `ProjectCard`.

- [ ] **Step 1: `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { getFeatured } from '../lib/projects';
import { site } from '../config';

const featured = await getFeatured(site.featuredCount);
---

<BaseLayout title={site.name} description={site.intro}>
  <section class="container hero">
    <p class="hero__availability">{site.availability}</p>
    <h1 class="hero__title">{site.name}</h1>
    <p class="hero__role">{site.role} — {site.intro}</p>
    <p class="hero__trust">
      {site.yearsExperience} years of experience · {site.fiverr.level}
    </p>
    <p class="hero__cta"><a href="/contact/">Get in touch</a></p>
  </section>

  <section class="container" data-reveal>
    <h2>Selected work</h2>
    <div class="grid">
      {featured.map((p) => <ProjectCard project={p} />)}
    </div>
    <p><a href="/work/">See all work →</a></p>
  </section>
</BaseLayout>

<style>
  .hero {
    padding-block: var(--space-5) var(--space-4);
  }

  .hero__availability {
    color: var(--accent);
    font-weight: 600;
    margin: 0;
  }

  .hero__title {
    font-size: clamp(4rem, 14vw, 9rem);
    margin: 0;
    letter-spacing: -0.02em;
  }

  .hero__role {
    font-size: 1.3rem;
    max-width: 40rem;
  }

  .hero__trust {
    color: var(--muted);
  }

  .hero__cta a {
    font-weight: 600;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: var(--space-3);
    margin-bottom: var(--space-3);
  }
</style>
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: `dist/index.html` contains "Currently booking new projects", "8 years of experience", "Fiverr Level 2", 5 featured project cards, and the "See all work" link.

Edge case check: temporarily set `featured: false` on all projects, rebuild, and confirm the home page still renders (empty grid section, no crash); revert.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: home page with hero, trust signals, featured teaser"
```

---

### Task 8: About page + placeholder resume + Person JSON-LD

**Files:**
- Create: `src/pages/about.astro`, `public/resume.pdf` (static placeholder, committed directly)

**Interfaces:**
- Consumes: `site` config.
- Produces: `/about/` route; `/resume.pdf` static asset.

- [ ] **Step 1: static placeholder résumé.** `public/resume.pdf` is a committed static binary — no generator script (hand-computed PDF offsets in repo code would fail silently as a corrupt PDF for content that never varies). Create it once, verify it opens, commit the binary:

  1. Save the script below to a **temporary file outside the repo** (e.g. `%TEMP%\make-resume-once.mjs`), then run `node %TEMP%\make-resume-once.mjs "C:\Users\Rupommoral\Documents\portfolio\public\resume.pdf"` (the script takes the output path as `process.argv[2]`).
  2. Open `public/resume.pdf` in a PDF viewer and confirm it renders "Rupom Morol" plus the placeholder line. This manual check is the gate — do not commit an unviewed PDF.
  3. Delete the temp script. Commit only the PDF.

```js
// make-resume-once.mjs — run once, verify output, delete. NOT committed.
import { writeFileSync } from 'node:fs';

const out = process.argv[2];
if (!out) throw new Error('usage: node make-resume-once.mjs <output.pdf>');

const text =
  'BT /F1 24 Tf 72 720 Td (Rupom Morol) Tj 0 -36 Td /F1 14 Tf \
(PLACEHOLDER RESUME - replace public/resume.pdf with the real CV) Tj ET';

const objs = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objs.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf +=
  `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` +
  offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('') +
  `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

writeFileSync(out, pdf, 'latin1');
console.log('wrote', out);
```

- [ ] **Step 2: `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../config';

const sameAs = [site.fiverr.url, ...site.socials.map((s) => s.url)].filter(Boolean);
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  description: site.intro,
  sameAs,
};
---

<BaseLayout
  title="About"
  description={`${site.name} — ${site.role}. ${site.intro}`}
>
  <script type="application/ld+json" set:html={JSON.stringify(person)} />

  <section class="container about">
    <h1>About</h1>
    <div class="about__grid">
      <div>
        <p class="about__trust">
          {site.yearsExperience} years of experience ·
          {
            site.fiverr.url ? (
              <a href={site.fiverr.url}>{site.fiverr.level}</a>
            ) : (
              <span>{site.fiverr.level} <em>(profile link pending)</em></span>
            )
          }
        </p>
        <p>
          I'm {site.name}, a graphic designer working across brand identity and
          print. {site.intro}
        </p>
        <p><em>Placeholder bio — replace with your real story.</em></p>

        <h2>Capabilities</h2>
        <ul>
          <li>Brand identity systems</li>
          <li>Editorial &amp; print layout</li>
          <li>Packaging</li>
          <li>Poster design</li>
        </ul>

        <h2>Tools</h2>
        <p>Illustrator · InDesign · Photoshop · Figma</p>

        <p><a href="/resume.pdf" download>Download resume (PDF)</a></p>
        <p><em>Placeholder PDF — replace <code>public/resume.pdf</code> with the real CV.</em></p>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .about {
    padding-block: var(--space-4) var(--space-5);
  }

  h1 {
    font-size: clamp(3rem, 8vw, 5rem);
  }

  .about__grid {
    max-width: 42rem;
  }

  .about__trust {
    color: var(--accent);
    font-weight: 600;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: var(--space-3);
  }
</style>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: `dist/about/index.html` contains the `application/ld+json` block with `"@type":"Person"`, the resume link `/resume.pdf`, and "8 years of experience". `dist/resume.pdf` exists and starts with `%PDF`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: about page with Person JSON-LD, placeholder resume"
```

---

### Task 9: Contact page with availability, socials, backend-free form

**Files:**
- Create: `src/pages/contact.astro`
- Create: `src/scripts/contact-form.js`

**Interfaces:**
- Consumes: `site` config (`email`, `socials`, `fiverr`, `availability`, `formspreeId`).
- Produces: `/contact/` route. Form behavior: when `site.formspreeId` is set (not `''`), a form posts via `fetch` to Formspree with a graceful failure message; when empty, the page renders a prominent email CTA plus a note explaining how to activate the form.

- [ ] **Step 1: `src/scripts/contact-form.js`**

```js
export function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(String(res.status));
      status.textContent = "Thanks — I'll get back to you soon.";
      form.reset();
    } catch {
      status.textContent = `Something went wrong — please email me directly at ${form.dataset.email}.`;
    }
  });
}
```

- [ ] **Step 2: `src/pages/contact.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../config';

const formConnected = Boolean(site.formspreeId);
const socialLinks = [
  ...site.socials,
  ...(site.fiverr.url ? [{ label: 'Fiverr', url: site.fiverr.url }] : []),
].filter((s) => s.url);
---

<BaseLayout
  title="Contact"
  description={`Get in touch with ${site.name} — ${site.availability}.`}
>
  <section class="container contact">
    <h1>Contact</h1>
    <p class="contact__availability">{site.availability}</p>

    <p class="contact__email">
      <a href={`mailto:${site.email}`}>{site.email}</a>
    </p>

    {
      socialLinks.length > 0 && (
        <ul class="contact__socials">
          {socialLinks.map((s) => (
            <li>
              <a href={s.url}>{s.label}</a>
            </li>
          ))}
        </ul>
      )
    }

    {
      formConnected ? (
        <form id="contact-form" action={`https://formspree.io/f/${site.formspreeId}`} method="POST" data-email={site.email}>
          <label>
            Name
            <input type="text" name="name" required autocomplete="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" required autocomplete="email" />
          </label>
          <label>
            Project details
            <textarea name="message" rows="6" required />
          </label>
          <button type="submit">Send message</button>
          <p class="form-status" role="status" aria-live="polite" />
        </form>
      ) : (
        <p class="contact__form-note">
          Prefer a form? Email is fastest for now — the contact form switches on
          once a Formspree form ID is set in <code>src/config.ts</code>.
        </p>
      )
    }
  </section>
</BaseLayout>

<script>
  import { initContactForm } from '../scripts/contact-form';
  initContactForm();
</script>

<style>
  .contact {
    padding-block: var(--space-4) var(--space-5);
    max-width: 42rem;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 5rem);
  }

  .contact__availability {
    color: var(--accent);
    font-weight: 600;
  }

  .contact__email a {
    font-size: 1.4rem;
  }

  .contact__socials {
    display: flex;
    gap: var(--space-2);
    list-style: none;
    padding: 0;
  }

  form {
    display: grid;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }

  label {
    display: grid;
    gap: 0.25rem;
    font-weight: 600;
  }

  input,
  textarea {
    font: inherit;
    padding: 0.6rem;
    border: 1px solid var(--line);
  }

  button {
    font: inherit;
    font-weight: 600;
    padding: 0.6rem 1.4rem;
    background: var(--ink);
    color: var(--bg);
    border: 0;
    cursor: pointer;
    justify-self: start;
  }

  .contact__form-note {
    color: var(--muted);
  }
</style>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: `dist/contact/index.html` contains `mailto:hello@example.com`, "Currently booking new projects", and (since `formspreeId` is `''`) the form-note paragraph — not the `<form>`. The Footer availability (Task 3) matches the Contact availability because both read `site.availability`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: contact page with availability, socials, config-gated form"
```

---

### Task 10: Lightbox + scroll reveal

**Files:**
- Modify: `src/scripts/lightbox.js` (replace Task 6 stub)
- Create: `src/scripts/reveal.js`
- Modify: `src/layouts/BaseLayout.astro` (init reveal globally)

**Interfaces:**
- Consumes: gallery buttons marked `data-lightbox-trigger` with `data-full` / `data-alt` (from Task 6); `[data-reveal]` elements.
- Produces: `initLightbox()` and `initReveal()` — no props, self-locating via DOM.

- [ ] **Step 1: `src/scripts/reveal.js`**

```js
export function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  targets.forEach((el) => io.observe(el));
}
```

- [ ] **Step 2: `src/scripts/lightbox.js` (full replacement)**

Built on native `<dialog>`: `showModal()` gives Esc-to-close and focus containment; arrows and focus restoration are the parts we write.

```js
/** Lightbox over native <dialog>. Triggers: [data-lightbox-trigger]
 * with data-full (image URL) and data-alt (alt text). */
export function initLightbox() {
  const triggers = [...document.querySelectorAll('[data-lightbox-trigger]')];
  if (!triggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Close">✕</button>
    <img class="lightbox__img" alt="" />
    <p class="lightbox__caption"></p>
    <button type="button" class="lightbox__nav lightbox__prev" aria-label="Previous image">‹</button>
    <button type="button" class="lightbox__nav lightbox__next" aria-label="Next image">›</button>
  `;
  document.body.append(dialog);
  const img = dialog.querySelector('.lightbox__img');
  const caption = dialog.querySelector('.lightbox__caption');
  let index = 0;
  let opener = null;

  const show = (i) => {
    index = (i + triggers.length) % triggers.length;
    const t = triggers[index];
    img.src = t.dataset.full;
    img.alt = t.dataset.alt || '';
    caption.textContent = `${index + 1} / ${triggers.length}`;
  };

  triggers.forEach((t, i) => {
    t.addEventListener('click', () => {
      opener = t;
      show(i);
      dialog.showModal();
    });
  });

  dialog
    .querySelector('.lightbox__close')
    .addEventListener('click', () => dialog.close());
  dialog
    .querySelector('.lightbox__prev')
    .addEventListener('click', () => show(index - 1));
  dialog
    .querySelector('.lightbox__next')
    .addEventListener('click', () => show(index + 1));

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    img.src = '';
    opener?.focus();
  });
}
```

- [ ] **Step 3: lightbox styles — append to `src/styles/global.css`**

```css
.lightbox {
  border: 0;
  background: rgba(17, 19, 24, 0.94);
  color: #fff;
  padding: var(--space-3);
  max-width: min(92vw, 68rem);
}

.lightbox::backdrop {
  background: rgba(17, 19, 24, 0.7);
}

.lightbox__img {
  max-height: 76vh;
  width: auto;
  margin-inline: auto;
}

.lightbox__caption {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin: var(--space-1) 0 0;
}

.lightbox__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
}

.lightbox__prev { left: 0.75rem; }
.lightbox__next { right: 0.75rem; }
```

- [ ] **Step 4: wire reveal into `src/layouts/BaseLayout.astro`** — add before `</body>`:

```astro
  <script>
    import { initReveal } from '../scripts/reveal';
    initReveal();
  </script>
```

- [ ] **Step 5: Verify — keyboard walkthrough (concrete, in the preview server)**

Run: `npm run build && npx astro preview`, then in a browser:

1. `/work/lumen-coffee-rebrand/` — Tab reaches the gallery image button; Enter opens the lightbox; focus sits inside the dialog; Tab cycles within it (native dialog containment); `←`/`→` change image and caption reads `1 / 2` → `2 / 2`; Esc closes; focus returns to the image button that opened it.
2. Scroll `/work/` — grid sections fade up once, and stay visible after (unobserved).
3. Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering) — content is visible immediately with no transition.

Also Run: `grep -c "data-reveal" dist/work/index.html` → `1`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: accessible lightbox and scroll-reveal motion"
```

---

### Task 11: SEO assets — robots.txt, favicon, web manifest

**Files:**
- Create: `public/robots.txt`, `public/favicon.svg`, `public/site.webmanifest`
- Modify: `src/layouts/BaseLayout.astro` (manifest link)

- [ ] **Step 1: `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://rupommorol.com/sitemap-index.xml
```

(The URL must match `astro.config.mjs`'s `site` — both are the same placeholder, swapped together at launch.)

- [ ] **Step 2: `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#111318"/>
  <text x="32" y="42" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#ffffff">RM</text>
</svg>
```

- [ ] **Step 3: `public/site.webmanifest`**

```json
{
  "name": "Rupom Morol — Graphic Designer",
  "short_name": "Rupom Morol",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#111318",
  "icons": [{ "src": "/favicon.svg", "sizes": "any", "type": "image/svg+xml" }]
}
```

- [ ] **Step 4: manifest link in BaseLayout `<head>`** (after the favicon link):

```astro
<link rel="manifest" href="/site.webmanifest" />
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: `dist/robots.txt`, `dist/favicon.svg`, `dist/site.webmanifest` all exist; `dist/index.html` contains the manifest link; `dist/sitemap-index.xml` lists `sitemap-0.xml`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: robots.txt, favicon, web manifest"
```

---

### Task 12: Launch-readiness pass — README, build gate, visual check, Lighthouse

**Files:**
- Create: `README.md`
- Modify: none (verification-only task except README)

- [ ] **Step 1: `README.md`** — must contain, verbatim in substance:

```markdown
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
```

- [ ] **Step 2: full build gate**

Run: `npm run build`
Expected: clean build, zero warnings about missing images or schema errors.

- [ ] **Step 3: visual walkthrough against the spec** — `npx astro preview`, check in a browser at desktop (1280px) and mobile (390px) widths:

- Home: oversized hero name, availability line, trust line, featured grid, CTA.
- Work: filter tabs actually filter (click each), WIP badge on Halcyon, card hover zoom + underline draw.
- Project detail: cover, case study headings, gallery opens lightbox, tags, testimonial.
- About: JSON-LD present (view-source), resume link downloads.
- Contact: availability, mailto, form-note (form absent while `formspreeId` is empty).
- 404: on-brand, links home.
- No horizontal overflow at 390px on any page.

- [ ] **Step 4: Lighthouse gate**

Run the production build through Lighthouse (Chrome headless):

```bash
npx astro preview &
npx lighthouse http://localhost:4321 --chrome-flags="--headless" --output=json --output-path=lighthouse.json --only-categories=performance,accessibility,best-practices,seo --quiet
node -e "const r=require('./lighthouse.json'); for (const [k,v] of Object.entries(r.categories)) console.log(k, Math.round(v.score*100))"
```

Expected: performance, accessibility, and seo each ≥ 90 (spec gate). If any is below 90, fix the flagged issue (most likely: missing meta description on a page, image sizing, or contrast) and re-run before proceeding.

- [ ] **Step 5: clean up + commit**

Remove `lighthouse.json` from disk (or add to `.gitignore`), then:

```bash
git add -A
git commit -m "chore: README, launch-readiness pass, Lighthouse gate"
```

---

## Not covered here (deliberate, per spec)

- Analytics script (Cloudflare Web Analytics) — added as a one-liner after the site is live.
- Per-project OG image generation — placeholder covers are exactly 1200×630 JPGs, so reuse is safe; revisit only if real covers drift from the ratio.
- Auto-deploy / hosting setup — one-time host decision at launch (Netlify → native forms; otherwise Formspree).
