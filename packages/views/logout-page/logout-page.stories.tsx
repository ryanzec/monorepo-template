import React from 'react';
import LogoutPage from '$views/logout-page/logout-page';

export default {
  title: 'Packages/View/LogoutPage',
  component: LogoutPage,
};

export const Standard = () => {
  return (
    <div>
      <LogoutPage />
    </div>
  );
};
Standard.args = {};
