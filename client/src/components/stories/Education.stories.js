import React from "react";

import {Education} from "../Sections";

import camelAnatomy from "../../svg/camelAnatomy.png";

export default {
  component: Education,
  title: "Pages/Education",
};

const Template = args => <Education {...args} />;

export const Default = Template.bind({});
Default.args = {
  contents: {
    school: "University of Melbourne",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computing and Software Systems",
    location: "Melbourne, Australia",
    grade: "1000",
    isOngoing: false,
    startDate: "Mar 2018",
    endDate: "Nov 2020",
    details: "3 Years of learning",
    orientation: "center",
    textAlign: "center",
    displaySize: "auto",
  }, 
  media: [{ type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",}], 
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};