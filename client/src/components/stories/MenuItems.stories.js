import React from 'react';

import {MenuItem} from "../NavItems";

import StoryRouter from 'storybook-react-router';
export default {
  component: MenuItem,
  decorators: [
    StoryRouter()
  ],
  title: 'Components/NavItems/MenuItem',
};

export const Default = props => <MenuItem {...props}>About</MenuItem>;
