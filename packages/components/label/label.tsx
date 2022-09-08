import React from 'react';

import { StyledLabel } from '$/components/label/styles';

type LabelProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

const Label = ({ children, ...restOfProps }: LabelProps) => {
  return (
    <StyledLabel data-id="label" {...restOfProps}>
      {children}
    </StyledLabel>
  );
};

export default Label;
