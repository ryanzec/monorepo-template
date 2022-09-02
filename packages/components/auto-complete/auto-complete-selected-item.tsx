import React, { ReactNode } from 'react';

import Button from '$/components/button';

interface AutoCompleteSelectedItemProps {
  display: ReactNode;

  // allowing any here as this in a generic component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (value: any) => void;
}

const AutoCompleteSelectedItem = ({ display, value, onDelete }: AutoCompleteSelectedItemProps) => {
  return (
    <span data-id="selected-item">
      {display}
      {onDelete && (
        <Button
          onClick={() => {
            onDelete(value);
          }}
        >
          Delete
        </Button>
      )}
    </span>
  );
};

export default AutoCompleteSelectedItem;
