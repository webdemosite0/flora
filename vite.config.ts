import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Keep the 3D stack out of the initial bundle — it is lazy-loaded and
        // most visitors (mobile, reduced motion) never download it.
        manualChunks(id) {
          if (/node_modules[\\/](three|@react-three)/.test(id)) return 'three'
          if (/node_modules[\\/](framer-motion|motion-dom|motion-utils)/.test(id)) return 'motion'
        },
      },
    },
  },
})
