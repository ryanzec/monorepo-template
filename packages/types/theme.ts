import type { NullableTokens } from '@vanilla-extract/css/dist/declarations/src/types';

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
  green: StyleThemeGenericColor;
  blue: StyleThemeGenericColor;
  orange: StyleThemeGenericColor;
  red: StyleThemeGenericColor;
  gray: StyleThemeGenericColor;
  applicationFrame: {
    container: {
      color: string;
    };
    header: {
      backgroundColor: string;
    };
    mainContent: {
      backgroundColor: string;
    };
    navigationItem: {
      color: string;
      colorActive: string;
      colorHover: string;
    };
  };
  input: {
    borderColor: string;
    borderColorActive: string;
  };
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

export enum ThemeName {
  LIGHT = 'light',
  DARK = 'dark',
}
