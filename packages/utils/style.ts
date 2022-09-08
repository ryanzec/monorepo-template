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

export enum ThemeName {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeVariablesContract {
  color: {
    white: string;
    black: string;
    transparent: string;
    green: {
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
    blue: {
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
    orange: {
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
    red: {
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
    gray: {
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

const lightGrayColorPalette: StyleThemeGenericColor = {
  xxxLight: '#e9e9e9',
  xxLight: '#d2d2d2',
  xLight: '#afafaf',
  light: '#919191',
  base: '#777777',
  dark: '#636363',
  xDark: '#484848',
  xxDark: '#282828',
  xxxDark: '#191919',
};

export const lightTheme: ThemeVariablesContract = {
  color: {
    white: 'white',
    black: 'black',
    transparent: 'transparent',
    green: lightGreenColorPalette,
    blue: lightBlueColorPalette,
    orange: lightOrangeColorPalette,
    red: lightRedColorPalette,
    gray: lightGrayColorPalette,
    applicationFrame: {
      container: {
        color: lightGrayColorPalette.xxLight,
      },
      header: {
        backgroundColor: lightGrayColorPalette.xxxDark,
      },
      mainContent: {
        backgroundColor: lightGrayColorPalette.xxDark,
      },
      navigationItem: {
        color: lightGrayColorPalette.xLight,
        colorActive: lightGrayColorPalette.xxxLight,
        colorHover: lightGrayColorPalette.xxxLight,
      },
    },
    input: {
      borderColor: 'black',
      borderColorActive: lightBlueColorPalette.xDark,
    },
    text: {
      light: 'white',
      dark: 'black',
      link: lightBlueColorPalette.dark,
      linkHover: lightBlueColorPalette.xxDark,
    },
  },
};

// @todo(feature) have actually dark colors (right now they are just light colors label as dark ones)
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

const darkGrayColorPalette: StyleThemeGenericColor = {
  xxxLight: '#e9e9e9',
  xxLight: '#d2d2d2',
  xLight: '#afafaf',
  light: '#919191',
  base: '#777777',
  dark: '#636363',
  xDark: '#484848',
  xxDark: '#282828',
  xxxDark: '#191919',
};

export const darkTheme: ThemeVariablesContract = {
  color: {
    white: 'white',
    black: 'black',
    transparent: 'transparent',
    green: darkOrangeColorPalette,
    blue: darkOrangeColorPalette,
    orange: darkOrangeColorPalette,
    red: darkOrangeColorPalette,
    gray: darkGrayColorPalette,
    applicationFrame: {
      container: {
        color: darkGrayColorPalette.xxLight,
      },
      header: {
        backgroundColor: darkGrayColorPalette.xxxDark,
      },
      mainContent: {
        backgroundColor: darkGrayColorPalette.xxDark,
      },
      navigationItem: {
        color: darkGrayColorPalette.xLight,
        colorActive: darkGrayColorPalette.xxxLight,
        colorHover: darkGrayColorPalette.xxxLight,
      },
    },
    input: {
      borderColor: 'black',
      borderColorActive: darkBlueColorPalette.xDark,
    },
    text: {
      light: 'white',
      dark: 'black',
      link: darkBlueColorPalette.light,
      linkHover: darkBlueColorPalette.xxLight,
    },
  },
};

interface Theme {
  light: ThemeVariablesContract;
  dark: ThemeVariablesContract;
}

export const theme: Theme = {
  light: lightTheme,
  dark: darkTheme,
};

const SPACING_INTERVAL = 4;

const getSpacing = (level: number): string => {
  return `${level * SPACING_INTERVAL}px`;
};

export enum BorderRadius {
  SMALL = '3px',
  MEDIUM = '5px',
  LARGE = '10px',
  PILL = '999px',
  ROUND = '50%',
}

export enum IconSizes {
  SMALL = '16px',
  MEDIUM = '24px',
  LARGE = '32px',
}

export const styleUtils = {
  getSpacing,
};
