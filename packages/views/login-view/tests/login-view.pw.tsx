import { test, expect, Page } from '@playwright/test';
import React from 'react';

const urls = {
  standard: '/iframe.html?args=&id=packages-views-loginview--standard&viewMode=story',
};

const locators = {
  loginTrigger: '[data-id="login-button"]',
  navigation: '[data-id="navigation"]',
  finishedLogin: '[data-id="finished-login"]',
};

test.describe('login view', () => {
  test('login without redirect @component', async ({ page }) => {
    await page.goto(urls.standard);

    await expect(page.locator(locators.navigation)).not.toBeVisible();
    await expect(page.locator(locators.finishedLogin)).not.toBeVisible();

    await page.locator(locators.loginTrigger).click();

    await expect(page.locator(locators.navigation)).toBeVisible();
    await expect(page.locator(locators.finishedLogin)).not.toBeVisible();
  });
});
