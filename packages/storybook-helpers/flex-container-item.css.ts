import { style } from '@vanilla-extract/css';

import { styleUtils } from '$/utils/style';
import { Container as FlexContainer } from '$/storybook-helpers/flex-container.css';
import { FlexContainerDirection } from '$/storybook-helpers/common';

export const Container = style({
  selectors: {
    [`${FlexContainer}[data-direction='${FlexContainerDirection.ROW}'] &`]: {
      marginRight: styleUtils.getSpacing(1),
    },
    [`${FlexContainer}[data-direction='${FlexContainerDirection.COLUMN}'] &`]: {
      marginBottom: styleUtils.getSpacing(1),
    },
  },
});
