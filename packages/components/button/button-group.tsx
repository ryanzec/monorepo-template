import React from 'react';

import { styles } from '$/components/button/button.css';
import { ButtonVariant } from '$/components/button/common';
import { ButtonGroupContext, ButtonGroupContextValue } from '$/components/button/hooks';

interface ButtonGroupProps
  extends ButtonGroupContextValue,
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ButtonGroup = ({
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
        className={styles.group}
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
