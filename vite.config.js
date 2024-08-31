import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333', // Cambia esto a la URL de tu servidor AdonisJS
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),      },
    },
  },
});
