import { defineConfig } from 'vite';
import IstanbulPlugin from 'vite-plugin-istanbul';
import { viteUtils } from '../../vite-utils';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteUtils.baseConfiguration,
  plugins: [...viteUtils.baseConfiguration.plugins, IstanbulPlugin()],
});
