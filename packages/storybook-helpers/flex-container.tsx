import React from 'react';

import { Container } from '$/storybook-helpers/flex-container.css';
import { FlexContainerDirection } from '$/storybook-helpers/common';

export interface FlexContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  'data-direction'?: FlexContainerDirection;
}

export const FlexContainer = ({ children, ...restOfProps }: FlexContainerProps) => {
  return (
    <div className={Container} {...restOfProps}>
      {children}
    </div>
  );
};

export default FlexContainer;
