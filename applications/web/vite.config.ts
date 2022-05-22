import { defineConfig } from 'vite';
import { viteUtils } from '../../vite-utils';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteUtils.baseConfiguration,
  root: path.join(__dirname, 'src'),
});
