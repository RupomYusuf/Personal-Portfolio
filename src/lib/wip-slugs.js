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
