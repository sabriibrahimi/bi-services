import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Path the site is served under: '/' locally and on a domain root, '/<repo>/'
// on a GitHub Pages project site. The deploy workflow sets it.
// Accepted with or without surrounding slashes ('repo', '/repo', '/repo/'), so
// a shell that rewrites leading slashes cannot corrupt it. Keep this in step
// with normaliseBase() in src/config/deployment.js.
const raw = process.env.VITE_BASE
const base = !raw || raw === '/' ? '/' : `/${raw.replace(/^\/+|\/+$/g, '')}/`

export default defineConfig({
  base,

  plugins: [react()],

  build: {
    // One stylesheet for the whole site: prerendered pages then paint without
    // waiting for a route-level chunk.
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },

  ssgOptions: {
    // /fr/contact/index.html rather than /fr/contact.html, so both
    // /fr/contact and /fr/contact/ resolve on any static host.
    dirStyle: 'nested',
    formatting: 'minify',
    concurrency: 10,
  },
})
