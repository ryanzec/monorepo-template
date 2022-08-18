// make typescript aware of the global configuration that is injected into the window object
import * as path from 'path';

import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.mocha'),
});

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

export {};
