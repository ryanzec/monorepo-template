import { RequiresChildrenComponent } from '$types/react';

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import * as styleUtils from '$utils/styles';

import { ButtonGroupContext, ButtonGroupContextValue } from '$components/button/hooks';
import { cssVariables } from '$components/button/styles';
import { ButtonVariant } from '$components/button/types';
import { Container as ButtonContainer } from '$components/button/button';

export interface ButtonGroupContainerProps {
  isAttached: boolean;
}

export const Container = styled.div<ButtonGroupContainerProps>`
  display: inline-flex;
  align-items: center;

  ${(props) => {
    if (props.isAttached) {
      return css`
        ${ButtonContainer} {
          border-radius: 0;

          :first-child {
            border-radius: ${cssVariables.container.borderRadius} 0 0 ${cssVariables.container.borderRadius};
          }

          :last-child {
            border-radius: 0 ${cssVariables.container.borderRadius} ${cssVariables.container.borderRadius} 0;
          }
        }
      `;
    }

    return css`
      ${ButtonContainer} {
        margin-right: ${styleUtils.getSpacing(1)};
      }
    `;
  }}
`;

export interface ButtonGroupProps extends ButtonGroupContextValue, RequiresChildrenComponent {}

export const ButtonGroup = ({
  children,
  isAttached = false,
  variant = ButtonVariant.SOLID,
  ...restOfProps
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider value={{ isAttached, variant, ...restOfProps }}>
      <Container data-id="button-group" role="group" isAttached={isAttached}>
        {children}
      </Container>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
