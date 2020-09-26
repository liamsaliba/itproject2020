import React from "react";

import Artefacts from "../Artefacts";

export default {
  component: Artefacts,
  title: "Artefacts",
};

const Template = args => <Artefacts {...args} />;

export const RightArtefact = Template.bind({});
RightArtefact.args = {
  feature: {
    type: "right",
    action: true,
  },
};

export const LeftArtefact = Template.bind({});
LeftArtefact.args = {
  feature: {
    type: "left",
    action: true,
  },
};
