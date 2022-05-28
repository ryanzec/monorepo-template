import path from 'path';
import react from '@vitejs/plugin-react';

const baseConfiguration = {
  resolve: {
    alias: {
      $components: path.join(__dirname, 'packages', 'components'),
      $views: path.join(__dirname, 'packages', 'views'),
      $utils: path.join(__dirname, 'packages', 'utils'),
      $types: path.join(__dirname, 'packages', 'types'),
      $hooks: path.join(__dirname, 'packages', 'hooks'),
      $contexts: path.join(__dirname, 'packages', 'contexts'),
      '$storybook-helpers': path.join(__dirname, 'packages', 'storybook-helpers'),
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
