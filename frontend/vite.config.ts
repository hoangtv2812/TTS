import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'hoangtv2812.duckdns.org'
    ]
  },
  build: {
    chunkSizeWarningLimit: 50000,
  }
})
