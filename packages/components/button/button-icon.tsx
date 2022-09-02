import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';

import { styles } from '$/components/button/button.css';

const ButtonIcon = (props: FontAwesomeIconProps) => {
  return <FontAwesomeIcon className={styles.iconSvg} {...props} />;
};

export default ButtonIcon;
