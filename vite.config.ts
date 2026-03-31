import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fakestoreapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/fake-api-img': {
        target: 'https://fakestoreapi.com/img',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fake-api-img/, ''),
      },
    },
  },
})
