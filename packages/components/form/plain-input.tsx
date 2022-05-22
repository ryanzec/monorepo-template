import React from 'react';

import { formCss } from '$/components/form/form.css';

type PlainInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
export const PlainInput = (props: PlainInputProps) => {
  return <input className={formCss.input} data-id="input" {...props} autoComplete="off" />;
};

// by default, we should be using the input the auto hooks with react-hook-form
export default PlainInput;
