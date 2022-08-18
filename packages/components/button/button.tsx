import React, { ReactNode } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { buttonCss } from '$/components/button/button.css';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$/components/button/common';
import { useButtonGroupContext } from '$/components/button/hooks';
import ButtonGroup from '$/components/button/button-group';
import ButtonIcon from '$/components/button/button-icon';

export const isValidAttachedVariant = (variant: ButtonVariant): boolean => {
  return variant !== ButtonVariant.GHOST && variant !== ButtonVariant.LINK;
};

export interface ButtonProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  'data-context'?: ButtonContext;
  'data-size'?: ButtonSize;
  'data-variant'?: ButtonVariant;
  'data-state'?: ButtonState;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  disabled?: boolean;
  loadingIconPosition?: ButtonIconPosition;
}

export const Button = (props: ButtonProps) => {
  const buttonGroupContext = useButtonGroupContext();

  const {
    children,
    'data-context': dataContext = ButtonContext.SAFE,
    'data-size': dataSize = ButtonSize.MEDIUM,
    preIcon,
    postIcon,
    'data-variant': dataVariant = ButtonVariant.SOLID,
    disabled = false,
    'data-state': dataState = ButtonState.DEFAULT,
    loadingIconPosition = ButtonIconPosition.PRE,
    ...restOfProps
  } = { ...buttonGroupContext, ...props };

  // if button are attached then in order to make sure they look good, we should force all buttons to be the size
  // that was specified in the button group regardless of what the button has defined
  const useSize = buttonGroupContext.isAttached ? buttonGroupContext['data-size'] : dataSize;

  // certain variant (like ghost and links) don't work well with attached group (as their styling does not make them
  // seem attached) so we need to revert to the group variant if one of those is defined on the button itself
  const useVariant =
    buttonGroupContext.isAttached && !isValidAttachedVariant(dataVariant)
      ? buttonGroupContext['data-variant']
      : dataVariant;
  const isLoading = dataState === ButtonState.IS_LOADING;

  return (
    <button
      className={buttonCss.container}
      data-context={dataContext}
      data-size={useSize}
      data-variant={useVariant}
      disabled={disabled || isLoading}
      data-id="button"
      {...restOfProps}
    >
      {isLoading && loadingIconPosition === ButtonIconPosition.PRE && (
        <span
          className={buttonCss.icon}
          data-id="pre-loading-icon"
          data-position={ButtonIconPosition.PRE}
          data-state={dataState}
        >
          <ButtonIcon icon={faSpinner} />
        </span>
      )}
      {!isLoading && preIcon && (
        <span
          className={buttonCss.icon}
          data-id="pre-icon"
          data-position={ButtonIconPosition.PRE}
          data-state={dataState}
        >
          {preIcon}
        </span>
      )}
      {children}
      {!isLoading && postIcon && (
        <span
          className={buttonCss.icon}
          data-id="post-icon"
          data-position={ButtonIconPosition.POST}
          data-state={dataState}
        >
          {postIcon}
        </span>
      )}
      {isLoading && loadingIconPosition === ButtonIconPosition.POST && (
        <span
          className={buttonCss.icon}
          data-id="post-loading-icon"
          data-position={ButtonIconPosition.POST}
          data-state={dataState}
        >
          <ButtonIcon icon={faSpinner} />
        </span>
      )}
    </button>
  );
};

export default Object.assign(Button, {
  Group: ButtonGroup,
  Icon: ButtonIcon,
});
