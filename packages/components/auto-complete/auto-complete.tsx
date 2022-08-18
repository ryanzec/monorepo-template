import classnames from 'classnames';
import { useCombobox, UseComboboxState, UseComboboxStateChange, UseComboboxStateChangeOptions } from 'downshift';
import debounce from 'lodash/debounce';
import React, { ReactNode, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader } from 'react-feather';

import SelectedItem from '$/components/auto-complete/auto-complete-selected-item';
import styles from '$/components/auto-complete/auto-complete.module.css';
import {
  autoCompleteUtils,
  AutoCompleteItem,
  AutoCompleteFilterItemsParams,
  AutoCompleteRenderItemParams,
} from '$/components/auto-complete/utils';
import Input from '$/components/input';

type AutoCompleteProps<TItemValue extends AutoCompleteItem> = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  items: TItemValue[];
  itemToString?: (item: TItemValue | null) => string;
  filterItems?: (params: AutoCompleteFilterItemsParams<TItemValue>) => TItemValue[];
  renderItems: (params: AutoCompleteRenderItemParams<TItemValue>) => ReactNode;
  onItemSelected: (selectedItem: TItemValue | null) => void;
  selectedItem?: TItemValue | null;
  showItemsOnFocus?: boolean;
  onDelete?: (value: TItemValue['value']) => void;
  placeholder?: string;
  getItemsAsync?: (inputValue: string) => Promise<Array<TItemValue>>;
  getItemsAsyncDelay?: number;

  // setting this property automatically set the combobox to work in multiple select mode
  selectedItems?: TItemValue[];

  // requiring a selection means the user must select a value from the items list, not allow to enter any value
  forceSelection?: boolean;
};

const AutoComplete = <TItemValue extends AutoCompleteItem>({
  className,
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
  placeholder,
  id,
  getItemsAsync,
  getItemsAsyncDelay = 350,
  ...restOfProps
}: AutoCompleteProps<TItemValue>) => {
  const customInputRef = useRef<HTMLInputElement>();
  const [isLoading, setIsLoading] = useState(false);
  const [closeMenuOnNextRender, setCloseMenuOnNextRender] = useState(false);

  // if we are using the get async items we want to explicitly default to an empty array even if the items are
  // passed (they really should be so this is just a preventive check)
  const [availableItems, setAvailableItems] = useState<TItemValue[]>(getItemsAsync ? [] : items);

  const componentItemToString = useMemo(() => itemToString || autoCompleteUtils.defaultItemToString, [itemToString]);
  const isMultiSelect = useMemo(() => !!selectedItems, [selectedItems]);

  const componentFilterItems = useCallback(
    (inputValue?: string, lastSelectedItem?: TItemValue) => {
      // when use async method for getting item we should do nothing during filtering to make sure we show the
      // previously retrieved items between typing in the input and the debounced async call for new item (without
      // this, the items list would just disappear during the debounced time)
      if (getItemsAsync) {
        return;
      }

      if (!filterItems) {
        setAvailableItems([]);

        return;
      }

      setAvailableItems(filterItems({ items, inputValue, selectedItem: lastSelectedItem }));
    },
    [items, setAvailableItems, filterItems, getItemsAsync],
  );

  const componentGetItemsAsync = useCallback(
    async (inputValue?: string) => {
      if (!getItemsAsync) {
        return;
      }

      if (!inputValue || inputValue === '') {
        setAvailableItems([]);

        return;
      }

      setIsLoading(true);

      const asyncItems = await getItemsAsync(inputValue);

      setAvailableItems(asyncItems);
      setIsLoading(false);
    },
    [getItemsAsync],
  );

  const componentGetItemsAsyncDebounced = useMemo(
    () =>
      debounce((inputValue?: string) => {
        componentGetItemsAsync(inputValue);
      }, getItemsAsyncDelay),
    [componentGetItemsAsync, getItemsAsyncDelay],
  );

  const onInputValueChange = useCallback(
    (changes: UseComboboxStateChange<TItemValue>) => {
      componentGetItemsAsyncDebounced(changes.inputValue);
    },
    [componentGetItemsAsyncDebounced],
  );

  const downshiftStateReducer = useCallback(
    (_state_: UseComboboxState<TItemValue>, actionAndChanges: UseComboboxStateChangeOptions<TItemValue>) => {
      const { changes, type } = actionAndChanges;
      // a blur event should not be considered a selection from the list from a UX system
      const selectedFromList = type === useCombobox.stateChangeTypes.InputBlur ? null : changes.selectedItem;

      // this normalizes null | undefined to just be null which mean we don't have to account for both throughout
      // our codebase which I think is just a little cleaner
      const currentSelectedItem = (selectedFromList || selectedItem) ?? null;
      const selectedItemInputValue = isMultiSelect ? '' : componentItemToString(currentSelectedItem);

      // if we are showing the items on focus then escaping when there is an input value should only clear the input
      const escapeIsOpen = !!changes.inputValue && showItemsOnFocus;
      const selectionIsOpen = isMultiSelect && showItemsOnFocus;

      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          if (changes.inputValue !== undefined) {
            componentFilterItems(changes.inputValue);
          }

          return changes;

        case useCombobox.stateChangeTypes.FunctionOpenMenu:
          return {
            ...changes,

            // this seems to have issues in certain cases so just going to skip using this completely since it is not
            // really required right now
            // @todo(investigate)
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

          // onItemSelected(currentSelectedItem);
          setCloseMenuOnNextRender(!selectionIsOpen);

          if (isMultiSelect) {
            componentFilterItems(selectedItemInputValue, currentSelectedItem);
          } else {
            // this resets the filtered items as we should show all in single select mode
            componentFilterItems();
          }

          return {
            ...changes,
            isOpen: selectionIsOpen,
            inputValue: selectedItemInputValue,
          };

        default:
          return changes;
      }
    },
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
      //
      // if (isMultiSelect) {
      //   // we don't want to show selected items so we need to update the filtered items
      //   componentFilterItems(changes.inputValue, changes.selectedItem ?? undefined);
      // } else {
      //   // reset filtered item so next showing loads all items
      //   componentFilterItems();
      // }
    },
    [isMultiSelect, onItemSelected, forceSelection],
  );
  const {
    setInputValue,
    isOpen,
    openMenu,
    highlightedIndex,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getToggleButtonProps,
    getItemProps,
  } = useCombobox<TItemValue>({
    items: availableItems,
    itemToString: componentItemToString,
    stateReducer: downshiftStateReducer,
    onInputValueChange,

    // when we are in multi-select mode we don't want to set the selected item as we want the
    // input to always be clear other than when the user is typing in it
    selectedItem: isMultiSelect ? null : selectedItem,

    // ideally this functionality would be in the state reducer but doing some stuff there cause a weird react
    // error so doing it this way for now
    onSelectedItemChange,
  });

  const onFocus = useCallback(() => {
    componentFilterItems('');

    // without the isOpen check, selecting an item with a click event for some reason does not work so adding it to
    // account for that
    // reference: https://github.com/downshift-js/downshift/issues/1095#issuecomment-672266443
    // reference: https://github.com/downshift-js/downshift/issues/1405
    if (!showItemsOnFocus || isOpen) {
      return;
    }

    openMenu();
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
  });

  // make sure if there is a pending debounce call when the component unmount, it is cancelled
  useEffect(() => {
    return () => {
      componentGetItemsAsyncDebounced.cancel();
    };
  }, [componentGetItemsAsyncDebounced]);

  // while this effect and memo seems a bit messy, in order to get access to the input ref to blur() when needed,
  // we need create a function the downshift run that populates the reference that downshift needs and the one we
  // can use ourselves
  // based this code off of this reference: https://github.com/downshift-js/downshift/issues/743#issuecomment-521955610
  const downshiftInputRef = useMemo(() => {
    return (refValue: HTMLInputElement) => {
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
  }, [closeMenuOnNextRender]);

  const renderItemsList = (isLoading || availableItems.length > 0) && isOpen;

  return (
    <div data-id="auto-complete" className={classnames(className, styles.autoComplete)} {...restOfProps}>
      <div>
        <Input
          id={id}
          className={classnames(styles.input)}
          {...restOfInputProps}
          selfRef={downshiftInputRef}
          placeholder={placeholder}
          onFocus={onFocus}
        />
        <div className={classnames(styles.inputArrowIndicator)}>
          <ChevronDown />
        </div>
      </div>
      <ul
        data-id="items"
        className={classnames(styles.items, { [styles.openedItems]: renderItemsList })}
        {...getMenuProps()}
      >
        {isOpen && isLoading && (
          <li data-id="async-data-loading" className={styles.loadingItem}>
            <Loader /> Loading...
          </li>
        )}
        {isOpen &&
          !isLoading &&
          renderItems({
            items: availableItems,
            highlightedIndex,
            propGetters: {
              getLabelProps,
              getMenuProps,
              getInputProps,
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
