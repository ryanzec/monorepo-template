import '@fontsource/inter';
import '../../packages/styles/variables.css';
import '../../packages/styles/keyframes.css';
import '../../packages/styles/normalize.css';

// even though this way of importing work in all the other code, it causes a typescript error here so ignoring for
// the time being
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ApplicationWrapper from '../../packages/components/application-wrapper';
import ErrorBoundary from '../../packages/components/error-boundary';

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
    <ErrorBoundary>
      <ApplicationWrapper />
    </ErrorBoundary>
  </StrictMode>,
);
