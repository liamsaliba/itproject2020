import React from "react";

import * as SubSectionStories from "./SubSection.stories";
import Section from './../Section';

export default {
  component: Section,
  title: "Components/UserPages/Section",
};

const Template = args => <Section {...args} />;

export const Experiences = Template.bind({});
Experiences.args = {
  section: { 
    type: "Experience", 
  },
  subSections: [
    SubSectionStories.Experience.args.subSection,
    SubSectionStories.Experience.args.subSection,
    SubSectionStories.Experience.args.subSection,
  ]
};

export const Education = Template.bind({});
Education.args = {
  section: { 
    type: "Education", 
  },
  subSections: [
    SubSectionStories.Education.args.subSection,
    SubSectionStories.Education.args.subSection,
    SubSectionStories.Education.args.subSection,
  ]
};

