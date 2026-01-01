import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    // Provide prerender params (slugs) by importing the generated posts module.
    // This ensures Vercel can prerender each blog post page during build.
    getPrerenderParams: async () => {
      try {
        const mod = await import('./generated/posts');
        // GENERATED_POSTS is a readonly const; treat it as a readonly array of objects
        const posts = (mod.GENERATED_POSTS ?? []) as readonly { slug: string }[];
        return posts.map(p => ({ slug: String(p.slug) }));
      } catch (e) {
        // If generation failed or file is missing, return empty array to avoid build failure
        console.warn('Could not load generated posts for prerendering', e);
        return [];
      }
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
