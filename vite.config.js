import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base path ensures deployment works seamlessly everywhere
  server: {
    port: 3000,
    open: '/dev.html'
  },
  build: {
    rollupOptions: {
      input: {
        main: './dev.html'
      }
    }
  }
});
