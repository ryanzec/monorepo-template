import classnames from 'classnames';
import React from 'react';

import styles from '$/components/application-loading/application-loading.module.css';

const ApplicationLoading = () => {
  return (
    <div data-id="application-loading" className={classnames(styles['application-loading'])}>
      LOADING APPLICATION...
    </div>
  );
};

export default ApplicationLoading;
