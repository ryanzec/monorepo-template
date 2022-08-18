import { expect, test } from '@playwright/test';

import { playwrightUtils } from '$/utils/playwright';

const urls = {
  standard: '/iframe.html?args=&id=packages-views-complexformview--standard&viewMode=story',
};

const locators = {
  todoEmptyState: '[data-id="complex-form-view"] [data-id="todos"] [data-id="empty-state"]',
  todoItems: '[data-id="complex-form-view"] [data-id="todos"] [data-id="item"]',
  todoCompletedEmptyState: '[data-id="complex-form-view"] [data-id="todos-completed"] [data-id="empty-state"]',
  todoCompletedItems: '[data-id="complex-form-view"] [data-id="todos-completed"] [data-id="item"]',
};

test.describe('complex form view', () => {
  test('drag and drop items @component', async ({ page }) => {
    await page.goto(urls.standard);

    await expect(page.locator(locators.todoEmptyState)).toHaveCount(0);
    await expect(page.locator(locators.todoItems)).toHaveCount(2);
    await expect(page.locator(locators.todoCompletedEmptyState)).toHaveCount(1);
    await expect(page.locator(locators.todoCompletedItems)).toHaveCount(0);

    let dragLocator = page.locator(locators.todoItems).nth(0);
    let dropLocator = page.locator(locators.todoCompletedEmptyState).nth(0);

    await playwrightUtils.dragAndDrop({ page, dragLocator, dropLocator });

    await expect(page.locator(locators.todoEmptyState)).toHaveCount(0);
    await expect(page.locator(locators.todoItems)).toHaveCount(1);
    await expect(page.locator(locators.todoCompletedEmptyState)).toHaveCount(0);
    await expect(page.locator(locators.todoCompletedItems)).toHaveCount(1);

    dragLocator = page.locator(locators.todoItems).nth(0);
    dropLocator = page.locator(locators.todoCompletedItems).nth(0);

    await playwrightUtils.dragAndDrop({ page, dragLocator, dropLocator });

    await expect(page.locator(locators.todoEmptyState)).toHaveCount(1);
    await expect(page.locator(locators.todoItems)).toHaveCount(0);
    await expect(page.locator(locators.todoCompletedEmptyState)).toHaveCount(0);
    await expect(page.locator(locators.todoCompletedItems)).toHaveCount(2);
  });
});
