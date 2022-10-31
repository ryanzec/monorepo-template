import classnames from 'classnames';
import React from 'react';

import styles from '$/components/button/button.module.css';
import { ButtonGroupContext, ButtonGroupContextValue } from '$/components/button/hooks';
import { DEFAULT_BUTTON_CONTEXT, DEFAULT_BUTTON_SIZE, DEFAULT_BUTTON_VARIANT } from '$/components/button/utils';

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
      <div
        data-id="button-group"
        role="group"
        className={classnames(styles['group'], { [styles['is-attached']]: isAttached })}
        {...restOfProps}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
