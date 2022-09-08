import styled from '@emotion/styled';

import { BorderRadius, styleUtils, theme } from '$/utils/style';

interface CssTheme {
  borderColor: string;
  borderColorActive: string;
}

interface CssVariables {
  container: {
    paddingBottom: string;
  };
  input: {
    borderRadius: BorderRadius;
    padding: string;
  };
  theme: {
    light: CssTheme;
    dark: CssTheme;
  };
}

const cssVariables: CssVariables = {
  container: {
    paddingBottom: styleUtils.getSpacing(4),
  },
  input: {
    borderRadius: BorderRadius.MEDIUM,
    padding: styleUtils.getSpacing(1),
  },
  theme: {
    light: {
      borderColor: theme.light.color.black,
      borderColorActive: theme.light.color.blue.xDark,
    },
    dark: {
      borderColor: theme.dark.color.black,
      borderColorActive: theme.dark.color.blue.xDark,
    },
  },
};

export const StyledInput = styled.input`
  border: 1px solid ${(props) => cssVariables.theme[props.theme.name].borderColor};
  border-radius: ${cssVariables.input.borderRadius};
  padding: ${cssVariables.input.padding};
  outline: none;

  &:active {
    border: 1px solid ${(props) => cssVariables.theme[props.theme.name].borderColorActive};
  }
`;

export const StyledInputContainer = styled.div`
  display: block;

  &:not(:last-child) {
    padding-bottom: ${cssVariables.container.paddingBottom};
  }
`;
