import { style } from '@vanilla-extract/css';
import { cssVariables } from '$/components/application-frame/common';
import { themeVariables } from '$/utils/theme.css';
import { styleUtils } from '$/utils/style';

export const applicationFrameCss = {
  Container: style({
    color: themeVariables.color.applicationFrame.container.color,
    height: '100vh',
    width: '100vw',
    display: 'flex',
  }),
  SubContainer: style({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  }),
  Header: style({
    backgroundColor: themeVariables.color.applicationFrame.header.backgroundColor,
    flex: `0 0 ${cssVariables.header.height}`,
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    padding: cssVariables.header.padding,
  }),
  Logo: style({}),
  Actions: style({
    marginLeft: 'auto',
  }),
  MainContent: style({
    backgroundColor: themeVariables.color.applicationFrame.mainContent.backgroundColor,
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: cssVariables.mainContent.padding,
  }),
  Navigation: style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: themeVariables.color.applicationFrame.header.backgroundColor,
    flex: `0 0 ${cssVariables.navigation.width}`,
    alignSelf: 'stretch',
    padding: cssVariables.navigation.padding,
  }),
  NavigationItem: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    color: themeVariables.color.applicationFrame.navigationItem.color,
    selectors: {
      ['&:not(:last-child)']: {
        paddingBottom: cssVariables.navigationItem.paddingBottom,
      },
      ['&:hover,&:focus']: {
        color: themeVariables.color.applicationFrame.navigationItem.colorHover,
      },
      ['&:active']: {
        color: themeVariables.color.applicationFrame.navigationItem.colorActive,
      },
    },
  }),
  NavigationItemSvg: style({
    height: cssVariables.navigationIcon.height,
    marginBottom: styleUtils.getSpacing(1),
  }),
};
