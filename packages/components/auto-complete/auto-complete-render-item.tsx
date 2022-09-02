import React from 'react';

interface AutoCompleteRenderItemConstraint {
  display: string;
}

interface AutoCompleteRenderItemProps<T> {
  isHighlighted?: boolean;
  item: T;

  // downshift using any in the case so ignoring that here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemProps: any;
}

const AutoCompleteRenderItem = <T extends AutoCompleteRenderItemConstraint>({
  isHighlighted = false,
  item,
  itemProps,
}: AutoCompleteRenderItemProps<T>) => {
  return (
    <li
      data-id={`item${isHighlighted ? ' highlighted-item' : ''}`}
      style={isHighlighted ? { backgroundColor: '#bde4ff' } : {}}
      {...itemProps}
    >
      {item?.display}
    </li>
  );
};

export default AutoCompleteRenderItem;
