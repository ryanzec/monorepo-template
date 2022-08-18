import { test, expect, Page } from '@playwright/test';
import React from 'react';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  standard: '/iframe.html?args=&id=packages-views-homeview--standard&viewMode=story',
};

const locators = {
  toggleTestApiTrigger: '[data-id="toggle-test-api"]',
  testApiTrigger: '[data-id="test-api"]',
  loadedUsers: '[data-id="loaded-users"]',
};

test.describe('home view', () => {
  test('disable test api button works @component', async ({ page }) => {
    await page.goto(urls.standard);

    await expect(page.locator(locators.testApiTrigger)).not.toBeDisabled();

    await page.locator(locators.toggleTestApiTrigger).click();

    await expect(page.locator(locators.testApiTrigger)).toBeDisabled();
  });

  test('test api works @component', async ({ page }) => {
    await playwrightUtils.mockApi(page, 'http://localhost:6006/api/users', {
      users: [{ name: 'test user' }],
    });

    await page.goto(urls.standard);

    await expect(page.locator(locators.loadedUsers)).not.toBeVisible();

    await page.locator(locators.testApiTrigger).click();

    await expect(page.locator(locators.loadedUsers, { hasText: 'test user' })).toBeVisible();
  });
});
