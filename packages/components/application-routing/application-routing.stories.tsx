import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';

import ApplicationRouting from '$/components/application-routing';

export default {
  title: 'Packages/Components/ApplicationRouting',
  component: ApplicationRouting,
};

export const Authenticated = () => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <ApplicationRouting.AuthenticatedRoutePure isAuthenticated={true}>
              <div data-id="default-route">default route</div>
            </ApplicationRouting.AuthenticatedRoutePure>
          }
        />
        <Route
          path="/login"
          element={
            <ApplicationRouting.UnauthenticatedRoutePure isAuthenticated={true}>
              <div data-id="login-route">login route</div>
            </ApplicationRouting.UnauthenticatedRoutePure>
          }
        />
        <Route
          path="/home"
          element={
            <ApplicationRouting.AuthenticatedRoutePure isAuthenticated={true}>
              <div data-id="home-route">home route</div>
            </ApplicationRouting.AuthenticatedRoutePure>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

export const AuthenticatedRedirects = () => {
  return (
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route
          path="/"
          element={
            <ApplicationRouting.AuthenticatedRoutePure isAuthenticated={true}>
              <div data-id="default-route">default route</div>
            </ApplicationRouting.AuthenticatedRoutePure>
          }
        />
        <Route
          path="/login"
          element={
            <ApplicationRouting.UnauthenticatedRoutePure isAuthenticated={true}>
              <div data-id="login-route">login route</div>
            </ApplicationRouting.UnauthenticatedRoutePure>
          }
        />
        <Route
          path="/home"
          element={
            <ApplicationRouting.AuthenticatedRoutePure isAuthenticated={true}>
              <div data-id="home-route">home route</div>
            </ApplicationRouting.AuthenticatedRoutePure>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

export const UnauthenticatedRedirects = () => {
  return (
    <MemoryRouter initialEntries={['/home']}>
      <Routes>
        <Route
          path="/"
          element={
            <ApplicationRouting.AuthenticatedRoutePure isAuthenticated={false}>
              <div data-id="default-route">default route</div>
            </ApplicationRouting.AuthenticatedRoutePure>
          }
        />
        <Route
          path="/login"
          element={
            <ApplicationRouting.UnauthenticatedRoutePure isAuthenticated={false}>
              <div data-id="login-route">login route</div>
            </ApplicationRouting.UnauthenticatedRoutePure>
          }
        />
        <Route
          path="/home"
          element={
            <ApplicationRouting.AuthenticatedRoutePure isAuthenticated={false}>
              <div data-id="home-route">home route</div>
            </ApplicationRouting.AuthenticatedRoutePure>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};
