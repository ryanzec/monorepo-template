import { test, expect } from '@playwright/test';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  standard: '/iframe.html?args=&id=packages-components-label--standard&viewMode=story',
};

const locators = {
  label: '[data-id="label"]',
};

test.describe('label component', () => {
  test('works @component', async ({ page }) => {
    await page.goto(urls.standard);

    await playwrightUtils.toHaveExactText(page.locator(locators.label), 'label');
  });
});
