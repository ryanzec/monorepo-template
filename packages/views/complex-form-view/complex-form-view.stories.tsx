import React from 'react';

import { storybookUtils } from '$/utils/storybook';
import ComplexFormView from '$/views/complex-form-view';

export default {
  title: 'Packages/Views/ComplexFormView',
  component: ComplexFormView,
  decorators: [storybookUtils.AuthenticatedWrapperDecorator],
};

export const Standard = () => {
  return <ComplexFormView />;
};
