import { test, expect, Page } from '@playwright/test';
import React from 'react';

const urls = {
  single: '/iframe.html?args=&id=packages-components-autocomplete--single&viewMode=story',
  multi: '/iframe.html?args=&id=packages-components-autocomplete--multi&viewMode=story',
  singleHooked: '/iframe.html?args=&id=packages-components-autocomplete--single-hooked&viewMode=story',
  multiHooked: '/iframe.html?args=&id=packages-components-autocomplete--multi-hooked&viewMode=story',
  singlePreselected: '/iframe.html?args=&id=packages-components-autocomplete--single-preselected&viewMode=story',
  multiPreselected: '/iframe.html?args=&id=packages-components-autocomplete--multi-preselected&viewMode=story',
  singleHookedPreselected:
    '/iframe.html?args=&id=packages-components-autocomplete--multi-hooked-preselected&viewMode=story',
  multiHookedPreselected:
    '/iframe.html?args=&id=packages-components-autocomplete--single-hooked-preselected&viewMode=story',
  singleShowItemsOnFocus:
    '/iframe.html?args=&id=packages-components-autocomplete--single-show-items-on-focus&viewMode=story',
  multiShowItemsOnFocus:
    '/iframe.html?args=&id=packages-components-autocomplete--multi-show-items-on-focus&viewMode=story',
  singleHookedShowItemsOnFocus:
    '/iframe.html?args=&id=packages-components-autocomplete--single-hooked-show-items-on-focus&viewMode=story',
  multiHookedShowItemsOnFocus:
    '/iframe.html?args=&id=packages-components-autocomplete--multi-hooked-show-items-on-focus&viewMode=story',
  singleNoForceSelection:
    '/iframe.html?args=&id=packages-components-autocomplete--single-no-force-selection&viewMode=story',
  multiNoForceSelection:
    '/iframe.html?args=&id=packages-components-autocomplete--multi-no-force-selection&viewMode=story',
  singleHookedNoForceSelection:
    '/iframe.html?args=&id=packages-components-autocomplete--single-hooked-no-force-selection&viewMode=story',
  multiHookedNoForceSelection:
    '/iframe.html?args=&id=packages-components-autocomplete--multi-hooked-no-force-selection&viewMode=story',
  singlePlaceholder: '/iframe.html?args=&id=packages-components-autocomplete--single-placeholder&viewMode=story',
  multiPlaceholder: '/iframe.html?args=&id=packages-components-autocomplete--multi-placeholder&viewMode=story',
  singleHookedPlaceholder:
    '/iframe.html?args=&id=packages-components-autocomplete--single-hooked-placeholder&viewMode=story',
  multiHookedPlaceholder:
    '/iframe.html?args=&id=packages-components-autocomplete--multi-hooked-placeholder&viewMode=story',
  singleAsync: '/iframe.html?args=&id=packages-components-autocomplete--single-async&viewMode=story',
  multiAsync: '/iframe.html?args=&id=packages-components-autocomplete--multi-async&viewMode=story',
  singleHookedAsync: '/iframe.html?args=&id=packages-components-autocomplete--single-hooked-async&viewMode=story',
  multiHookedAsync: '/iframe.html?args=&id=packages-components-autocomplete--multi-hooked-async&viewMode=story',
};

const locators = {
  resetSelectedButton: '[data-id="reset-selected-button"]',
  autoCompleteInput: '[data-id="auto-complete"] [data-id="input"]',
  autoCompleteItemsContainer: '[data-id="auto-complete"] [data-id="items"]',
  autoCompleteItems: '[data-id="auto-complete"] [data-id="items"] [data-id="item"]',
  firstAutoCompleteItem: '[data-id="auto-complete"] [data-id="items"] [data-id*="item"]:nth-child(1)',
  autoCompleteHighlightedItem: '[data-id="auto-complete"] [data-id="items"] [data-id*="highlighted-item"]',
  checkSelectedAutoCompleteValue: '[data-id="check-selected-auto-complete-value"]',
  checkFormValue: '[data-id="check-form-value"]',
  selectedItems: '[data-id="auto-complete"] [data-id="selected-item"]',
  secondSelectedItemDeleteIndicator:
    '[data-id="auto-complete"] [data-id="selected-item"]:nth-child(2) [data-id="delete-indicator"]',
  asyncDataLoadingIndicator: '[data-id="auto-complete"] [data-id="async-data-loading"]',
};

const testSelectedValue = async (page: Page, checkValue: string, isMultiSelect: boolean, errorContext?: string) => {
  if (isMultiSelect) {
    await expect(page.locator(locators.selectedItems), errorContext).toContainText(checkValue);

    return;
  }

  await expect(page.locator(locators.checkSelectedAutoCompleteValue), errorContext).toContainText(checkValue);
};

const testNoSelectedValue = async (page: Page, isMultiSelect: boolean, errorContext?: string) => {
  if (isMultiSelect) {
    await expect(page.locator(locators.selectedItems), errorContext).toHaveCount(0);

    return;
  }

  await expect(page.locator(locators.checkSelectedAutoCompleteValue), errorContext).toHaveCount(0);
};

test.describe('auto complete', () => {
  test.describe('core functionality', () => {
    test('focusing the input should not show the list when not configured @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(0);
      }
    });

    test('focusing the input shows the list when configured @component', async ({ page }) => {
      const testUrls = [
        urls.singleShowItemsOnFocus,
        urls.singleHookedShowItemsOnFocus,
        urls.multiShowItemsOnFocus,
        urls.multiHookedShowItemsOnFocus,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(4);
      }
    });

    test('typing filters the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).fill('1');

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.autoCompleteHighlightedItem), loopErrorContext).toHaveCount(0);
      }
    });

    test('using keyboard highlights item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).fill('t');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');

        await expect(page.locator(locators.autoCompleteHighlightedItem), loopErrorContext).toHaveText('test2');
      }
    });

    test('using mouse highlights item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).fill('t');
        await page.locator(locators.firstAutoCompleteItem).hover();

        await expect(page.locator(locators.autoCompleteHighlightedItem), loopErrorContext).toHaveText('test1');
      }
    });

    test('selecting an item hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).fill('t');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(0);
      }
    });

    test('the escape key hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).fill('t');
        await page.locator(locators.autoCompleteInput).press('Escape');

        // @todo(!!!) need to figure this out
        // cy.get(selectors.autoCompleteInput).should('not.be.focused');
        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toBeHidden();
      }
    });

    test('the escape key works properly when showing items on focus @component', async ({ page }) => {
      const testUrls = [
        urls.singleShowItemsOnFocus,
        urls.singleHookedShowItemsOnFocus,
        urls.multiShowItemsOnFocus,
        urls.multiHookedShowItemsOnFocus,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).fill('t');
        await page.locator(locators.autoCompleteInput).press('Escape');

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe('');

        await expect(page.locator(locators.autoCompleteItemsContainer), loopErrorContext).toBeVisible();
        await page.locator(locators.autoCompleteInput).press('Escape');

        // @todo(!!!) need to figure this out
        // cy.get(selectors.autoCompleteInput).should('not.be.focused');
        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toBeHidden();
      }
    });

    test('preselection works @component', async ({ page }) => {
      const testUrls = [
        urls.singlePreselected,
        urls.singleHookedPreselected,
        urls.multiPreselected,
        urls.multiHookedPreselected,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        if (!isMultiMode) {
          expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe('test1');
        }

        await testSelectedValue(page, 'test1', isMultiMode);
      }
    });

    test('escape clears selection @component', async ({ page }) => {
      const testUrls = [
        urls.singlePreselected,
        urls.singleHookedPreselected,
        urls.multiPreselected,
        urls.multiHookedPreselected,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('Escape');

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe('');

        if (!isMultiMode) {
          await testNoSelectedValue(page, isMultiMode, loopErrorContext);
        }
      }
    });

    test('tab hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');
        await page.locator(locators.autoCompleteInput).press('Tab');

        await expect(page.locator(locators.autoCompleteInput), loopErrorContext).not.toBeFocused();
        await expect(page.locator(locators.autoCompleteItemsContainer), loopErrorContext).toBeHidden();
      }
    });

    test('tab with nothing selected does nothing @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');
        await page.locator(locators.autoCompleteInput).press('Tab');

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe('');

        await testNoSelectedValue(page, isMultiMode, loopErrorContext);
      }
    });

    test('tab with selection should select that item @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Tab');

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring hides the list @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');
        await page.locator(locators.autoCompleteInput).blur();

        await expect(page.locator(locators.autoCompleteInput), loopErrorContext).not.toBeFocused();
        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toBeHidden();
      }
    });

    test('blurring with input value and nothing selected does nothing with force selection @component', async ({
      page,
    }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');
        await page.locator(locators.autoCompleteInput).blur();

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe('');

        await testNoSelectedValue(page, isMultiMode, loopErrorContext);
      }
    });

    test('blurring with input value and nothing selected uses input value without force selection @component', async ({
      page,
    }) => {
      const testUrls = [
        urls.singleNoForceSelection,
        urls.singleHookedNoForceSelection,
        urls.multiNoForceSelection,
        urls.multiHookedNoForceSelection,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('testing new value');
        await page.locator(locators.autoCompleteInput).blur();

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'testing new value',
        );

        await testSelectedValue(page, 'testing new value', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with selection should select that value @component', async ({ page }) => {
      const testUrls = [urls.single, urls.singleHooked, urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).blur();

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value @component', async ({
      page,
    }) => {
      const testUrls = [
        urls.singlePreselected,
        urls.singleHookedPreselected,
        urls.multiPreselected,
        urls.multiHookedPreselected,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('Backspace');
        await page.locator(locators.autoCompleteInput).blur();

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('blurring with nothing selected but with previously selected value should keep previous value with show items on focused enabled @component', async ({
      page,
    }) => {
      const testUrls = [
        urls.singleShowItemsOnFocus,
        urls.singleHookedShowItemsOnFocus,
        urls.multiShowItemsOnFocus,
        urls.multiHookedShowItemsOnFocus,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');
        await page.locator(locators.firstAutoCompleteItem).click();
        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('Backspace');
        await page.locator(locators.autoCompleteInput).blur();

        expect(await page.locator(locators.autoCompleteInput).inputValue(), loopErrorContext).toBe(
          isMultiMode ? '' : 'test1',
        );

        await testSelectedValue(page, 'test1', isMultiMode, loopErrorContext);
      }
    });

    test('placeholder works @component', async ({ page }) => {
      const testUrls = [
        urls.singlePlaceholder,
        urls.singleHookedPlaceholder,
        urls.multiPlaceholder,
        urls.multiHookedPlaceholder,
      ];

      for (let i = 0; i < testUrls.length; i++) {
        const isMultiMode = testUrls[i].includes('--multi');
        const loopErrorContext = `failed url: ${testUrls[i]}${isMultiMode ? '(multi mode)' : ''}`;

        await page.goto(testUrls[i]);

        await expect(page.locator(locators.autoCompleteInput)).toHaveAttribute('placeholder', 'placeholder');
      }
    });
  });

  test.describe('multi-select mode', () => {
    test('does not show previously selected items @component', async ({ page }) => {
      const testUrls = [urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(0);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');

        await expect(page.locator(locators.autoCompleteItems, { hasText: 'test1' }), loopErrorContext).toHaveCount(0);
      }
    });

    test('can selected multiple items @component', async ({ page }) => {
      const testUrls = [urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(0);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');

        await expect(page.locator(locators.selectedItems), loopErrorContext).toHaveCount(2);
        await expect(page.locator(locators.selectedItems, { hasText: 'test1' }), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.selectedItems, { hasText: 'test2' }), loopErrorContext).toHaveCount(1);
      }
    });

    test('delete selected item works @component', async ({ page }) => {
      const testUrls = [urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(0);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');
        await page.locator(locators.secondSelectedItemDeleteIndicator).click();

        await expect(page.locator(locators.selectedItems), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.selectedItems, { hasText: 'test1' }), loopErrorContext).toHaveCount(1);
      }
    });

    test('delete selected item shows back in list @component', async ({ page }) => {
      const testUrls = [urls.multi, urls.multiHooked];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(0);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');
        await page.locator(locators.secondSelectedItemDeleteIndicator).click();
        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).type('t');

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(3);
        await expect(page.locator(locators.autoCompleteItems, { hasText: 'test2' }), loopErrorContext).toHaveCount(1);
      }
    });

    test('available items remain shown after selecting item with clicking when configured @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiShowItemsOnFocus, urls.multiHookedShowItemsOnFocus];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.firstAutoCompleteItem).click();

        await expect(page.locator(locators.autoCompleteItemsContainer), loopErrorContext).toBeVisible();
        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(3);
      }
    });

    test('available items remain shown after selecting item with enter when configured @component', async ({
      page,
    }) => {
      const testUrls = [urls.multiShowItemsOnFocus, urls.multiHookedShowItemsOnFocus];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('ArrowDown');
        await page.locator(locators.autoCompleteInput).press('Enter');

        await expect(page.locator(locators.autoCompleteItemsContainer), loopErrorContext).toBeVisible();
        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(3);
      }
    });
  });

  test.describe('async item retrieval', () => {
    test('works @component @slow', async ({ page }) => {
      // we need a higher timeout for this test because we are testing code that has a built-in delay of 1 second
      // for each iteration to test the async functionality
      test.setTimeout(30000);

      const testUrls = [urls.singleAsync, urls.singleHookedAsync, urls.multiAsync, urls.multiHookedAsync];

      for (let i = 0; i < testUrls.length; i++) {
        const loopErrorContext = `failed url: ${testUrls[i]}`;

        await page.goto(testUrls[i]);

        await page.locator(locators.autoCompleteInput).click();
        await page.locator(locators.autoCompleteInput).press('t');

        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(0);
        await expect(page.locator(locators.asyncDataLoadingIndicator), loopErrorContext).toHaveCount(1);
        await expect(page.locator(locators.autoCompleteItems), loopErrorContext).toHaveCount(4);
      }
    });
  });
});
