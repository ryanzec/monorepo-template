import React from 'react';
import { UseFormRegister, Path, FieldValues } from 'react-hook-form';

import { StyledInput } from '$/components/input/styles';

interface InputProps<TFormData extends FieldValues> {
  property: Path<TFormData>;
  register: UseFormRegister<TFormData>;
}

const InputHooked = <TFormData extends FieldValues>({
  property,
  register,
  ...restOfProps
}: InputProps<TFormData> & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return <StyledInput data-id="input" {...register(property)} {...restOfProps} autoComplete="off" />;
};

export default InputHooked;
