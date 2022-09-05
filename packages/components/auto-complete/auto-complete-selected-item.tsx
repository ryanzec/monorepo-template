import React, { ReactNode, useCallback } from 'react';

import Button from '$/components/button/button';

interface AutoCompleteSelectedItemProps {
  display: ReactNode;

  // allowing any here as this in a generic component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (value: any) => void;
}

interface InternalOnDelete {
  onDelete: AutoCompleteSelectedItemProps['onDelete'];
  value: AutoCompleteSelectedItemProps['value'];
}

export const internalOnDelete = ({ onDelete, value }: InternalOnDelete) => {
  if (!onDelete) {
    return;
  }

  onDelete(value);
};

const AutoCompleteSelectedItem = ({ display, value, onDelete }: AutoCompleteSelectedItemProps) => {
  const componentOnDelete = useCallback(() => {
    internalOnDelete({ onDelete, value });
  }, [onDelete, value]);

  return (
    <span data-id="selected-item">
      {display}
      {onDelete && <Button onClick={componentOnDelete}>Delete</Button>}
    </span>
  );
};

export default AutoCompleteSelectedItem;
