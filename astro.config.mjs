// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Set your site URL here or via SITE_URL environment variable
  // This is required for sitemap generation
  site: process.env.SITE_URL || 'https://example.com', // TODO: Update with your actual production URL
  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [
    react(),
    sitemap({
      // Exclude API routes and other non-page routes from sitemap
      filter: (page) => !page.includes('/api/') && !page.includes('/robots.txt'),
    }),
  ],
});