import { style } from '@vanilla-extract/css';

import { styleUtils } from '$/utils/style';

export const styles = {
  validationMessage: style({
    display: 'block',
    paddingTop: styleUtils.getSpacing(1),
  }),
};
