import React from 'react';
import { storybookUtils } from '$/utils/storybook';
import FlexContainer from '$/storybook-helpers/flex-container';
import FlexContainerItem from '$/storybook-helpers/flex-container-item';
import { ApplicationFrame } from '$/components/application-frame/application-frame';

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
