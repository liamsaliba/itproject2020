import React from "react";

import {Experience} from "../Sections";

import camelAnatomy from "../../svg/camelAnatomy.png";

export default {
  component: Experience,
  title: "Pages/Experience",
};

const Template = args => <Experience {...args} />;

export const Default = Template.bind({});
Default.args = {
  contents: {
    jobTitle: "UI Baus",
    organisation: "camel_case",
    department:"Front End Team",
    location: "remote",
    employmentType: "Full-Time",
    isVoluntary: false,
    isOngoing:true,
    startDate: "Aug 2020",
    endDate:"",
    details: "During my third and last year of my Computing and Software Systems degree, I was responsible for scrambling together UI components for our ePortfolio website.",
    orientation: "center",
    displayType:"contain",
    textAlign: "center",
    displaySize: "auto",
  }, 
  media: [{ type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",}], 
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};