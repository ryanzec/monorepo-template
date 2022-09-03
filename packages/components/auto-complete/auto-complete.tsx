import { useCombobox, UseComboboxPropGetters } from 'downshift';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

import SelectedItem from '$/components/auto-complete/auto-complete-selected-item';
import Input from '$/components/input';

// downshift requires any for the default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultItemToString = (item: any) => {
  return item ? String(item) : '';
};

interface DisplayableAutoCompleteItem {
  display: ReactNode;

  // this in a generic component so allow any value here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

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

type SelectProps<T, TItemValue> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  items: T[];
  itemToString?: (item: T | null) => string;
  filterItems: (params: AutoCompleteFilterItemsParams<T>) => T[];
  renderItems: (params: AutoCompleteRenderItemParams<T>) => ReactNode;
  onItemSelected: (selectedItem: T | null) => void;
  selectedItem?: T | null;
  // setting this property automatically set the combobox to work in multiple select mode
  selectedItems?: T[];
  showItemsOnFocus?: boolean;
  onDelete?: (value: TItemValue) => void;
};

const AutoComplete = <T extends DisplayableAutoCompleteItem, TItemValue>({
  items,
  filterItems,
  renderItems,
  itemToString,
  onItemSelected,
  selectedItem,
  selectedItems,
  showItemsOnFocus = false,
  onDelete,
  ...restOfProps
}: SelectProps<T, TItemValue>) => {
  const [availableItems, setAvailableItems] = useState<T[]>(items);

  const isMultiSelectMode = useMemo((): boolean => {
    return !!selectedItems;
  }, [selectedItems]);

  const internalFilterItems = useCallback(
    (inputValue?: string, mostRecentSelectedItem?: T) => {
      if (!filterItems) {
        return items;
      }

      setAvailableItems(filterItems({ items, inputValue, selectedItem: mostRecentSelectedItem }));
    },
    [items, setAvailableItems, filterItems],
  );

  const {
    isOpen,
    openMenu,
    closeMenu,
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
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      // this normalizes null | undefined to just be null which mean we don't have to account for both throughout
      // our codebase which I think is just a little cleaner
      const currentSelectedItem = (changes.selectedItem || selectedItem) ?? null;
      const inputValue = isMultiSelectMode ? '' : (itemToString || defaultItemToString)(currentSelectedItem);

      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          if (changes.inputValue !== undefined) {
            internalFilterItems(changes.inputValue);
          }

          return changes;

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
            internalFilterItems(inputValue, currentSelectedItem);
          } else {
            console.log('close');
            closeMenu();

            // reset filtered item so next showing loads all items
            internalFilterItems();
          }

          return {
            ...changes,
            isOpen: isMultiSelectMode,
            inputValue,
          };

        default:
          return changes;
      }
    },
  });

  const onFocus = useCallback(() => {
    console.log('onfocus');
    internalFilterItems('');

    if (!showItemsOnFocus) {
      return;
    }

    openMenu();
  }, [showItemsOnFocus, openMenu, internalFilterItems]);

  return (
    <div data-id="auto-complete" {...restOfProps}>
      <div {...getComboboxProps()}>
        <Input {...getInputProps({ refKey: 'selfRef' })} onFocus={onFocus} />
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
      {selectedItems && (
        <div data-id="selected-items">
          {selectedItems.map((selectedItem) => {
            return (
              <SelectedItem
                key={selectedItem.value}
                display={selectedItem.display}
                value={selectedItem.value}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
