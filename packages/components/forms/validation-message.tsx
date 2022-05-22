import React from 'react';
import styled from '@emotion/styled';
import * as stylesUtils from '$utils/styles';
import { RequiresChildrenComponent } from '$types/react';

export const Container = styled.label`
  display: block;
  padding-top: ${stylesUtils.getSpacing(1)};
`;

export const ValidationMessage = ({ children }: RequiresChildrenComponent) => {
  return <Container data-id="validation-message">{children}</Container>;
};

export default ValidationMessage;
