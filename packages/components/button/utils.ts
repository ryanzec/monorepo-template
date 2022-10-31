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
