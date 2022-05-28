import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { OptionalChildrenComponent } from '$types/react';
import { applicationSettingsContext } from '$contexts/application-settings';
import { authenticationContext } from '$contexts/authentication';
import { GlobalStyles } from '$components/global-styles/global-styles';

export const AuthenticationWrapper = ({ children }: OptionalChildrenComponent) => {
  const { theme } = applicationSettingsContext.useContext();

  return (
    <authenticationContext.Provider>
      {/* @todo: needed to figure out how to apply different themes */}
      <ThemeProvider theme={{ name: theme }}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </authenticationContext.Provider>
  );
};

export default AuthenticationWrapper;
