import * as React from 'react';
import { HttpResponseInterceptor, StaticResponse } from 'cypress/types/net-stubbing';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider } from '@emotion/react';
import { ApplicationFrame } from '$components/application-frame/application-frame';

export const buildResponseCollection = (test: Array<StaticResponse | HttpResponseInterceptor | undefined>) => {
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

export const addBasicWrapper = (jsx: JSX.Element) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={{ name: 'light' }}>{jsx}</ThemeProvider>
    </DndProvider>
  );
};

export const addApplicationFrameWrapper = (jsx: JSX.Element) => {
  return addBasicWrapper(<ApplicationFrame>{jsx}</ApplicationFrame>);
};
