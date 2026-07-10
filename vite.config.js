import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/longyoung-profile/',
  plugins: [react()],
  server: {
    port: 5666
  },
  optimizeDeps: {
    include: ['react-simple-maps', 'prop-types']
  }
})
