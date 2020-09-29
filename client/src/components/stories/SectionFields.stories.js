/** @jsx jsx */
import { jsx } from "theme-ui";

import SectionField from './../SectionFields';

export default {
  component: SectionField,
  title: "Components/Editor/SectionField",
};

const Template = args => <SectionField {...args} />;

export const Education = Template.bind();
Education.args = {
  sectionField: {
    type:"education"
  }
};

export const Experience = Template.bind();
Experience.args = {
  sectionField: {
    type:"experience"
  }
};