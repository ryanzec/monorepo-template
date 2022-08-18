import { defineConfig } from 'vite';

import { viteUtils } from '../../vite-utils';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteUtils.baseConfiguration,
  root: __dirname,
});
