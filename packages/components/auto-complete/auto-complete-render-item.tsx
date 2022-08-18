import classnames from 'classnames';
import React from 'react';

import styles from '$/components/auto-complete/auto-complete.module.css';
import { AutoCompleteItem } from '$/components/auto-complete/utils';

interface AutoCompleteRenderItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  isHighlighted?: boolean;
  item: AutoCompleteItem;

  // downshift using any in the case so ignoring that here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemProps: any;
}

const AutoCompleteRenderItem = ({
  className,
  isHighlighted = false,
  item,
  itemProps,
  ...restOfProps
}: AutoCompleteRenderItemProps) => {
  return (
    <li
      data-id={`item${isHighlighted ? ' highlighted-item' : ''}`}
      className={classnames(className, styles.renderedItem, { [styles.highlightedItem]: isHighlighted })}
      {...itemProps}
      {...restOfProps}
    >
      {item?.display}
    </li>
  );
};

export default AutoCompleteRenderItem;
