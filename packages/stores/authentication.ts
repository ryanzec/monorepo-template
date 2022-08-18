import produce from 'immer';
import { BehaviorSubject } from 'rxjs';

import { applicationUtils, GlobalVariable } from '$/utils/application';
import { HttpMethod, httpUtils } from '$/utils/http';
import { localStorageCacheUtils } from '$/utils/local-storage-cache';

export interface AuthenticateResponseData {
  authenticationToken: string;
}

export interface AuthenticationState {
  isLoading: boolean;
  isAuthenticated: boolean;
  loginRedirectUrl: string;
}

export type AuthenticationSubject = BehaviorSubject<AuthenticationState>;

export const LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY = 'authentication-token';

const initialState: AuthenticationState = {
  isLoading: true,
  isAuthenticated: false,
  loginRedirectUrl: '',
};

const subject = new BehaviorSubject<AuthenticationState>(initialState);

const setIsLoading = (subject: AuthenticationSubject, isLoading: boolean) => {
  const state = subject.getValue();

  subject.next(
    produce(state, (draft) => {
      draft.isLoading = isLoading;
    }),
  );
};

const setIsAuthenticated = (subject: AuthenticationSubject, isAuthenticated: boolean) => {
  const state = subject.getValue();

  subject.next(
    produce(state, (draft) => {
      draft.isAuthenticated = isAuthenticated;
    }),
  );
};

const setLoginRedirectUrl = (subject: AuthenticationSubject, loginRedirectUrl: string) => {
  const state = subject.getValue();

  subject.next(
    produce(state, (draft) => {
      draft.loginRedirectUrl = loginRedirectUrl;
    }),
  );
};

const login = async (subject: AuthenticationSubject) => {
  const state = subject.getValue();

  try {
    const response = await httpUtils.http(
      `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/authenticate`,
      { method: HttpMethod.POST },
    );
    const { authenticationToken } = await httpUtils.parseJson<AuthenticateResponseData>(response);

    localStorageCacheUtils.set(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY, authenticationToken);

    subject.next(
      produce(state, (draft) => {
        draft.isAuthenticated = true;
        draft.loginRedirectUrl = '/home';
      }),
    );

    // @todo(feature) redirect to attempted original page
    // authenticationStoreUtils.setIsAuthenticated(authenticationStoreUtils.subject, true);
    // authenticationStoreUtils.setLoginRedirectUrl(authenticationStoreUtils.subject, '/home');
    // setIsAuthenticated(true);
    // setLoginRedirectUrl('/home');
  } catch (error) {
    // @todo(!!!) error logging
    subject.next(
      produce(state, (draft) => {
        draft.isAuthenticated = false;
        draft.loginRedirectUrl = '/login';
      }),
    );
    // authenticationStoreUtils.setIsAuthenticated(authenticationStoreUtils.subject, false);
    // authenticationStoreUtils.setLoginRedirectUrl(authenticationStoreUtils.subject, '/login');
    // setIsAuthenticated(false);
    // setLoginRedirectUrl('/login');
  }
};

const logout = (subject: AuthenticationSubject) => {
  const state = subject.getValue();

  localStorageCacheUtils.remove(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY);

  subject.next(
    produce(state, (draft) => {
      draft.isAuthenticated = false;
      draft.loginRedirectUrl = '/login';
    }),
  );
  // authenticationStoreUtils.setIsAuthenticated(authenticationStoreUtils.subject, false);
  // authenticationStoreUtils.setLoginRedirectUrl(authenticationStoreUtils.subject, '/login');
  // setIsAuthenticated(false);
  // setLoginRedirectUrl('/login');
};

const finishLogin = (subject: AuthenticationSubject) => {
  const state = subject.getValue();

  subject.next(
    produce(state, (draft) => {
      draft.loginRedirectUrl = '';
    }),
  );
  // authenticationStoreUtils.setLoginRedirectUrl(authenticationStoreUtils.subject, '');
  // setLoginRedirectUrl('');
};

export const authenticationStoreUtils = {
  subject,
  setIsAuthenticated,
  setIsLoading,
  setLoginRedirectUrl,
  login,
  finishLogin,
  logout,
};
