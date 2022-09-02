import path from 'path';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';

const baseConfiguration = {
  resolve: {
    alias: {
      $: path.join(__dirname, 'packages'),
    },
  },
  plugins: [vanillaExtractPlugin(), react()],
  server: {
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
};

export const viteUtils = {
  baseConfiguration,
};
