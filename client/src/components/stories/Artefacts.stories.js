import React from "react";

import Artefact from "../Artefacts";

import * as BodyStories from "./Body.stories";

export default {
  component: Artefact,
  title: "Components/UserPages/Artefact",
};

const style = {
  style: {
    flex: 1,
  },
};

const Template = args => <Artefact {...args} />;

export const RightFeature = Template.bind({});
RightFeature.args = {
  isEditing: true,
  artefact: {
    media: "pdf",
    hPos: "right",
    // vPos
    ...style,
  },
  body: {
    ...BodyStories.TopLeft.args.body,
    isEditing: true, 
    ...style,
  },
  // onAddDocument:
};

export const LeftFeature = Template.bind({});
LeftFeature.args = {
  isEditing: true,
  artefact: {
    media: "image",
    hPos: "left",
    // vPos
    ...style,
  },
  body: {
    ...BodyStories.TopRight.args.body,
    isEditing: true, 
    ...style,
  },
  // onAddDocument:
};
