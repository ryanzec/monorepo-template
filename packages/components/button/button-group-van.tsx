import { RequiresChildrenComponent } from '$types/react';

import React from 'react';

import { Container } from '$components/button/button.css';
import { ButtonGroupContext, ButtonGroupContextValue } from '$components/button/hooks';
import { ButtonVariant } from '$components/button/types';

export interface ButtonGroupProps extends ButtonGroupContextValue, RequiresChildrenComponent {}

export const ButtonGroup = ({
  children,
  isAttached = false,
  'data-variant': dataVariant = ButtonVariant.SOLID,
  ...restOfProps
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider value={{ isAttached, 'data-variant': dataVariant, ...restOfProps }}>
      <div data-id="button-group" role="group" data-attached={isAttached ? 'true' : 'false'}>
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
