import { test, expect } from '@playwright/test';

const urls = {
  authenticated: '/iframe.html?args=&id=packages-components-applicationrouting--authenticated&viewMode=story',
  authenticatedRedirect:
    '/iframe.html?args=&id=packages-components-applicationrouting--authenticated-redirect&viewMode=story',
  unauthenticatedRedirect:
    '/iframe.html?args=&id=packages-components-applicationrouting--unauthenticated-redirect&viewMode=story',
};

const locators = {
  defaultRoute: '[data-id="default-route"]',
  loginRoute: '[data-id="login-route"]',
  homeRoute: '[data-id="home-route"]',
};

test.describe('application routing', () => {
  test('authenticated @component', async ({ page }) => {
    await page.goto(urls.authenticated);

    await expect(page.locator(locators.defaultRoute)).toBeVisible();
    await expect(page.locator(locators.loginRoute)).not.toBeVisible();
    await expect(page.locator(locators.homeRoute)).not.toBeVisible();
  });

  test('authenticated redirect @component', async ({ page }) => {
    await page.goto(urls.authenticatedRedirect);

    await expect(page.locator(locators.defaultRoute)).not.toBeVisible();
    await expect(page.locator(locators.loginRoute)).not.toBeVisible();
    await expect(page.locator(locators.homeRoute)).toBeVisible();
  });

  test('unauthenticated redirect @component', async ({ page }) => {
    await page.goto(urls.unauthenticatedRedirect);

    await expect(page.locator(locators.defaultRoute)).not.toBeVisible();
    await expect(page.locator(locators.loginRoute)).toBeVisible();
    await expect(page.locator(locators.homeRoute)).not.toBeVisible();
  });
});
