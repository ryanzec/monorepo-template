import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ApplicationLoading from '$/components/application-loading';
import AuthenticatedRoute from '$/components/application-routing/authenticated-route';
import UnauthenticatedRoute from '$/components/application-routing/unauthenticated-route';
import { reactHooks } from '$/hooks';
import { authenticationStoreUtils } from '$/stores/authentication';

// the general recommendation for React.lazy() is to us it for large / single use views / components
const HomePage = lazy(() => import('$/views/home-view'));
const LoginPage = lazy(() => import('$/views/login-view'));
const LogoutPage = lazy(() => import('$/views/logout-view'));
const ComplexFormPage = lazy(() => import('$/views/complex-form-view'));

export interface ApplicationRoutingProps {
  // no enforced structure for the wrapper element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapperElement: (props: any) => JSX.Element;
}

const ApplicationRouting = ({ wrapperElement: WrapperElement }: ApplicationRoutingProps) => {
  const authenticateState = reactHooks.useRxSubject(authenticationStoreUtils.subject);

  return (
    <BrowserRouter>
      <WrapperElement>
        {authenticateState.isLoading && <ApplicationLoading />}
        {!authenticateState.isLoading && (
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
        )}
      </WrapperElement>
    </BrowserRouter>
  );
};

export default ApplicationRouting;
