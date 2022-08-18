import { test, expect } from '@playwright/test';

const urls = {
  light: '/iframe.html?args=&id=packages-components-applicationwrapper--light&viewMode=story',
  dark: '/iframe.html?args=&id=packages-components-applicationwrapper--dark&viewMode=story',
};

const locators = {
  applicationWrapper: '[data-id="application-wrapper"]',
};

test.describe('application wrapper component', () => {
  test('light theme @component', async ({ page }) => {
    await page.goto(urls.light);

    await expect(page.locator(locators.applicationWrapper)).toHaveAttribute('data-theme', 'light');
  });

  test('dark theme @component', async ({ page }) => {
    await page.goto(urls.dark);

    await expect(page.locator(locators.applicationWrapper)).toHaveAttribute('data-theme', 'dark');
  });
});
