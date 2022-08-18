import React from 'react';

import { storybookUtils } from '$/utils/storybook';
import HomeView from '$/views/home-view';

export default {
  title: 'Packages/Views/HomeView',
  component: HomeView,
  decorators: [storybookUtils.AuthenticatedWrapperDecorator],
};

export const Standard = () => {
  return <HomeView />;
};
