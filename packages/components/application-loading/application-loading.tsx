import React from 'react';

import { styles } from '$/components/application-loading/application-loading.css';

const ApplicationLoading = () => {
  return (
    <div className={styles.Container} data-id="application-loading">
      LOADING APPLICATION...
    </div>
  );
};

export default ApplicationLoading;
