import { defineConfig } from 'vite';

import { viteUtils } from './vite-utils';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteUtils.baseConfiguration,
  root: __dirname,

  // @ts-expect-error not sure why this causes a typescript error
  test: {
    coverage: {
      all: true,
      exclude: [
        '**/*.spec.ts',
        '**/*.spec.tsx',
        'packages/components/**/*',
        'packages/views/**/*',
        '*.*',
        'applications/web/**/*',
        'packages/types/**/*',
      ],
    },
  },
});
