/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Box, Image, Styled } from "theme-ui";
import profileExample from "../../svg/Profile_example.png";
import documentPreview from "../../svg/DocumentPreview.png";

import { Cards } from "../../components/Cards";
import Artefacts from "../../components/Artefacts";
import { Sections } from "../../components/Sections";
import Body from "../../components/Body";
import * as ArtefactStories from "../../components/stories/Artefacts.stories";
import * as BodyStories from "../../components/stories/Body.stories";
import * as SectionStories from "../../components/stories/Sections.stories";
import { selectPortfolioPages, selectPagesByUsername } from "../../store";
import { useSelector } from "react-redux";
// import { selectPortfolioPageIds } from "../../store/slices/portfolios";

import Section from "../../components/Section";
import Body from "../../components/Body";
import * as ArtefactStories from "../../components/stories/Artefacts.stories";
import * as BodyStories from "../../components/stories/Body.stories";
import * as SectionStories from "../../components/stories/Section.stories";

const ChooseStory = ({ type }) => {
  switch (type) {
    case "experience":
      return <Section {...SectionStories.Experiences.args} />;
    case "education":
      return <Section {...SectionStories.Education.args} />;
    case "display":
      return (
        <Body body={{ ...BodyStories.Centered.args.body, actionString: "" }} />
      );
    default:
      return null;
  }
};

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
  const pages = useSelector(selectPagesByUsername(userId));
  console.log(pages);

  // const exampleCard = {
  //   card: {
  //     title: "Title",
  //     body: "Hi my name is 1!",
  //     featureType: "image", // Describes the feature tupe {image|video|...}
  //     feature: documentPreview, // or something else!
  //     featureOrientation: "top",
  //   },
  // };

  const exampleCards = [exampleCard, exampleCard, exampleCard];

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
    width: "auto",
    ml: "5em",
    mr: "5em",
  };

  return (
    <Container as="main" display="flex" sx={styling}>
      <Box>
        <Header username={userId} />
        <Body
          body={{
            ...BodyStories.Centered.args.body,
            actionString: "",
            style: summaryTextStyle,
          }}
        />
        <Sections {...SectionStories.SingleExperience.args} />
        <Sections {...SectionStories.SingleEducation.args} />
        <Artefacts {...ArtefactStories.LeftFeature.args} />
        <Artefacts {...ArtefactStories.RightFeature.args} />
        {pageContainers}
      </Box>
    </Container>
  );
};
