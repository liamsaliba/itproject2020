import React from "react";

import Artefact from "../Artefacts";

import * as BodyStories from "./Body.stories";

export default {
  component: Artefact,
  title: "Artefact",
};

const style = {
  style: {
    flex: 1
  }
}


const Template = args => <Artefact {...args} />;

export const RightFeature = Template.bind({});
RightFeature.args = {
  artefact: { 
    media: "pdf", 
    hPos: "right", 
    // vPos
    ...style
  },
  body: {
    ...BodyStories.TopLeft.args.body,
    ...style
  }
  // onAddDocument:
};

export const LeftFeature = Template.bind({});
LeftFeature.args = {
  artefact: { 
    media: "image", 
    hPos: "left", 
    // vPos
    ...style
  },
  body: {
    ...BodyStories.TopRight.args.body,
    ...style
  }
  // onAddDocument:
};

