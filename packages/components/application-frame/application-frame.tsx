import React, { useCallback, useEffect } from 'react';

import ApplicationFramePure from '$/components/application-frame/application-frame-pure';
import { reactHooks } from '$/hooks';
import { applicationSettingsStoreUtils } from '$/stores/application-settings-store';
import { authenticationStoreUtils, LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY } from '$/stores/authentication';
import { ThemeName } from '$/types/styles';
import { applicationUtils, GlobalVariable } from '$/utils/application';
import { httpUtils } from '$/utils/http';
import { localStorageCacheUtils } from '$/utils/local-storage-cache';

export type ApplicationFrameProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ApplicationFrame = (props: ApplicationFrameProps) => {
  const authenticateState = reactHooks.useRxSubject(authenticationStoreUtils.subject);
  const applicationSettingsState = reactHooks.useRxSubject(applicationSettingsStoreUtils.subject);

  const logout = useCallback(() => {
    authenticationStoreUtils.logout(authenticationStoreUtils.subject);
  }, []);

  const onLogout = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      logout();
    },
    [logout],
  );

  const onToggleTheme = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      applicationSettingsStoreUtils.setTheme(
        applicationSettingsStoreUtils.subject,
        applicationSettingsState.theme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT,
      );
    },
    [applicationSettingsState.theme],
  );

  useEffect(() => {
    const checkExistingAuthentication = async () => {
      const cachedAuthenticationToken = localStorageCacheUtils.get(LOCAL_STORAGE_AUTHENTICATION_TOKEN_KEY);

      if (!cachedAuthenticationToken) {
        authenticationStoreUtils.setIsAuthenticated(authenticationStoreUtils.subject, false);
        authenticationStoreUtils.setIsLoading(authenticationStoreUtils.subject, false);

        return;
      }

      const response = await httpUtils.http(
        `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/authenticate/${cachedAuthenticationToken}`,
      );

      authenticationStoreUtils.setIsAuthenticated(authenticationStoreUtils.subject, response.status === 200);
      authenticationStoreUtils.setIsLoading(authenticationStoreUtils.subject, false);
    };

    // @todo(investigate) the ignored promise here is fine, useEffect does not allow for an async function but
    // @todo(investigate) validating the session require async functionality so until I can think of a different
    // @todo(investigate) pattern here, should be fine
    checkExistingAuthentication();
  }, []);

  return (
    <ApplicationFramePure
      {...props}
      isAuthenticated={authenticateState.isAuthenticated}
      theme={applicationSettingsState.theme}
      onToggleTheme={onToggleTheme}
      onLogout={onLogout}
    />
  );
};

export default ApplicationFrame;
