import path from 'path';

import react from '@vitejs/plugin-react';

const baseConfiguration = {
  resolve: {
    alias: {
      $: path.join(__dirname, 'packages'),
    },
  },
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
};

export const viteUtils = {
  baseConfiguration,
};
