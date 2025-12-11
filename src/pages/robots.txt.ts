import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapUrl: string) => `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}`;

export const GET: APIRoute = () => {
  // Get site URL from Astro config (set in astro.config.mjs)
  const siteUrl = import.meta.env.SITE;
  
  if (!siteUrl) {
    console.warn('SITE_URL not configured in astro.config.mjs. Using default.');
  }
  
  const baseUrl = siteUrl || 'https://example.com';
  const sitemapUrl = new URL('sitemap-index.xml', baseUrl).href;
  
  return new Response(getRobotsTxt(sitemapUrl), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
