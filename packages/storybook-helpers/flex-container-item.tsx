import React from 'react';

type FlexContainerItemProps = React.HTMLProps<React.HTMLAttributes<HTMLElement>>;

const FlexContainerItem = ({ children }: FlexContainerItemProps) => {
  return <div>{children}</div>;
};

export default FlexContainerItem;
