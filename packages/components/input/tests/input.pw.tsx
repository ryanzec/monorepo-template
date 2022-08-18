import { test, expect } from '@playwright/test';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  plain: '/iframe.html?args=&id=packages-components-input--plain&viewMode=story',
  hooked: '/iframe.html?args=&id=packages-components-input--hooked&viewMode=story',
};

const locators = {
  input: '[data-id="input"]',
  hookedValue: '[data-id="hooked-value"]',
};

test.describe('input component', () => {
  test('plain @component', async ({ page }) => {
    await page.goto(urls.plain);

    await expect(page.locator(locators.input)).toBeVisible();
  });

  test('hooked @component', async ({ page }) => {
    await page.goto(urls.hooked);

    await page.locator(locators.input).fill('test');

    await playwrightUtils.toHaveExactText(page.locator(locators.hookedValue), 'test');
  });
});
