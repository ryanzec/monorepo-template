import produce from 'immer';
import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BehaviorSubject } from 'rxjs';

import Button, { ButtonContext } from '$/components/button';
import { User } from '$/data-models/user';
import { reactHooks } from '$/hooks';
import { JsonApiState, jsonApiStoreUtils } from '$/stores/json-api-store';
import { applicationUtils, GlobalVariable } from '$/utils/application';
import { httpUtils } from '$/utils/http';

interface LoginFormData {
  username: string;
  password: string;
}

interface HomeViewState {
  isToggled: boolean;
}

interface TestApiReturns {
  users: Array<User>;
}

const onSubmitForm = (data: LoginFormData) => {
  console.log(data);
};

const HomeView = () => {
  const {
    register,
    handleSubmit,
    // @todo(!!!) error example
    formState: { errors: _errors_ },
  } = useForm<LoginFormData>();
  const stateSubject = useRef<BehaviorSubject<HomeViewState>>(
    new BehaviorSubject<HomeViewState>({
      isToggled: false,
    }),
  );
  const stateStore = reactHooks.useRxSubject(stateSubject.current);
  const testApiSubject = useRef<BehaviorSubject<JsonApiState<TestApiReturns>>>(
    jsonApiStoreUtils.generateSubject({
      makeRequest: async () =>
        await httpUtils.http(`${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/users`),
    }),
  );
  const testApiStore = reactHooks.useRxSubject(testApiSubject.current);

  const toggle = useCallback(() => {
    const state = stateSubject.current.getValue();

    stateSubject.current.next(
      produce(state, (draft) => {
        draft.isToggled = !draft.isToggled;
      }),
    );
  }, []);

  const testApi = useCallback(() => jsonApiStoreUtils.makeRequest(testApiSubject.current), []);

  return (
    <>
      {testApiStore.json && <div data-id="loaded-users">users: {JSON.stringify(testApiStore.json)}</div>}
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
        <Button context={ButtonContext.SAFE} disabled={stateStore.isToggled} data-id="test-api" onClick={testApi}>
          Test API
        </Button>
        <Button context={ButtonContext.DANGER} onClick={toggle} data-id="toggle-test-api">
          Toggle API Button!!!!
        </Button>
      </Button.Group>
    </>
  );
};

export default HomeView;
