import React from "react";
import { SocialIcons } from "../Socials";

export default {
  component: SocialIcons,
  title: "Portfolio/Social Icons",
};

const Template = args => <SocialIcons {...args} />;

export const Icons = Template.bind({});
Icons.args = {
  socials: [
    "https://github.com/exradr",
    "https://www.youtube.com/lsp0",
    "https://www.linkedin.com/me/liamsaliba/",
    "https://twitter.com/lsproductions0",
  ],
  editing: true,
};
