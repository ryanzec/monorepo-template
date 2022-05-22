import React, { useCallback, useEffect } from 'react';
import { routerUtils } from '$/utils/router';
import { Button } from '$/components/button/button';
import { authenticationContext } from '$/contexts/authentication';
import { ButtonContext } from '$/components/button/common';
import { Container } from '$/views/login-page/login-page.css';

const LoginPage = () => {
  const navigate = routerUtils.useNavigate();
  const { login, loginRedirectUrl, finishLogin } = authenticationContext.useContext();

  const onLogin = useCallback(async () => {
    await login();
  }, [login]);

  useEffect(() => {
    if (!loginRedirectUrl) {
      return;
    }

    navigate(loginRedirectUrl);
    finishLogin();
  }, [navigate, loginRedirectUrl, finishLogin]);

  return (
    <div className={Container} data-id="login-page">
      <Button data-id="login-button" data-context={ButtonContext.SAFE} onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
