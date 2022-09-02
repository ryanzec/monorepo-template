import React from 'react';

import { FlexContainerDirection } from '$/storybook-helpers/common';
import { styles } from '$/storybook-helpers/flex-container.css';

export interface FlexContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  'data-direction'?: FlexContainerDirection;
}

export const FlexContainer = ({ children, ...restOfProps }: FlexContainerProps) => {
  return (
    <div className={styles.container} {...restOfProps}>
      {children}
    </div>
  );
};

export default FlexContainer;
