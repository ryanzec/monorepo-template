import type { FieldValues } from 'react-hook-form/dist/types';

import { UseComboboxPropGetters } from 'downshift';
import produce from 'immer';
import remove from 'lodash/remove';
import React from 'react';
import { Path, PathValue, UseFormSetValue, ControllerRenderProps } from 'react-hook-form';

import RenderItem from '$/components/auto-complete/auto-complete-render-item';

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

// downshift requires any for the default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultItemToString = (item: any) => {
  return item !== null && item !== undefined ? String(item) : '';
};

const buildFilterItems = (selectedItems?: Array<AutoCompleteItem>) => {
  return ({ items, inputValue, selectedItem }: AutoCompleteFilterItemsParams<AutoCompleteItem>): AutoCompleteItem[] => {
    return items.filter((item) => {
      return (
        (!selectedItem || selectedItem !== item) &&
        !selectedItems?.includes(item) &&
        item?.display.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
      );
    });
  };
};

const buildRenderItem = () => {
  return ({
    items,
    highlightedIndex,
    propGetters: { getItemProps },
  }: AutoCompleteRenderItemParams<AutoCompleteItem>) => {
    return items.map((item, index) => {
      return (
        <RenderItem
          key={item.value}
          item={item}
          itemProps={getItemProps({ item, index })}
          isHighlighted={highlightedIndex === index}
        />
      );
    });
  };
};

const buildItemSelected = (setSelectedItem: (value: AutoCompleteItem | null) => void) => {
  return (selectedItem: AutoCompleteItem | null) => {
    setSelectedItem(selectedItem);
  };
};

const buildItemSelectedHooked = <TFormData extends FieldValues>(
  setSelectedItem: (value: AutoCompleteItem | null) => void,
  field: ControllerRenderProps<TFormData, Path<TFormData>>,
) => {
  return (selectedItem: AutoCompleteItem | null) => {
    field.onChange(selectedItem?.value || undefined);
    setSelectedItem(selectedItem);
  };
};

const buildItemSelectedMulti = (
  selectedItems: AutoCompleteItem[],
  setSelectedItems: (values: AutoCompleteItem[]) => void,
) => {
  return (selectedItem: AutoCompleteItem | null) => {
    if (!selectedItem || selectedItems.includes(selectedItem)) {
      return;
    }

    setSelectedItems([...selectedItems, selectedItem]);
  };
};

const buildItemSelectedMultiHooked = <TFormData extends FieldValues>(
  formDataKey: Path<TFormData>,
  setValue: UseFormSetValue<TFormData>,
  selectedItems: AutoCompleteItem[],
  setSelectedItems: (values: AutoCompleteItem[]) => void,
) => {
  return (selectedItem: AutoCompleteItem | null) => {
    if (!selectedItem || selectedItems.includes(selectedItem)) {
      return;
    }

    const newEvents = [...selectedItems, selectedItem];

    setValue(
      formDataKey,
      newEvents.map((newEvent) => {
        return newEvent.value;
      }) as PathValue<TFormData, Path<TFormData>>,
    );
    setSelectedItems(newEvents);
  };
};

interface DeleteSelectedItemParams<TAutoCompleteItem extends AutoCompleteItem, TFormData extends FieldValues> {
  name: Path<TFormData>;
  valueToDelete: TAutoCompleteItem['value'];
  selectedItems: Array<TAutoCompleteItem>;
  setValue: UseFormSetValue<TFormData>;
  setSelectedItems: (values: Array<TAutoCompleteItem>) => void;
}

const deleteSelectedItem = <TAutoCompleteItem extends AutoCompleteItem, TFormData extends FieldValues>({
  name,
  valueToDelete,
  selectedItems,
  setValue,
  setSelectedItems,
}: DeleteSelectedItemParams<TAutoCompleteItem, TFormData>) => {
  const newItems = produce(selectedItems, (draftState) => {
    remove(draftState, { value: valueToDelete });
  });
  const newItemValues = newItems.map((severity) => {
    return severity.value;
  });

  // since this is a generic react hook form configured component, we need to as
  // to avoid typescript errors
  setValue(name, newItemValues as PathValue<TFormData, Path<TFormData>>);
  setSelectedItems(newItems);
};

export const autoCompleteUtils = {
  buildFilterItems,
  buildRenderItem,
  buildItemSelected,
  buildItemSelectedHooked,
  buildItemSelectedMulti,
  buildItemSelectedMultiHooked,
  deleteSelectedItem,
  defaultItemToString,
};
