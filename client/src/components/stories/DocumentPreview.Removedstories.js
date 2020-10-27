import React from "react";

import PreviewModal from "../DocumentPreview";

import camelAnatomy from "../../svg/camelAnatomy.png";

export default {
  component: PreviewModal,
  title: "Media/PreviewModal",
};

const Template = args => <PreviewModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  open:true, 
  src:camelAnatomy
};