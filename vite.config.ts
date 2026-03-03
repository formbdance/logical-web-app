import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import envCompatible from 'vite-plugin-env-compatible';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue(), envCompatible()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts']
  }
});
