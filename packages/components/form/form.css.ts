import { style } from '@vanilla-extract/css';
import { themeVariables } from '$/utils/theme.css';
import { BorderRadius, styleUtils } from '$/utils/style';

export const formCss = {
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
  label: style({
    display: 'block',
    paddingBottom: styleUtils.getSpacing(1),
  }),
  validationMessage: style({
    display: 'block',
    paddingTop: styleUtils.getSpacing(1),
  }),
};
