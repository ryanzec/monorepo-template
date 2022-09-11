import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button, { ButtonContext } from '$/components/button';
import { reactHooks } from '$/hooks';
import { apiUtils } from '$/utils/api';

interface LoginFormData {
  username: string;
  password: string;
}

const onSubmitForm = (data: LoginFormData) => {
  console.log(data);
};

const HomePage = () => {
  const {
    register,
    handleSubmit,
    // @todo(!!!) error example
    formState: { errors },
  } = useForm<LoginFormData>();
  const { isToggled, toggle } = reactHooks.useToggled(false);
  const [loadedPawns, setLoadedPawns] = useState([]);

  console.log(errors);

  return (
    <>
      {loadedPawns.length > 0 && <div data-id="loaded-pawns">loaded pawns: {loadedPawns.length}</div>}
      <label>
        Username <input type="text" {...register('username', { required: true })} />
      </label>
      <label>
        Password <input type="password" {...register('password', { required: true })} />
      </label>
      <Button.Group>
        <Button context={ButtonContext.SAFE} onClick={handleSubmit(onSubmitForm)}>
          Process Form
        </Button>
        <Button
          context={ButtonContext.SAFE}
          disabled={isToggled}
          data-id="test-api"
          onClick={async () => {
            // @todo(feature) backend token validation
            const response = await apiUtils.appApi.get('/pawns');

            console.log(response);

            setLoadedPawns(response.data);
          }}
        >
          Test API
        </Button>
        <Button
          context={ButtonContext.DANGER}
          onClick={() => {
            toggle();
          }}
        >
          Toggle API Button
        </Button>
      </Button.Group>
    </>
  );
};

export default HomePage;
