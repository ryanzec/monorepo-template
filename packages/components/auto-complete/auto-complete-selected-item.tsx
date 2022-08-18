import classnames from 'classnames';
import React, { useCallback } from 'react';
import { X } from 'react-feather';

import styles from '$/components/auto-complete/auto-complete.module.css';
import { AutoCompleteItem } from '$/components/auto-complete/utils';

interface AutoCompleteSelectedItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  item: AutoCompleteItem;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (value: any) => void;
}

const AutoCompleteSelectedItem = ({ className, item, onDelete, ...restOfProps }: AutoCompleteSelectedItemProps) => {
  const componentOnDelete = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      event.preventDefault();

      if (!onDelete) {
        return;
      }

      onDelete(item.value);
    },
    [onDelete, item.value],
  );

  return (
    <span data-id="selected-item" className={classnames(className, styles.selectedItem)} {...restOfProps}>
      {item.display}
      {onDelete && <X data-id="delete-indicator" className={styles.removeSelectedItem} onClick={componentOnDelete} />}
    </span>
  );
};

export default AutoCompleteSelectedItem;
