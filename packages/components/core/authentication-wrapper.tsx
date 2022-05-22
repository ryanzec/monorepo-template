import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { OptionalChildrenComponent } from '$types/react';
import authenticationContext from '$contexts/authentication';
import { GlobalStyles } from '$components/global-styles/global-styles';

export const AuthenticationWrapper = ({ children }: OptionalChildrenComponent) => {
  return (
    <authenticationContext.Provider>
      {/* @todo: needed to figure out how to apply different themes */}
      <ThemeProvider theme={{ name: 'light' }}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </authenticationContext.Provider>
  );
};

export default AuthenticationWrapper;
