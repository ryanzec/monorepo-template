import { test, expect } from '@playwright/test';

const urls = {
  standard: '/iframe.html?args=&id=packages-components-applicationloading--standard&viewMode=story',
};

const locators = {
  applicationLoading: '[data-id="application-loading"]',
};

test.describe('application loading component', () => {
  test('works @component', async ({ page }) => {
    await page.goto(urls.standard);

    await expect(page.locator(locators.applicationLoading)).toBeVisible();
  });
});
