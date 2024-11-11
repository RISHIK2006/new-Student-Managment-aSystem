import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],  // Moved outside the server block
  build: {
    outDir: 'build',    // or whatever folder you're targeting
    assetsDir: 'assets', // ensures Vite places static assets correctly
    rollupOptions: {
      input: 'index.html', // main entry
    },
  },
});
