import path from 'path';

import react from '@vitejs/plugin-react';
import { CSSModulesOptions } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

const baseConfiguration = {
  resolve: {
    alias: {
      $: path.join(__dirname, 'packages'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase' as CSSModulesOptions['localsConvention'],
    },
  },
  plugins: [react(), EnvironmentPlugin('all')],
  server: {
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
};

export const viteUtils = {
  baseConfiguration,
};
