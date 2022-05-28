import React from 'react';
import styled from '@emotion/styled';
import { styleUtils, BORDER_RADIUS } from '$utils/style';
import { UseFormRegister, Path } from 'react-hook-form';

export const InputStyled = styled.input`
  border: 1px solid black;
  border-radius: ${BORDER_RADIUS.MEDIUM};
  padding: ${styleUtils.getSpacing(1)};
  outline: none;

  &:active {
    border: 1px solid blue;
  }
`;

export interface InputProps<T> {
  property: Path<T>;
  register: UseFormRegister<T>;
}

export const Input = <T,>({
  property,
  register,
  ...restOfProps
}: InputProps<T> & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return <InputStyled data-id="input" {...register(property)} {...restOfProps} autoComplete="off" />;
};

export default Input;
