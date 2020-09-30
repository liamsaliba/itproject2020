/** @jsx jsx */
import { jsx } from "theme-ui";

import SubSection from "../SubSection";

export default {
  component: SubSection,
  title: "Components/UserPages/SubSection",
};

const Template = args => <SubSection {...args} />;

export const Experience = Template.bind();
Experience.args = {
  subSection: {
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

export const Education = Template.bind();
Education.args = {
  subSection: {
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
