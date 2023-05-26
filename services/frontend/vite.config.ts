import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.FRONTEND_PORT),
    host: true,
    watch: {
      usePolling: true,
    }
  },
  define: {
    'import.meta.env.BACKEND_URL': JSON.stringify(`${process.env.BACKEND_URL}/api/v1`),
  }
})
