import React from "react";

import { PageList } from "./PageList";
import * as PageStories from "./PageTab.stories";

export default {
  component: PageList,
  title: "PageList",
  decorators: [story => <div style={{ padding: "3rem" }}>{story()}</div>],
};

const Template = args => <PageList {...args} />;

export const DefaultList = Template.bind({});
DefaultList.args = {
  // Shaping the stories through args composition.
  // The data was inherited the Default story in task.stories.js.
  pages: [
    { ...PageStories.PageDefault.args.page, id: "1", title: "Page 1" },
    { ...PageStories.PageDefault.args.page, id: "2", title: "Page 2" },
    { ...PageStories.PageDefault.args.page, id: "3", title: "Page 3" },
    { ...PageStories.PageDefault.args.page, id: "4", title: "Page 4" },
    { ...PageStories.PageDefault.args.page, id: "5", title: "Page 5" },
    { ...PageStories.PageDefault.args.page, id: "6", title: "Page 6" },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  page: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
