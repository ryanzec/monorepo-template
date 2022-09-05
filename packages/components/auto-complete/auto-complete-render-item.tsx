import React from 'react';

import { AutoCompleteItem } from '$/components/auto-complete/auto-complete';

interface AutoCompleteRenderItemProps {
  isHighlighted?: boolean;
  item: AutoCompleteItem;

  // downshift using any in the case so ignoring that here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemProps: any;
}

const AutoCompleteRenderItem = ({ isHighlighted = false, item, itemProps }: AutoCompleteRenderItemProps) => {
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
