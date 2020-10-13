/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Box, Image, Styled } from "theme-ui";
import profileExample from "../../svg/Profile_example.png";
import documentPreview from "../../svg/DocumentPreview.png";

import {Cards} from "../../components/Cards";
import Artefacts from "../../components/Artefacts";
import {Sections} from "../../components/Sections";
import Body from "../../components/Body";
import * as ArtefactStories from "../../components/stories/Artefacts.stories";
import * as BodyStories from "../../components/stories/Body.stories";
import * as SectionStories from "../../components/stories/Sections.stories";
import { selectPortfolioPages } from "../../store";
import { useSelector } from "react-redux";
// import { selectPortfolioPageIds } from "../../store/slices/portfolios";

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

// const pages = ["Publications", "Experience", "Articles", "About"];

export default props => {
  const { userId } = props;
  const pageOrder = useSelector(state => selectPortfolioPages(state, userId));
  // const pages = useSelector(state => selectPagesByUsername(state, userId));

  // const pages1 = useSelector(state => selectPortfolioPageIds(state, userId));
  // const pages2 = useSelector(state => Object.values(state.pages.entities));
  // const pages3 = pages2.filter(page => pages1.includes(page.id));
  // console.log({ pages3 });
  // console.log(pages);
  // console.log(pageOrder);
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
  ];

  // const pageContainers = pages.map(page => (
  //   <CardCollection name={page.name} key={page.id} cards={exampleCards} />
  // ));

  const pageContainers = pageOrder.map(page => (
    <Cards
      name={page.name}
      key={page.id}
      pageId={page.id}
      cards={exampleCards}
    />
  ));

    const summaryTextStyle = {
      width:"auto",
      ml:"5em",
      mr:"5em"
    }

  return (
    <Container as="main" display="flex" sx={styling}>
      <Box>
        <Header username={userId} />
        <Body body={{...BodyStories.Centered.args.body, actionString:"", style:summaryTextStyle}}/>
        <Sections {...SectionStories.SingleExperience.args} />
        <Sections {...SectionStories.SingleEducation.args} />
        <Artefacts {...ArtefactStories.LeftFeature.args} />
        <Artefacts {...ArtefactStories.RightFeature.args} />
        {pageContainers}
      </Box>
    </Container>
  );
};
