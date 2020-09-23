import React from "react";

import Features from "./Features";

export default {
  component: Features,
  title: "Features",
};

const Template = args => <Features {...args} />;

export const RightFeature = Template.bind({});
RightFeature.args = {
  feature: {
    type: "right",
    action: true,
  },
};

export const LeftFeature = Template.bind({});
LeftFeature.args = {
  feature: {
    type: "left",
    action: true,
  },
};
