import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonVariant } from '$/components/button/common';
import { BorderRadius, darkTheme, lightTheme, styleUtils, theme } from '$/utils/style';

export interface ButtonColorSet {
  color: string;
  backgroundColor: string;
  borderColor: string;
  backgroundColorHover: string;
  backgroundColorPressed: string;
}

export interface ButtonColorSetGroup {
  solid: ButtonColorSet;
  outline: ButtonColorSet;
  link: ButtonColorSet;
}

export interface ButtonColors {
  primary: ButtonColorSetGroup;
  safe: ButtonColorSetGroup;
  warning: ButtonColorSetGroup;
  danger: ButtonColorSetGroup;
}

export interface ButtonTheme {
  light: ButtonColors;
  dark: ButtonColors;
}

const lightLinkButtonColorSet: ButtonColorSet = {
  color: lightTheme.color.text.link,
  backgroundColor: lightTheme.color.transparent,
  borderColor: lightTheme.color.transparent,
  backgroundColorHover: lightTheme.color.transparent,
  backgroundColorPressed: lightTheme.color.transparent,
};

const darkLinkButtonColorSet: ButtonColorSet = {
  color: darkTheme.color.text.link,
  backgroundColor: darkTheme.color.transparent,
  borderColor: darkTheme.color.transparent,
  backgroundColorHover: darkTheme.color.transparent,
  backgroundColorPressed: darkTheme.color.transparent,
};

const buttonTheme: ButtonTheme = {
  light: {
    primary: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.blue.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.blue.dark,
        backgroundColorPressed: lightTheme.color.blue.xDark,
      },
      outline: {
        color: lightTheme.color.blue.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.blue.dark,
        backgroundColorHover: lightTheme.color.blue.xxxLight,
        backgroundColorPressed: lightTheme.color.blue.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
    safe: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.green.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.green.dark,
        backgroundColorPressed: lightTheme.color.green.xDark,
      },
      outline: {
        color: lightTheme.color.green.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.green.dark,
        backgroundColorHover: lightTheme.color.green.xxxLight,
        backgroundColorPressed: lightTheme.color.green.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
    warning: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.orange.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.orange.dark,
        backgroundColorPressed: lightTheme.color.orange.xDark,
      },
      outline: {
        color: lightTheme.color.orange.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.orange.dark,
        backgroundColorHover: lightTheme.color.orange.xxxLight,
        backgroundColorPressed: lightTheme.color.orange.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
    danger: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.red.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.red.dark,
        backgroundColorPressed: lightTheme.color.red.xDark,
      },
      outline: {
        color: lightTheme.color.red.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.red.dark,
        backgroundColorHover: lightTheme.color.red.xxxLight,
        backgroundColorPressed: lightTheme.color.red.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
  },
  dark: {
    primary: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.orange.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.orange.dark,
        backgroundColorPressed: darkTheme.color.orange.xDark,
      },
      outline: {
        color: darkTheme.color.orange.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.orange.dark,
        backgroundColorHover: darkTheme.color.orange.xxxLight,
        backgroundColorPressed: darkTheme.color.orange.xxLight,
      },
      link: darkLinkButtonColorSet,
    },
    safe: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.orange.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.orange.dark,
        backgroundColorPressed: darkTheme.color.orange.xDark,
      },
      outline: {
        color: darkTheme.color.orange.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.orange.dark,
        backgroundColorHover: darkTheme.color.orange.xxxLight,
        backgroundColorPressed: darkTheme.color.orange.xxLight,
      },
      link: darkLinkButtonColorSet,
    },
    warning: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.orange.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.orange.dark,
        backgroundColorPressed: darkTheme.color.orange.xDark,
      },
      outline: {
        color: darkTheme.color.orange.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.orange.dark,
        backgroundColorHover: darkTheme.color.orange.xxxLight,
        backgroundColorPressed: darkTheme.color.orange.xxLight,
      },
      link: darkLinkButtonColorSet,
    },
    danger: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.orange.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.orange.dark,
        backgroundColorPressed: darkTheme.color.orange.xDark,
      },
      outline: {
        color: darkTheme.color.orange.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.orange.dark,
        backgroundColorHover: darkTheme.color.orange.xxxLight,
        backgroundColorPressed: darkTheme.color.orange.xxLight,
      },
      link: darkLinkButtonColorSet,
    },
  },
};

export interface ButtonCss {
  container: {
    padding: {
      small: string;
      medium: string;
      large: string;
    };
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
    borderRadius: string;
  };
  icon: {
    margin: {
      pre: string;
      post: string;
    };
  };
  theme: ButtonTheme;
}

const cssVariables: ButtonCss = {
  container: {
    padding: {
      small: `${styleUtils.getSpacing(1)} ${styleUtils.getSpacing(2)}`,
      medium: `${styleUtils.getSpacing(2)} ${styleUtils.getSpacing(3)}`,
      large: `${styleUtils.getSpacing(2)} ${styleUtils.getSpacing(5)}`,
    },
    fontSize: {
      small: '12px',
      medium: '14px',
      large: '24px;',
    },
    borderRadius: BorderRadius.MEDIUM,
  },
  icon: {
    margin: {
      pre: `0 ${styleUtils.getSpacing(1)} 0 0`,
      post: `0 0 0 ${styleUtils.getSpacing(1)}`,
    },
  },
  theme: buttonTheme,
};

interface StyledButtonContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  context: ButtonContext;
  size: ButtonSize;
  variant: ButtonVariant;
}

export const StyledButton = styled.button<StyledButtonContainerProps>`
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

interface StyledButtonGroupContainer {
  isAttached: boolean;
}

export const StyledButtonGroup = styled.div<StyledButtonGroupContainer>`
  display: inline-flex;
  align-items: center;

  ${(props) => {
    if (props.isAttached) {
      return css`
        ${StyledButton} {
          border-radius: 0;
          :first-child {
            border-radius: ${cssVariables.container.borderRadius} 0 0 ${cssVariables.container.borderRadius};
          }
          :last-child {
            border-radius: 0 ${cssVariables.container.borderRadius} ${cssVariables.container.borderRadius} 0;
          }
        }
      `;
    }
    return css`
      ${StyledButton} {
        margin-right: ${styleUtils.getSpacing(1)};
      }
    `;
  }}
`;

interface StyledButtonIconProps {
  position: ButtonIconPosition;
  isLoading: boolean;
}

export const StyledButtonIcon = styled(FontAwesomeIcon)<StyledButtonIconProps>`
  display: inline-flex;
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
`;
