import * as styleUtils from '$utils/styles';

export interface ApplicationFrameColors {
  container: {
    color: string;
  };
  navigationItem: {
    color: string;
    colorActive: string;
    colorHover: string;
  };
}

export interface ApplicationFrameTheme {
  light: ApplicationFrameColors;
  dark: ApplicationFrameColors;
}

const theme: ApplicationFrameTheme = {
  light: {
    container: {
      color: '#cccccc',
    },
    navigationItem: {
      color: '#666666',
      colorActive: '#ddddddd',
      colorHover: '#dddddd',
    },
  },
  dark: {
    container: {
      color: '#cccccc',
    },
    navigationItem: {
      color: '#666666',
      colorActive: '#ddddddd',
      colorHover: '#ddddddd',
    },
  },
};

export interface ApplicationFrameCss {
  header: {
    padding: string;
    height: string;
  };
  navigation: {
    padding: string;
    width: string;
  };
  navigationIcon: {
    height: string;
  };
  navigationItem: {
    paddingBottom: string;
  };
  mainContent: {
    padding: string;
  };
  theme: ApplicationFrameTheme;
}

export const cssVariables: ApplicationFrameCss = {
  header: {
    padding: styleUtils.getSpacing(2),
    height: '45px',
  },
  navigation: {
    padding: styleUtils.getSpacing(3),
    width: '60px',
  },
  navigationIcon: {
    height: styleUtils.ICON_SIZES.MEDIUM,
  },
  navigationItem: {
    paddingBottom: styleUtils.getSpacing(4),
  },
  mainContent: {
    padding: styleUtils.getSpacing(5),
  },
  theme,
};
