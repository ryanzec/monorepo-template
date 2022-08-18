import React from 'react';

import { authenticationContext } from '$/contexts/authentication';

type AuthenticationWrapperProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const AuthenticationWrapper = ({ children }: AuthenticationWrapperProps) => {
  return <authenticationContext.Provider>{children}</authenticationContext.Provider>;
};

export default AuthenticationWrapper;
