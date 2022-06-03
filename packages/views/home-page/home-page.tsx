import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiUtils } from '$utils/api';
import { useToggledHook } from '$hooks/use-toggled';
import { Button } from '$components/button/button';
import { Button as ButtonLin } from '$components/button/button-lin';
import { ButtonGroup as ButtonGroupLin } from '$components/button/button-group-lin';
import { ButtonContext, ButtonSize, ButtonVariant } from '$components/button/types';

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
  const { isToggled, toggle } = useToggledHook.useToggled(false);
  const [loadedPawns, setLoadedPawns] = useState([]);
  console.log(errors);

  return (
    <>
      {loadedPawns.length > 0 && <div data-id="loaded-pawns">loaded pawns: {loadedPawns.length}</div>}
      <label>Username</label>
      <input type="text" {...register('username', { required: true })} />
      <label>Password</label>
      <input type="password" {...register('password', { required: true })} />
      <Button data-context={ButtonContext.SAFE} onClick={handleSubmit(onSubmitForm)}>
        Process Form
      </Button>
      <Button
        data-context={ButtonContext.SAFE}
        disabled={isToggled}
        data-id="test-api"
        onClick={async () => {
          // @todo(feature) backend token validation
          const response = await apiUtils.appApi.get('/pawns');
          // const response = await apiUtils.appApi.get('/pawns', {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
          // });

          console.log(response);

          setLoadedPawns(response.data);
        }}
      >
        Test API
      </Button>
      <Button
        data-context={ButtonContext.DANGER}
        onClick={() => {
          toggle();
        }}
      >
        Toggle API Button
      </Button>
      <Button data-context={ButtonContext.SAFE}>Emotion</Button>
      <Button data-context={ButtonContext.SAFE} disabled>
        Emotion
      </Button>
      <ButtonLin data-context={ButtonContext.SAFE}>Linaria</ButtonLin>
      <ButtonLin data-context={ButtonContext.SAFE} disabled>
        Linaria
      </ButtonLin>
      <ButtonGroupLin isAttached data-size={ButtonSize.MEDIUM} data-variant={ButtonVariant.OUTLINE}>
        <ButtonLin data-context={ButtonContext.SAFE}>Linaria</ButtonLin>
        <ButtonLin data-context={ButtonContext.SAFE} disabled>
          Linaria
        </ButtonLin>
      </ButtonGroupLin>
    </>
  );
};

export default HomePage;
