import React from 'react';

import { buttonCss } from '$/components/button/button.css';
import { ButtonGroupContext, ButtonGroupContextValue } from '$/components/button/hooks';
import { ButtonVariant } from '$/components/button/common';

export interface ButtonGroupProps
  extends ButtonGroupContextValue,
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ButtonGroup = ({
  children,
  isAttached = false,
  'data-variant': dataVariant = ButtonVariant.SOLID,
  'data-size': dataSize,
  'data-context': dataContext,
  ...restOfProps
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider
      value={{
        isAttached,
        'data-variant': dataVariant,
        'data-size': dataSize,
        'data-context': dataContext,
        disabled: restOfProps.disabled,
      }}
    >
      <div
        className={buttonCss.group}
        data-id="button-group"
        role="group"
        data-attached={isAttached ? 'true' : 'false'}
        {...restOfProps}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
