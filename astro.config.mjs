import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Deploy target. Override with env vars to serve from a sub-path instead, e.g.
//   SITE_URL=https://gautamproduct.github.io BASE_PATH=/padhlebeta npm run build
// `||` so empty CI variables fall back to the defaults.
const SITE = process.env.SITE_URL || 'https://padhlebeta.live';
const BASE = process.env.BASE_PATH || '/';
const BASE_PREFIX = BASE.replace(/\/$/, '');

/** Prefix root-relative links in Markdown content with the base path. */
function rehypeBaseLinks() {
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
        node.properties.href = BASE_PREFIX + href;
      }
    }
    node.children?.forEach(visit);
  };
  return (tree) => visit(tree);
}

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // Inline page CSS: removes render-blocking stylesheet requests.
    inlineStylesheets: 'always',
    assets: '_astro',
  },
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/404') && !page.includes('/download-ncert'),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(BASE_PREFIX, '') || '/';
        if (path === '/') item.priority = 1.0;
        else if (/^\/ncert-pdf\/(class-\d+\/([^/]+\/)?)?$/.test(path)) item.priority = 0.9;
        else if (path.startsWith('/tools/') || path.startsWith('/print/')) item.priority = 0.9;
        else if (path.startsWith('/blog/')) item.priority = 0.6;
        return item;
      },
    }),
    mdx(),
  ],
  vite: {
    ssr: {
      noExternal: ['pdf-lib'],
    },
    optimizeDeps: {
      include: ['pdf-lib'],
    },
  },
  compressHTML: true,
});
