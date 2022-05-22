// this is needed as part of how emotion works
// reference: https://emotion.sh/docs/typescript#define-a-theme
import { ThemeName } from '$types/theme';

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    name: ThemeName;
  }
}
