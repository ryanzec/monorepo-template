import { style } from '@vanilla-extract/css';

import { FlexContainerDirection } from '$/storybook-helpers/common';
import { styles as flexContainerStyles } from '$/storybook-helpers/flex-container.css';
import { styleUtils } from '$/utils/style';

export const styles = {
  container: style({
    selectors: {
      [`${flexContainerStyles.container}[data-direction='${FlexContainerDirection.ROW}'] &`]: {
        marginRight: styleUtils.getSpacing(1),
      },
      [`${flexContainerStyles.container}[data-direction='${FlexContainerDirection.COLUMN}'] &`]: {
        marginBottom: styleUtils.getSpacing(1),
      },
    },
  }),
};
