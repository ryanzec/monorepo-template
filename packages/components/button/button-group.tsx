import React from 'react';

import { DEFAULT_BUTTON_CONTEXT, DEFAULT_BUTTON_SIZE, DEFAULT_BUTTON_VARIANT } from '$/components/button/common';
import { ButtonGroupContext, ButtonGroupContextValue } from '$/components/button/hooks';
import { StyledButtonGroup } from '$/components/button/styles';

interface ButtonGroupProps
  extends ButtonGroupContextValue,
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ButtonGroup = ({
  children,
  isAttached = false,
  variant = DEFAULT_BUTTON_VARIANT,
  size = DEFAULT_BUTTON_SIZE,
  context = DEFAULT_BUTTON_CONTEXT,
  ...restOfProps
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider
      value={{
        isAttached,
        variant,
        size,
        context: context,
        disabled: restOfProps.disabled,
      }}
    >
      <StyledButtonGroup data-id="button-group" role="group" isAttached={isAttached} {...restOfProps}>
        {children}
      </StyledButtonGroup>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
