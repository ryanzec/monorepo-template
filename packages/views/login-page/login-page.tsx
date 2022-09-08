import React, { useCallback, useEffect } from 'react';

import Button, { ButtonContext } from '$/components/button';
import { authenticationContext } from '$/contexts/authentication';
import { routerUtils } from '$/utils/router';
import { StyledLoginPage } from '$/views/login-page/styles';

const LoginPage = () => {
  const navigate = routerUtils.useNavigate();
  const { login, loginRedirectUrl, finishLogin } = authenticationContext.useContext();

  const onLogin = useCallback(async () => {
    await login();
  }, [login]);

  useEffect(() => {
    console.log(navigate);
    console.log(loginRedirectUrl);
    console.log(finishLogin);
    console.log('----');
    if (!loginRedirectUrl) {
      return;
    }

    navigate(loginRedirectUrl);
    finishLogin();
  }, [navigate, loginRedirectUrl, finishLogin]);

  return (
    <StyledLoginPage data-id="login-page">
      <Button data-id="login-button" context={ButtonContext.SAFE} onClick={onLogin}>
        Login
      </Button>
    </StyledLoginPage>
  );
};

export default LoginPage;
