import { BORDER_RADIUS, darkTheme, lightTheme } from '$utils/styles';
import * as styleUtils from '$utils/styles';

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

const theme: ButtonTheme = {
  light: {
    primary: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.notice.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.notice.dark,
        backgroundColorPressed: lightTheme.color.notice.xDark,
      },
      outline: {
        color: lightTheme.color.notice.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.notice.dark,
        backgroundColorHover: lightTheme.color.notice.xxxLight,
        backgroundColorPressed: lightTheme.color.notice.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
    safe: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.safe.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.safe.dark,
        backgroundColorPressed: lightTheme.color.safe.xDark,
      },
      outline: {
        color: lightTheme.color.safe.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.safe.dark,
        backgroundColorHover: lightTheme.color.safe.xxxLight,
        backgroundColorPressed: lightTheme.color.safe.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
    warning: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.warning.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.warning.dark,
        backgroundColorPressed: lightTheme.color.warning.xDark,
      },
      outline: {
        color: lightTheme.color.warning.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.warning.dark,
        backgroundColorHover: lightTheme.color.warning.xxxLight,
        backgroundColorPressed: lightTheme.color.warning.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
    danger: {
      solid: {
        color: lightTheme.color.text.light,
        backgroundColor: lightTheme.color.danger.base,
        borderColor: lightTheme.color.transparent,
        backgroundColorHover: lightTheme.color.danger.dark,
        backgroundColorPressed: lightTheme.color.danger.xDark,
      },
      outline: {
        color: lightTheme.color.danger.dark,
        backgroundColor: lightTheme.color.transparent,
        borderColor: lightTheme.color.danger.dark,
        backgroundColorHover: lightTheme.color.danger.xxxLight,
        backgroundColorPressed: lightTheme.color.danger.xxLight,
      },
      link: lightLinkButtonColorSet,
    },
  },
  dark: {
    primary: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.notice.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.notice.dark,
        backgroundColorPressed: darkTheme.color.notice.xDark,
      },
      outline: {
        color: darkTheme.color.notice.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.notice.dark,
        backgroundColorHover: darkTheme.color.notice.xxxLight,
        backgroundColorPressed: darkTheme.color.notice.xxLight,
      },
      link: darkLinkButtonColorSet,
    },
    safe: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.safe.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.safe.dark,
        backgroundColorPressed: darkTheme.color.safe.xDark,
      },
      outline: {
        color: darkTheme.color.safe.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.safe.dark,
        backgroundColorHover: darkTheme.color.safe.xxxLight,
        backgroundColorPressed: darkTheme.color.safe.xxLight,
      },
      link: darkLinkButtonColorSet,
    },
    warning: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.warning.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.warning.dark,
        backgroundColorPressed: darkTheme.color.warning.xDark,
      },
      outline: {
        color: darkTheme.color.warning.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.warning.dark,
        backgroundColorHover: darkTheme.color.warning.xxxLight,
        backgroundColorPressed: darkTheme.color.warning.xxLight,
      },
      link: darkLinkButtonColorSet,
    },
    danger: {
      solid: {
        color: darkTheme.color.text.light,
        backgroundColor: darkTheme.color.danger.base,
        borderColor: darkTheme.color.transparent,
        backgroundColorHover: darkTheme.color.danger.dark,
        backgroundColorPressed: darkTheme.color.danger.xDark,
      },
      outline: {
        color: darkTheme.color.danger.dark,
        backgroundColor: darkTheme.color.transparent,
        borderColor: darkTheme.color.danger.dark,
        backgroundColorHover: darkTheme.color.danger.xxxLight,
        backgroundColorPressed: darkTheme.color.danger.xxLight,
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
    margin: {
      pre: `0 ${styleUtils.getSpacing(1)} 0 0`,
      post: `0 0 0 ${styleUtils.getSpacing(1)}`,
    },
  },
  theme,
};
