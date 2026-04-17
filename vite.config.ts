import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// IMPORTANT: Set `base` to match your GitHub Pages URL path.
// - If repo is named "<username>.github.io"  → base: '/'
// - If repo has any other name (e.g. "portfolio") → base: '/portfolio/'
// Check: GitHub repo → Settings → Pages → "Your site is published at..."
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
