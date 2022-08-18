import React from 'react';

import ErrorBoundary from '$/components/error-boundary';

export default {
  title: 'Packages/Components/ErrorBoundary',
  component: ErrorBoundary,
};

const GoodComponent = () => {
  return <div>test</div>;
};

const ErrorComponent = () => {
  throw 'error!';

  return <div>test</div>;
};

export const NoError = () => {
  return (
    <ErrorBoundary>
      <GoodComponent />
    </ErrorBoundary>
  );
};

export const Error = () => {
  return (
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );
};
