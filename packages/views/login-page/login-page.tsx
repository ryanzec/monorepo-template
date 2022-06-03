import React, { useCallback, useEffect } from 'react';
import { routerUtils } from '$utils/router';
import styled from '@emotion/styled';
import { Button } from '$components/button/button';
import { authenticationContext } from '$contexts/authentication';
import { ButtonContext } from '$components/button/types';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

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
  }, [navigate, loginRedirectUrl]);

  return (
    <Container data-id="login-page">
      <Button data-id="login-button" data-context={ButtonContext.SAFE} onClick={onLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
