// make typescript aware of the global configuration that is injected into the window object
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

// we need to disable vanilla extract for unit testing as we don't testing it will unit tests and it causes issues
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-error
require.extensions['.css.ts'] = function () {
  return null;
};

export {};
