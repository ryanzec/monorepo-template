import { BorderRadius, styleUtils } from '$/utils/style';

export enum ButtonContext {
  PRIMARY = 'primary',
  SAFE = 'safe',
  WARNING = 'warning',
  DANGER = 'danger',
}

export const DEFAULT_BUTTON_CONTEXT = ButtonContext.PRIMARY;

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export const DEFAULT_BUTTON_SIZE = ButtonSize.MEDIUM;

export enum ButtonVariant {
  SOLID = 'solid',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  LINK = 'link',
}

export const DEFAULT_BUTTON_VARIANT = ButtonVariant.SOLID;

export enum ButtonIconPosition {
  PRE = 'pre',
  POST = 'post',
}

export const DEFAULT_BUTTON_ICON_POSITION = ButtonIconPosition.PRE;

export enum ButtonState {
  DEFAULT = 'default',
  IS_LOADING = 'is-loading',
}

interface ButtonCss {
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
    marginVan: string;
    margin: {
      pre: string;
      post: string;
    };
  };
}

export const cssVariables: ButtonCss = {
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
    marginVan: styleUtils.getSpacing(1),
    margin: {
      pre: `0 ${styleUtils.getSpacing(1)} 0 0`,
      post: `0 0 0 ${styleUtils.getSpacing(1)}`,
    },
  },
};
