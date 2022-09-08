import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { FlexContainerDirection } from '$/storybook-helpers/common';
import { styleUtils } from '$/utils/style';

interface CssVariables {
  containerItem: {
    spacing: string;
  };
}

const cssVariables: CssVariables = {
  containerItem: {
    spacing: styleUtils.getSpacing(1),
  },
};

export interface StyledFlexContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  direction: FlexContainerDirection;
}

export const StyledFlexContainerItem = styled.div``;

export const StyledFlexContainer = styled.div<StyledFlexContainerProps>`
  display: flex;

  ${(props) => {
    if (props.direction === FlexContainerDirection.ROW) {
      return css`
        align-items: center;

        & ${StyledFlexContainerItem} {
          margin-right: ${cssVariables.containerItem.spacing};
        }
      `;
    }

    return css`
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      & ${StyledFlexContainerItem} {
        bottom: ${cssVariables.containerItem.spacing};
      }
    `;
  }}
`;
