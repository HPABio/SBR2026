// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Set your site URL here or via SITE_URL environment variable
  // This is required for sitemap generation
  site: process.env.SITE_URL || 'https://synbioreactor.de', // TODO: Update with your actual production URL
  output: 'server', // Enable server-side rendering for API routes
  adapter: node({
    mode: 'standalone', // or 'middleware' depending on your deployment
  }),
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