/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Box, Image, Styled } from "theme-ui";
import profileExample from "../../svg/Profile_example.png";
import documentPreview from "../../svg/DocumentPreview.png";

import CardCollection from "../../components/CardCollection";
import Artefacts from "../../components/Artefacts";
import * as ArtefactStories from "../../components/stories/Artefacts.stories";
import { selectPagesByUsername, selectPortfolioPages } from "../../store";
import { useSelector } from "react-redux";

const styling = {
  textAlign: "center",
  justifyContent: "center",
};

const Header = ({ username }) => (
  <Box mb={5}>
    <Image
      src={profileExample}
      sx={{ borderRadius: "50%", width: "20%" }}
      margin={2}
    />
    <Styled.h1> {username} </Styled.h1>
  </Box>
);

export default props => {
  const { userId } = props;
  const pageOrder = useSelector(state => selectPortfolioPages(state, userId));
  const pages = useSelector(state => selectPagesByUsername(state, userId));
  console.log(pages);
  const exampleCard = {
    card: {
      title: "Title",
      body: "Hi my name is 1!",
      featureType: "image", // Describes the feature tupe {image|video|...}
      feature: documentPreview, // or something else!
      featureOrientation: "top",
    },
  };

  const exampleCards = [
    exampleCard,
    exampleCard,
    exampleCard,
    exampleCard,
    exampleCard,
  ];

  // const pageContainers = pages.map(page => (
  //   <CardCollection name={page.name} key={page.id} cards={exampleCards} />
  // ));

  return (
    <Container as="main" display="flex" sx={styling}>
      <Box>
        <Header username={userId} />
        <Artefacts {...ArtefactStories.LeftFeature.args} />
        {pages}
      </Box>
    </Container>
  );
};
