import { defineConfig } from 'vite';

export default defineConfig({
  root: 'client',
  base: './',    // relative paths so it works on GitHub Pages
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
