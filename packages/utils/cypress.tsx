import * as React from 'react';
import { HttpResponseInterceptor, StaticResponse } from 'cypress/types/net-stubbing';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ApplicationFrame } from '$/components/application-frame/application-frame';
import { applicationSettingsContext } from '$/contexts/application-settings';

const buildResponseCollection = (test: Array<StaticResponse | HttpResponseInterceptor | undefined>) => {
  const responses = test;
  let nextResponseIndex = 0;

  return {
    getNextResponse: () => {
      if (nextResponseIndex >= responses.length) {
        throw Error('ran out of responses to return');
      }

      const nextResponse = responses[nextResponseIndex];

      nextResponseIndex++;

      return nextResponse;
    },
  };
};

const addBasicWrapper = (jsx: JSX.Element) => {
  return (
    <applicationSettingsContext.Provider>
      <DndProvider backend={HTML5Backend}>{jsx}</DndProvider>
    </applicationSettingsContext.Provider>
  );
};

const addApplicationFrameWrapper = (jsx: JSX.Element) => {
  return addBasicWrapper(<ApplicationFrame>{jsx}</ApplicationFrame>);
};

export const cypressUtils = {
  buildResponseCollection,
  addBasicWrapper,
  addApplicationFrameWrapper,
};
