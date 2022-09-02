import { style } from '@vanilla-extract/css';

import { BorderRadius, styleUtils } from '$/utils/style';
import { themeVariables } from '$/utils/theme.css';

export const styles = {
  input: style({
    border: `1px solid ${themeVariables.color.input.borderColor}`,
    borderRadius: BorderRadius.MEDIUM,
    padding: styleUtils.getSpacing(1),
    outline: 'none',
    selectors: {
      '&:active': {
        border: `1px solid ${themeVariables.color.input.borderColorActive}`,
      },
    },
  }),
  inputContainer: style({
    display: 'block',
    selectors: {
      '&:not(:last-child)': {
        paddingBottom: styleUtils.getSpacing(4),
      },
    },
  }),
};
