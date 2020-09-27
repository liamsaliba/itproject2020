import React from "react";

import PageSection from './../PageSection';

export default {
  component: PageSection,
  title: "Components/PageSections",
};

const Template = args => <PageSection {...args} />;

export const Experience = Template.bind();
Experience.args = {
  title: "UI Baus", 
  field_1: "Full-Time", 
  field_2: "camel_case", 
  field_3: "Remote", 
  // grade: ONLY for EDUCATION
  isVoluntary: false, 
  isOngoing: true, 
  startDate: "03/Aug/2020", 
  endDate:"", 
  description: "During my third and last year of my Computing and Software Systems degree, I was responsible for scrambling together UI components for our ePortfolio website.",
};

export const Education = Template.bind();
Education.args = {
  title: "University of Melbourne", 
  field_1: "Melbourne, Australia", 
  field_2: "Bachelor of Science", 
  field_3: "Computing and Software Systems", 
  grade: "100", 
  // isVoluntary: ONLY for EXPERIENCE, 
  isOngoing: true, 
  startDate: "04/Mar/2018", 
  endDate:"", 
  description: "3 Years of learning",
};

