import React from 'react';
import styled from '@emotion/styled';
import * as stylesUtils from '$utils/styles';
import { RequiresChildrenComponent } from '$types/react';

export const Container = styled.label`
  display: block;
  padding-bottom: ${stylesUtils.getSpacing(1)};
`;

export const Label = ({
  children,
}: RequiresChildrenComponent & React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) => {
  return <Container data-id="label">{children}</Container>;
};

export default Label;
