/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Box, Image, Styled } from "theme-ui";
import profileExample from "../../svg/Profile_example.png";
import documentPreview from "../../svg/DocumentPreview.png";

import CardCollection from "../../components/CardCollection";

const styling = {
  textAlign: "center",
  justifyContent: "center",
};

export default props => {
  const { userId: id, pages: names } = props;

  const exampleCard = {card: {
    title: "Title", 
    body: "Hi my name is 1!", 
    featureType: "image", // Describes the feature tupe {image|video|...}
    feature: documentPreview, // or something else!
    featureOrientation:"top"
  }};

  const exampleCards = [exampleCard, exampleCard, exampleCard, exampleCard, exampleCard];

  const pages = names.map(name => (
    <CardCollection name={name} cards={exampleCards}/>
  ));

  return (
    <main>
      <Container display="flex" sx={styling}>
        <Box>
          <Box mb={5}>
            <Image
              src={profileExample}
              sx={{ borderRadius: "50%", width: "20%" }}
              margin={2}
            />
            <Styled.h1> {id} </Styled.h1>
          </Box>
          {pages}
        </Box>
      </Container>
    </main>
  );
};
