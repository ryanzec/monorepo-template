// @ts-nocheck
import {
  useCombobox,
  UseComboboxPropGetters,
  UseComboboxState,
  UseComboboxStateChange,
  UseComboboxStateChangeOptions,
} from 'downshift';
import React, { ReactNode, useCallback, useMemo, useState, useEffect, useRef } from 'react';

import SelectedItem from '$/components/auto-complete/auto-complete-selected-item';
import { autoCompleteUtils } from '$/components/auto-complete/utils';
import Input from '$/components/input';

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

export interface AutoCompleteFilterItemsParams<TItemValue extends AutoCompleteItem> {
  items: TItemValue[];
  inputValue: string | undefined;
  selectedItem?: TItemValue;
}

export interface AutoCompleteRenderItemParams<TItemValue extends AutoCompleteItem> {
  items: TItemValue[];
  highlightedIndex: number;
  propGetters: UseComboboxPropGetters<TItemValue>;
}

type AutoCompleteProps<TItemValue extends AutoCompleteItem> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  items: TItemValue[];
  itemToString?: (item: TItemValue | null) => string;
  filterItems: (params: AutoCompleteFilterItemsParams<TItemValue>) => TItemValue[];
  renderItems: (params: AutoCompleteRenderItemParams<TItemValue>) => ReactNode;
  onItemSelected: (selectedItem: TItemValue | null) => void;
  selectedItem?: TItemValue | null;
  showItemsOnFocus?: boolean;
  onDelete?: (value: TItemValue['value']) => void;

  // setting this property automatically set the combobox to work in multiple select mode
  selectedItems?: TItemValue[];

  // requiring a selection means the user must select a value from the items list, not allow to enter any value
  forceSelection?: boolean;
};

interface InternalIsMultiSelect<TItemValue extends AutoCompleteItem> {
  selectedItems: AutoCompleteProps<TItemValue>['selectedItems'];
}

export const internalIsMultiSelect = <TItemValue extends AutoCompleteItem>({
  selectedItems,
}: InternalIsMultiSelect<TItemValue>) => {
  return !!selectedItems;
};

interface InternalIsFilterItems<TItemValue extends AutoCompleteItem> {
  filterItems: AutoCompleteProps<TItemValue>['filterItems'];
  items: AutoCompleteProps<TItemValue>['items'];
  setAvailableItems: (values: TItemValue[]) => void;
  lastSelectedItem?: TItemValue;
  inputValue?: string;
}

export const internalFilterItems = <TItemValue extends AutoCompleteItem>({
  filterItems,
  items,
  setAvailableItems,
  lastSelectedItem,
  inputValue,
}: InternalIsFilterItems<TItemValue>) => {
  setAvailableItems(filterItems({ items, inputValue, selectedItem: lastSelectedItem }));
};

type ComponentFilterItems<T extends AutoCompleteItem> = (inputValue?: string, lastSelectedItem?: T) => void;

interface InternalDownshiftStateReducer<TItemValue extends AutoCompleteItem> {
  actionAndChanges: UseComboboxStateChangeOptions<TItemValue>;
  isMultiSelect: boolean;
  componentFilterItems: ComponentFilterItems<TItemValue>;
  selectedItem?: AutoCompleteProps<TItemValue>['selectedItem'];
  forceSelection: AutoCompleteProps<TItemValue>['forceSelection'];
  showItemsOnFocus: AutoCompleteProps<TItemValue>['forceSelection'];
  setCloseMenuOnNextRender: (value: boolean) => void;

  // in this case we need this to be passed in so we can't use the AutoCompleteProps version of this prop
  itemToString: (item: TItemValue | null) => string;
}

export const internalDownshiftStateReducer = <TItemValue extends AutoCompleteItem>({
  actionAndChanges,
  isMultiSelect,
  componentFilterItems,
  itemToString,
  selectedItem,
  forceSelection,
  showItemsOnFocus,
  setCloseMenuOnNextRender,
}: InternalDownshiftStateReducer<TItemValue>) => {
  const { changes, type } = actionAndChanges;
  // a blur event should not be considered a selection from the list from a UX system
  const selectedFromList = type === useCombobox.stateChangeTypes.InputBlur ? null : changes.selectedItem;

  // this normalizes null | undefined to just be null which mean we don't have to account for both throughout
  // our codebase which I think is just a little cleaner
  const currentSelectedItem = (selectedFromList || selectedItem) ?? null;
  const selectedItemInputValue = isMultiSelect ? '' : itemToString(currentSelectedItem);

  // if we have a value and are in multi select mode, when press the escape, we want to keep it open as in that
  // case we want the escape to act as a clear input instead of close list
  const escapeIsOpen = !!changes.inputValue && isMultiSelect;
  const selectionIsOpen = isMultiSelect && showItemsOnFocus;

  // console.log(type);
  // console.log(changes);

  switch (type) {
    case useCombobox.stateChangeTypes.InputChange:
      if (changes.inputValue !== undefined) {
        componentFilterItems(changes.inputValue);
      }

      return changes;

    case useCombobox.stateChangeTypes.FunctionOpenMenu:
      return {
        ...changes,

        // this seems to have issues in certain cases so just going to over using this completely
        highlightedIndex: -1,
      };

    case useCombobox.stateChangeTypes.InputKeyDownEscape:
      if (escapeIsOpen) {
        componentFilterItems('');
      }

      setCloseMenuOnNextRender(!escapeIsOpen);

      return {
        ...changes,
        isOpen: escapeIsOpen,
        inputValue: '',
        selectedItem: !isMultiSelect ? null : changes.selectedItem,
      };

    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
    case useCombobox.stateChangeTypes.InputBlur:
      // this is need to support force selection mode to allow for both free form entry and selection forced entry
      if (!currentSelectedItem) {
        const useValue = forceSelection ? '' : changes.inputValue;
        const selectedItem = useValue
          ? ({
              display: useValue,
              value: useValue,
            } as TItemValue)
          : changes.selectedItem;

        return {
          ...changes,
          selectedItem,
          inputValue: isMultiSelect || forceSelection ? '' : changes.inputValue,
        };
      }

      setCloseMenuOnNextRender(!selectionIsOpen);

      return {
        ...changes,
        isOpen: selectionIsOpen,
        inputValue: selectedItemInputValue,
      };

    default:
      return changes;
  }
};

interface InternalOnFocus<TItemValue extends AutoCompleteItem> {
  componentFilterItems: ComponentFilterItems<TItemValue>;
  showItemsOnFocus: AutoCompleteProps<TItemValue>['showItemsOnFocus'];
  openMenu: () => void;
  isOpen: boolean;
}

export const internalOnFocus = <TItemValue extends AutoCompleteItem>({
  componentFilterItems,
  showItemsOnFocus,
  openMenu,
  isOpen,
}: InternalOnFocus<TItemValue>) => {
  componentFilterItems('');

  // without the isOpen check, selecting an item with a click event for some reason does not work so adding it to
  // account for that
  // reference: https://github.com/downshift-js/downshift/issues/1095#issuecomment-672266443
  // reference: https://github.com/downshift-js/downshift/issues/1405
  if (!showItemsOnFocus || isOpen) {
    return;
  }

  openMenu();
};

interface InternalOnSelectedItemChangeParams<TItemValue extends AutoCompleteItem> {
  changes: UseComboboxStateChange<TItemValue>;
  isMultiSelect: boolean;
  forceSelection: AutoCompleteProps<TItemValue>['forceSelection'];
  onItemSelected: AutoCompleteProps<TItemValue>['onItemSelected'];
  componentFilterItems: ComponentFilterItems<TItemValue>;
}

export const internalOnSelectedItemChange = <TItemValue extends AutoCompleteItem>({
  changes,
  isMultiSelect,
  forceSelection,
  onItemSelected,
  componentFilterItems,
}: InternalOnSelectedItemChangeParams<TItemValue>) => {
  const inputValue = isMultiSelect || forceSelection ? '' : changes.inputValue;

  if (!isMultiSelect) {
    onItemSelected(changes.selectedItem ?? null);

    return;
  }

  if (!changes.selectedItem && inputValue) {
    // since I don't think a variable can implicitly be instantiated as a type, I think explicit casting is needed
    onItemSelected({
      display: inputValue,
      value: inputValue,
    } as TItemValue);

    return;
  }

  onItemSelected(changes.selectedItem ?? null);

  if (isMultiSelect) {
    // we don't want to show selected items so we need to update the filtered items
    componentFilterItems(changes.inputValue, changes.selectedItem ?? undefined);
  } else {
    // reset filtered item so next showing loads all items
    componentFilterItems();
  }
};

const AutoComplete = <TItemValue extends AutoCompleteItem>({
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
  const customInputRef = useRef();
  const [closeMenuOnNextRender, setCloseMenuOnNextRender] = useState(false);
  const [availableItems, setAvailableItems] = useState<TItemValue[]>(items);

  const componentItemToString = useMemo(() => itemToString || autoCompleteUtils.defaultItemToString, [itemToString]);
  const isMultiSelect = useMemo(() => internalIsMultiSelect({ selectedItems }), [selectedItems]);

  const componentFilterItems = useCallback(
    (inputValue?: string, lastSelectedItem?: TItemValue) =>
      internalFilterItems({ items, setAvailableItems, filterItems, inputValue, lastSelectedItem }),
    [items, setAvailableItems, filterItems],
  );

  const downshiftStateReducer = useCallback(
    (_state_: UseComboboxState<TItemValue>, actionAndChanges: UseComboboxStateChangeOptions<TItemValue>) =>
      internalDownshiftStateReducer({
        actionAndChanges,
        isMultiSelect,
        componentFilterItems: componentFilterItems,
        itemToString: componentItemToString,
        selectedItem,
        forceSelection,
        showItemsOnFocus,
        setCloseMenuOnNextRender,
      }),
    [
      isMultiSelect,
      componentFilterItems,
      selectedItem,
      forceSelection,
      componentItemToString,
      showItemsOnFocus,
      setCloseMenuOnNextRender,
    ],
  );

  const onSelectedItemChange = useCallback(
    (changes: UseComboboxStateChange<TItemValue>) => {
      internalOnSelectedItemChange({ changes, isMultiSelect, onItemSelected, forceSelection, componentFilterItems });
    },
    [isMultiSelect, onItemSelected, forceSelection, componentFilterItems],
  );
  const {
    setInputValue,
    isOpen,
    openMenu,
    highlightedIndex,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    getItemProps,
  } = useCombobox<TItemValue>({
    items: availableItems,
    itemToString: componentItemToString,
    stateReducer: downshiftStateReducer,
    // onInputValueChange: (change) => {
    //   if (!change.inputValue) {
    //     componentFilterItems();
    //
    //     return;
    //   }
    //
    //   componentFilterItems(change.inputValue);
    // },

    // when we are in multi-select mode we don't want to set the selected item as we want the
    // input to always be clear other than when the user is typing in it
    selectedItem: isMultiSelect ? null : selectedItem,

    // ideally this functionality would be in the state reducer but doing some stuff there cause a weird react
    // error so doing it this way for now
    onSelectedItemChange,
  });

  const onFocus = useCallback(() => {
    internalOnFocus({ showItemsOnFocus, openMenu, componentFilterItems: componentFilterItems, isOpen });
  }, [showItemsOnFocus, openMenu, componentFilterItems, isOpen]);

  // make sure the input value is keep in sync with the selected item (or is kept clear when in mutli-select mode)
  useEffect(() => {
    if (isMultiSelect) {
      setInputValue('');
    }

    setInputValue(componentItemToString(selectedItem ?? null));
  }, [selectedItem, setInputValue, isMultiSelect, componentItemToString]);

  const { inputRef, ...restOfInputProps } = getInputProps({
    refKey: 'inputRef',
    onFocus,
  });

  // while this effect and memo seems a bit messy, in order to get access to the input ref to blur() when needed,
  // we need create a function the downshift run that populates the reference that downshift needs and the one we
  // can use ourselves
  // based this code off of this reference: https://github.com/downshift-js/downshift/issues/743#issuecomment-521955610
  const downshiftInputRef = useMemo(() => {
    return (refValue) => {
      customInputRef.current = refValue;
      inputRef(refValue);
    };
  }, [inputRef]);

  // this makes sure that the input blurs on selected when needed
  useEffect(() => {
    if (!closeMenuOnNextRender || !customInputRef.current) {
      return;
    }

    customInputRef.current.blur();

    setCloseMenuOnNextRender(false);
  }, [closeMenuOnNextRender, setCloseMenuOnNextRender]);

  return (
    <div data-id="auto-complete" {...restOfProps}>
      <div {...getComboboxProps()}>
        <Input {...restOfInputProps} selfRef={downshiftInputRef} />
      </div>
      <ul
        data-id="items"
        {...getMenuProps()}
        style={{ display: isOpen ? 'block' : 'none', height: '200px', border: '1px solid black', overflowY: 'auto' }}
      >
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
