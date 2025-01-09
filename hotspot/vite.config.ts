import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import commonjs from '@rollup/plugin-commonjs'; // Import the commonjs plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    commonjs(),  // Enable the commonjs plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/admin': {
        target: 'https://test.api.hotspot.etnet.co.ke',
        changeOrigin: true,
        secure: true, // Use 'true' if the server uses a valid SSL certificate
        rewrite: (path) => path.replace(/^\/admin/, '/admin'),
      },
    },
  },
});
