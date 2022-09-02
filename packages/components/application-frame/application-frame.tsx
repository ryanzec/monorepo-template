import React, { Suspense, useCallback } from 'react';

import ApplicationFrameNavigation from '$/components/application-frame/application-frame-navigation';
import { styles } from '$/components/application-frame/application-frame.css';
import Button, { ButtonContext } from '$/components/button';
import { applicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext } from '$/contexts/authentication';
import { ThemeName } from '$/types/theme';
import { darkTheme, lightTheme } from '$/utils/theme.css';

export type ApplicationFrameProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ApplicationFrame = ({ children, ...restOfProps }: ApplicationFrameProps) => {
  const { isAuthenticated, logout } = authenticationContext.useContext();
  const { theme, setTheme } = applicationSettingsContext.useContext();

  const onLogout = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      logout();
    },
    [logout],
  );

  const onToggleTheme = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      setTheme(theme === 'light' ? ThemeName.DARK : ThemeName.LIGHT);
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
