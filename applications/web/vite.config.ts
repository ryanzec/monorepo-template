import path from 'path';

import { defineConfig } from 'vite';

import { viteUtils } from '../../vite-utils';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteUtils.baseConfiguration,
  root: path.join(__dirname, 'src'),
});
