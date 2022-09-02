import { zodResolver } from '@hookform/resolvers/zod';
import produce from 'immer';
import remove from 'lodash/remove';
import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as zod from 'zod';

import AutoComplete from '$/components/auto-complete';
import { autoCompleteUtils } from '$/utils/auto-complete';
import { cypressUtils } from '$/utils/cypress';
import { zodUtils } from '$/utils/zod';

interface SelectValue {
  display: string;
  value: number;
}

const BasicExample = ({ selectedItemIndex = -1, showItemsOnFocus = false }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null | undefined>(
    selectedItemIndex >= 0 ? items[selectedItemIndex] : null,
  );

  return (
    <>
      <AutoComplete
        showItemsOnFocus={showItemsOnFocus}
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems()}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelected(setSelectedItem)}
        selectedItem={selectedItem}
      />
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

const ReactHookedExample = ({ selectedItemIndex = -1 }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null | undefined>(
    selectedItemIndex >= 0 ? items[selectedItemIndex] : null,
  );
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ReactHookedFormData>({
    resolver: zodResolver(reactHookFormDataSchema),
    defaultValues: {
      value: selectedItem?.value || undefined,
    },
  });

  const formValues = getValues();

  return (
    <>
      <AutoComplete.Hooked
        name="value"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        control={control}
        items={items}
        setValue={setValue}
      />
      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  name="value"*/}
      {/*  render={({ field }) => {*/}
      {/*    return (*/}
      {/*      <AutoComplete*/}
      {/*        items={items}*/}
      {/*        itemToString={(item) => item?.display ?? ''}*/}
      {/*        filterItems={autoCompleteUtils.buildFilterItems()}*/}
      {/*        renderItems={autoCompleteUtils.buildRenderItem()}*/}
      {/*        onItemSelected={autoCompleteUtils.buildItemSelectedHooked<*/}
      {/*          SelectValue | null | undefined,*/}
      {/*          ReactHookedFormData*/}
      {/*        >(setSelectedItem, field)}*/}
      {/*        selectedItem={selectedItem}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
      )}
      {formValues.value && <div data-id="check-form-value">form value: {formValues.value}</div>}
    </>
  );
};

const MultiSelectExample = () => {
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
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems(selectedItems)}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelectedMulti(selectedItems, setSelectedItems)}
        selectedItems={selectedItems}
      />
      {selectedItems && (
        <div data-id="check-selected-auto-complete-value">
          {selectedItems.map((selectedItem) => {
            return (
              <AutoComplete.SelectedItem
                key={selectedItem.value}
                display={selectedItem.display}
                value={selectedItem.value}
                onDelete={onDeleteSelectedItem}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

interface MultiReactHookedFormData {
  values: number[];
}

const MultiSelectHookedExample = () => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>([]);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<MultiReactHookedFormData>({
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

  return (
    <>
      <AutoComplete.Hooked
        name="values"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        control={control}
        items={items}
        setValue={setValue}
      />

      {selectedItems && (
        <div data-id="check-selected-auto-complete-value">
          {selectedItems.map((selectedItem) => {
            return (
              <AutoComplete.SelectedItem
                key={selectedItem.value}
                display={selectedItem.display}
                value={selectedItem.value}
                onDelete={onDeleteSelectedItem}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const selectors = {
  autoCompleteInput: '[data-id="auto-complete"] [data-id="input"]',
  autoCompleteItems: '[data-id="auto-complete"] [data-id="items"] [data-id*="item"]',
  autoCompleteHighlightedItem: '[data-id="auto-complete"] [data-id="items"] [data-id*="highlighted-item"]',
  checkSelectedAutoCompleteValue: '[data-id="check-selected-auto-complete-value"]',
  checkFormValue: '[data-id="check-form-value"]',
  selectedItems: '[data-id="check-selected-auto-complete-value"] [data-id="selected-item"]',
  secondSelectedItemDeleteButton:
    '[data-id="check-selected-auto-complete-value"] [data-id="selected-item"]:nth-child(2) [data-id="button"]',
};

describe('auto complete component', () => {
  describe('basic functionality', () => {
    it('enter works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).click();

      cy.get(selectors.autoCompleteInput).should('be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');

      cy.get(selectors.autoCompleteInput).type('t');

      cy.get(selectors.autoCompleteItems).should('have.length', 4);
      cy.get(selectors.autoCompleteHighlightedItem).should('not.exist');

      cy.get(selectors.autoCompleteInput).type('{downArrow}{downArrow}');

      cy.get(selectors.autoCompleteHighlightedItem).contains('test2');

      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteInput).should('have.value', 'test2');
      cy.get(selectors.autoCompleteInput).should('be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('22');
    });

    it('escape works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample selectedItemIndex={1} />));

      cy.get(selectors.autoCompleteInput).should('have.value', 'test2');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('22');

      cy.get(selectors.autoCompleteInput).type('{esc}');

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.autoCompleteInput).should('be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
    });

    it('tab with not selection works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).realPress('Tab');

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
    });

    it('blurring with no selection', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
    });

    it('blurring with selection', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');
    });

    it('blurring with no selection but with previously selected value', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample selectedItemIndex={0} />));

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');

      cy.get(selectors.autoCompleteInput).type('{backspace}');

      cy.get(selectors.autoCompleteInput).should('have.value', 'test');

      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');
    });

    it('tab with selection', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample />));

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).realPress('Tab');

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteInput).should('not.be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');
    });

    it('preselecting', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample selectedItemIndex={0} />));

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteInput).should('be.not.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');
    });

    it('show items on focus', () => {
      cy.mount(cypressUtils.addBasicWrapper(<BasicExample showItemsOnFocus />));

      cy.get(selectors.autoCompleteInput).focus();

      cy.get(selectors.autoCompleteItems).should('have.length', 4);
    });
  });

  describe('react hook form integration', () => {
    it('preselecting', () => {
      cy.mount(cypressUtils.addBasicWrapper(<ReactHookedExample selectedItemIndex={0} />));

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteInput).should('be.not.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');
      cy.get(selectors.checkFormValue).contains('11');
    });

    it('selecting', () => {
      cy.mount(cypressUtils.addBasicWrapper(<ReactHookedExample />));

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).blur();

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteInput).should('be.not.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');
      cy.get(selectors.checkFormValue).contains('11');
    });

    it('clearing', () => {
      cy.mount(cypressUtils.addBasicWrapper(<ReactHookedExample selectedItemIndex={0} />));

      cy.get(selectors.autoCompleteInput).type('{esc}');

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.autoCompleteInput).should('be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
      cy.get(selectors.checkFormValue).should('not.exist');
    });

    it('multi select works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectHookedExample />));

      cy.get(selectors.autoCompleteInput).click();

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteInput).type('t');

      // validate previously selected item is not visible
      cy.get(selectors.autoCompleteItems).should('have.length', 3);
      cy.get(selectors.autoCompleteItems).should('not.contain', 'test1');

      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      // validate items are selected
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('test1');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('test2');
    });
  });

  describe('multi select', () => {
    it('selecting multi items works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample />));

      cy.get(selectors.autoCompleteInput).click();

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteInput).type('t');

      // validate previously selected item is not visible
      cy.get(selectors.autoCompleteItems).should('have.length', 3);
      cy.get(selectors.autoCompleteItems).should('not.contain', 'test1');

      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      // validate items are selected
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('test1');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('test2');
    });

    it('delete selected item works', () => {
      cy.mount(cypressUtils.addBasicWrapper(<MultiSelectExample />));

      cy.get(selectors.autoCompleteInput).click();

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.autoCompleteInput).type('t');
      cy.get(selectors.autoCompleteInput).type('{downArrow}');
      cy.get(selectors.autoCompleteInput).type('{enter}');

      cy.get(selectors.secondSelectedItemDeleteButton).click();

      // validate the correct item was removed
      cy.get(selectors.selectedItems).should('have.length', 1);
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('test1');

      cy.get(selectors.autoCompleteInput).type('t');

      // validate the deleted selected item now shows up in the auto complete again
      cy.get(selectors.autoCompleteItems).should('have.length', 3);
      cy.get(selectors.autoCompleteItems).contains('test2');
    });
  });
});
