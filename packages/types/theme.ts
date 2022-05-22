export interface StyleThemeGenericColor {
  xxxLight: string;
  xxLight: string;
  xLight: string;
  light: string;
  base: string;
  dark: string;
  xDark: string;
  xxDark: string;
  xxxDark: string;
}

export interface StyleThemeColorPalette {
  white: string;
  black: string;
  transparent: string;
  defaultBackgroundColor: string;
  defaultColor: string;
  safe: StyleThemeGenericColor;
  notice: StyleThemeGenericColor;
  warning: StyleThemeGenericColor;
  danger: StyleThemeGenericColor;
  text: {
    light: string;
    dark: string;
    link: string;
    linkHover: string;
  };
}

export interface StyleTheme {
  color: StyleThemeColorPalette;
}

export type ThemeName = 'light' | 'dark';
