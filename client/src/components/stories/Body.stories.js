import React from "react";

import Body from "../Body";

export default {
  component: Body,
  title: "Components/UserPages/Body",
};

const Template = args => <Body {...args} />;

const Default = {
  body: {
    hAlign: "center",
    vAlign: "middle",
    heading: "Display Title",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora alias" +
      " officiis quam et iste ratione earum illo aliquid neque, quis quas" +
      " accusamus voluptatum provident dolorum aspernatur nostrum quo similique" +
      " odit!",
    actionString: "Optional Action",
    onAction: null,
  },
};

export const Centered = Template.bind({});
Centered.args = {
  body: {
    ...Default.body,
  },
};

export const TopRight = Template.bind({});
TopRight.args = {
  body: {
    ...Default.body,
    hAlign: "right",
    vAlign: "top",
  },
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  body: {
    ...Default.body,
    hAlign: "left",
    vAlign: "top",
  },
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  body: {
    ...Default.body,
    hAlign: "right",
    vAlign: "bottom",
  },
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  body: {
    ...Default.body,
    hAlign: "left",
    vAlign: "bottom",
  },
};
