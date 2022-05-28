import { useState, useCallback, useEffect, useRef } from 'react';

import { CustomReactContext, ReactUseState, ReactContextImplementation } from '$types/react';
import { reactUtils } from '$utils/react';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { defaultValuesUtils } from '$utils/default-values';
import { authenticationUtils } from '$utils/authentication';

export interface AuthenticationContext {
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string> | undefined;
}

const defaultValues: AuthenticationContext = {
  setIsLoading: defaultValuesUtils.noopStateSetter,
  isLoading: true,
  isAuthenticated: false,
  getAccessToken: () => {
    return undefined;
  },
  login: defaultValuesUtils.noop,
  logout: defaultValuesUtils.noop,
};

export type CreateAuthenticationContextFunc = (
  urlQueryString: string,
) => ReactContextImplementation<AuthenticationContext>;

const createContext: CreateAuthenticationContextFunc = (urlQueryString: string) =>
  reactUtils.buildContext<AuthenticationContext>(defaultValues, () => {
    const hasInitialized = useRef(false);
    const [isLoading, setIsLoading]: ReactUseState<boolean> = useState<boolean>(defaultValues.isLoading);
    const [isAuthenticated, setIsAuthenticated]: ReactUseState<boolean> = useState<boolean>(
      defaultValues.isAuthenticated,
    );
    const [authenticationClient, setAuthenticationClient]: ReactUseState<Auth0Client | null> =
      useState<Auth0Client | null>(null);

    const login = useCallback(() => {
      // @todo(!!!) error logging

      authenticationClient?.loginWithRedirect({
        redirect_uri: 'http://localhost:4000',
      });
    }, [authenticationClient]);

    const logout = useCallback(() => {
      // @todo(!!!) error logging

      authenticationClient?.logout({
        returnTo: 'http://localhost:4000/login',
      });
    }, [authenticationClient]);

    const getAccessToken = useCallback(() => {
      return authenticationClient?.getTokenSilently({
        redirect_uri: window.location.origin,
      });
    }, [authenticationClient]);

    // check for the valid existing authentication
    useEffect(() => {
      if (hasInitialized.current) {
        return;
      }

      const checkAuthentication = async () => {
        try {
          // while generally we should be using async / await, this this use case, we are using a promise manually
          // as not sure how (or if possible) to cleanly using async / await in the context of building a context
          // like this
          const auth0 = await authenticationUtils.getClient();
          let isAuthenticated = await auth0.isAuthenticated();

          // auth0 redirects with this data in the url that is needed in order to complete the login process
          if (urlQueryString.includes('code=') && urlQueryString.includes('state=')) {
            // Process the login state
            await auth0.handleRedirectCallback();

            isAuthenticated = await auth0.isAuthenticated();
          }

          setAuthenticationClient(auth0);
          setIsAuthenticated(isAuthenticated);
          setIsLoading(false);
        } catch (error) {
          // @todo(!!!) log error?
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      };

      // this seems like a bit of a hack however with strict mode on, this code runs twice and for some reason
      // isAuthenticated check from auth0 on the second run return false so this makes sure it only runs once, this
      // is similar to what is done in the auth0's react context
      hasInitialized.current = true;

      // @todo(investigate) the ignored promise here is fine, useEffect does not allow for an async function but
      // @todo(investigate) validating the session require async functionality so until I can think of a different
      // @todo(investigate) pattern here, should be fine
      checkAuthentication();
    }, [setIsAuthenticated, setIsLoading, setAuthenticationClient, hasInitialized]);

    return {
      setIsLoading,
      isLoading,
      isAuthenticated,
      login,
      logout,
      getAccessToken,
    };
  });

const defaultContext = createContext(window.location.search);

export const authenticationContext: CustomReactContext<AuthenticationContext, CreateAuthenticationContextFunc> = {
  ...defaultContext,
  createContext,
};
