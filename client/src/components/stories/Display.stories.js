import React from "react";

import {Display} from "../Sections";
import { ArtifactForm } from "../../components/ArtifactForm";

import camelAnatomy from "../../svg/camelAnatomy.png";

export default {
  component: Display,
  title: "Pages/Display",
};

const Template = args => <Display {...args} />;

export const Right = Template.bind({});
Right.args = {
  contents: {
    orientation:"right",
    body: "Example Body",
    header: "Example Header",
    actionText: "Example Action",
    actionUrl: "https://www.messenger.com/",
  }, 
  media: [{ type: "image", url: camelAnatomy, id:"5f90276ba6b2bd00423cb618",}], 
  editing:true,
  id:"5f90276ba6b2bd00423cb618",
};

export const Left = Template.bind({});
Left.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    orientation:"left",
  },
};

export const Center = Template.bind({});
Center.args = {
  ...Right.args,
  contents: {
    ...Right.args.contents,
    orientation:"center",
  },
};

const TemplateForm = args => <ArtifactForm {...args} />;
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
};

/* export const ArtifactForm = ({ open, closeModal, currentlyEditing }) => {
  const { isNew, ...others }
  const { type, pageId } = currentlyEditing;
  const { type, id, media } = currentlyEditing;
type="education", "experience", "display" */