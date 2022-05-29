import { RequiresChildrenComponent } from '$types/react';

import React from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { styleUtils } from '$utils/style';

import { ButtonGroupContext, ButtonGroupContextValue } from '$components/button/hooks';
import { cssVariables } from '$components/button/styles';
import { ButtonVariant } from '$components/button/types';
import { Container as ButtonContainer } from '$components/button/button-lin';

export interface ButtonGroupContainerProps {
  isAttached: boolean;
}

export const Container = styled.div<ButtonGroupContainerProps>`
  display: inline-flex;
  align-items: center;

  ${ButtonContainer} {
    border-radius: ${(props) => (props.isAttached ? '0' : 'inherit')};
    margin-right: ${(props) => (props.isAttached ? 'inherit' : styleUtils.getSpacing(1))};

    :first-child {
      border-radius: ${(props) =>
        props.isAttached
          ? `${cssVariables.container.borderRadius} 0 0 ${cssVariables.container.borderRadius}`
          : 'inherit'};
    }

    :last-child {
      border-radius: ${(props) =>
        props.isAttached
          ? `0 ${cssVariables.container.borderRadius} ${cssVariables.container.borderRadius} 0`
          : 'inherit'};
    }
  }
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
