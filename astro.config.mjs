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
  site: process.env.SITE_URL || 'https://2026.synbioreactor.de',
  output: 'server', // Enable server-side rendering for API routes
  adapter: node({
    mode: 'standalone', // or 'middleware' depending on your deployment
  }),
  vite: {
      plugins: [tailwindcss()],
      assetsInclude: ['**/*.glb'],
      optimizeDeps: {
        // Fix intermittent dev-only 504 "Outdated Optimize Dep" for Rapier dynamic import.
        // This makes sure the wasm/js shim is prebundled deterministically.
        include: ['@dimforge/rapier3d-compat'],
      },
      resolve: {
        // Prevent multiple React copies (fixes "Invalid hook call" in islands)
        dedupe: ['react', 'react-dom'],
      },
	},

  integrations: [
    react(),
    sitemap({
      // Exclude API routes and other non-page routes from sitemap
      filter: (page) => !page.includes('/api/') && !page.includes('/robots.txt'),
    }),
  ],
});