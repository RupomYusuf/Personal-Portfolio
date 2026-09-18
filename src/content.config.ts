import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
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
