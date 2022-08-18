import { styleUtils, IconSizes } from '$/utils/style';

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
    height: IconSizes.MEDIUM,
  },
  navigationItem: {
    paddingBottom: styleUtils.getSpacing(4),
  },
  mainContent: {
    padding: styleUtils.getSpacing(5),
  },
};
