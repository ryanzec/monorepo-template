import classnames from 'classnames';
import React, { Suspense, useCallback } from 'react';

import ApplicationFrameNavigation from '$/components/application-frame/application-frame-navigation';
import styles from '$/components/application-frame/application-frame.module.css';
import Button, { ButtonContext } from '$/components/button';
import { applicationSettingsContext, ApplicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext, AuthenticationContext } from '$/contexts/authentication';
import { ThemeName } from '$/types/styles';

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
    <div data-id="application-frame" className={classnames(styles['application-frame'])} {...restOfProps}>
      {isAuthenticated && <ApplicationFrameNavigation />}
      <div className={classnames(styles['sub-container'])}>
        {isAuthenticated && (
          <div data-id="header" className={classnames(styles['header'])}>
            <div className={classnames(styles['header-logo'])}>LOGO TODO</div>
            <div className={classnames(styles['header-actions'])} data-id="actions">
              <Button data-id="toggle-theme" context={ButtonContext.PRIMARY} onClick={onToggleTheme}>
                Toggle Theme (current: {theme})
              </Button>
              <Button data-id="logout" context={ButtonContext.DANGER} onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        )}
        <div className={classnames(styles['main-content'])}>
          <Suspense fallback={'Loading...'}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFrame;
