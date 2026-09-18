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
