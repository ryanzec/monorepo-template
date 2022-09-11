import { ThemeProvider } from '@emotion/react';
import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ApplicationFrame from '$/components/application-frame';
import ApplicationLoading from '$/components/application-loading';
import ApplicationRoute from '$/components/application-route';
import { applicationSettingsContext } from '$/contexts/application-settings';
import { authenticationContext } from '$/contexts/authentication';
import { ThemeName } from '$/utils/style';

declare module '@emotion/react' {
  export interface Theme {
    name: ThemeName;
  }
}

// the general recommendation for React.lazy() is to us it for large / single use views / components
const HomePage = lazy(() => import('$/views/home-page/home-page'));
const LoginPage = lazy(() => import('$/views/login-page/login-page'));
const LogoutPage = lazy(() => import('$/views/logout-page/logout-page'));
const ComplexFormPage = lazy(() => import('$/views/complex-form-page/complex-form-page'));

const ApplicationWrapper = () => {
  const { theme } = applicationSettingsContext.useContext();
  const { isLoading } = authenticationContext.useContext();

  return (
    <ThemeProvider theme={{ name: theme }}>
      <BrowserRouter>
        <ApplicationFrame>
          {isLoading && <ApplicationLoading />}
          {!isLoading && (
            <Routes>
              <Route
                path="/"
                element={
                  <ApplicationRoute.Authenticated>
                    <HomePage />
                  </ApplicationRoute.Authenticated>
                }
              />
              <Route
                path="/complex-form"
                element={
                  <ApplicationRoute.Authenticated>
                    <ComplexFormPage />
                  </ApplicationRoute.Authenticated>
                }
              />
              <Route
                path="/login"
                element={
                  <ApplicationRoute.Unauthenticated>
                    <LoginPage />
                  </ApplicationRoute.Unauthenticated>
                }
              />
              <Route
                path="/logout"
                element={
                  <ApplicationRoute.Authenticated>
                    <LogoutPage />
                  </ApplicationRoute.Authenticated>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </ApplicationFrame>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default ApplicationWrapper;
