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
      assets: path.join(__dirname, 'src', 'assets'),
      components: path.join(__dirname, 'src', 'components'),
      containers: path.join(__dirname, 'src', 'containers'),
      controllers: path.join(__dirname, 'src', 'controllers'),
      hooks: path.join(__dirname, 'src', 'hooks'),
      lib: path.join(__dirname, 'src', 'lib'),
      models: path.join(__dirname, 'src', 'models'),
      modules: path.join(__dirname, 'src', 'modules'),
      services: path.join(__dirname, 'src', 'services'),
      shared: path.join(__dirname, 'src', 'shared'),
    },
  },
});
