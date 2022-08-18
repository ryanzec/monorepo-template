import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '$/components/application-frame/application-frame.module.css';

export interface ApplicationFrameNavigationItemProps {
  icon: IconDefinition;
  text: string;
  navigateTo: string;
}

const ApplicationFrameNavigationItem = ({ icon, text, navigateTo }: ApplicationFrameNavigationItemProps) => {
  const navigate = useNavigate();

  const onNavigate = useCallback(() => {
    navigate(navigateTo);
  }, [navigate, navigateTo]);

  return (
    <div
      role="button"
      className={classnames(styles['navigation-item'])}
      tabIndex={0}
      data-id="item"
      key={text}
      onClick={onNavigate}
      // this is needed for a11y though not sure what this event should do
      onKeyPress={() => {}}
    >
      <FontAwesomeIcon icon={icon} /> {text}
    </div>
  );
};

export default ApplicationFrameNavigationItem;
