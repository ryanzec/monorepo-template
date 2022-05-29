import React, { ReactNode } from 'react';
import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { RequiresChildrenComponent } from '$types/react';
import { ButtonIconPosition, ButtonContext, ButtonSize, ButtonVariant } from '$components/button/types';
import { theme } from '$utils/style';
import { cssVariables, ButtonColorSet } from '$components/button/styles';
import { useButtonGroupContext } from '$components/button/hooks';
import { Theme, withTheme } from '@emotion/react';
import { ThemeName } from '$types/theme';

export const isValidAttachedVariant = (variant: ButtonVariant): boolean => {
  return variant !== ButtonVariant.GHOST && variant !== ButtonVariant.LINK;
};

export interface ButtonContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  context: ButtonContext;
  size: ButtonSize;
  variant: ButtonVariant;
  colorVariant: ButtonVariant;
  isLink: boolean;
  themeName: ThemeName;
}

export const Container = styled.button<ButtonContainerProps>`
  border-radius: ${cssVariables.container.borderRadius};
  padding: ${(props) => cssVariables.container.padding[props.size]};
  font-size: ${(props) => cssVariables.container.fontSize[props.size]};
  display: inline-flex;
  align-items: center;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: 1px solid
    ${(props) =>
      props.variant === ButtonVariant.GHOST
        ? 'transparent'
        : cssVariables.theme[props.themeName][props.context][props.variant].borderColor};
  background-color: ${(props) =>
    cssVariables.theme[props.themeName][props.context][props.colorVariant].backgroundColor};
  color: ${(props) => cssVariables.theme[props.themeName][props.context][props.colorVariant].color};

  &:hover,
  &:focus {
    background-color: ${(props) =>
      cssVariables.theme[props.themeName][props.context][props.colorVariant].backgroundColorHover};
    color: ${(props) => (props.isLink ? theme[props.themeName].color.text.linkHover : 'inherit')};
  }

  &:active {
    background-color: ${(props) =>
      cssVariables.theme[props.themeName][props.context][props.colorVariant].backgroundColorPressed};
  }
`;

export const DisbaledCss = css`
  opacity: 0.5;
  cursor: not-allowed;
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
    animation-name: ${(props) => (props.isLoading ? 'spin' : 'none')};
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
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
  theme: Theme;
}

export const ButtonInternal = (props: ButtonProps & RequiresChildrenComponent) => {
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
    theme,
    ...restOfProps
  } = { ...buttonGroupContext, ...props };

  // if button are attached then in order to make sure they look good, we should force all buttons to be the size
  // that was specified in the button group regardless of what the button has defined
  const useSize = buttonGroupContext.isAttached ? buttonGroupContext.size : size;

  // certain variant (like ghost and links) don't work well with attached group (as their styling does not make them
  // seem attached) so we need to revert to the group variant if one of those is defined on the button itself
  const useVariant =
    buttonGroupContext.isAttached && !isValidAttachedVariant(variant) ? buttonGroupContext.variant : variant;

  ///
  const colorVariant = props.variant === ButtonVariant.GHOST ? ButtonVariant.OUTLINE : useVariant;
  const isLink = props.variant === ButtonVariant.LINK;
  ///

  return (
    <Container
      context={context}
      size={useSize}
      variant={useVariant}
      disabled={disabled || isLoading}
      data-id="button"
      colorVariant={colorVariant}
      isLink={isLink}
      themeName={theme.name}
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

export const Button = withTheme(ButtonInternal);

export default Button;
