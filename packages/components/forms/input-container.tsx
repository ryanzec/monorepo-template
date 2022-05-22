import React, { RefObject } from 'react';
import styled from '@emotion/styled';
import * as stylesUtils from '$utils/styles';
import { RequiresChildrenComponent } from '$types/react';

export const Container = styled.div`
  display: block;

  :not(:last-child) {
    padding-bottom: ${stylesUtils.getSpacing(4)};
  }
`;

export type InputContainerProps = RequiresChildrenComponent &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    forwardRef?: RefObject<HTMLDivElement>;
  };

export const InputContainer = ({ children, forwardRef, ...restOfProps }: InputContainerProps) => {
  return (
    <Container data-id="input-container" ref={forwardRef} {...restOfProps}>
      {children}
    </Container>
  );
};

export default InputContainer;
