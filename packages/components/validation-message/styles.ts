import styled from '@emotion/styled';

import { styleUtils } from '$/utils/style';

interface CssVariables {
  container: {
    paddingTop: string;
  };
}

const cssVariables: CssVariables = {
  container: {
    paddingTop: styleUtils.getSpacing(1),
  },
};

export const StyledValidationMessage = styled.div`
  display: block;
  padding-top: ${cssVariables.container.paddingTop};
`;
