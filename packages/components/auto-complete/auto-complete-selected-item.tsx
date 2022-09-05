import React, { ReactNode, useCallback } from 'react';

import { AutoCompleteItem } from '$/components/auto-complete/auto-complete';
import Button from '$/components/button/button';

interface AutoCompleteSelectedItemProps {
  item: AutoCompleteItem;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (value: any) => void;
}

interface InternalOnDelete {
  onDelete: AutoCompleteSelectedItemProps['onDelete'];
  value: AutoCompleteSelectedItemProps['item']['value'];
}

export const internalOnDelete = ({ onDelete, value }: InternalOnDelete) => {
  if (!onDelete) {
    return;
  }

  onDelete(value);
};

const AutoCompleteSelectedItem = ({ item, onDelete }: AutoCompleteSelectedItemProps) => {
  const componentOnDelete = useCallback(() => {
    internalOnDelete({ onDelete, value: item.value });
  }, [onDelete, item.value]);

  return (
    <span data-id="selected-item">
      {item.display}
      {onDelete && <Button onClick={componentOnDelete}>Delete</Button>}
    </span>
  );
};

export default AutoCompleteSelectedItem;
