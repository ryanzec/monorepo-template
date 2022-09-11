import React, { RefObject } from 'react';

import { StyledInputContainer } from '$/components/input/styles';

type InputContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  selfRef?: RefObject<HTMLDivElement>;
};

const InputContainer = ({ children, selfRef, ...restOfProps }: InputContainerProps) => {
  return (
    <StyledInputContainer ref={selfRef} data-id="input-container" {...restOfProps}>
      {children}
    </StyledInputContainer>
  );
};

export default InputContainer;
