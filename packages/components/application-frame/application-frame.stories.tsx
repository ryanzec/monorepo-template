import React from 'react';
import * as storybookUtils from '$utils/storybook';
import FlexContainer from '$storybook-helpers/flex-container';
import { ApplicationFrame } from '$components/application-frame/application-frame';

export default {
  title: 'Packages/Components/Application Frame',
  component: ApplicationFrame,
};

export const CypressDefault = () => {
  return (
    <FlexContainer>
      <ApplicationFrame>Testing</ApplicationFrame>
    </FlexContainer>
  );
};
CypressDefault.args = {};
CypressDefault.decorators = [storybookUtils.reactRouterDecorator];
