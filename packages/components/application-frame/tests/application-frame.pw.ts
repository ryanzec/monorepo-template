import { test, expect } from '@playwright/test';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  unauthenticated: '/iframe.html?args=&id=packages-components-applicationframe--unauthenticated&viewMode=story',
  authenticated: '/iframe.html?args=&id=packages-components-applicationframe--authenticated&viewMode=story',
};

const locators = {
  applicationFrame: '[data-id="application-frame"]',
  pathname: '[data-id="application-frame"] [data-id="pathname"]',
  logoutClicked: '[data-id="application-frame"] [data-id="logout-clicked"]',
  toggleTheme: '[data-id="application-frame"] [data-id="toggle-theme"]',
  logout: '[data-id="application-frame"] [data-id="logout"]',
  navigationItem: '[data-id="application-frame"] [data-id="navigation"] [data-id="item"]',
};

test.describe('application frame', () => {
  test('unauthenticated works @component', async ({ page }) => {
    await page.goto(urls.unauthenticated);

    await expect(page.locator(locators.applicationFrame)).not.toBeVisible();
  });

  test('authenticated works @component', async ({ page }) => {
    await page.goto(urls.authenticated);

    await expect(page.locator(locators.applicationFrame)).toBeVisible();
  });

  test('can toggle theme @component', async ({ page }) => {
    await page.goto(urls.authenticated);

    await expect(page.locator(locators.toggleTheme, { hasText: 'current: light' })).toBeVisible();
    await expect(page.locator(locators.toggleTheme, { hasText: 'current: dark' })).not.toBeVisible();

    await page.locator(locators.toggleTheme).click();

    await expect(page.locator(locators.toggleTheme, { hasText: 'current: light' })).not.toBeVisible();
    await expect(page.locator(locators.toggleTheme, { hasText: 'current: dark' })).toBeVisible();
  });

  test('can logout @component', async ({ page }) => {
    await page.goto(urls.authenticated);

    await expect(page.locator(locators.logoutClicked)).not.toBeVisible();

    await page.locator(locators.logout).click();

    await expect(page.locator(locators.logoutClicked)).toBeVisible();
  });

  test('navigation works @component', async ({ page }) => {
    await page.goto(urls.authenticated);

    await playwrightUtils.toHaveExactText(page.locator(locators.pathname), '/');

    await page.locator(locators.navigationItem).nth(1).click();

    await playwrightUtils.toHaveExactText(page.locator(locators.pathname), '/complex-form');

    await page.locator(locators.navigationItem).nth(0).click();

    await playwrightUtils.toHaveExactText(page.locator(locators.pathname), '/');
  });
});
