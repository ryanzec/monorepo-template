import classnames from 'classnames';
import React, { RefObject } from 'react';

import styles from '$/components/input/input.module.css';

type PlainInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  selfRef?: RefObject<HTMLInputElement>;
};

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const Input = ({ selfRef, className, ...restOfProps }: PlainInputProps) => {
  return (
    <input
      ref={selfRef}
      data-id="input"
      className={classnames(className, styles['input'])}
      {...restOfProps}
      autoComplete="off"
    />
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default Input;
