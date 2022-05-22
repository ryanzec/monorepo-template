import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { appApi } from '$utils/api';
import authenticationContext from '$contexts/authentication';
import { useToggled } from '$hooks/use-toggled';
import { Button } from '$components/button/button';
import { ButtonContext } from '$components/button/types';

export interface LoginFormData {
  username: string;
  password: string;
}

export const onSubmitForm = (data: LoginFormData) => {
  console.log(data);
};

export const HomePage = () => {
  const {
    register,
    handleSubmit,
    // @todo(!!!) error example
    formState: { errors },
  } = useForm<LoginFormData>();
  const { isToggled, toggle } = useToggled(false);
  const { getAccessToken } = authenticationContext.useContext();
  const [loadedPawns, setLoadedPawns] = useState([]);
  console.log(errors);

  return (
    <>
      {loadedPawns.length > 0 && <div data-id="loaded-pawns">loaded pawns: {loadedPawns.length}</div>}
      <label>Username</label>
      <input type="text" {...register('username', { required: true })} />
      <label>Password</label>
      <input type="password" {...register('password', { required: true })} />
      <Button context={ButtonContext.SAFE} onClick={handleSubmit(onSubmitForm)}>
        Process Form
      </Button>
      <Button
        context={ButtonContext.SAFE}
        disabled={isToggled}
        data-id="test-api"
        onClick={async () => {
          const accessToken = await getAccessToken();

          console.log(accessToken);

          if (!accessToken) {
            // @todo(!!!) error logging
            return;
          }

          console.log(accessToken);

          const response = await appApi.get('/pawns', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log(response);

          setLoadedPawns(response.data);
        }}
      >
        Test API
      </Button>
      <Button
        context={ButtonContext.SAFE}
        disabled={isToggled}
        onClick={async () => {
          const accessToken = await getAccessToken();

          if (!accessToken) {
            // @todo(!!!) error logging
            return;
          }

          const response = await appApi.get('/admin.generateBackendTokens', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log(response);
        }}
      >
        Generate Backend Tokens
      </Button>
      <Button
        context={ButtonContext.DANGER}
        onClick={() => {
          toggle();
        }}
      >
        Toggle API Button
      </Button>
    </>
  );
};

export default HomePage;
