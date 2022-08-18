import React, { ReactElement } from 'react';

import AuthenticatedRoutePure from '$/components/application-routing/authenticated-route-pure';
import { reactHooks } from '$/hooks';
import { authenticationStoreUtils } from '$/stores/authentication';

// need to have a specific interface instead of the generic one as react router types require it
export interface AuthenticatedRouteProps {
  children: ReactElement | null;
}

export const AuthenticatedRoute = (props: AuthenticatedRouteProps) => {
  const authenticateState = reactHooks.useRxSubject(authenticationStoreUtils.subject);

  return <AuthenticatedRoutePure isAuthenticated={authenticateState.isAuthenticated} {...props} />;
};

export default AuthenticatedRoute;
