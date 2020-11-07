/** @jsx jsx */
import { jsx } from "theme-ui";
import documentPreview from "../../svg/DocumentPreview.png";
import { Cards, Card } from "../Cards";

export default {
  component: Cards,
  title: "Pages/Cards",
};

const CardTemplate = args => <Card {...args} />;

export const DefaultCard = CardTemplate.bind();
DefaultCard.args = {
  card: {
    title: "Title",
    body: "Hi my name is 1!",
    featureType: "image", // Describes the feature tupe {image|video|...}
    feature: documentPreview, // or something else!
    featureOrientation: "top",
  },
};

export const NoTitle = CardTemplate.bind();
NoTitle.args = {
  card: {
    ...DefaultCard.args.card,
    title: "",
  },
};

export const NoBody = CardTemplate.bind();
NoBody.args = {
  card: {
    ...DefaultCard.args.card,
    body: "",
  },
};

export const FeatureBottom = CardTemplate.bind();
FeatureBottom.args = {
  card: {
    ...DefaultCard.args.card,
    featureOrientation: "bottom",
  },
};

const Template = args => <Cards {...args} />;

export const CollectionOfCards = Template.bind();
CollectionOfCards.args = {
  id: "randomID",
  name: "Lawrence's Random Card Collection",
  editing: true,
  type: "cards",
  content: [DefaultCard.args, DefaultCard.args, DefaultCard.args],
  loading: false,
};
