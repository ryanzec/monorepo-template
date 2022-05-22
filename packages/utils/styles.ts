import { StyleTheme, StyleThemeGenericColor } from '$types/theme';

const SPACING_INTERVAL = 4;

export const getSpacing = (level: number): string => {
  return `${level * SPACING_INTERVAL}px`;
};

export enum BORDER_RADIUS {
  SMALL = '3px',
  MEDIUM = '5px',
  LARGE = '10px',
  PILL = '999px',
  ROUND = '50%',
}

export enum ICON_SIZES {
  SMALL = '16px',
  MEDIUM = '24px',
  LARGE = '32px',
}

const lightGreenColorPalette: StyleThemeGenericColor = {
  xxxLight: '#edf6ed',
  xxLight: '#caeac8',
  xLight: '#89da7f',
  light: '#6abd60',
  base: '#54a14c',
  dark: '#44883d',
  xDark: '#377531',
  xxDark: '#1f461b',
  xxxDark: '#0d2d0a',
};

const lightBlueColorPalette: StyleThemeGenericColor = {
  xxxLight: '#e5ecf5',
  xxLight: '#bbd4f1',
  xLight: '#61a0e7',
  light: '#4c8ace',
  base: '#4079b7',
  dark: '#346396',
  xDark: '#294e77',
  xxDark: '#19334f',
  xxxDark: '#0a213a',
};

const lightOrangeColorPalette: StyleThemeGenericColor = {
  xxxLight: '#fdf7f0',
  xxLight: '#f5e0ca',
  xLight: '#ef9f4f',
  light: '#e88b2e',
  base: '#de7d1c',
  dark: '#b96714',
  xDark: '#93510e',
  xxDark: '#522c06',
  xxxDark: '#2d1803',
};

const lightRedColorPalette: StyleThemeGenericColor = {
  xxxLight: '#f6ecec',
  xxLight: '#f5d1d1',
  xLight: '#ee7777',
  light: '#e15b5b',
  base: '#dc4444',
  dark: '#c23838',
  xDark: '#9f2a2a',
  xxDark: '#491010',
  xxxDark: '#2f0808',
};

export const lightTheme: StyleTheme = {
  color: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    defaultBackgroundColor: '#f1f1f1',
    defaultColor: '#111111',
    safe: lightGreenColorPalette,
    notice: lightBlueColorPalette,
    warning: lightOrangeColorPalette,
    danger: lightRedColorPalette,
    text: {
      light: '#ffffff',
      dark: '#000000',
      link: lightBlueColorPalette.dark,
      linkHover: lightBlueColorPalette.xxDark,
    },
  },
};

const darkGreenColorPalette: StyleThemeGenericColor = {
  xxxLight: '#edf6ed',
  xxLight: '#caeac8',
  xLight: '#89da7f',
  light: '#6abd60',
  base: '#54a14c',
  dark: '#44883d',
  xDark: '#377531',
  xxDark: '#1f461b',
  xxxDark: '#0d2d0a',
};

const darkBlueColorPalette: StyleThemeGenericColor = {
  xxxLight: '#e5ecf5',
  xxLight: '#bbd4f1',
  xLight: '#61a0e7',
  light: '#4c8ace',
  base: '#4079b7',
  dark: '#346396',
  xDark: '#294e77',
  xxDark: '#19334f',
  xxxDark: '#0a213a',
};

const darkOrangeColorPalette: StyleThemeGenericColor = {
  xxxLight: '#fdf7f0',
  xxLight: '#f5e0ca',
  xLight: '#ef9f4f',
  light: '#e88b2e',
  base: '#de7d1c',
  dark: '#b96714',
  xDark: '#93510e',
  xxDark: '#522c06',
  xxxDark: '#2d1803',
};

const darkRedColorPalette: StyleThemeGenericColor = {
  xxxLight: '#f6ecec',
  xxLight: '#f5d1d1',
  xLight: '#ee7777',
  light: '#e15b5b',
  base: '#dc4444',
  dark: '#c23838',
  xDark: '#9f2a2a',
  xxDark: '#491010',
  xxxDark: '#2f0808',
};

export const darkTheme: StyleTheme = {
  color: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    defaultBackgroundColor: '#111111',
    defaultColor: '#f1f1f1',
    safe: darkGreenColorPalette,
    notice: darkBlueColorPalette,
    warning: darkOrangeColorPalette,
    danger: darkRedColorPalette,
    text: {
      light: '#ffffff',
      dark: '#000000',
      link: darkBlueColorPalette.light,
      linkHover: darkBlueColorPalette.xxLight,
    },
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
