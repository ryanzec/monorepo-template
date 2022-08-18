import { style } from '@vanilla-extract/css';

import { FlexContainerDirection } from '$/storybook-helpers/common';

export const Container = style({
  display: 'flex',
  selectors: {
    [`&[data-direction='${FlexContainerDirection.ROW}']`]: {
      alignItems: 'center',
    },
    [`&[data-direction='${FlexContainerDirection.COLUMN}']`]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  },
});
