import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      legacy({
        targets: [
          'defaults',
          'chrome >= 65',
          'safari >= 12',
          'ios_saf >= 12',
          'firefox >= 65',
          'edge >= 79',
          'samsung >= 10',
        ],
        modernPolyfills: true,
        renderLegacyChunks: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      cssTarget: ['chrome65', 'safari12', 'firefox65', 'edge79'],
      chunkSizeWarningLimit: 1500,
    },
  };
});
