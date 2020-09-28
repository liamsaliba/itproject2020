import React from "react";

import PageTab from "./PageTab";

export default {
  component: PageTab,
  title: "PageTab",
};

const Template = args => <PageTab {...args} />;

export const PageDefault = Template.bind({});
PageDefault.args = {
  page: {
    id: "1",
    title: "Test Page",
    state: "PAGE_INACTIVE",
  },
};
