import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // here /api is a global prefix to all Nest routes
      // for this I also have to modify the main.ts in /backend
      '/api': {
        target: 'http://localhost:5000', // local Nest app
        changeOrigin: true,
      },
    },
  },
});
