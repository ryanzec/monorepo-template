import React, { useCallback } from 'react';

import { reactHooks } from '$/hooks';
import { authenticationStoreUtils } from '$/stores/authentication';
import LoginViewPure from '$/views/login-view/login-view-pure';

const LoginView = () => {
  const authenticateState = reactHooks.useRxSubject(authenticationStoreUtils.subject);

  const login = useCallback(() => {
    authenticationStoreUtils.login(authenticationStoreUtils.subject);
  }, []);

  const finishLogin = useCallback(() => {
    authenticationStoreUtils.finishLogin(authenticationStoreUtils.subject);
  }, []);

  return (
    <LoginViewPure login={login} finishLogin={finishLogin} loginRedirectUrl={authenticateState.loginRedirectUrl} />
  );
};

export default LoginView;
