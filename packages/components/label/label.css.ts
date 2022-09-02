import { style } from '@vanilla-extract/css';

import { styleUtils } from '$/utils/style';

export const styles = {
  label: style({
    display: 'block',
    paddingBottom: styleUtils.getSpacing(1),
  }),
};
