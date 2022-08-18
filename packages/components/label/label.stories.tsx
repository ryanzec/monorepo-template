import React from 'react';

import Label from '$/components/label';
import { storybookUtils } from '$/utils/storybook';

export default {
  title: 'Packages/Components/Label',
  component: Label,
  decorators: [storybookUtils.AuthenticatedWrapperDecorator],
};

export const Standard = () => {
  return <Label>label</Label>;
};
