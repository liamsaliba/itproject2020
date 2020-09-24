import React from 'react';

import {MenuButton} from "../NavItems";

import StoryRouter from 'storybook-react-router';
export default {
  component: MenuButton,
  decorators: [
    StoryRouter()
  ],
  title: 'Components/NavItems/MenuButton',
};

export const Default = props => <MenuButton {...props}>Theme</MenuButton>;
