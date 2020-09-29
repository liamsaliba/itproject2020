/** @jsx jsx */
import { jsx } from "theme-ui";

import documentPreview from "../../svg/DocumentPreview.png";

import OurCard from '../OurCard';

export default {
  component: OurCard,
  title: "Components/UserPages/OurCard",
};

const Template = args => <OurCard {...args} />;

export const Default = Template.bind();
Default.args = {
  card: {
    title: "Title", 
    body: "Hi my name is 1!", 
    featureType: "image", // Describes the feature tupe {image|video|...}
    feature: documentPreview, // or something else!
    featureOrientation:"top"
  }
};

export const NoTitle = Template.bind();
NoTitle.args = {
  card: {
    ...Default.args.card,
    title:""
  }
};

export const NoBody = Template.bind();
NoBody.args = {
  card: {
    ...Default.args.card,
    body:""
  }
};

export const FeatureBottom = Template.bind();
FeatureBottom.args = {
  card: {
    ...Default.args.card,
    featureOrientation:"bottom"
  }
};


