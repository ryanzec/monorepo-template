import type { FieldValues } from 'react-hook-form/dist/types';

import React from 'react';
import { Path, PathValue, UseFormSetValue, ControllerRenderProps } from 'react-hook-form';

import AutoComplete, { AutoCompleteFilterItemsParams, AutoCompleteRenderItemParams } from '$/components/auto-complete';

interface FilterAutoCompleteItemConstraint {
  display: string;
}

const buildFilterItems = <T extends FilterAutoCompleteItemConstraint>(selectedItems?: Array<T>) => {
  return ({ items, inputValue, selectedItem }: AutoCompleteFilterItemsParams<T>): T[] => {
    return items.filter(
      (item) =>
        selectedItem !== item &&
        !selectedItems?.includes(item) &&
        item?.display.toLowerCase().includes(inputValue?.toLowerCase() ?? ''),
    );
  };
};

export interface RenderItemItemConstraint {
  display: string;

  // value can be anything with downshift so ignore it here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

const buildRenderItem = <T extends RenderItemItemConstraint>() => {
  return ({ items, highlightedIndex, propGetters: { getItemProps } }: AutoCompleteRenderItemParams<T>) => {
    return items.map((item, index) => {
      return (
        <AutoComplete.RenderItem
          key={item.value}
          item={item}
          itemProps={getItemProps({ item, index })}
          isHighlighted={highlightedIndex === index}
        />
      );
    });
  };
};

type ItemSelectedConstraint = {
  // value can be anything with downshift so ignore it here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

const buildItemSelected = <T,>(setSelectedItem: (value: T) => void) => {
  return (selectedItem: T) => {
    setSelectedItem(selectedItem);
  };
};

const buildItemSelectedHooked = <T extends ItemSelectedConstraint | null | undefined, TFormData extends FieldValues>(
  setSelectedItem: (value: T) => void,
  field: ControllerRenderProps<TFormData, Path<TFormData>>,
) => {
  return (selectedItem: T) => {
    field.onChange(selectedItem?.value || undefined);
    setSelectedItem(selectedItem);
  };
};

const buildItemSelectedMulti = <T extends ItemSelectedConstraint>(
  selectedItems: T[],
  setSelectedItems: (values: T[]) => void,
) => {
  return (selectedItem: T | null | undefined) => {
    if (!selectedItem || selectedItems.includes(selectedItem)) {
      return;
    }

    setSelectedItems([...selectedItems, selectedItem]);
  };
};

const buildItemSelectedMultiHooked = <T extends ItemSelectedConstraint, TFormData extends FieldValues>(
  formDataKey: Path<TFormData>,
  setValue: UseFormSetValue<TFormData>,
  selectedItems: T[],
  setSelectedItems: (values: T[]) => void,
) => {
  return (selectedItem: T | null | undefined) => {
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

export const autoCompleteUtils = {
  buildFilterItems,
  buildRenderItem,
  buildItemSelected,
  buildItemSelectedHooked,
  buildItemSelectedMulti,
  buildItemSelectedMultiHooked,
};
