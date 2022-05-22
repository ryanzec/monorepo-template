import React, { ReactNode, useState } from 'react';
import { useCombobox, UseComboboxPropGetters } from 'downshift';
import Form from '$/components/form/form';

// downshift requires any for the default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultItemToString = (item: any) => {
  return item ? String(item) : '';
};

export interface FilterItemsParams<T> {
  items: T[];
  inputValue: string | undefined;
}

export interface RenderItemParams<T> {
  items: T[];
  highlightedIndex: number;
  propGetters: UseComboboxPropGetters<T>;
}

export type SelectProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  items: T[];
  itemToString?: (item: T | null | undefined) => string;
  filterItems: (params: FilterItemsParams<T>) => T[];
  renderItems: (params: RenderItemParams<T>) => ReactNode;
  onItemSelected: (selectedItem: T | null | undefined) => void;
  selectedItem: T | null;
};

export const AutoComplete = <T,>({
  items,
  filterItems,
  renderItems,
  itemToString,
  onItemSelected,
  selectedItem,
  ...restOfProps
}: SelectProps<T>) => {
  const [availableItems, setAvailableItems] = useState<T[]>(items);

  const {
    isOpen,
    highlightedIndex,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    getItemProps,
    setInputValue,
  } = useCombobox({
    items: availableItems,
    itemToString: itemToString || defaultItemToString,
    selectedItem,
    onInputValueChange: ({ inputValue }) => {
      const inputValues = !inputValue ? items : filterItems({ items, inputValue });

      setAvailableItems(inputValues);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onItemSelected(selectedItem);
    },
    onStateChange: ({ type, selectedItem: activeSelectedItem }) => {
      const currentSelectedItem = activeSelectedItem || selectedItem;

      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          if (activeSelectedItem) {
            return;
          }

          // if there is no active selection we need to reset the input to match whatever the current selection is
          setInputValue((itemToString || defaultItemToString)(currentSelectedItem));

          break;
      }
    },
  });

  return (
    <div data-id="auto-complete" {...restOfProps}>
      <div {...getComboboxProps()}>
        <Form.PlainInput data-id="input" {...getInputProps()} />
      </div>
      <ul data-id="items" {...getMenuProps()}>
        {isOpen &&
          renderItems({
            items: availableItems,
            highlightedIndex,
            propGetters: {
              getLabelProps,
              getMenuProps,
              getInputProps,
              getComboboxProps,
              getItemProps,
              getToggleButtonProps,
            },
          })}
      </ul>
    </div>
  );
};

export default AutoComplete;
