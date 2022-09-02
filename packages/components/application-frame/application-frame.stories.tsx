import React from 'react';

import ApplicationFrame from '$/components/application-frame';
import FlexContainer from '$/storybook-helpers/flex-container';
import FlexContainerItem from '$/storybook-helpers/flex-container-item';
import { storybookUtils } from '$/utils/storybook';

export default {
  title: 'Packages/Components/Application Frame',
  component: ApplicationFrame,
};

export const CypressDefault = () => {
  return (
    <FlexContainer>
      <FlexContainerItem>
        <ApplicationFrame>Testing</ApplicationFrame>
      </FlexContainerItem>
    </FlexContainer>
  );
};
CypressDefault.args = {};
CypressDefault.decorators = [storybookUtils.reactRouterDecorator];
