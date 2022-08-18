import React, { ReactElement } from 'react';

import UnauthenticatedRoutePure from '$/components/application-routing/unauthenticated-route-pure';
import { reactHooks } from '$/hooks';
import { authenticationStoreUtils } from '$/stores/authentication';

// need to have a specific interface instead of the generic one as react router types require it
export interface AuthenticatedRouteProps {
  children: ReactElement | null;
}

export const UnauthenticatedRoute = (props: AuthenticatedRouteProps) => {
  const authenticateState = reactHooks.useRxSubject(authenticationStoreUtils.subject);

  return <UnauthenticatedRoutePure isAuthenticated={authenticateState.isAuthenticated} {...props} />;
};

export default UnauthenticatedRoute;
