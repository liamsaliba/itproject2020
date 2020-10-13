import React from "react";
import { Section, Sections } from "./../Sections";

export default {
  component: Sections,
  title: "Components/UserPages/Sections",
};

const SectionTemplate = args => <Section {...args} />;

const Experience = SectionTemplate.bind();
Experience.args = {
  isEditing: true,
  section: {
    type: "experience",
    title: "UI Baus",
    field_1: "camel_case",
    field_2: "Full-Time",
    location: "Remote",
    // grade: ONLY for EDUCATION
    isVoluntary: false,
    isOngoing: true,
    startDate: "Aug 2020",
    endDate: "",
    description:
      "During my third and last year of my Computing and Software Systems degree, I was responsible for scrambling together UI components for our ePortfolio website.",
  },
};

const Education = SectionTemplate.bind();
Education.args = {
  isEditing: true,
  section: {
    type: "education",
    title: "University of Melbourne",
    field_1: "Bachelor of Science",
    field_2: "Computing and Software Systems",
    location: "Melbourne, Australia",
    grade: "100",
    // isVoluntary: ONLY for EXPERIENCE,
    isOngoing: true,
    startDate: "Mar 2018",
    endDate: "",
    description: "3 Years of learning",
  },
};

const SectionsTemplate = args => <Sections {...args} />;

export const SingleExperience = SectionsTemplate.bind({});
SingleExperience.args = {
  isEditing: true,
  sections: [Experience.args.section],
};

export const SingleEducation = SectionsTemplate.bind({});
SingleEducation.args = {
  isEditing: true,
  sections: [Education.args.section],
};

export const ExperienceSections = SectionsTemplate.bind({});
ExperienceSections.args = {
  isEditing: true,
  sections: [
    Experience.args.section,
    Experience.args.section,
    Experience.args.section,
  ],
};

export const EducationSections = SectionsTemplate.bind({});
EducationSections.args = {
  isEditing: true,
  sections: [
    Education.args.section,
    Education.args.section,
    Education.args.section,
  ],
};
