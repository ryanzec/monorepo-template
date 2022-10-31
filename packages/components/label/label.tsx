import classnames from 'classnames';
import React from 'react';

import styles from '$/components/label/label.module.css';

type LabelProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

const Label = ({ children, ...restOfProps }: LabelProps) => {
  return (
    <label data-id="label" className={classnames(styles['label'])} {...restOfProps}>
      {children}
    </label>
  );
};

export default Label;
