import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import ApplicationFrame from '$/components/application-frame';
import { ThemeName } from '$/types/styles';
import { storybookUtils } from '$/utils/storybook';

export default {
  title: 'Packages/Components/ApplicationFrame',
  component: ApplicationFrame,
  decorators: [storybookUtils.ReactRouterDecorator],
};

export const NotAuthenticated = () => {
  const isAuthenticated = false;
  const [theme, _setTheme_] = useState(ThemeName.LIGHT);
  const onToggleTheme = () => {};
  const onLogout = () => {};

  return (
    <ApplicationFrame.Pure
      isAuthenticated={isAuthenticated}
      theme={theme}
      onToggleTheme={onToggleTheme}
      onLogout={onLogout}
    />
  );
};

export const Authenticated = () => {
  const location = useLocation();
  const isAuthenticated = true;
  const [theme, setTheme] = useState(ThemeName.LIGHT);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const onToggleTheme = useCallback(() => {
    setTheme(theme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
  }, [theme]);
  const onLogout = useCallback(() => {
    setLogoutClicked(true);
  }, []);

  return (
    <ApplicationFrame.Pure
      isAuthenticated={isAuthenticated}
      theme={theme}
      onToggleTheme={onToggleTheme}
      onLogout={onLogout}
    >
      {location && <div data-id="pathname">{location.pathname}</div>}
      {logoutClicked && <div data-id="logout-clicked">logout clicked</div>}
    </ApplicationFrame.Pure>
  );
};
