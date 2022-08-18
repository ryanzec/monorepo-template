import React, { useCallback, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';

import ApplicationFrame from '$/components/application-frame';
import ApplicationWrapperPure from '$/components/application-wrapper/application-wrapper-pure';
import { ThemeName } from '$/types/styles';
import LoginView from '$/views/login-view';

export default {
  title: 'Packages/Views/LoginView',
  component: LoginView,
};

export const Standard = () => {
  const [finishLoginProcessed, setFinishLoginProcessed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(ThemeName.LIGHT);
  const onToggleTheme = useCallback(() => {
    setTheme((currentValue) => (currentValue === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT));
  }, []);
  const onToggleAuthenticated = useCallback(() => {
    setIsAuthenticated((currentValue) => !currentValue);
  }, []);
  const onFinishLogin = useCallback(() => {
    setFinishLoginProcessed((currentValue) => !currentValue);
  }, []);

  return (
    <ApplicationWrapperPure theme={theme}>
      <MemoryRouter initialEntries={['/']}>
        <ApplicationFrame.Pure
          isAuthenticated={isAuthenticated}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onLogout={onToggleAuthenticated}
        >
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div data-id="finished-login">{finishLoginProcessed ? 'finished login' : ''}</div>
                ) : (
                  <LoginView.Pure login={onToggleAuthenticated} finishLogin={onFinishLogin} />
                )
              }
            />
          </Routes>
        </ApplicationFrame.Pure>
      </MemoryRouter>
    </ApplicationWrapperPure>
  );
};

export const WithRedirect = () => {
  const [finishLoginProcessed, setFinishLoginProcessed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(ThemeName.LIGHT);
  const onToggleTheme = useCallback(() => {
    setTheme((currentValue) => (currentValue === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT));
  }, []);
  const onToggleAuthenticated = useCallback(() => {
    setIsAuthenticated((currentValue) => !currentValue);
  }, []);
  const onFinishLogin = useCallback(() => {
    setFinishLoginProcessed((currentValue) => !currentValue);
  }, []);

  return (
    <ApplicationWrapperPure theme={theme}>
      <MemoryRouter initialEntries={['/']}>
        <ApplicationFrame.Pure
          isAuthenticated={isAuthenticated}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onLogout={onToggleAuthenticated}
        >
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div data-id="finished-login">{finishLoginProcessed ? 'finished login' : ''}</div>
                ) : (
                  <LoginView.Pure
                    login={onToggleAuthenticated}
                    finishLogin={onFinishLogin}
                    loginRedirectUrl="/complex-form"
                  />
                )
              }
            />
            <Route path="/complex-form" element={<div data-id="complex-form">complex form</div>} />
          </Routes>
        </ApplicationFrame.Pure>
      </MemoryRouter>
    </ApplicationWrapperPure>
  );
};
