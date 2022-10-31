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
