import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { authenticationContext } from '$/contexts/authentication';
import { ApplicationLoading } from '$/components/application-loading/application-loading';
import { AuthenticatedRoute } from '$/components/core/authenticated-route';
import { UnauthenticatedRoute } from '$/components/core/unauthenticated-route';
import { ApplicationFrame } from '$/components/application-frame/application-frame';

// the general recommendation for React.lazy() is to us it for large / single use views / components
const HomePage = lazy(() => import('$/views/home-page/home-page'));
const LoginPage = lazy(() => import('$/views/login-page/login-page'));
const LogoutPage = lazy(() => import('$/views/logout-page/logout-page'));
const ComplexFormPage = lazy(() => import('$/views/complex-form-page/complex-form-page'));

export const ApplicationWrapper = () => {
  const { isLoading } = authenticationContext.useContext();

  if (isLoading) {
    return (
      <ApplicationFrame>
        <ApplicationLoading />
      </ApplicationFrame>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <HomePage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/complex-form"
          element={
            <AuthenticatedRoute>
              <ComplexFormPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <LoginPage />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <AuthenticatedRoute>
              <LogoutPage />
            </AuthenticatedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationLoading;
