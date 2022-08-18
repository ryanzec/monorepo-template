import { test, expect } from '@playwright/test';

const urls = {
  standard: '/iframe.html?args=&id=packages-views-logoutview--standard&viewMode=story',
};

const locators = {
  logoutView: '[data-id="logout-view"]',
};

test.describe('logout view', () => {
  test('works @component', async ({ page }) => {
    await page.goto(urls.standard);

    await expect(page.locator(locators.logoutView)).toBeVisible();
  });
});
