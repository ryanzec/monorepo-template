import { test, expect } from '@playwright/test';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  standard: '/iframe.html?args=&id=packages-components-validationmessage--standard&viewMode=story',
};

const locators = {
  validationMessage: '[data-id="validation-message"]',
};

test.describe('validation message component', () => {
  test('works @component', async ({ page }) => {
    await page.goto(urls.standard);

    await playwrightUtils.toHaveExactText(page.locator(locators.validationMessage), 'validation message');
  });
});
