import React, { Suspense, useCallback } from 'react';
import { applicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext } from '$/contexts/authentication';
import { Button } from '$/components/button/button';
import { ButtonContext } from '$/components/button/common';
import { darkTheme, lightTheme } from '$/utils/theme.css';
import { applicationFrameCss } from '$/components/application-frame/application-frame.css';
import ApplicationFrameNavigation from '$/components/application-frame/application-frame-navigation';
import { ThemeName } from '$/types/theme';

export type ApplicationFrameProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ApplicationFrame = ({ children, ...restOfProps }: ApplicationFrameProps) => {
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
    <div className={`${applicationFrameCss.Container} ${themeClassName}`} data-id="frame" {...restOfProps}>
      {isAuthenticated && <ApplicationFrameNavigation />}
      <div className={applicationFrameCss.SubContainer}>
        {isAuthenticated && (
          <div className={applicationFrameCss.Header} data-id="header">
            <div className={applicationFrameCss.Logo}>LOGO TODO</div>
            <div className={applicationFrameCss.Actions} data-id="actions">
              <Button data-id="toggle-theme" data-context={ButtonContext.PRIMARY} onClick={onToggleTheme}>
                Toggle Theme (current: {theme})
              </Button>
              <Button data-id="logout" data-context={ButtonContext.DANGER} onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        )}
        <div className={applicationFrameCss.MainContent}>
          <Suspense fallback={'Loading...'}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFrame;
