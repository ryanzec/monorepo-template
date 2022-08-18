import { test, expect } from '@playwright/test';

const urls = {
  error: '/iframe.html?args=&id=packages-components-errorboundary--error&viewMode=story',
  noError: '/iframe.html?args=&id=packages-components-errorboundary--no-error&viewMode=story',
};

const locators = {
  errorBoundary: '[data-id="error-boundary"]',
};

test.describe('error boundary component', () => {
  test('no error @component', async ({ page }) => {
    await page.goto(urls.noError);

    await expect(page.locator(locators.errorBoundary)).not.toBeVisible();
  });

  test('error @component', async ({ page }) => {
    await page.goto(urls.error);

    await expect(page.locator(locators.errorBoundary)).toBeVisible();
  });
});
