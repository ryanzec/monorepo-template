import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import React from 'react';

import ButtonIcon from '$/components/button/button-icon';
import styles from '$/components/button/button.module.css';
import { useButtonGroupContext } from '$/components/button/hooks';
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
} from '$/components/button/utils';

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
  const useSize = (buttonGroupContext.isAttached ? buttonGroupContext.size : size) ?? DEFAULT_BUTTON_SIZE;
  const isLoading = state === ButtonState.IS_LOADING;

  // certain variant (like ghost and links) don't work well with attached group (as their styling does not make them
  // seem attached) so we need to revert to the group variant if one of those is defined on the button itself
  const useVariant =
    (buttonGroupContext.isAttached && !isValidAttachedVariant(variant) ? buttonGroupContext.variant : variant) ??
    DEFAULT_BUTTON_VARIANT;

  return (
    <button
      className={classnames(styles['button'], {
        [styles.small]: useSize === ButtonSize.SMALL,
        [styles.medium]: useSize === ButtonSize.MEDIUM,
        [styles.large]: useSize === ButtonSize.LARGE,
        [styles.primary]: context === ButtonContext.PRIMARY && useVariant !== ButtonVariant.LINK,
        [styles.safe]: context === ButtonContext.SAFE && useVariant !== ButtonVariant.LINK,
        [styles.warning]: context === ButtonContext.WARNING && useVariant !== ButtonVariant.LINK,
        [styles.danger]: context === ButtonContext.DANGER && useVariant !== ButtonVariant.LINK,
        [styles.primaryOutline]: context === ButtonContext.PRIMARY && useVariant === ButtonVariant.OUTLINE,
        [styles.safeOutline]: context === ButtonContext.SAFE && useVariant === ButtonVariant.OUTLINE,
        [styles.warningOutline]: context === ButtonContext.WARNING && useVariant === ButtonVariant.OUTLINE,
        [styles.dangerOutline]: context === ButtonContext.DANGER && useVariant === ButtonVariant.OUTLINE,
        [styles.primaryGhost]: context === ButtonContext.PRIMARY && useVariant === ButtonVariant.GHOST,
        [styles.safeGhost]: context === ButtonContext.SAFE && useVariant === ButtonVariant.GHOST,
        [styles.warningGhost]: context === ButtonContext.WARNING && useVariant === ButtonVariant.GHOST,
        [styles.dangerGhost]: context === ButtonContext.DANGER && useVariant === ButtonVariant.GHOST,
        [styles.link]: useVariant === ButtonVariant.LINK,
      })}
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
    </button>
  );
};

export default Button;
