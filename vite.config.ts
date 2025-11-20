// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  // dynamic import avoids `require()` on an ESM-only package
  const reactPlugin = (await import('@vitejs/plugin-react')).default;

  return {
    plugins: [reactPlugin()],
    server: {
      open: false
    },
    build: {
      target: 'es2020'
    }
  };
});
