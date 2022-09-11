import path from 'path';

import react from '@vitejs/plugin-react';

const baseConfiguration = {
  resolve: {
    alias: {
      $: path.join(__dirname, 'packages'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  server: {
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
};

export const viteUtils = {
  baseConfiguration,
};
