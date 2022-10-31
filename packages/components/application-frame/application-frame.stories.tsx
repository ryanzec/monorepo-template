import React from 'react';

import ApplicationFrame from '$/components/application-frame';
import { storybookUtils } from '$/utils/storybook';

export default {
  title: 'Packages/Components/Application Frame',
  component: ApplicationFrame,
};

export const CypressDefault = () => {
  return (
    <div>
      <div>
        <ApplicationFrame>Testing</ApplicationFrame>
      </div>
    </div>
  );
};
CypressDefault.args = {};
CypressDefault.decorators = [storybookUtils.reactRouterDecorator];
