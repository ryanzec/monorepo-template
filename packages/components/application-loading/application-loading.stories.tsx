import React from 'react';

import ApplicationLoading from '$/components/application-loading';

export default {
  title: 'Packages/Components/ApplicationLoading',
  component: ApplicationLoading,
};

export const Standard = () => {
  return (
    <div>
      <ApplicationLoading />
    </div>
  );
};
