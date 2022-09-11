import React from 'react';

import { StyledValidationMessage } from '$/components/validation-message/styles';

type ValidationMessageProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ValidationMessage = ({ children, ...restOfProps }: ValidationMessageProps) => {
  return (
    <StyledValidationMessage data-id="validation-message" {...restOfProps}>
      {children}
    </StyledValidationMessage>
  );
};

export default ValidationMessage;
