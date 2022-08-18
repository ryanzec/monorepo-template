import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { authenticationContext } from '$/contexts/authentication';
import ApplicationFrame from '$/components/application-frame/application-frame';

// need to have a specific interface instead of the generic one as react router types require it
export interface AuthenticatedRouteProps {
  children: ReactElement | null;
}

export const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const { isAuthenticated } = authenticationContext.useContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <ApplicationFrame>{children}</ApplicationFrame>;
};

export default AuthenticatedRoute;
