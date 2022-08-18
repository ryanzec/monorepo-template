import React from 'react';

import ValidationMessage from '$/components/validation-message';
import { storybookUtils } from '$/utils/storybook';

export default {
  title: 'Packages/Components/ValidationMessage',
  component: ValidationMessage,
  decorators: [storybookUtils.AuthenticatedWrapperDecorator],
};

export const Standard = () => {
  return <ValidationMessage>validation message</ValidationMessage>;
};
