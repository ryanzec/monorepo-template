import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { StoryFn } from '@storybook/react';

const reactRouterDecorator = (Story: StoryFn<Partial<unknown>>) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

export const storybookUtils = {
  reactRouterDecorator,
};
