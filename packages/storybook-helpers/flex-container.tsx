import React from 'react';

import { FlexContainerDirection } from '$/storybook-helpers/common';
import { StyledFlexContainer } from '$/storybook-helpers/styles';

export interface FlexContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  direction?: FlexContainerDirection;
}

export const FlexContainer = ({
  direction = FlexContainerDirection.ROW,
  children,
  ...restOfProps
}: FlexContainerProps) => {
  return (
    <StyledFlexContainer direction={direction} {...restOfProps}>
      {children}
    </StyledFlexContainer>
  );
};

export default FlexContainer;
