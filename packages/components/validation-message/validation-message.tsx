import classnames from 'classnames';
import React from 'react';

import styles from '$/components/validation-message/validation-message.module.css';

type ValidationMessageProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ValidationMessage = ({ children, ...restOfProps }: ValidationMessageProps) => {
  return (
    <div data-id="validation-message" className={classnames(styles['validation-message'])} {...restOfProps}>
      {children}
    </div>
  );
};

export default ValidationMessage;
