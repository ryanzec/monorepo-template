import React from 'react';

import { styles } from '$/components/label/label.css';

type LabelProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

const Label = ({ children, ...restOfProps }: LabelProps) => {
  return (
    <label className={styles.label} data-id="label" {...restOfProps}>
      {children}
    </label>
  );
};

export default Label;
