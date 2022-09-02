import { useCombobox, UseComboboxPropGetters } from 'downshift';
import React, { ReactNode, useMemo, useState } from 'react';

import Input from '$/components/input';

// downshift requires any for the default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultItemToString = (item: any) => {
  return item ? String(item) : '';
};

export interface AutoCompleteFilterItemsParams<T> {
  items: T[];
  inputValue: string | undefined;
  selectedItem?: T;
}

export interface AutoCompleteRenderItemParams<T> {
  items: T[];
  highlightedIndex: number;
  propGetters: UseComboboxPropGetters<T>;
}

type SelectProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  items: T[];
  itemToString?: (item: T | null | undefined) => string;
  filterItems: (params: AutoCompleteFilterItemsParams<T>) => T[];
  renderItems: (params: AutoCompleteRenderItemParams<T>) => ReactNode;
  onItemSelected: (selectedItem: T | null | undefined) => void;
  selectedItem?: T | null;
  // setting this property automatically set the combobox to work in multiple select mode
  selectedItems?: T[];
  showItemsOnFocus?: boolean;
};

const AutoComplete = <T,>({
  items,
  filterItems,
  renderItems,
  itemToString,
  onItemSelected,
  selectedItem,
  selectedItems,
  showItemsOnFocus = false,
  ...restOfProps
}: SelectProps<T>) => {
  const [availableItems, setAvailableItems] = useState<T[]>(items);

  const isMultiSelectMode = useMemo((): boolean => {
    return !!selectedItems;
  }, [selectedItems]);

  const {
    isOpen,
    openMenu,
    highlightedIndex,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    getItemProps,
  } = useCombobox({
    items: availableItems,
    itemToString: itemToString || defaultItemToString,
    // when we are in multi-select mode we don't want to set the selected item as we want the
    // input to always be clear other than when the user is typing in it
    selectedItem: isMultiSelectMode ? null : selectedItem,
    onInputValueChange: ({ inputValue }) => {
      // we are doing an explicit undefined check as we do want to update available items on an
      // empty string
      if (inputValue === undefined) {
        return;
      }

      setAvailableItems(filterItems({ items, inputValue }));
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const currentSelectedItem = changes.selectedItem || selectedItem;
      const inputValue = isMultiSelectMode ? '' : (itemToString || defaultItemToString)(currentSelectedItem);

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
          if (!isMultiSelectMode) {
            onItemSelected(null);
          }

          return {
            ...changes,
            inputValue: '',
          };

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (!currentSelectedItem) {
            return {
              ...changes,
              // @todo add support for allow not selection values
              inputValue: '',
            };
          }

          onItemSelected(currentSelectedItem);

          if (isMultiSelectMode) {
            setAvailableItems(filterItems({ items, inputValue, selectedItem: currentSelectedItem }));
          }

          return {
            ...changes,
            inputValue,
          };

        default:
          return changes;
      }
    },
  });

  return (
    <div data-id="auto-complete" {...restOfProps}>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps({ refKey: 'selfRef' })}
          onFocus={() => {
            if (!showItemsOnFocus) {
              return;
            }

            openMenu();
          }}
        />
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
