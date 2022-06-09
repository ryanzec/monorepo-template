import { BORDER_RADIUS, darkTheme, lightTheme } from '$utils/style';
import { styleUtils } from '$utils/style';

export type ButtonColorSet = {
  color: string;
  backgroundColor: string;
  borderColor: string;
  backgroundColorHover: string;
  backgroundColorPressed: string;
};

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

type NewButtonContextTheme = {
  color: string;
  borderColor: string;
  backgroundColor: string;
  backgroundColorActive: string;
  backgroundColorFocused: string;
  colorOutline: string;
  backgroundColorOutline: string;
  borderColorOutline: string;
  backgroundColorOutlineActive: string;
  backgroundColorOutlineFocused: string;
};

export type ButtonThemeVanilla = {
  primary: NewButtonContextTheme;
  safe: NewButtonContextTheme;
  warning: NewButtonContextTheme;
  danger: NewButtonContextTheme;
  link: ButtonColorSet;
};

interface ButtonTheme {
  light: {
    primary: NewButtonContextTheme;
    safe: NewButtonContextTheme;
    warning: NewButtonContextTheme;
    danger: NewButtonContextTheme;
    link: ButtonColorSet;
  };
  dark: {
    primary: NewButtonContextTheme;
    safe: NewButtonContextTheme;
    warning: NewButtonContextTheme;
    danger: NewButtonContextTheme;
    link: ButtonColorSet;
  };
}

const theme: ButtonTheme = {
  light: {
    primary: {
      color: lightTheme.color.text.light,
      borderColor: lightTheme.color.notice.base,
      backgroundColor: lightTheme.color.notice.base,
      backgroundColorActive: lightTheme.color.notice.xDark,
      backgroundColorFocused: lightTheme.color.notice.dark,
      colorOutline: lightTheme.color.notice.dark,
      backgroundColorOutline: lightTheme.color.transparent,
      borderColorOutline: lightTheme.color.notice.dark,
      backgroundColorOutlineActive: lightTheme.color.notice.xxLight,
      backgroundColorOutlineFocused: lightTheme.color.notice.xxxLight,
    },
    safe: {
      color: lightTheme.color.text.light,
      borderColor: lightTheme.color.safe.base,
      backgroundColor: lightTheme.color.safe.base,
      backgroundColorActive: lightTheme.color.safe.xDark,
      backgroundColorFocused: lightTheme.color.safe.dark,
      colorOutline: lightTheme.color.safe.dark,
      backgroundColorOutline: lightTheme.color.transparent,
      borderColorOutline: lightTheme.color.safe.dark,
      backgroundColorOutlineActive: lightTheme.color.safe.xxLight,
      backgroundColorOutlineFocused: lightTheme.color.safe.xxxLight,
    },
    warning: {
      color: lightTheme.color.text.light,
      borderColor: lightTheme.color.warning.base,
      backgroundColor: lightTheme.color.warning.base,
      backgroundColorActive: lightTheme.color.warning.xDark,
      backgroundColorFocused: lightTheme.color.warning.dark,
      colorOutline: lightTheme.color.warning.dark,
      backgroundColorOutline: lightTheme.color.transparent,
      borderColorOutline: lightTheme.color.warning.dark,
      backgroundColorOutlineActive: lightTheme.color.warning.xxLight,
      backgroundColorOutlineFocused: lightTheme.color.warning.xxxLight,
    },
    danger: {
      color: lightTheme.color.text.light,
      borderColor: lightTheme.color.danger.base,
      backgroundColor: lightTheme.color.danger.base,
      backgroundColorActive: lightTheme.color.danger.xDark,
      backgroundColorFocused: lightTheme.color.danger.dark,
      colorOutline: lightTheme.color.danger.dark,
      backgroundColorOutline: lightTheme.color.transparent,
      borderColorOutline: lightTheme.color.danger.dark,
      backgroundColorOutlineActive: lightTheme.color.danger.xxLight,
      backgroundColorOutlineFocused: lightTheme.color.danger.xxxLight,
    },
    link: lightLinkButtonColorSet,
  },
  dark: {
    primary: {
      color: darkTheme.color.text.light,
      borderColor: darkTheme.color.warning.base,
      backgroundColor: darkTheme.color.warning.base,
      backgroundColorActive: darkTheme.color.warning.xDark,
      backgroundColorFocused: darkTheme.color.warning.dark,
      colorOutline: darkTheme.color.warning.dark,
      backgroundColorOutline: darkTheme.color.transparent,
      borderColorOutline: darkTheme.color.warning.dark,
      backgroundColorOutlineActive: darkTheme.color.warning.xxLight,
      backgroundColorOutlineFocused: darkTheme.color.warning.xxxLight,
    },
    safe: {
      color: darkTheme.color.text.light,
      borderColor: darkTheme.color.warning.base,
      backgroundColor: darkTheme.color.warning.base,
      backgroundColorActive: darkTheme.color.warning.xDark,
      backgroundColorFocused: darkTheme.color.warning.dark,
      colorOutline: darkTheme.color.warning.dark,
      backgroundColorOutline: darkTheme.color.transparent,
      borderColorOutline: darkTheme.color.warning.dark,
      backgroundColorOutlineActive: darkTheme.color.warning.xxLight,
      backgroundColorOutlineFocused: darkTheme.color.warning.xxxLight,
    },
    warning: {
      color: darkTheme.color.text.light,
      borderColor: darkTheme.color.warning.base,
      backgroundColor: darkTheme.color.warning.base,
      backgroundColorActive: darkTheme.color.warning.xDark,
      backgroundColorFocused: darkTheme.color.warning.dark,
      colorOutline: darkTheme.color.warning.dark,
      backgroundColorOutline: darkTheme.color.transparent,
      borderColorOutline: darkTheme.color.warning.dark,
      backgroundColorOutlineActive: darkTheme.color.warning.xxLight,
      backgroundColorOutlineFocused: darkTheme.color.warning.xxxLight,
    },
    danger: {
      color: darkTheme.color.text.light,
      borderColor: darkTheme.color.warning.base,
      backgroundColor: darkTheme.color.warning.base,
      backgroundColorActive: darkTheme.color.warning.xDark,
      backgroundColorFocused: darkTheme.color.warning.dark,
      colorOutline: darkTheme.color.warning.dark,
      backgroundColorOutline: darkTheme.color.transparent,
      borderColorOutline: darkTheme.color.warning.dark,
      backgroundColorOutlineActive: darkTheme.color.warning.xxLight,
      backgroundColorOutlineFocused: darkTheme.color.warning.xxxLight,
    },
    link: darkLinkButtonColorSet,
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
    marginVan: string;
    margin: {
      pre: string;
      post: string;
    };
  };
  theme: ButtonTheme;
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
    borderRadius: BORDER_RADIUS.MEDIUM,
  },
  icon: {
    marginVan: styleUtils.getSpacing(1),
    margin: {
      pre: `0 ${styleUtils.getSpacing(1)} 0 0`,
      post: `0 0 0 ${styleUtils.getSpacing(1)}`,
    },
  },
  theme,
};
