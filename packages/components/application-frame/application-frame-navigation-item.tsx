import React, { useCallback } from 'react';
import * as routerUtils from '$utils/router';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';
import { ApplicationFrameColors, cssVariables } from '$components/application-frame/styles';
import { css } from '@emotion/react';

export const NavigationItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  :not(:last-child) {
    padding-bottom: ${cssVariables.navigationItem.paddingBottom};
  }

  // theme related styles
  ${(props) => {
    const colors: ApplicationFrameColors = cssVariables.theme[props.theme.name];

    return css`
      color: ${colors.navigationItem.color};

      &:hover,
      &:focus {
        color: ${colors.navigationItem.colorHover};
      }

      &:active {
        color: ${colors.navigationItem.colorActive};
      }
    `;
  }}
`;

export interface NavigationItemProps {
  icon: IconDefinition;
  text: string;
  navigateTo: string;
}

export const ApplicationFrameNavigationItem = ({ icon, text, navigateTo }: NavigationItemProps) => {
  const navigate = routerUtils.useNavigate();

  const onNavigate = useCallback(() => {
    navigate(navigateTo);
  }, [navigate, navigateTo]);

  return (
    <NavigationItem data-id="item" key={text} onClick={onNavigate}>
      <FontAwesomeIcon icon={icon} /> {text}
    </NavigationItem>
  );
};

export default ApplicationFrameNavigationItem;
