import { defineConfig } from 'cypress';

import viteConfig from './applications/web/vite.cypress.config';

export default defineConfig({
  component: {
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      // this is just requires to support code coverage in cypress so ignoring
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
    specPattern: 'packages/**/*.cy.{js,ts,jsx,tsx}',
    excludeSpecPattern: ['cypress/**/1-getting-started/*.js', 'cypress/**/2-advanced-examples/*.js'],
  },
  video: false,
});
