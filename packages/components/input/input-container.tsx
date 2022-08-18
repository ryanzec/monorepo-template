import React, { RefObject } from 'react';

import styles from '$/components/input/input.module.css';

type InputContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  selfRef?: RefObject<HTMLDivElement>;
};

const InputContainer = ({ children, selfRef, ...restOfProps }: InputContainerProps) => {
  return (
    <div ref={selfRef} data-id="input-container" className={styles.container} {...restOfProps}>
      {children}
    </div>
  );
};

export default InputContainer;
