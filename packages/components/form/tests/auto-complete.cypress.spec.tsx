import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as zod from 'zod';

import Form from '$/components/form/form';
import { cypressUtils } from '$/utils/cypress';
import { zodUtils } from '$/utils/zod';

interface SelectValue {
  display: string;
  value: number;
}

const BasicExample = ({ selectedItemIndex = -1 }) => {
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
      <Form.AutoComplete
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={({ items, inputValue }) => {
          return items.filter((item) => item?.display.toLowerCase().includes(inputValue?.toLowerCase() ?? ''));
        }}
        renderItems={({ items, highlightedIndex, propGetters: { getItemProps } }) => {
          return items.map((item, index) => (
            <li
              data-id={`item${highlightedIndex === index ? ' highlighted-item' : ''}`}
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={`${item?.display}${index}`}
              {...getItemProps({ item, index })}
            >
              {item?.display}
            </li>
          ));
        }}
        onItemSelected={(selectedItem) => setSelectedItem(selectedItem)}
        selectedItem={selectedItem}
      />
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
      )}
    </>
  );
};

interface ReactHookFormData {
  value: number;
}

export const reactHookFormDataSchema = zodUtils.schemaForType<ReactHookFormData>()(
  zod.object({
    value: zod.number().min(1, 'minimum value of 1'),
  }),
);

interface BasicExampleProps {
  selectedItemIndex: number;
}

const ReactHookExample = ({ selectedItemIndex = -1 }) => {
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
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ReactHookFormData>({
    resolver: zodResolver(reactHookFormDataSchema),
    defaultValues: {
      value: selectedItem?.value || undefined,
    },
  });

  const formValues = getValues();

  return (
    <>
      <Controller
        control={control}
        name="value"
        render={({ field }) => {
          return (
            <Form.AutoComplete
              items={items}
              itemToString={(item) => item?.display ?? ''}
              filterItems={({ items, inputValue }) => {
                return items.filter((item) => item?.display.toLowerCase().includes(inputValue?.toLowerCase() ?? ''));
              }}
              renderItems={({ items, highlightedIndex, propGetters: { getItemProps } }) => {
                return items.map((item, index) => (
                  <li
                    data-id={`item${highlightedIndex === index ? ' highlighted-item' : ''}`}
                    style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                    key={`${item?.display}${index}`}
                    {...getItemProps({ item, index })}
                  >
                    {item?.display}
                  </li>
                ));
              }}
              onItemSelected={(selectedItem) => {
                field.onChange(selectedItem?.value || undefined);
                setSelectedItem(selectedItem);
              }}
              selectedItem={selectedItem}
            />
          );
        }}
      />
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
      )}
      {formValues.value && <div data-id="check-form-value">form value: {formValues.value}</div>}
    </>
  );
};

const selectors = {
  autoCompleteInput: '[data-id="auto-complete"] [data-id="input"]',
  autoCompleteItems: '[data-id="auto-complete"] [data-id="items"] [data-id*="item"]',
  autoCompleteHighlightedItem: '[data-id="auto-complete"] [data-id="items"] [data-id*="highlighted-item"]',
  checkSelectedAutoCompleteValue: '[data-id="check-selected-auto-complete-value"]',
  checkFormValue: '[data-id="check-form-value"]',
};

describe('auto complete component', () => {
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

  describe('react hook form integration', () => {
    it('preselecting', () => {
      cy.mount(cypressUtils.addBasicWrapper(<ReactHookExample selectedItemIndex={0} />));

      cy.get(selectors.autoCompleteInput).should('have.value', 'test1');
      cy.get(selectors.autoCompleteInput).should('be.not.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).contains('11');
      cy.get(selectors.checkFormValue).contains('11');
    });

    it('selecting', () => {
      cy.mount(cypressUtils.addBasicWrapper(<ReactHookExample />));

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
      cy.mount(cypressUtils.addBasicWrapper(<ReactHookExample selectedItemIndex={0} />));

      cy.get(selectors.autoCompleteInput).type('{esc}');

      cy.get(selectors.autoCompleteInput).should('have.value', '');
      cy.get(selectors.autoCompleteInput).should('be.focused');
      cy.get(selectors.autoCompleteItems).should('not.exist');
      cy.get(selectors.checkSelectedAutoCompleteValue).should('not.exist');
      cy.get(selectors.checkFormValue).should('not.exist');
    });
  });
});
