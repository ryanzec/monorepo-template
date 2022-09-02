import React, { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import AutoComplete from '$/components/auto-complete';
import Label from '$/components/label';

export default {
  title: 'Packages/Components/Virtualization',
};

interface SelectValue {
  display: string;
  value: number;
}

const Card = ({ selectedItemIndex = -1, label = '' }) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null | undefined>(
    selectedItemIndex >= 0 ? items[selectedItemIndex] : null,
  );

  return (
    <>
      <Label>{label}</Label>
      <AutoComplete
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={({ items, inputValue }) => {
          return items.filter((item) => item?.display.toLowerCase().includes(inputValue?.toLowerCase() ?? ''));
        }}
        renderItems={({ items, highlightedIndex, propGetters: { getItemProps } }) => {
          return items.map((item, index) => (
            <li
              data-id={`item${highlightedIndex === index ? ' highlighted-item' : ''}`}
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={`${item?.display}${index}`}
              {...getItemProps({ item, index })}
            >
              {item?.display}
            </li>
          ));
        }}
        onItemSelected={(selectedItem) => setSelectedItem(selectedItem)}
        selectedItem={selectedItem}
      />
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
      )}
    </>
  );
};

export const Default = () => {
  return (
    <Virtuoso
      style={{ height: '400px' }}
      totalCount={20000}
      itemContent={(index) => <Card label={`Label ${index}`} />}
    />
  );
};
Default.args = {};
