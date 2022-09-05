import { useCombobox, UseComboboxPropGetters, UseComboboxState, UseComboboxStateChangeOptions } from 'downshift';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

import SelectedItem from '$/components/auto-complete/auto-complete-selected-item';
import Input from '$/components/input';

// downshift requires any for the default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultItemToString = (item: any) => {
  return item !== null && item !== undefined ? String(item) : '';
};

export interface AutoCompleteItem {
  display: string;

  // this in a generic component so allow any value here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;

  // other than the items below that have special meaning, we should allow for any data to be passed into the auto
  // complete items so that things like customer render items can use additional meta data that could differ for
  // each use of the auto complete
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
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

type AutoCompleteProps<TItemValue> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  items: AutoCompleteItem[];
  itemToString?: (item: AutoCompleteItem | null) => string;
  filterItems: (params: AutoCompleteFilterItemsParams<AutoCompleteItem>) => AutoCompleteItem[];
  renderItems: (params: AutoCompleteRenderItemParams<AutoCompleteItem>) => ReactNode;
  onItemSelected: (selectedItem: AutoCompleteItem | null) => void;
  selectedItem?: AutoCompleteItem | null;
  // setting this property automatically set the combobox to work in multiple select mode
  selectedItems?: AutoCompleteItem[];
  showItemsOnFocus?: boolean;
  onDelete?: (value: TItemValue) => void;
  // requiring a selection means the user must select a value from the items list, not allow to enter any value
  forceSelection?: boolean;
};

interface InternalIsMultiSelect<TItemValue> {
  selectedItems: AutoCompleteProps<TItemValue>['selectedItems'];
}

export const internalIsMultiSelect = <TItemValue,>({ selectedItems }: InternalIsMultiSelect<TItemValue>) => {
  return !!selectedItems;
};

interface InternalIsFilterItems<TItemValue> {
  filterItems: AutoCompleteProps<TItemValue>['filterItems'];
  items: AutoCompleteProps<TItemValue>['items'];
  setAvailableItems: (values: AutoCompleteItem[]) => void;
  lastSelectedItem?: AutoCompleteItem;
  inputValue?: string;
}

export const internalFilterItems = <TItemValue,>({
  filterItems,
  items,
  setAvailableItems,
  lastSelectedItem,
  inputValue,
}: InternalIsFilterItems<TItemValue>) => {
  setAvailableItems(filterItems({ items, inputValue, selectedItem: lastSelectedItem }));
};

type ComponentFilterItems<T> = (inputValue?: string, lastSelectedItem?: T) => void;

interface InternalDownshiftStateReducer<TItemValue> {
  actionAndChanges: UseComboboxStateChangeOptions<AutoCompleteItem>;
  isMultiSelect: boolean;
  componentFilterItems: ComponentFilterItems<AutoCompleteItem>;
  onItemSelected: AutoCompleteProps<TItemValue>['onItemSelected'];
  itemToString: (item: AutoCompleteItem | null) => string;
  selectedItem?: AutoCompleteItem | null;
  forceSelection?: boolean;
}

export const internalDownshiftStateReducer = <TItemValue,>({
  actionAndChanges,
  isMultiSelect,
  componentFilterItems,
  onItemSelected,
  itemToString,
  selectedItem,
  forceSelection = true,
}: InternalDownshiftStateReducer<TItemValue>) => {
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
        const inputValue = isMultiSelect || forceSelection ? '' : changes.inputValue;

        if (inputValue) {
          onItemSelected({
            display: inputValue,
            value: inputValue,
          });
        }

        return {
          ...changes,
          inputValue,
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

const AutoComplete = <TItemValue,>({
  items,
  filterItems,
  renderItems,
  itemToString,
  onItemSelected,
  selectedItem,
  selectedItems,
  showItemsOnFocus = false,
  onDelete,
  forceSelection = true,
  ...restOfProps
}: AutoCompleteProps<TItemValue>) => {
  const [availableItems, setAvailableItems] = useState<AutoCompleteItem[]>(items);

  const isMultiSelect = useMemo(() => internalIsMultiSelect({ selectedItems }), [selectedItems]);

  const componentFilterItems = useCallback(
    (inputValue?: string, lastSelectedItem?: AutoCompleteItem) =>
      internalFilterItems({ items, setAvailableItems, filterItems, inputValue, lastSelectedItem }),
    [items, setAvailableItems, filterItems],
  );

  const downshiftStateReducer = useCallback(
    (_state_: UseComboboxState<AutoCompleteItem>, actionAndChanges: UseComboboxStateChangeOptions<AutoCompleteItem>) =>
      internalDownshiftStateReducer({
        actionAndChanges,
        isMultiSelect,
        componentFilterItems: componentFilterItems,
        onItemSelected,
        itemToString: itemToString || defaultItemToString,
        selectedItem,
        forceSelection,
      }),
    [isMultiSelect, componentFilterItems, onItemSelected, itemToString, selectedItem, forceSelection],
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
            return <SelectedItem key={selectedItem.value} item={selectedItem} onDelete={onDelete} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
