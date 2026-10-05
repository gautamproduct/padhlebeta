/**
 * Single source of truth for site-wide config.
 */
export const site = {
  name: 'Padhle Beta',
  tagline: 'Free PDF tools for Indian students.',
  description:
    'Convert dark coaching PDFs to ink-saving prints, merge notes, compress files, and more — all in your browser. Files never leave your device. Free, forever.',
  // Both come from astro.config.mjs (SITE_URL / BASE_PATH env vars).
  siteUrl: (import.meta.env.SITE ?? '').replace(/\/$/, ''),
  basePath: import.meta.env.BASE_URL.replace(/\/$/, ''),
  locale: 'en-IN',
  twitterHandle: '@padhlebeta',
  founder: 'Padhle Beta',
  contactEmail: 'hello@padhlebeta.in',
  ogImage: '/og/default.png',
  github: {
    org: 'gautamproduct',
    repo: 'padhlebeta',
  },
} as const;

export const nav = [
  { label: 'NCERT PDFs', href: '/ncert-pdf/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Print guides', href: '/print/' },
  { label: 'Focus timer', href: '/focus-timer/' },
  { label: 'Blog', href: '/blog/' },
] as const;

export { tools, getTool, toolCategories } from './tools';
export type { Tool, ToolOption, ToolCategory } from './tools';
