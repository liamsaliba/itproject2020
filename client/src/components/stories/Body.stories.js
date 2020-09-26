import React from "react";

import Body from "../Body";

export default {
  component: Body,
  title: "Body",
};

const Template = args => <Body {...args} />;

export const Centered = Template.bind({});
Centered.args = {
  body: {
    hAlign: "center",
    vAlign: "middle",
    hasHeading: true, 
    hasBody: true,
    hasAction: true,
  },
};

export const TopRight = Template.bind({});
TopRight.args = {
  body: {
    hAlign: "right",
    vAlign: "top",
    hasHeading: true, 
    hasBody: true,
    hasAction: true,
  },
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  body: {
    hAlign: "left",
    vAlign: "top",
    hasHeading: true, 
    hasBody: true,
    hasAction: true,
  },
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  body: {
    hAlign: "right",
    vAlign: "bottom",
    hasHeading: true, 
    hasBody: true,
    hasAction: true,
  },
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  body: {
    hAlign: "left",
    vAlign: "bottom",
    hasHeading: true, 
    hasBody: true,
    hasAction: true,
  },
};
