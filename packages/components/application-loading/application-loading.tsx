import React from 'react';

import { applicationLoadingCss } from '$/components/application-loading/application-loading.css';

export const ApplicationLoading = () => {
  return (
    <div className={applicationLoadingCss.Container} data-id="application-loading">
      LOADING APPLICATION...
    </div>
  );
};

export default ApplicationLoading;
