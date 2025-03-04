import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['a1bc-103-50-158-85.ngrok-free.app'],
    proxy: {
      '/api': {
        target:'http://localhost:5000'
        }
    }
  }
})
