// make typescript aware of the global configuration that is injected into the window object
import '@emotion/react';
import { ThemeName } from './packages/utils/style';

declare global {
  interface Window {
    globalConfiguration?: {
      apiBaseUri: string;
    };
  }
}

// this is only needed in a very small amount of cases since we are not really testing many things that rely on a
// the browser environment so ignoring the error here
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-error
global.window = {};

// not sure why mocha does not pickup the types from packages/types/styles.d.ts but it does not so manually adding it
// here
declare module '@emotion/react' {
  export interface Theme {
    name: ThemeName;
  }
}
