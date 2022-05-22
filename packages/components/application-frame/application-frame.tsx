import React, { useCallback, Suspense } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RequiresChildrenComponent } from '$types/react';
import authenticationContext from '$contexts/authentication';
import { ApplicationFrameColors, cssVariables } from '$components/application-frame/styles';
import { Button } from '$components/button/button';
import { ButtonContext } from '$components/button/types';
import { ApplicationFrameNavigation } from '$components/application-frame/application-frame-navigation';

export const Container = styled.div`
  color: #cccccc;
  height: 100vh;
  width: 100vw;
  display: flex;

  // theme related styles
  ${(props) => {
    const colors: ApplicationFrameColors = cssVariables.theme[props.theme.name];

    return css`
      color: ${colors.container.color};
    `;
  }}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const Header = styled.div`
  background-color: #111111;
  flex: 0 0 ${cssVariables.header.height};
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: ${cssVariables.header.padding};
`;

export const Logo = styled.div``;

export const Actions = styled.div`
  margin-left: auto;
`;

export const MainContent = styled.div`
  color: #cccccc;
  background-color: #222222;
  flex: 1 1 auto;
  overflow-y: auto;
  padding: ${cssVariables.mainContent.padding};
`;

// need to have a specific interface instead of the generic one as react router types require it
export type ApplicationFrameProps = RequiresChildrenComponent;

export const ApplicationFrame = ({ children }: ApplicationFrameProps) => {
  const { isAuthenticated, logout } = authenticationContext.useContext();

  const onLogout = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      logout();
    },
    [logout],
  );

  return (
    <Container data-id="frame">
      {isAuthenticated && <ApplicationFrameNavigation />}
      <SubContainer>
        {isAuthenticated && (
          <Header data-id="header">
            <Logo>LOGO TODO</Logo>
            <Actions data-id="actions">
              <Button data-id="logout" context={ButtonContext.DANGER} onClick={onLogout}>
                Logout
              </Button>
            </Actions>
          </Header>
        )}
        <MainContent>
          <Suspense fallback={'Loading...'}>{children}</Suspense>
        </MainContent>
      </SubContainer>
    </Container>
  );
};

export default ApplicationFrame;
