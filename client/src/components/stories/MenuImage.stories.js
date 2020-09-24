import React from 'react';

import {MenuImage} from "../NavItems";

import StoryRouter from 'storybook-react-router';

import camel from "../../svg/camel.svg";

export default {
  component: MenuImage,
  decorators: [
    StoryRouter()
  ],
  title: 'Components/NavItems/MenuImage',
};

const Template = (props) => <MenuImage {...props} />;

export const Default = Template.bind({});
Default.args = {
  src: camel,
}
