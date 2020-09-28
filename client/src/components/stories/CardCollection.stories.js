/** @jsx jsx */
import { jsx } from "theme-ui";

import CardCollection from '../CardCollection';
import * as CardStories from "./OurCard.stories";

export default {
  component: CardCollection,
  title: "Components/CardCollection",
};

const Template = args => <CardCollection {...args} />;

export const Default = Template.bind();
Default.args = {
  name: "Lawrence's Random Card Collection",
  cards: [
    CardStories.Default.args,
    CardStories.Default.args,
    CardStories.Default.args,
    CardStories.Default.args,
    CardStories.Default.args,
    CardStories.Default.args,
    CardStories.Default.args,
  ],
};