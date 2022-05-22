import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Button } from '$components/button/button';
import authenticationContext from '$contexts/authentication';
import { ButtonContext } from '$components/button/types';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoginPage = () => {
  console.log('tes');
  const { login } = authenticationContext.useContext();

  const onLogin = useCallback(async () => {
    await login();
  }, [login]);

  return (
    <Container data-id="login-page">
      <Button data-id="login-button" context={ButtonContext.SAFE} onClick={onLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
