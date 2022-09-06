import React, { useCallback, useState } from 'react';

import AutoComplete from '$/components/auto-complete';
import Button from '$/components/button';
import { autoCompleteUtils } from '$/utils/auto-complete';

export default {
  title: 'Packages/Components/AutoComplete',
  component: AutoComplete,
};

interface SelectValue {
  display: string;
  value: number;
}

export const SingleSelect = () => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null>(null);

  const onResetSelected = useCallback(() => {
    setSelectedItem(null);
  }, [setSelectedItem]);

  return (
    <>
      <AutoComplete
        showItemsOnFocus
        forceSelection={false}
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
