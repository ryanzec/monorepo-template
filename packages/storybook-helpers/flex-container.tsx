import React from 'react';
import { RequiresChildrenComponent } from '$types/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import * as styleUtils from '$utils/styles';

export enum FlexContainerDirection {
  ROW = 'row',
  COLUMN = 'column',
}

export interface FlexContainerProps {
  direction?: FlexContainerDirection;
}

const Container = styled.span<FlexContainerProps>`
  display: flex;

  ${(props) => {
    if (props.direction === FlexContainerDirection.ROW) {
      return css`
        align-items: center;

        > *:not(:last-child) {
          margin-right: ${styleUtils.getSpacing(1)};
        }
      `;
    }

    return css`
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      > *:not(:last-child) {
        margin-bottom: ${styleUtils.getSpacing(1)};
      }
    `;
  }};
`;

export const FlexContainer = ({
  children,
  direction = FlexContainerDirection.ROW,
}: FlexContainerProps & RequiresChildrenComponent) => {
  return <Container direction={direction}>{children}</Container>;
};

export default FlexContainer;
