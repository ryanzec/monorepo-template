import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { RequiresChildrenComponent } from '$types/react';
import { ButtonIconPosition, ButtonContext, ButtonSize, ButtonVariant } from '$components/button/types';
import { theme } from '$utils/styles';
import { cssVariables, ButtonColorSet } from '$components/button/styles';
import { useButtonGroupContext } from '$components/button/hooks';

export const isValidAttachedVariant = (variant: ButtonVariant): boolean => {
  return variant !== ButtonVariant.GHOST && variant !== ButtonVariant.LINK;
};

export interface ButtonContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  context: ButtonContext;
  size: ButtonSize;
  variant: ButtonVariant;
}

export const Container = styled.button<ButtonContainerProps>`
  border-radius: ${cssVariables.container.borderRadius};
  padding: ${(props) => cssVariables.container.padding[props.size]};
  font-size: ${(props) => cssVariables.container.fontSize[props.size]};
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  // disabled state
  ${(props) => {
    if (!props.disabled) {
      return null;
    }

    return css`
      opacity: 0.5;
      cursor: not-allowed;
    `;
  }}

  // theme related styles
  ${(props) => {
    // since we want ghost button to match outline button except they have no border, instead of duplicating a bit of
    // the outline styles, we just track if it is ghost here and then re-use the outline styles and explicit hidden the
    // border
    const variantToUse = props.variant === ButtonVariant.GHOST ? ButtonVariant.OUTLINE : props.variant;
    const isGhost = props.variant === ButtonVariant.GHOST;
    const isLink = props.variant === ButtonVariant.LINK;
    const colors: ButtonColorSet = cssVariables.theme[props.theme.name][props.context][variantToUse];

    return css`
      border: 1px solid ${isGhost ? 'transparent' : colors.borderColor};
      background-color: ${colors.backgroundColor};
      color: ${colors.color};

      &:hover,
      &:focus {
        background-color: ${colors.backgroundColorHover};
        ${isLink && `color: ${theme[props.theme.name].color.text.linkHover};`}
      }

      &:active {
        background-color: ${colors.backgroundColorPressed};
      }
    `;
  }}
`;

export interface ButtonIconProps {
  position: ButtonIconPosition;
  isLoading: boolean;
}

export const Icon = styled.span<ButtonIconProps>`
  display: inline-flex;

  svg {
    width: 16px;
    height: 16px;
    margin: ${(props) => cssVariables.icon.margin[props.position]};

    ${(props) => {
      if (!props.isLoading) {
        return null;
      }

      return css`
        animation-name: spin;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      `;
    }}
  }
`;

export interface ButtonProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  context?: ButtonContext;
  size?: ButtonSize;
  preIcon?: ReactNode;
  postIcon?: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  loadingIconPosition?: ButtonIconPosition;
}

export const Button = (props: ButtonProps & RequiresChildrenComponent) => {
  const buttonGroupContext = useButtonGroupContext();

  const {
    children,
    context = ButtonContext.SAFE,
    size = ButtonSize.MEDIUM,
    preIcon,
    postIcon,
    variant = ButtonVariant.SOLID,
    disabled = false,
    isLoading = false,
    loadingIconPosition = ButtonIconPosition.PRE,
    ...restOfProps
  } = { ...buttonGroupContext, ...props };

  // if button are attached then in order to make sure they look good, we should force all buttons to be the size
  // that was specified in the button group regardless of what the button has defined
  const useSize = buttonGroupContext.isAttached ? buttonGroupContext.size : size;

  // certain variant (like ghost and links) don't work well with attached group (as their styling does not make them
  // seem attached) so we need to revert to the group variant if one of those is defined on the button itself
  const useVariant =
    buttonGroupContext.isAttached && !isValidAttachedVariant(variant) ? buttonGroupContext.variant : variant;

  return (
    <Container
      context={context}
      size={useSize}
      variant={useVariant}
      disabled={disabled || isLoading}
      data-id="button"
      {...restOfProps}
    >
      {isLoading && loadingIconPosition === ButtonIconPosition.PRE && (
        <Icon data-id="pre-loading-icon" position={ButtonIconPosition.PRE} isLoading={true}>
          <FontAwesomeIcon icon={faSpinner} />
        </Icon>
      )}
      {!isLoading && preIcon && (
        <Icon data-id="pre-icon" position={ButtonIconPosition.PRE} isLoading={false}>
          {preIcon}
        </Icon>
      )}
      {children}
      {!isLoading && postIcon && (
        <Icon data-id="post-icon" position={ButtonIconPosition.POST} isLoading={false}>
          {postIcon}
        </Icon>
      )}
      {isLoading && loadingIconPosition === ButtonIconPosition.POST && (
        <Icon data-id="post-loading-icon" position={ButtonIconPosition.POST} isLoading={true}>
          <FontAwesomeIcon icon={faSpinner} />
        </Icon>
      )}
    </Container>
  );
};

export default Button;
