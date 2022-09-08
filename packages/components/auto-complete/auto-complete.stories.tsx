import produce from 'immer';
import remove from 'lodash/remove';
import React, { useCallback, useState } from 'react';

import AutoComplete, { autoCompleteUtils } from '$/components/auto-complete';
import Button from '$/components/button';

export default {
  title: 'Packages/Components/AutoComplete',
  component: AutoComplete,
};

interface SelectValue {
  display: string;
  value: number;
}

const buildItems = (count: number): Array<SelectValue> => {
  const items: Array<SelectValue> = [];

  for (let i = 1; i <= count; i++) {
    items.push({ display: `test${i}`, value: i });
  }

  return items;
};

export const SingleSelect = () => {
  const [items] = useState<SelectValue[]>(buildItems(100));
  const [selectedItem, setSelectedItem] = useState<SelectValue | null>(null);

  const onResetSelected = useCallback(() => {
    setSelectedItem(null);
  }, [setSelectedItem]);

  return (
    <>
      <AutoComplete
        showItemsOnFocus
        forceSelection
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems()}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelected(setSelectedItem)}
        selectedItem={selectedItem}
      />
      <Button data-id="reset-selected-button" onClick={onResetSelected}>
        reset selected
      </Button>
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
      )}
    </>
  );
};

export const MultiSelect = () => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>([]);

  const onDeleteSelectedItem = useCallback(
    (value: number) => {
      setSelectedItems(
        produce(selectedItems, (draftState) => {
          remove(draftState, { value });
        }),
      );
    },
    [selectedItems, setSelectedItems],
  );

  return (
    <>
      <AutoComplete
        showItemsOnFocus
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems(selectedItems)}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelectedMulti(selectedItems, setSelectedItems)}
        selectedItems={selectedItems}
        onDelete={onDeleteSelectedItem}
      />
    </>
  );
};
