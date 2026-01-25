import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true, // or '0.0.0.0' to listen on all network interfaces
    port: 5173,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})

