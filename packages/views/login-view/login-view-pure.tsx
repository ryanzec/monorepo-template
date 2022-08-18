import classnames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button, { ButtonContext } from '$/components/button';
import styles from '$/views/login-view/login-view.module.css';

export interface LoginViewPureProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  login: () => void;
  loginRedirectUrl?: string;
  finishLogin: () => void;
}

const LoginViewPure = ({ login, loginRedirectUrl = '', finishLogin }: LoginViewPureProps) => {
  const navigate = useNavigate();

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
    <div data-id="login-view" className={classnames(styles['page'])}>
      <Button data-id="login-button" context={ButtonContext.SAFE} onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginViewPure;
