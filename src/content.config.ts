import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string().optional(),
    categoria: z.enum(['Formación', 'Salud ocupacional']),
    fecha: z.coerce.date(),
    foto: z.string().optional(),
    resumen: z.string().max(160),
    servicio: z.string().default('Consulta general'),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { blog };
