import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React from 'react';

import styles from '$/components/button/button.module.css';
import { ButtonIconPosition, DEFAULT_BUTTON_ICON_POSITION } from '$/components/button/utils';

export interface ButtonIconProps extends FontAwesomeIconProps {
  position?: ButtonIconPosition;
  isLoading?: boolean;
}

const ButtonIcon = ({
  position = DEFAULT_BUTTON_ICON_POSITION,
  isLoading = false,
  icon,
  ...restOfProps
}: ButtonIconProps) => {
  let dataId = 'icon';

  dataId += isLoading ? ' loading' : '';
  dataId += position === ButtonIconPosition.PRE ? ' pre' : ' post';

  return (
    <FontAwesomeIcon
      data-id={dataId}
      className={classnames(styles['icon'], {
        [styles['icon-pre']]: position === ButtonIconPosition.PRE,
        [styles['icon-post']]: position === ButtonIconPosition.POST,
        [styles['icon-is-loading']]: isLoading,
      })}
      icon={isLoading ? faSpinner : icon}
      {...restOfProps}
    />
  );
};

export default ButtonIcon;
