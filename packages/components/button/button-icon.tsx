import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React from 'react';

import { buttonCss } from '$/components/button/button.css';

const ButtonIcon = (props: FontAwesomeIconProps) => {
  return <FontAwesomeIcon className={buttonCss.iconSvg} {...props} />;
};

export default ButtonIcon;
