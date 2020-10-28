import React from "react";

import {Display} from "../Sections";
// import { ArtifactForm } from "../../components/ArtifactForm";

import camelAnatomy from "../../svg/camelAnatomy.png";
import journeyOnACamel from "../../svg/JourneyOnACamel.jpg";

export default {
  component: Display,
  title: "Pages/Display",
};

const Template = args => <Display {...args} />;

/* image only
multiple images only
heading only
heading and body and action only
image and heading only */

export const Right = Template.bind({});
Right.args = {
  contents: {
    orientation:"right",
    body: "Example Body",
    header: "Example Header",
    actionText: "Example Action",
    actionUrl: "https://www.messenger.com/",
    textAlign:"center",
    displaySize:"auto",
  }, 
  media: [{ type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",}], 
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};

/* auto: undefined,
  short: "200px",
  medium: "300px",
  tall: "500px",
  fullscreen: "100vh", */

export const Left = Template.bind({});
Left.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    orientation:"left",
    textAlign:"center",
  },
};

export const Center = Template.bind({});
Center.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    orientation:"center",
    textAlign:"center",
  },
};

export const Short = Template.bind({});
Short.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize:"short",
  },
};

export const Medium = Template.bind({});
Medium.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize:"medium",
  },
};

export const Tall = Template.bind({});
Tall.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize:"tall",
  },
};

export const Fullscreen = Template.bind({});
Fullscreen.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    displaySize:"fullscreen",
  },
};

export const ImageOnly = Template.bind({});
ImageOnly.args = {
  contents: {
    orientation:"center",
    displaySize:"auto",
  }, 
  media: [{ type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",}], 
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};

export const MultipleImageOnly = Template.bind({});
MultipleImageOnly.args = {
  contents: {
    orientation:"center",
    displaySize:"auto",
  }, 
  media: [
    { type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",},
    { type: "image", url: journeyOnACamel, id:"5f90276ba6b2bd00423cb619",},
  ], 
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};

export const HeadingOnly = Template.bind({});
HeadingOnly.args = {
  contents: {
    header: "Example Header",
    textAlign:"center",
    displaySize:"auto",
    orientation:"center",
  }, 
  media: [
  ],
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};
export const ImageHeadingOnly = Template.bind({});
ImageHeadingOnly.args = {
  contents: {
    orientation:"right",
    header: "Example Header",
    textAlign:"center",
    displaySize:"auto",
  },   
  media: [{ type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",}], 
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};
/* const TemplateForm = args => <ArtifactForm {...args} />;
export const NewForm = TemplateForm.bind({});
NewForm.args = {
  open:true,
  currentlyEditing: {
    type:"display", 
    pageId:"random",
  }
};

export const EditForm = TemplateForm.bind({});
EditForm.args = {
  open:true,
  currentlyEditing: {
    type:"display", 
    id:"random",
    media:[{ type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",}]
  }
}; */

/* export const ArtifactForm = ({ open, closeModal, currentlyEditing }) => {
  const { isNew, ...others }
  const { type, pageId } = currentlyEditing;
  const { type, id, media } = currentlyEditing;
type="education", "experience", "display" */