import { NullableTokens } from '@vanilla-extract/css/dist/declarations/src/types';

export type StyleThemeGenericColor = {
  xxxLight: string;
  xxLight: string;
  xLight: string;
  light: string;
  base: string;
  dark: string;
  xDark: string;
  xxDark: string;
  xxxDark: string;
};

export type StyleThemeColorPalette = {
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
};

export type StyleTheme = {
  color: StyleThemeColorPalette;
};

export type StyleThemeVan =
  | {
      color: StyleThemeColorPalette;
    }
  | NullableTokens;

export type ThemeName = 'light' | 'dark';
