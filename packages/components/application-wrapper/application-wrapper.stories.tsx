import React from 'react';

import ApplicationWrapper from '$/components/application-wrapper';
import { ThemeName } from '$/types/styles';

export default {
  title: 'Packages/Components/ApplicationWrapper',
  component: ApplicationWrapper,
};

export const Light = () => {
  return <ApplicationWrapper.Pure theme={ThemeName.LIGHT} />;
};

export const Dark = () => {
  return <ApplicationWrapper.Pure theme={ThemeName.DARK} />;
};
