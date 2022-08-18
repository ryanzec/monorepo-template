import '@fontsource/inter';
import './normalize.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { applicationSettingsContext } from '$/contexts/application-settings';
import { AuthenticationWrapper } from '$/components/core/authentication-wrapper';
import { ApplicationWrapper } from '$/components/core/application-wrapper';
import { ErrorBoundary } from '$/components/core/error-boundary';

// make typescript aware of the global configuration that is injected into the window object
declare global {
  interface Window {
    globalConfiguration?: {
      apiBaseUri: string;
    };
  }
}

// we need to end the call for the element with ! since create root not allow null value
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('application-mount')!);

root.render(
  <StrictMode>
    <applicationSettingsContext.Provider>
      <AuthenticationWrapper>
        <DndProvider backend={HTML5Backend}>
          <ErrorBoundary>
            <ApplicationWrapper />
          </ErrorBoundary>
        </DndProvider>
      </AuthenticationWrapper>
    </applicationSettingsContext.Provider>
  </StrictMode>,
);
