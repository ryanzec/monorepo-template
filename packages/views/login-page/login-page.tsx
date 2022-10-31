import classnames from 'classnames';
import React, { useCallback, useEffect } from 'react';

import Button, { ButtonContext } from '$/components/button';
import { authenticationContext } from '$/contexts/authentication';
import { routerUtils } from '$/utils/router';
import styles from '$/views/login-page/login-page.module.css';

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
    <div data-id="login-page" className={classnames(styles['page'])}>
      <Button data-id="login-button" context={ButtonContext.SAFE} onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
