import styled from '@emotion/styled';

import { styleUtils, darkTheme, lightTheme, IconSizes } from '$/utils/style';

interface Theme {
  container: {
    color: string;
    backgroundColor: string;
  };
  header: {
    backgroundColor: string;
  };
  navigation: {
    backgroundColor: string;
  };
  navigationItem: {
    color: string;
    colorActive: string;
    colorHover: string;
  };
}

interface CssVariables {
  header: {
    height: string;
    padding: string;
  };
  mainContent: {
    padding: string;
  };
  navigation: {
    width: string;
    padding: string;
  };
  navigationIcon: {
    height: string;
  };
  navigationItem: {
    paddingBottom: string;
  };
  theme: {
    light: Theme;
    dark: Theme;
  };
}

const cssVariables: CssVariables = {
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
  theme: {
    light: {
      container: {
        color: lightTheme.color.applicationFrame.container.color,
        backgroundColor: lightTheme.color.applicationFrame.mainContent.backgroundColor,
      },
      header: {
        backgroundColor: lightTheme.color.applicationFrame.header.backgroundColor,
      },
      navigation: {
        backgroundColor: lightTheme.color.applicationFrame.header.backgroundColor,
      },
      navigationItem: {
        color: lightTheme.color.applicationFrame.navigationItem.color,
        colorActive: lightTheme.color.applicationFrame.navigationItem.colorHover,
        colorHover: lightTheme.color.applicationFrame.navigationItem.colorActive,
      },
    },
    dark: {
      container: {
        color: darkTheme.color.applicationFrame.container.color,
        backgroundColor: darkTheme.color.applicationFrame.mainContent.backgroundColor,
      },
      header: {
        backgroundColor: darkTheme.color.applicationFrame.header.backgroundColor,
      },
      navigation: {
        backgroundColor: darkTheme.color.applicationFrame.header.backgroundColor,
      },
      navigationItem: {
        color: darkTheme.color.applicationFrame.navigationItem.color,
        colorActive: darkTheme.color.applicationFrame.navigationItem.colorHover,
        colorHover: darkTheme.color.applicationFrame.navigationItem.colorActive,
      },
    },
  },
};

export const StyledApplicationFrame = styled.div`
  color: ${(props) => cssVariables.theme[props.theme.name].container.color};
  background-color: ${(props) => cssVariables.theme[props.theme.name].container.backgroundColor};
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const StyledSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const StyledHeader = styled.div`
  background-color: ${(props) => cssVariables.theme[props.theme.name].header.backgroundColor};
  flex: 0 0 ${cssVariables.header.height};
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: ${cssVariables.header.padding};
`;

export const StyledLogo = styled.div``;

export const StyledActions = styled.div`
  margin-left: auto;
`;

export const StyledMainContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: ${cssVariables.mainContent.padding};
`;

export const StyledNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => cssVariables.theme[props.theme.name].navigation.backgroundColor};
  flex: 0 0 ${cssVariables.navigation.width};
  align-self: stretch;
  padding: ${cssVariables.navigation.padding};
`;

export const StyledNavigationItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => cssVariables.theme[props.theme.name].navigationItem.color};

  &:not(:last-child) {
    padding-bottom: ${cssVariables.navigationItem.paddingBottom};
  }

  &:hover,
  &:focus {
    color: ${(props) => cssVariables.theme[props.theme.name].navigationItem.colorHover};
  }
  &:active {
    color: ${(props) => cssVariables.theme[props.theme.name].navigationItem.colorActive};
  }

  & svg {
    height: ${cssVariables.navigationIcon.height};
    margin-bottom: ${styleUtils.getSpacing(1)};
  }
`;
