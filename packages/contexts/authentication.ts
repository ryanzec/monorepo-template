import { useState, useCallback, useEffect } from 'react';

import { CustomReactContext, ReactUseState, ReactContextImplementation } from '$/types/react';
import { apiUtils } from '$/utils/api';
import { defaultValuesUtils } from '$/utils/default-values';
import { localStorageCacheUtils } from '$/utils/local-storage-cache';
import { reactUtils } from '$/utils/react';

export const LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY = 'authentication-token';

export interface AuthenticationContext {
  isLoading: boolean;
  isAuthenticated: boolean;
  loginRedirectUrl: string | null;
  login: () => void;
  logout: () => void;
  finishLogin: () => void;
}

const defaultValues: AuthenticationContext = {
  isLoading: true,
  isAuthenticated: false,
  loginRedirectUrl: null,
  login: defaultValuesUtils.noop,
  logout: defaultValuesUtils.noop,
  finishLogin: defaultValuesUtils.noop,
};

export type CreateAuthenticationContextFunc = () => ReactContextImplementation<AuthenticationContext>;

const createContext: CreateAuthenticationContextFunc = () =>
  reactUtils.buildContext<AuthenticationContext>(defaultValues, () => {
    const [isLoading, setIsLoading]: ReactUseState<boolean> = useState<boolean>(defaultValues.isLoading);
    const [isAuthenticated, setIsAuthenticated]: ReactUseState<boolean> = useState<boolean>(
      defaultValues.isAuthenticated,
    );
    const [loginRedirectUrl, setLoginRedirectUrl]: ReactUseState<string | null> = useState<string | null>(null);

    const login = useCallback(async () => {
      // @todo(!!!) error logging

      const {
        data: { authenticationToken },
      } = await apiUtils.appApi.post('/authenticate');

      localStorageCacheUtils.set(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY, authenticationToken);

      // @todo(feature) redirect to attempted original page
      setIsAuthenticated(true);
      setLoginRedirectUrl('/home');
    }, [setLoginRedirectUrl]);

    const logout = useCallback(() => {
      // @todo(!!!) error logging

      localStorageCacheUtils.remove(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY);

      setIsAuthenticated(false);
      setLoginRedirectUrl('/login');
    }, []);

    const finishLogin = useCallback(() => {
      setLoginRedirectUrl(null);
    }, []);

    // check for the valid existing authentication
    useEffect(() => {
      const cachedAuthenticationToken = localStorageCacheUtils.get(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY);

      if (!cachedAuthenticationToken) {
        setIsAuthenticated(false);
        setIsLoading(false);

        return;
      }

      const checkAuthentication = async () => {
        try {
          await apiUtils.appApi.get(`/authenticate/${cachedAuthenticationToken}`);

          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (error) {
          // @todo(feature) authenticate validation error ui notification
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      };

      // @todo(investigate) the ignored promise here is fine, useEffect does not allow for an async function but
      // @todo(investigate) validating the session require async functionality so until I can think of a different
      // @todo(investigate) pattern here, should be fine
      checkAuthentication();
    }, [setIsAuthenticated, setIsLoading, setLoginRedirectUrl]);

    return {
      isLoading,
      isAuthenticated,
      loginRedirectUrl,
      login,
      logout,
      finishLogin,
    };
  });

const defaultContext = createContext();

export const authenticationContext: CustomReactContext<AuthenticationContext, CreateAuthenticationContextFunc> = {
  ...defaultContext,
  createContext,
};
