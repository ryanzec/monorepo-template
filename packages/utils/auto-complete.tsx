import type { FieldValues } from 'react-hook-form/dist/types';

import React from 'react';
import { Path, PathValue, UseFormSetValue, ControllerRenderProps } from 'react-hook-form';

import AutoComplete, {
  AutoCompleteFilterItemsParams,
  AutoCompleteItem,
  AutoCompleteRenderItemParams,
} from '$/components/auto-complete';

const buildFilterItems = (selectedItems?: Array<AutoCompleteItem>) => {
  return ({ items, inputValue, selectedItem }: AutoCompleteFilterItemsParams<AutoCompleteItem>): AutoCompleteItem[] => {
    console.log('buildFilterItems', selectedItem, selectedItem);

    return items.filter(
      (item) =>
        selectedItem !== item &&
        !selectedItems?.includes(item) &&
        item?.display.toLowerCase().includes(inputValue?.toLowerCase() ?? ''),
    );
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

export const autoCompleteUtils = {
  buildFilterItems,
  buildRenderItem,
  buildItemSelected,
  buildItemSelectedHooked,
  buildItemSelectedMulti,
  buildItemSelectedMultiHooked,
};
