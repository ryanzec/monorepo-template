import React from 'react';

import { StyledFlexContainerItem } from '$/storybook-helpers/styles';

type FlexContainerItemProps = React.HTMLProps<React.HTMLAttributes<HTMLElement>>;

const FlexContainerItem = ({ children }: FlexContainerItemProps) => {
  return <StyledFlexContainerItem>{children}</StyledFlexContainerItem>;
};

export default FlexContainerItem;
