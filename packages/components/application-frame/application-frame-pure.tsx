import classnames from 'classnames';
import React, { Suspense } from 'react';

import ApplicationFrameNavigation from '$/components/application-frame/application-frame-navigation';
import styles from '$/components/application-frame/application-frame.module.css';
import Button, { ButtonContext } from '$/components/button';
import { ThemeName } from '$/types/styles';

export interface ApplicationFrameProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAuthenticated: boolean;
  theme: ThemeName;
  onToggleTheme: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ApplicationFramePure = ({
  children,
  isAuthenticated,
  theme,
  onToggleTheme,
  onLogout,
  ...restOfProps
}: ApplicationFrameProps) => {
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

export default ApplicationFramePure;
