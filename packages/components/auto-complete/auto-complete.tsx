import { useCombobox, UseComboboxPropGetters, UseComboboxState, UseComboboxStateChangeOptions } from 'downshift';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

import SelectedItem from '$/components/auto-complete/auto-complete-selected-item';
import Input from '$/components/input';

// downshift requires any for the default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultItemToString = (item: any) => {
  return item !== null && item !== undefined ? String(item) : '';
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

type AutoCompleteProps<T, TItemValue> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
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

interface InternalIsMultiSelect<T, TItemValue> {
  selectedItems: AutoCompleteProps<T, TItemValue>['selectedItems'];
}

export const internalIsMultiSelect = <T, TItemValue>({ selectedItems }: InternalIsMultiSelect<T, TItemValue>) => {
  return !!selectedItems;
};

interface InternalIsFilterItems<T, TItemValue> {
  filterItems: AutoCompleteProps<T, TItemValue>['filterItems'];
  items: AutoCompleteProps<T, TItemValue>['items'];
  setAvailableItems: (values: T[]) => void;
  lastSelectedItem?: T;
  inputValue?: string;
}

export const internalFilterItems = <T, TItemValue>({
  filterItems,
  items,
  setAvailableItems,
  lastSelectedItem,
  inputValue,
}: InternalIsFilterItems<T, TItemValue>) => {
  setAvailableItems(filterItems({ items, inputValue, selectedItem: lastSelectedItem }));
};

type ComponentFilterItems<T> = (inputValue?: string, lastSelectedItem?: T) => void;

interface InternalDownshiftStateReducer<T, TItemValue> {
  actionAndChanges: UseComboboxStateChangeOptions<T>;
  isMultiSelect: boolean;
  componentFilterItems: ComponentFilterItems<T>;
  onItemSelected: AutoCompleteProps<T, TItemValue>['onItemSelected'];
  itemToString: (item: T | null) => string;
  selectedItem?: T | null;
}

export const internalDownshiftStateReducer = <T, TItemValue>({
  actionAndChanges,
  isMultiSelect,
  componentFilterItems,
  onItemSelected,
  itemToString,
  selectedItem,
}: InternalDownshiftStateReducer<T, TItemValue>) => {
  const { changes, type } = actionAndChanges;
  // this normalizes null | undefined to just be null which mean we don't have to account for both throughout
  // our codebase which I think is just a little cleaner
  const currentSelectedItem = (changes.selectedItem || selectedItem) ?? null;
  const selectedItemInputValue = isMultiSelect ? '' : itemToString(currentSelectedItem);

  switch (type) {
    case useCombobox.stateChangeTypes.InputChange:
      if (changes.inputValue !== undefined) {
        componentFilterItems(changes.inputValue);
      }

      return changes;

    case useCombobox.stateChangeTypes.InputKeyDownEscape:
      if (!isMultiSelect) {
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

      if (isMultiSelect) {
        componentFilterItems(selectedItemInputValue, currentSelectedItem);
      } else {
        // reset filtered item so next showing loads all items
        componentFilterItems();
      }

      return {
        ...changes,
        isOpen: isMultiSelect,
        inputValue: selectedItemInputValue,
      };

    default:
      return changes;
  }
};

interface InternalOnFocus<T> {
  componentFilterItems: ComponentFilterItems<T>;
  showItemsOnFocus: boolean;
  openMenu: () => void;
}

export const internalOnFocus = <T,>({ componentFilterItems, showItemsOnFocus, openMenu }: InternalOnFocus<T>) => {
  componentFilterItems('');

  if (!showItemsOnFocus) {
    return;
  }

  openMenu();
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
}: AutoCompleteProps<T, TItemValue>) => {
  const [availableItems, setAvailableItems] = useState<T[]>(items);

  const isMultiSelect = useMemo(() => internalIsMultiSelect({ selectedItems }), [selectedItems]);

  const componentFilterItems = useCallback(
    (inputValue?: string, lastSelectedItem?: T) =>
      internalFilterItems({ items, setAvailableItems, filterItems, inputValue, lastSelectedItem }),
    [items, setAvailableItems, filterItems],
  );

  const downshiftStateReducer = useCallback(
    (_state_: UseComboboxState<T>, actionAndChanges: UseComboboxStateChangeOptions<T>) =>
      internalDownshiftStateReducer({
        actionAndChanges,
        isMultiSelect,
        componentFilterItems: componentFilterItems,
        onItemSelected,
        itemToString: itemToString || defaultItemToString,
        selectedItem,
      }),
    [isMultiSelect, componentFilterItems, onItemSelected, itemToString, selectedItem],
  );

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
    selectedItem: isMultiSelect ? null : selectedItem,
    stateReducer: downshiftStateReducer,
  });

  const onFocus = useCallback(() => {
    internalOnFocus({ showItemsOnFocus, openMenu, componentFilterItems: componentFilterItems });
  }, [showItemsOnFocus, openMenu, componentFilterItems]);

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
