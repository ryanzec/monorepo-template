import { faHouse, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import React from 'react';

import ApplicationFrameNavigationItem, {
  ApplicationFrameNavigationItemProps,
} from '$/components/application-frame/application-frame-navigation-item';
import styles from '$/components/application-frame/application-frame.module.css';

const navigationItems: ApplicationFrameNavigationItemProps[] = [
  {
    icon: faHouse,
    text: 'Home',
    navigateTo: '/',
  },
  {
    icon: faPenToSquare,
    text: 'Form',
    navigateTo: '/complex-form',
  },
];

const ApplicationFrameNavigation = () => {
  return (
    <div data-id="navigation" className={classnames(styles['navigation'])}>
      {navigationItems.map((navigationItem) => {
        return <ApplicationFrameNavigationItem key={navigationItem.text} {...navigationItem} />;
      })}
    </div>
  );
};

export default ApplicationFrameNavigation;
