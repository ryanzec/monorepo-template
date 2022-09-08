import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import ButtonIcon from '$/components/button/button-icon';
import {
  ButtonContext,
  ButtonIconPosition,
  ButtonSize,
  ButtonState,
  ButtonVariant,
  DEFAULT_BUTTON_CONTEXT,
  DEFAULT_BUTTON_ICON_POSITION,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from '$/components/button/common';
import { useButtonGroupContext } from '$/components/button/hooks';
import { StyledButton } from '$/components/button/styles';

export const isValidAttachedVariant = (variant: ButtonVariant): boolean => {
  return variant !== ButtonVariant.GHOST && variant !== ButtonVariant.LINK;
};

export interface ButtonProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  context?: ButtonContext;
  size?: ButtonSize;
  preIcon?: IconDefinition;
  postIcon?: IconDefinition;
  variant?: ButtonVariant;
  disabled?: boolean;
  loadingIconPosition?: ButtonIconPosition;
  state?: ButtonState;
}

export const Button = (props: ButtonProps) => {
  const buttonGroupContext = useButtonGroupContext();

  const {
    children,
    context = DEFAULT_BUTTON_CONTEXT,
    size = DEFAULT_BUTTON_SIZE,
    state = ButtonState.DEFAULT,
    preIcon,
    postIcon,
    variant = DEFAULT_BUTTON_VARIANT,
    disabled = false,
    loadingIconPosition = DEFAULT_BUTTON_ICON_POSITION,
    ...restOfProps
  } = { ...buttonGroupContext, ...props };

  // if button are attached then in order to make sure they look good, we should force all buttons to be the size
  // that was specified in the button group regardless of what the button has defined
  const useSize = buttonGroupContext.isAttached ? buttonGroupContext.size : size;
  const isLoading = state === ButtonState.IS_LOADING;

  // certain variant (like ghost and links) don't work well with attached group (as their styling does not make them
  // seem attached) so we need to revert to the group variant if one of those is defined on the button itself
  const useVariant =
    buttonGroupContext.isAttached && !isValidAttachedVariant(variant) ? buttonGroupContext.variant : variant;

  return (
    <StyledButton
      context={context}
      size={useSize ?? DEFAULT_BUTTON_SIZE}
      variant={useVariant ?? DEFAULT_BUTTON_VARIANT}
      disabled={disabled || isLoading}
      data-id="button"
      {...restOfProps}
    >
      {(preIcon || (isLoading && loadingIconPosition === ButtonIconPosition.PRE)) && (
        <ButtonIcon position={ButtonIconPosition.PRE} isLoading={isLoading} icon={preIcon || faSpinner} />
      )}
      {children}
      {(postIcon || (isLoading && loadingIconPosition === ButtonIconPosition.POST)) && (
        <ButtonIcon position={ButtonIconPosition.POST} isLoading={isLoading} icon={postIcon ?? faSpinner} />
      )}
    </StyledButton>
  );
};

export default Button;
