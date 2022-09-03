import type { ControllerProps, FieldValues } from 'react-hook-form/dist/types';

import React from 'react';
import { Control, Controller, Path, UseFormSetValue } from 'react-hook-form';

import AutoComplete from '$/components/auto-complete/auto-complete';
import { autoCompleteUtils, RenderItemItemConstraint } from '$/utils/auto-complete';

interface AutoCompleteHookedProps<T extends FieldValues, TItem, TItemValue> extends Omit<ControllerProps<T>, 'render'> {
  items: TItem[];
  // since when use this in single value mode TItem s=could support null, we need to be explicit about that
  // here otherwise typescript will error in the code using it in that way
  selectedItem?: TItem | null;
  setSelectedItem?: (value: TItem) => void;
  selectedItems?: TItem[];
  setSelectedItems?: (value: TItem[]) => void;
  control: Control<T>;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  onDelete?: (value: TItemValue) => void;
  showItemsOnFocus?: boolean;
}

const AutoCompleteHooked = <T extends FieldValues, TItem extends RenderItemItemConstraint, TItemValue>({
  control,
  items,
  name,
  setValue,
  selectedItem,
  setSelectedItem,
  selectedItems,
  setSelectedItems,
  onDelete,
  showItemsOnFocus = false,
  ...restOfProps
}: AutoCompleteHookedProps<T, TItem, TItemValue>) => {
  // we are only checking the setSelectedItem since it is valid for selectedItem to be undefined or null
  if (setSelectedItem) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <AutoComplete
              showItemsOnFocus={showItemsOnFocus}
              items={items}
              itemToString={(item) => item?.display ?? ''}
              filterItems={autoCompleteUtils.buildFilterItems()}
              renderItems={autoCompleteUtils.buildRenderItem()}
              // because we are using a generic TItem can in its definition allow null | undefined however
              // typescript can not know this and onItemSelected need to allow null and undefined so we are
              // ignored this error because we know this works
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore-error
              onItemSelected={autoCompleteUtils.buildItemSelectedHooked<TItem, T>(setSelectedItem, field)}
              selectedItem={selectedItem}
            />
          );
        }}
      />
    );
  }

  if (!selectedItems || !setSelectedItems) {
    return null;
  }

  return (
    <Controller
      {...restOfProps}
      control={control}
      name={name}
      render={() => {
        return (
          <AutoComplete
            showItemsOnFocus={showItemsOnFocus}
            items={items}
            itemToString={(item) => item?.display ?? ''}
            filterItems={autoCompleteUtils.buildFilterItems(selectedItems)}
            renderItems={autoCompleteUtils.buildRenderItem()}
            onItemSelected={autoCompleteUtils.buildItemSelectedMultiHooked<TItem, T>(
              name,
              setValue,
              selectedItems,
              setSelectedItems,
            )}
            selectedItems={selectedItems}
            onDelete={onDelete}
          />
        );
      }}
    />
  );
};

export default AutoCompleteHooked;
