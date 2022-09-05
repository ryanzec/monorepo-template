import React, { Suspense, useCallback } from 'react';

import ApplicationFrameNavigation from '$/components/application-frame/application-frame-navigation';
import { styles } from '$/components/application-frame/application-frame.css';
import Button, { ButtonContext } from '$/components/button';
import { applicationSettingsContext, ApplicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext, AuthenticationContext } from '$/contexts/authentication';
import { ThemeName } from '$/types/theme';
import { darkTheme, lightTheme } from '$/utils/theme.css';

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

  setTheme(theme === 'light' ? ThemeName.DARK : ThemeName.LIGHT);
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

  const themeClassName = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div className={`${styles.Container} ${themeClassName}`} data-id="frame" {...restOfProps}>
      {isAuthenticated && <ApplicationFrameNavigation />}
      <div className={styles.SubContainer}>
        {isAuthenticated && (
          <div className={styles.Header} data-id="header">
            <div className={styles.Logo}>LOGO TODO</div>
            <div className={styles.Actions} data-id="actions">
              <Button data-id="toggle-theme" data-context={ButtonContext.PRIMARY} onClick={onToggleTheme}>
                Toggle Theme (current: {theme})
              </Button>
              <Button data-id="logout" data-context={ButtonContext.DANGER} onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        )}
        <div className={styles.MainContent}>
          <Suspense fallback={'Loading...'}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFrame;
