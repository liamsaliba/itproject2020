import React from "react";
import { Display } from "../Sections";
import camelAnatomy from "../../svg/camelAnatomy.png";
import journeyOnACamel from "../../svg/JourneyOnACamel.jpg";

export default {
  component: Display,
  title: "Pages/Display",
};

const Template = args => <Display {...args} />;

export const Right = Template.bind({});
Right.args = {
  contents: {
    orientation: "right",
    body: "Example Body",
    header: "Example Header",
    actionText: "Example Action",
    actionUrl: "https://www.messenger.com/",
    displayType: "contain",
    textAlign: "center",
    displaySize: "auto",
  },
  media: [{ type: "image", url: camelAnatomy, id: "5f90276ba6b2bd00423cb618" }],
  editing: true,
  id: "5f90276ba6b2bd00423cb618",
};

export const Left = Template.bind({});
Left.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    orientation: "left",
    textAlign: "center",
  },
};

export const Center = Template.bind({});
Center.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    orientation: "center",
    textAlign: "center",
  },
};

export const Short = Template.bind({});
Short.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize: "short",
  },
};

export const Medium = Template.bind({});
Medium.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize: "medium",
  },
};

export const Tall = Template.bind({});
Tall.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize: "tall",
  },
};

export const Fullscreen = Template.bind({});
Fullscreen.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize: "fullscreen",
  },
};

export const ImageOnly = Template.bind({});
ImageOnly.args = {
  contents: {
    orientation: "center",
    displaySize: "auto",
  },
  media: [{ type: "image", url: camelAnatomy, id: "5f90276ba6b2bd00423cb618" }],
  editing: true,
  id: "5f90276ba6b2bd00423cb618",
};

export const MultipleImageOnly = Template.bind({});
MultipleImageOnly.args = {
  contents: {
    orientation: "center",
    displaySize: "auto",
  },
  media: [
    { type: "image", url: camelAnatomy, id: "5f90276ba6b2bd00423cb618" },
    { type: "image", url: journeyOnACamel, id: "5f90276ba6b2bd00423cb619" },
  ],
  editing: true,
  id: "5f90276ba6b2bd00423cb618",
};

export const HeadingOnly = Template.bind({});
HeadingOnly.args = {
  contents: {
    header: "Example Header",
    textAlign: "center",
    displaySize: "auto",
    orientation: "center",
  },
  media: [],
  editing: true,
  id: "5f90276ba6b2bd00423cb618",
};
export const ImageHeadingOnly = Template.bind({});
ImageHeadingOnly.args = {
  contents: {
    orientation: "right",
    header: "Example Header",
    textAlign: "center",
    displaySize: "auto",
  },
  media: [{ type: "image", url: camelAnatomy, id: "5f90276ba6b2bd00423cb618" }],
  editing: true,
  id: "5f90276ba6b2bd00423cb618",
};
