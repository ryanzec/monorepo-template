import { zodResolver } from '@hookform/resolvers/zod';
import produce from 'immer';
import { forEach } from 'lodash';
import remove from 'lodash/remove';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import AutoComplete, { autoCompleteUtils } from '$/components/auto-complete';
import Button from '$/components/button';
import { cypressUtils } from '$/utils/cypress';
import { zodUtils } from '$/utils/zod';

interface SelectValue {
  display: string;
  value: number;
}

const BasicExample = ({ selectedItemIndex = -1, showItemsOnFocus = false, forceSelection = true }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null>(
    selectedItemIndex >= 0 ? items[selectedItemIndex] : null,
  );

  const onResetSelected = useCallback(() => {
    setSelectedItem(null);
  }, [setSelectedItem]);

  return (
    <>
      <AutoComplete
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems()}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelected(setSelectedItem)}
        selectedItem={selectedItem}
      />
      <Button data-id="reset-selected-button" onClick={onResetSelected}>
        reset selected
      </Button>
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.display}</div>
      )}
    </>
  );
};

interface ReactHookedFormData {
  value: number;
}

export const reactHookFormDataSchema = zodUtils.schemaForType<ReactHookedFormData>()(
  zod.object({
    value: zod.number().min(1, 'minimum value of 1'),
  }),
);

const BasicHookedExample = ({ selectedItemIndex = -1, showItemsOnFocus = false, forceSelection = true }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null>(
    selectedItemIndex >= 0 ? items[selectedItemIndex] : null,
  );
  const { control, setValue, getValues } = useForm<ReactHookedFormData>({
    resolver: zodResolver(reactHookFormDataSchema),
    defaultValues: {
      value: selectedItem?.value || undefined,
    },
  });

  const formValues = getValues();

  return (
    <>
      <AutoComplete.Hooked
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        name="value"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        control={control}
        items={items}
        setValue={setValue}
      />
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.display}</div>
      )}
      {formValues.value && <div data-id="check-form-value">form value: {formValues.value}</div>}
    </>
  );
};

const MultiSelectExample = ({ selectedItemIndex = -1, showItemsOnFocus = false, forceSelection = true }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>(
    selectedItemIndex < 0 ? [] : [items[selectedItemIndex]],
  );

  const onDeleteSelectedItem = useCallback(
    (value: number) => {
      setSelectedItems(
        produce(selectedItems, (draftState) => {
          remove(draftState, { value });
        }),
      );
    },
    [selectedItems, setSelectedItems],
  );

  return (
    <>
      <AutoComplete
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems(selectedItems)}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelectedMulti(selectedItems, setSelectedItems)}
        selectedItems={selectedItems}
        onDelete={onDeleteSelectedItem}
      />
    </>
  );
};

interface MultiReactHookedFormData {
  values: number[];
}

const MultiSelectHookedExample = ({ selectedItemIndex = -1, showItemsOnFocus = false, forceSelection = true }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>(
    selectedItemIndex < 0 ? [] : [items[selectedItemIndex]],
  );

  const { control, getValues, setValue } = useForm<MultiReactHookedFormData>({
    resolver: zodResolver(reactHookFormDataSchema),
    defaultValues: {
      values: [],
    },
  });

  const onDeleteSelectedItem = useCallback(
    (value: number) => {
      setSelectedItems(
        produce(selectedItems, (draftState) => {
          remove(draftState, { value });
        }),
      );
    },
    [selectedItems, setSelectedItems],
  );

  const formValues = getValues();

  return (
    <>
      <AutoComplete.Hooked
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        name="values"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        control={control}
        items={items}
        setValue={setValue}
        onDelete={onDeleteSelectedItem}
      />
      {formValues.values && <div data-id="check-form-value">form value: {formValues.values.join(',')}</div>}
    </>
  );
};

const selectors = {
  resetSelectedButton: '[data-id="reset-selected-button"]',
  autoCompleteInput: '[data-id="auto-complete"] [data-id="input"]',
  autoCompleteItems: '[data-id="auto-complete"] [data-id="items"] [data-id*="item"]',
  firstAutoCompleteItem: '[data-id="auto-complete"] [data-id="items"] [data-id*="item"]:nth-child(1)',
  autoCompleteHighlightedItem: '[data-id="auto-complete"] [data-id="items"] [data-id*="highlighted-item"]',
  checkSelectedAutoCompleteValue: '[data-id="check-selected-auto-complete-value"]',
  checkFormValue: '[data-id="check-form-value"]',
  selectedItems: '[data-id="auto-complete"] [data-id="selected-item"]',
  selectedItemDeleteButtons: '[data-id="auto-complete"] [data-id="selected-item"]',
  secondSelectedItemDeleteButton: '[data-id="auto-complete"] [data-id="selected-item"]:nth-child(2) [data-id="button"]',
};

const testSelectedValue = (checkValue: string, isMultiSelect = false) => {
  if (isMultiSelect) {
    cy.get(selectors.selectedItems).should('contain', checkValue);

    return;
  }

  cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', checkValue);
};

const testNoSelectedValue = (isMultiSelect = false) => {
  if (isMultiSelect) {
    cy.get(selectors.selectedItems).should('not.exist');

    return;
  }
  cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
};

type TestComponentType = (props: any) => JSX.Element;

// since there are numerous test that need to be tested multiple time, we are storing testing in an object to be
// re-usable
const singleSelectTestCases: { [key: string]: (TestComponent: TestComponentType, isMultiMode?: boolean) => void } = {
  'focusing the input should not show the list when not configured': (
    TestComponent: TestComponentType,
    isMultiMode = false,
  ) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();

    cy.get(selectors.autoCompleteItems).should('not.exist');
  },
  'focusing the input shows the list when configured': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent showItemsOnFocus />));

    cy.get(selectors.autoCompleteInput).click();

    cy.get(selectors.autoCompleteItems).should('have.length', 4);
  },
  'typing filters the list': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('1');

    cy.get(selectors.autoCompleteItems).should('have.length', 1);
    cy.get(selectors.autoCompleteHighlightedItem).should('not.exist');
  },
  'using keyboard highlights item': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');

    cy.get(selectors.autoCompleteHighlightedItem).should('contain', 'test2');
  },
  'using mouse highlights item': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.firstAutoCompleteItem).trigger('mousemove');

    cy.get(selectors.autoCompleteHighlightedItem).should('contain', 'test1');
  },
  'selecting an item hides the list': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');

    cy.get(selectors.autoCompleteInput).should('be.focused');
    cy.get(selectors.autoCompleteItems).should('not.exist');
  },
  'the escape key hides the list': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).type('{esc}');

    // multi select mode requires a second escape press if there is a value in the input on the first one
    if (isMultiMode) {
      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.autoCompleteItems).should('exist');

      cy.get(selectors.autoCompleteInput).type('{esc}');
    }

    // @todo(!!!) need to figure this out
    // cy.get(selectors.autoCompleteInput).should('not.be.focused');
    cy.get(selectors.autoCompleteItems).should('not.exist');
  },
  'preselecting works': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent selectedItemIndex={0} />));

    if (!isMultiMode) {
      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
    }

    testSelectedValue('test1', isMultiMode);
  },
  'escape clears selection': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent selectedItemIndex={1} />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{esc}');

    cy.get(selectors.autoCompleteInput).should('have.value', '');

    if (!isMultiMode) {
      testNoSelectedValue();
    }
  },
  'tab hides the list': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).realPress('Tab');

    cy.get(selectors.autoCompleteInput).should('not.be.focused');
    cy.get(selectors.autoCompleteItems).should('not.exist');
  },
  'tab with nothing selected does nothing': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).realPress('Tab');

    cy.get(selectors.autoCompleteInput).should('have.value', '');
    testNoSelectedValue(isMultiMode);
  },
  'tab with selection should select that item': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).realPress('Tab');

    cy.get(selectors.autoCompleteInput).should('have.value', isMultiMode ? '' : 'test1');
    testSelectedValue('test1', isMultiMode);
  },
  'blurring hides the list': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).blur();

    cy.get(selectors.autoCompleteInput).should('not.be.focused');
    cy.get(selectors.autoCompleteItems).should('not.exist');
  },
  'blurring with input value and nothing selected does nothing with force selection': (
    TestComponent: TestComponentType,
    isMultiMode = false,
  ) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).blur();

    cy.get(selectors.autoCompleteInput).should('have.value', '');
    testNoSelectedValue(isMultiMode);
  },
  'blurring with input value and nothing selected uses input value without force selection': (
    TestComponent: TestComponentType,
    isMultiMode = false,
  ) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent forceSelection={false} />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('testing new value');
    cy.get(selectors.autoCompleteInput).blur();

    cy.get(selectors.autoCompleteInput).should('have.value', isMultiMode ? '' : 'testing new value');
    testSelectedValue('testing new value', isMultiMode);
  },
  'blurring with selection should do nothing': (TestComponent: TestComponentType, isMultiMode = false) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('t');
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).blur();

    cy.get(selectors.autoCompleteInput).should('have.value', '');
    testSelectedValue('', isMultiMode);
  },
  'blurring with nothing selected but with previously selected value should keep previous value': (
    TestComponent: TestComponentType,
    isMultiMode = false,
  ) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent selectedItemIndex={0} />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{backspace}');
    cy.get(selectors.autoCompleteInput).blur();

    cy.get(selectors.autoCompleteInput).should('have.value', isMultiMode ? '' : 'test1');
    testSelectedValue('test1', isMultiMode);
  },
  'blurring with nothing selected but with previously selected value should keep previous value with show items on focused enabled':
    (TestComponent: TestComponentType, isMultiMode = false) => {
      cy.mount(cypressUtils.addBasicWrapper(<TestComponent showItemsOnFocus />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.firstAutoCompleteItem).click();
      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{backspace}');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', isMultiMode ? '' : 'test1');
      testSelectedValue('test1', isMultiMode);
    },
};

const multiSelectTestCases: { [key: string]: (TestComponent: TestComponentType) => void } = {
  'does not show previously selected items': (TestComponent: TestComponentType) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');
    cy.get(selectors.autoCompleteInput).type('{downArrow}');

    cy.get(selectors.autoCompleteItems).should('have.length', 3);
    cy.get(selectors.autoCompleteItems).should('not.contain', 'test1');
  },
  'can selected multiple items': (TestComponent: TestComponentType) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');

    cy.get(selectors.selectedItemDeleteButtons).should('have.length', 2);
    cy.get(selectors.selectedItems).should('have.length', 2);
    cy.get(selectors.selectedItems).should('contain', 'test1');
    cy.get(selectors.selectedItems).should('contain', 'test2');
  },
  'delete selected item works': (TestComponent: TestComponentType) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');
    cy.get(selectors.secondSelectedItemDeleteButton).click();

    cy.get(selectors.selectedItemDeleteButtons).should('have.length', 1);
    cy.get(selectors.selectedItems).should('have.length', 1);
    cy.get(selectors.selectedItems).should('contain', 'test1');
  },
  'delete selected item shows back in list': (TestComponent: TestComponentType) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');
    cy.get(selectors.secondSelectedItemDeleteButton).click();
    cy.get(selectors.autoCompleteInput).type('t');

    // validate the deleted selected item now shows up in the auto complete again
    cy.get(selectors.autoCompleteItems).should('have.length', 3);
    cy.get(selectors.autoCompleteItems).should('contain', 'test2');
  },
  'available items remain shown after selecting item with clicking when configured': (
    TestComponent: TestComponentType,
  ) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent showItemsOnFocus />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.firstAutoCompleteItem).click();

    cy.get(selectors.autoCompleteItems).should('be.visible');
    cy.get(selectors.autoCompleteItems).should('have.length', 3);
  },
  'available items remain shown after selecting item with enter when configured': (
    TestComponent: TestComponentType,
  ) => {
    cy.mount(cypressUtils.addBasicWrapper(<TestComponent showItemsOnFocus />));

    cy.get(selectors.autoCompleteInput).click();
    cy.get(selectors.autoCompleteInput).type('{downArrow}');
    cy.get(selectors.autoCompleteInput).type('{enter}');

    cy.get(selectors.autoCompleteItems).should('be.visible');
    cy.get(selectors.autoCompleteItems).should('have.length', 3);
  },
};

const buildSingleSelectTestCases = (TestComponent: TestComponentType) => {
  Object.keys(singleSelectTestCases).forEach((testName: string) => {
    it(testName, () => {
      singleSelectTestCases[testName](TestComponent);
    });
  });
};

const buildMultiSelectTestCases = (TestComponent: TestComponentType) => {
  Object.keys(singleSelectTestCases).forEach((testName: string) => {
    it(testName, () => {
      singleSelectTestCases[testName](TestComponent, true);
    });
  });

  Object.keys(multiSelectTestCases).forEach((testName: string) => {
    it(testName, () => {
      multiSelectTestCases[testName](TestComponent);
    });
  });
};

describe('auto complete component', () => {
  // any test added here should also be done in the `with react hook form integration` describe block as it is a
  // different component wrapping the main one
  describe('basic functionality', () => {
    buildSingleSelectTestCases(BasicExample);

    // this should have all tests from `basic functionality` with the addition so testing the form values when needed
    // as this uses a component the wraps the main one
    describe('with react hook form integration', () => {
      // buildSingleSelectTestCases(BasicHookedExample);
    });
  });

  // any test added here should also be done in the `with react hook form integration` describe block as it is a
  // different component wrapping the main one
  describe('multi select', () => {
    buildMultiSelectTestCases(MultiSelectExample);

    describe('with react hook form integration', () => {
      // buildMultiSelectTestCases(MultiSelectExample);
    });
  });
});
