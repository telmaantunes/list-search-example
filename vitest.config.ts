import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // enable jest-like global test APIs
      globals: true,
      // simulate DOM with happy-dom
      // (requires installing happy-dom as a peer dependency)
      environment: 'happy-dom'
    }
  })
);
