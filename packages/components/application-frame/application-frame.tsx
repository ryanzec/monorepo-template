import React, { Suspense, useCallback } from 'react';

import ApplicationFrameNavigation from '$/components/application-frame/application-frame-navigation';
import {
  StyledActions,
  StyledApplicationFrame,
  StyledHeader,
  StyledLogo,
  StyledMainContent,
  StyledSubContainer,
} from '$/components/application-frame/styles';
import Button, { ButtonContext } from '$/components/button';
import { applicationSettingsContext, ApplicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext, AuthenticationContext } from '$/contexts/authentication';
import { ThemeName } from '$/utils/style';

export type ApplicationFrameProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface InternalOnLogoutParams {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  logout: AuthenticationContext['logout'];
}

export const internalOnLogout = ({ event, logout }: InternalOnLogoutParams) => {
  event.preventDefault();
  event.stopPropagation();

  logout();
};

interface InternalOnToggleTheme {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  theme: ApplicationSettingsContext['theme'];
  setTheme: ApplicationSettingsContext['setTheme'];
}

export const internalOnToggleTheme = ({ event, theme, setTheme }: InternalOnToggleTheme) => {
  event.preventDefault();
  event.stopPropagation();

  setTheme(theme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
};

const ApplicationFrame = ({ children, ...restOfProps }: ApplicationFrameProps) => {
  const { isAuthenticated, logout } = authenticationContext.useContext();
  const { theme, setTheme } = applicationSettingsContext.useContext();

  const onLogout = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      internalOnLogout({ event, logout });
    },
    [logout],
  );

  const onToggleTheme = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      internalOnToggleTheme({ event, theme, setTheme });
    },
    [setTheme, theme],
  );

  return (
    <StyledApplicationFrame data-id="frame" {...restOfProps}>
      {isAuthenticated && <ApplicationFrameNavigation />}
      <StyledSubContainer>
        {isAuthenticated && (
          <StyledHeader data-id="header">
            <StyledLogo>LOGO TODO</StyledLogo>
            <StyledActions data-id="actions">
              <Button data-id="toggle-theme" context={ButtonContext.PRIMARY} onClick={onToggleTheme}>
                Toggle Theme (current: {theme})
              </Button>
              <Button data-id="logout" context={ButtonContext.DANGER} onClick={onLogout}>
                Logout
              </Button>
            </StyledActions>
          </StyledHeader>
        )}
        <StyledMainContent>
          <Suspense fallback={'Loading...'}>{children}</Suspense>
        </StyledMainContent>
      </StyledSubContainer>
    </StyledApplicationFrame>
  );
};

export default ApplicationFrame;
