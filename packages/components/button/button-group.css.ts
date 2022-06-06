import { style } from '@vanilla-extract/css';
import { cssVariables } from '$components/button/styles';
import { Container as ButtonContainer } from '$components/button/button.css';
import { styleUtils } from '$utils/style';

export const Container = style({
  display: 'inline-flex',
  alignItems: 'center',
  selectors: {
    [`[data-attached='true']`]: {
      borderRadius: 0,
    },
    [`[data-attached='true']:first-child`]: {
      borderRadius: `${cssVariables.container.borderRadius} 0 0 ${cssVariables.container.borderRadius}`,
    },
    [`[data-attached='true']:last-child`]: {
      borderRadius: `0 ${cssVariables.container.borderRadius} ${cssVariables.container.borderRadius} 0`,
    },
    [`& .${ButtonContainer}`]: {
      marginRight: styleUtils.getSpacing(1),
    },
  },
});
