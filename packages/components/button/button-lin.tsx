import React, { ReactNode } from 'react';
import { styled } from '@linaria/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { RequiresChildrenComponent } from '$types/react';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$components/button/types';
import { theme } from '$utils/style';
import { cssVariables } from '$components/button/styles';
import { useButtonGroupContext } from '$components/button/hooks';
import { Theme, withTheme } from '@emotion/react';
import { ThemeName } from '$types/theme';

export const isValidAttachedVariant = (variant: ButtonVariant): boolean => {
  return variant !== ButtonVariant.GHOST && variant !== ButtonVariant.LINK;
};

export interface ButtonContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  'data-context': ButtonContext;
  'data-size': ButtonSize;
  'data-variant': ButtonVariant;
  themeName: ThemeName;
}

export const Container = styled.button<ButtonContainerProps>`
  border-radius: ${cssVariables.container.borderRadius};
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &[data-size='${ButtonSize.SMALL}'] {
    padding: ${cssVariables.container.padding[ButtonSize.SMALL]};
    font-size: ${cssVariables.container.fontSize[ButtonSize.SMALL]};
  }

  &[data-size='${ButtonSize.MEDIUM}'] {
    padding: ${cssVariables.container.padding[ButtonSize.MEDIUM]};
    font-size: ${cssVariables.container.fontSize[ButtonSize.MEDIUM]};
  }

  &[data-size='${ButtonSize.LARGE}'] {
    padding: ${cssVariables.container.padding[ButtonSize.LARGE]};
    font-size: ${cssVariables.container.fontSize[ButtonSize.LARGE]};
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-context='${ButtonContext.SAFE}'] {
    border-color: ${(props) => cssVariables.theme[props.themeName].safe.borderColor};
    background-color: ${(props) => cssVariables.theme[props.themeName].safe.backgroundColor};
    color: ${(props) => cssVariables.theme[props.themeName].safe.color};

    &:hover {
      background-color: ${(props) => cssVariables.theme[props.themeName].safe.backgroundColorFocused};
    }

    &:active {
      background-color: ${(props) => cssVariables.theme[props.themeName].safe.backgroundColorActive};
    }

    &[data-variant='${ButtonVariant.GHOST}'],
    &[data-variant='${ButtonVariant.OUTLINE}'] {
      color: ${(props) => cssVariables.theme[props.themeName].safe.colorOutline};
      background-color: ${(props) => cssVariables.theme[props.themeName].safe.backgroundColorOutline};

      &:hover {
        background-color: ${(props) => cssVariables.theme[props.themeName].safe.backgroundColorOutlineFocused};
      }

      &:active {
        background-color: ${(props) => cssVariables.theme[props.themeName].safe.backgroundColorOutlineActive};
      }
    }
  }

  &[data-context='${ButtonContext.PRIMARY}'] {
    border-color: ${(props) => cssVariables.theme[props.themeName].primary.borderColor};
    background-color: ${(props) => cssVariables.theme[props.themeName].primary.backgroundColor};
    color: ${(props) => cssVariables.theme[props.themeName].primary.color};

    &:hover {
      background-color: ${(props) => cssVariables.theme[props.themeName].primary.backgroundColorFocused};
    }

    &:active {
      background-color: ${(props) => cssVariables.theme[props.themeName].primary.backgroundColorActive};
    }

    &[data-variant='${ButtonVariant.GHOST}'],
    &[data-variant='${ButtonVariant.OUTLINE}'] {
      color: ${(props) => cssVariables.theme[props.themeName].primary.colorOutline};
      background-color: ${(props) => cssVariables.theme[props.themeName].primary.backgroundColorOutline};

      &:hover {
        background-color: ${(props) => cssVariables.theme[props.themeName].primary.backgroundColorOutlineFocused};
      }

      &:active {
        background-color: ${(props) => cssVariables.theme[props.themeName].primary.backgroundColorOutlineActive};
      }
    }
  }

  &[data-context='${ButtonContext.WARNING}'] {
    border-color: ${(props) => cssVariables.theme[props.themeName].warning.borderColor};
    background-color: ${(props) => cssVariables.theme[props.themeName].warning.backgroundColor};
    color: ${(props) => cssVariables.theme[props.themeName].warning.color};

    &:hover {
      background-color: ${(props) => cssVariables.theme[props.themeName].warning.backgroundColorFocused};
    }

    &:active {
      background-color: ${(props) => cssVariables.theme[props.themeName].warning.backgroundColorActive};
    }

    &[data-variant='${ButtonVariant.GHOST}'],
    &[data-variant='${ButtonVariant.OUTLINE}'] {
      color: ${(props) => cssVariables.theme[props.themeName].warning.colorOutline};
      background-color: ${(props) => cssVariables.theme[props.themeName].warning.backgroundColorOutline};

      &:hover {
        background-color: ${(props) => cssVariables.theme[props.themeName].warning.backgroundColorOutlineFocused};
      }

      &:active {
        background-color: ${(props) => cssVariables.theme[props.themeName].warning.backgroundColorOutlineActive};
      }
    }
  }

  &[data-context='${ButtonContext.DANGER}'] {
    border-color: ${(props) => cssVariables.theme[props.themeName].danger.borderColor};
    background-color: ${(props) => cssVariables.theme[props.themeName].danger.backgroundColor};
    color: ${(props) => cssVariables.theme[props.themeName].danger.color};

    &:hover {
      background-color: ${(props) => cssVariables.theme[props.themeName].danger.backgroundColorFocused};
    }

    &:active {
      background-color: ${(props) => cssVariables.theme[props.themeName].danger.backgroundColorActive};
    }

    &[data-variant='${ButtonVariant.GHOST}'],
    &[data-variant='${ButtonVariant.OUTLINE}'] {
      color: ${(props) => cssVariables.theme[props.themeName].danger.colorOutline};
      background-color: ${(props) => cssVariables.theme[props.themeName].danger.backgroundColorOutline};

      &:hover {
        background-color: ${(props) => cssVariables.theme[props.themeName].danger.backgroundColorOutlineFocused};
      }

      &:active {
        background-color: ${(props) => cssVariables.theme[props.themeName].danger.backgroundColorOutlineActive};
      }
    }
  }

  &&[data-variant='${ButtonVariant.GHOST}'] {
    border-color: transparent;
  }

  &&[data-variant='${ButtonVariant.LINK}'] {
    color: ${(props) => theme[props.themeName]?.color.text.link};
    background-color: black;
    border-color: transparent;

    &:hover {
      color: ${(props) => theme[props.themeName]?.color.text.linkHover};
      text-decoration: underline;
    }
  }
`;

export interface ButtonIconProps {
  position: ButtonIconPosition;
  'data-state': ButtonState;
}

export const Icon = styled.span<ButtonIconProps>`
  display: inline-flex;

  svg {
    width: 16px;
    height: 16px;
    margin: ${(props) => cssVariables.icon.margin[props.position]};
  }

  &[data-state='is-loading'] {
    svg {
      animation-name: spin;
      animation-duration: 2000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
`;

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
  theme: Theme;
}

export const ButtonInternal = (props: ButtonProps & RequiresChildrenComponent) => {
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
    theme,
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
    <Container
      data-context={dataContext}
      data-size={useSize}
      data-variant={useVariant}
      disabled={disabled || isLoading}
      data-id="button"
      themeName={theme.name}
      {...restOfProps}
    >
      {isLoading && loadingIconPosition === ButtonIconPosition.PRE && (
        <Icon data-id="pre-loading-icon" position={ButtonIconPosition.PRE} data-state={dataState}>
          <FontAwesomeIcon icon={faSpinner} />
        </Icon>
      )}
      {!isLoading && preIcon && (
        <Icon data-id="pre-icon" position={ButtonIconPosition.PRE} data-state={dataState}>
          {preIcon}
        </Icon>
      )}
      {children}
      {!isLoading && postIcon && (
        <Icon data-id="post-icon" position={ButtonIconPosition.POST} data-state={dataState}>
          {postIcon}
        </Icon>
      )}
      {isLoading && loadingIconPosition === ButtonIconPosition.POST && (
        <Icon data-id="post-loading-icon" position={ButtonIconPosition.POST} data-state={dataState}>
          <FontAwesomeIcon icon={faSpinner} />
        </Icon>
      )}
    </Container>
  );
};

export const Button = withTheme(ButtonInternal);

export default Button;
