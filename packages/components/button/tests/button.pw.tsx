import { test, expect } from '@playwright/test';

const urls = {
  attachedGroup: '/iframe.html?args=&globals=&id=packages-components-button--attached-group&viewMode=story',
  unattachedGroup: '/iframe.html?args=&globals=&id=packages-components-button--unattached-group&viewMode=story',
  sizes: '/iframe.html?args=&globals=&id=packages-components-button--sizes&viewMode=story',
  icons: '/iframe.html?args=&globals=&id=packages-components-button--icons&viewMode=story',
  loading: '/iframe.html?args=&globals=&id=packages-components-button--loading&viewMode=story',
  contexts: '/iframe.html?args=&globals=&id=packages-components-button--contexts&viewMode=story',
  variants: '/iframe.html?args=&globals=&id=packages-components-button--variants&viewMode=story',
};

test.describe('button group', () => {
  test('attached @visual', async ({ page }) => {
    await page.goto(urls.attachedGroup);

    await expect(page).toHaveScreenshot();
  });

  test('unattached @visual', async ({ page }) => {
    await page.goto(urls.unattachedGroup);

    await expect(page).toHaveScreenshot();
  });
});

test.describe('button', () => {
  test('sizes @visual', async ({ page }) => {
    await page.goto(urls.sizes);

    await expect(page).toHaveScreenshot();
  });

  test('icons @visual', async ({ page }) => {
    await page.goto(urls.icons);

    await expect(page).toHaveScreenshot();
  });

  test('loading @visual', async ({ page }) => {
    await page.goto(urls.loading);

    await expect(page).toHaveScreenshot();
  });

  test('contexts @visual', async ({ page }) => {
    await page.goto(urls.contexts);

    await expect(page).toHaveScreenshot();
  });

  test('variants @visual', async ({ page }) => {
    await page.goto(urls.variants);

    await expect(page).toHaveScreenshot();
  });
});
