import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ApplicationLoading = () => {
  return <Container data-id="application-loading">LOADING APPLICATION...</Container>;
};

export default ApplicationLoading;
