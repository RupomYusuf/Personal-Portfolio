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
