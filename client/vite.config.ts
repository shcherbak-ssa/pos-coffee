import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'http://localhost:3333',
    },
  },

  resolve: {
    alias: {
      controllers: path.join(__dirname, 'src', 'controllers'),
      models: path.join(__dirname, 'src', 'models'),
      services: path.join(__dirname, 'src', 'services'),
      shared: path.join(__dirname, 'src', 'shared'),
      view: path.join(__dirname, 'src', 'view'),
      '@admin': path.join(__dirname, 'src', 'modules', 'admin'),
      '@app': path.join(__dirname, 'src', 'modules', 'app'),
      '@login': path.join(__dirname, 'src', 'modules', 'login'),
    },
  },
});
