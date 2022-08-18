import type { PlaywrightTestConfig } from '@playwright/test';

import { devices } from '@playwright/test';

import { viteUtils } from './vite-utils';

const DEV_SERVER_URL = 'http://localhost:6006/';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  grep: /@component/,
  testMatch: ['*.pw.ts', '*.pw.tsx'],
  testDir: './',
  snapshotDir: './__snapshots__',
  timeout: 15 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: 'list',
  use: {
    screenshot: process.env.CI ? 'off' : 'only-on-failure',

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    baseURL: DEV_SERVER_URL,
    viewport: { width: 1024, height: 768 },

    // not sure why this produces a typescript error but it does work so ignoring for now
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ctViteConfig: viteUtils.baseConfiguration,
  },
  webServer: {
    // since component testing does not seem to work as it has weird error in the way code is imported, we are
    // using storybook to be able to do component level like tests
    command: 'npm run storybook',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,

    // using url instead of port as it seems more reliable to assuring the dev server is running
    url: DEV_SERVER_URL,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    } /*,
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },*/,
  ],
};

export default config;
