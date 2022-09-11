import styled from '@emotion/styled';

import { styleUtils } from '$/utils/style';

interface CssVariables {
  container: {
    paddingBottom: string;
  };
}

const cssVariables: CssVariables = {
  container: {
    paddingBottom: styleUtils.getSpacing(1),
  },
};

export const StyledLabel = styled.label`
  display: block;
  padding-bottom: ${cssVariables.container.paddingBottom};
`;
