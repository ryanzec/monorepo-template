import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

// need to have a specific interface instead of the generic one as react router types require it
export interface AuthenticatedRouteProps {
  isAuthenticated: boolean;
  children: ReactElement | null;
}

export const UnauthenticatedRoute = ({ isAuthenticated, children }: AuthenticatedRouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // need to wrap in Suspense since page components are using
  return children;
};

export default UnauthenticatedRoute;
