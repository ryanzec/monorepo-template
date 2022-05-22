import React from 'react';
import { faHouse, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  ApplicationFrameNavigationItem,
  NavigationItemProps,
} from '$/components/application-frame/application-frame-navigation-item';
import { applicationFrameCss } from '$/components/application-frame/application-frame.css';

export const navigationItems: NavigationItemProps[] = [
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

export const ApplicationFrameNavigation = () => {
  return (
    <div className={applicationFrameCss.Navigation} data-id="navigation">
      {navigationItems.map((navigationItem) => {
        return <ApplicationFrameNavigationItem key={navigationItem.text} {...navigationItem} />;
      })}
    </div>
  );
};

export default ApplicationFrameNavigation;
