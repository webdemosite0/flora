import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Published to GitHub Pages at /flora/, so built asset URLs need that prefix.
// The dev server stays at the root.
const BASE = '/flora/'

// Keyed off `mode`, not `command`: `vite preview` is also a "serve" command,
// and keying off that made preview serve at / while the built HTML asked for
// /flora/. Mode is production for both build and preview, development for dev.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? BASE : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Keep the 3D stack out of the initial bundle — it is lazy-loaded and
        // most visitors (mobile, reduced motion) never download it.
        manualChunks(id: string) {
          if (/node_modules[\\/](three|@react-three)/.test(id)) return 'three'
          if (/node_modules[\\/](framer-motion|motion-dom|motion-utils)/.test(id)) return 'motion'
        },
      },
    },
  },
}))
