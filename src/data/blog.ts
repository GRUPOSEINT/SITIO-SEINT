import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Los borradores se ven en `npm run dev`, nunca en el sitio publicado.
export async function publicados(): Promise<Post[]> {
  const todos = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.borrador);
  return todos.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export const slugDe = (p: Post) => p.data.slug || p.id;
export const temaDe = (p: Post) => (p.data.categoria === 'Salud ocupacional' ? 'theme-salud' : 'theme-formacion');

export function fechaCorta(d: Date) {
  const m = d.toLocaleDateString('es-CO', { month: 'short', timeZone: 'UTC' }).replace('.', '');
  return `${m.charAt(0).toUpperCase()}${m.slice(1)} ${d.getUTCFullYear()}`;
}
