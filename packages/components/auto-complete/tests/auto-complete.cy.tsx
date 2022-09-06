import { zodResolver } from '@hookform/resolvers/zod';
import produce from 'immer';
import remove from 'lodash/remove';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import AutoComplete from '$/components/auto-complete';
import Button from '$/components/button';
import { autoCompleteUtils } from '$/utils/auto-complete';
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
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
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
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
      )}
      {formValues.value && <div data-id="check-form-value">form value: {formValues.value}</div>}
    </>
  );
};

const MultiSelectExample = ({ showItemsOnFocus = false, forceSelection = true }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>([]);

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

const MultiSelectHookedExample = ({ showItemsOnFocus = false, forceSelection = true }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>([]);

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
  checkMultipleSelectedAutoCompleteValues: '[data-id="auto-complete"] [data-id="selected-items"]',
  checkFormValue: '[data-id="check-form-value"]',
  selectedItems: '[data-id="auto-complete"] [data-id="selected-item"]',
  selectedItemDeleteButtons: '[data-id="auto-complete"] [data-id="selected-item"]',
  secondSelectedItemDeleteButton: '[data-id="auto-complete"] [data-id="selected-item"]:nth-child(2) [data-id="button"]',
};

describe('auto complete component', () => {
  // any test added here should also be done in the `with react hook form integration` describe block as it is a
  // different component wrapping the main one
  describe('basic functionality', () => {
    it('focusing the input should not show the list when not configured', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();

      cy.get(selectors.autoCompleteItems).should('not.exist');
    });

    it('focusing the input shows the list when configured', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample showItemsOnFocus />));

      cy.get(selectors.autoCompleteInput).click();

      cy.get(selectors.autoCompleteItems).should('have.length', 4);
    });

    it('typing filters the list', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('1');

      cy.get(selectors.autoCompleteItems).should('have.length', 1);
      cy.get(selectors.autoCompleteHighlightedItem).should('not.exist');
    });

    it('using keyboard highlights item', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');

      cy.get(selectors.autoCompleteHighlightedItem).should('contain', 'test2');
    });

    it('using mouse highlights item', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.firstAutoCompleteItem).trigger('mousemove');

      cy.get(selectors.autoCompleteHighlightedItem).should('contain', 'test1');
    });

    it('enter selects highlighted item', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteInput).should('have.value', 'test2');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '22');
    });

    it('selecting an item hides the list', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteInput).should('be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
    });

    it('the escape key hides the list', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{esc}');

      // @todo(!!!) need to figure this out
      // cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
    });

    it('preselecting works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample selectedItemIndex={0} />));

      cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
    });

    it('escape clears selection', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample selectedItemIndex={1} />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{esc}');

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
    });

    it('tab hides the list', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).realPress('Tab');

      cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
    });

    it('tab with nothing selected does nothing', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).realPress('Tab');

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
    });

    it('tab with selection should select that item', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).realPress('Tab');

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
    });

    it('blurring hides the list', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
    });

    it('blurring with input value and nothing selected does nothing with force selection', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
    });

    it('blurring with input value and nothing selected uses input value without force selection', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample forceSelection={false} />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('testing new value');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', 'testing new value');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', 'testing new value');
    });

    it('blurring with selection should select that item', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
    });

    it('blurring with nothing selected but with previously selected value should keep previous value', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample selectedItemIndex={0} />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{backspace}');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
    });

    // this should have all tests from `basic functionality` with the addition so testing the form values when needed
    // as this uses a component the wraps the main one
    describe('with react hook form integration', () => {
      it('focusing the input should not show the list when not configured', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

        cy.get(selectors.autoCompleteInput).click();

        cy.get(selectors.autoCompleteItems).should('not.exist');
      });

      it('focusing the input shows the list when configured', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicExample showItemsOnFocus />));

        cy.get(selectors.autoCompleteInput).click();

        cy.get(selectors.autoCompleteItems).should('have.length', 4);
      });

      it('typing filters the list', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('1');

        cy.get(selectors.autoCompleteItems).should('have.length', 1);
        cy.get(selectors.autoCompleteHighlightedItem).should('not.exist');
      });

      it('using keyboard highlights item', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');

        cy.get(selectors.autoCompleteHighlightedItem).should('contain', 'test2');
      });

      it('using mouse highlights item', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.firstAutoCompleteItem).trigger('mousemove');

        cy.get(selectors.autoCompleteHighlightedItem).should('contain', 'test1');
      });

      it('enter selects highlighted item', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');

        cy.get(selectors.autoCompleteInput).should('have.value', 'test2');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '22');
        cy.get(selectors.checkFormValue).should('contain', 'value: 22');
      });

      it('selecting an item hides the list', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');

        cy.get(selectors.autoCompleteInput).should('be.focused');
        cy.get(selectors.autoCompleteItems).should('not.exist');
      });

      it('the escape key hides the list', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).type('{esc}');

        // @todo(!!!) need to figure this out
        // cy.get(selectors.autoCompleteInput).should('not.be.focused');
        cy.get(selectors.autoCompleteItems).should('not.exist');
      });

      it('preselecting works', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample selectedItemIndex={0} />));

        cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
        cy.get(selectors.checkFormValue).should('contain', 'value: 11');
      });

      it('escape clears selection', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample selectedItemIndex={1} />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('{esc}');

        cy.get(selectors.autoCompleteInput).should('have.value', '');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
        cy.get(selectors.checkFormValue).should('not.exist');
      });

      it('tab hides the list', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).realPress('Tab');

        cy.get(selectors.autoCompleteInput).should('not.be.focused');
        cy.get(selectors.autoCompleteItems).should('not.exist');
      });

      it('tab with nothing selected does nothing', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).realPress('Tab');

        cy.get(selectors.autoCompleteInput).should('have.value', '');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
        cy.get(selectors.checkFormValue).should('not.exist');
      });

      it('tab with selection should select that item', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).realPress('Tab');

        cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
        cy.get(selectors.checkFormValue).should('contain', 'value: 11');
      });

      it('blurring hides the list', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).blur();

        cy.get(selectors.autoCompleteInput).should('not.be.focused');
        cy.get(selectors.autoCompleteItems).should('not.exist');
      });

      it('blurring with input value and nothing selected does nothing with force selection', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).blur();

        cy.get(selectors.autoCompleteInput).should('have.value', '');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
        cy.get(selectors.checkFormValue).should('not.exist');
      });

      it('blurring with input value and nothing selected uses input value without force selection', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample forceSelection={false} />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('testing new value');
        cy.get(selectors.autoCompleteInput).blur();

        cy.get(selectors.autoCompleteInput).should('have.value', 'testing new value');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', 'testing new value');
      });

      it('blurring with selection should select that item', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('t');
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).blur();

        cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
        cy.get(selectors.checkFormValue).should('contain', 'value: 11');
      });

      it('blurring with nothing selected but with previously selected value should keep previous value', () => {
        cy.mount(cypressUtils.addBasicWrapper(<BasicHookedExample selectedItemIndex={0} />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('{backspace}');
        cy.get(selectors.autoCompleteInput).blur();

        cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
        cy.get(selectors.checkSelectedAutoCompleteValue).should('contain', '11');
        cy.get(selectors.checkFormValue).should('contain', 'value: 11');
      });
    });
  });

  // any test added here should also be done in the `with react hook form integration` describe block as it is a
  // different component wrapping the main one
  describe('multi select', () => {
    it('does not show previously selected items', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteItems).should('have.length', 3);
      cy.get(selectors.autoCompleteItems).should('not.contain', 'test1');
    });

    it('can selected multiple items', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.selectedItemDeleteButtons).should('have.length', 2);
      cy.get(selectors.selectedItems).should('have.length', 2);
      cy.get(selectors.checkMultipleSelectedAutoCompleteValues).should('contain', 'test1');
      cy.get(selectors.checkMultipleSelectedAutoCompleteValues).should('contain', 'test2');
    });

    it('delete selected item works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');
      cy.get(selectors.secondSelectedItemDeleteButton).click();

      cy.get(selectors.selectedItemDeleteButtons).should('have.length', 1);
      cy.get(selectors.selectedItems).should('have.length', 1);
      cy.get(selectors.checkMultipleSelectedAutoCompleteValues).should('contain', 'test1');
    });

    it('delete selected item shows back in list', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample />));

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
    });

    it('available items remain shown after selecting item with clicking when configured', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample showItemsOnFocus />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.firstAutoCompleteItem).click();

      cy.get(selectors.autoCompleteItems).should('be.visible');
      cy.get(selectors.autoCompleteItems).should('have.length', 3);
    });

    it('available items remain shown after selecting item with enter when configured', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample showItemsOnFocus />));

      cy.get(selectors.autoCompleteInput).click();
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteItems).should('be.visible');
      cy.get(selectors.autoCompleteItems).should('have.length', 3);
    });

    describe('with react hook form integration', () => {
      it('does not show previously selected items', () => {
        cy.mount(cypressUtils.addBasicWrapper(<MultiSelectHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');

        cy.get(selectors.autoCompleteItems).should('have.length', 3);
        cy.get(selectors.autoCompleteItems).should('not.contain', 'test1');
      });

      it('can selected multiple items', () => {
        cy.mount(cypressUtils.addBasicWrapper(<MultiSelectHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');

        cy.get(selectors.selectedItemDeleteButtons).should('have.length', 2);
        cy.get(selectors.selectedItems).should('have.length', 2);
        cy.get(selectors.checkMultipleSelectedAutoCompleteValues).should('contain', 'test1');
        cy.get(selectors.checkMultipleSelectedAutoCompleteValues).should('contain', 'test2');
        cy.get(selectors.checkFormValue).should('contain', '11,22');
      });

      it('delete selected item works', () => {
        cy.mount(cypressUtils.addBasicWrapper(<MultiSelectHookedExample />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');
        cy.get(selectors.secondSelectedItemDeleteButton).click();

        cy.get(selectors.selectedItemDeleteButtons).should('have.length', 1);
        cy.get(selectors.selectedItems).should('have.length', 1);
        cy.get(selectors.checkMultipleSelectedAutoCompleteValues).should('contain', 'test1');
        cy.get(selectors.checkFormValue).should('contain', '11');
      });

      it('delete selected item shows back in list', () => {
        cy.mount(cypressUtils.addBasicWrapper(<MultiSelectHookedExample />));

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
      });

      it('available items remain shown after selecting item with clicking when configured', () => {
        cy.mount(cypressUtils.addBasicWrapper(<MultiSelectHookedExample showItemsOnFocus />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.firstAutoCompleteItem).click();

        cy.get(selectors.autoCompleteItems).should('be.visible');
        cy.get(selectors.autoCompleteItems).should('have.length', 3);
      });

      it('available items remain shown after selecting item with enter when configured', () => {
        cy.mount(cypressUtils.addBasicWrapper(<MultiSelectHookedExample showItemsOnFocus />));

        cy.get(selectors.autoCompleteInput).click();
        cy.get(selectors.autoCompleteInput).type('{downArrow}');
        cy.get(selectors.autoCompleteInput).type('{enter}');

        cy.get(selectors.autoCompleteItems).should('be.visible');
        cy.get(selectors.autoCompleteItems).should('have.length', 3);
      });
    });
  });
});
