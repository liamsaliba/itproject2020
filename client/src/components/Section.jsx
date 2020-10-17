/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

const Heading = ({ name, id }) => {
  return <Styled.h2 id={id}>{name}</Styled.h2>;
};

export const Section = ({ pageId, name, artifacts }) => {
  // TODO: Where to use pageId?s
  const styling = {
    margin: "0 auto",
    mb: "2em", // space between sections
    display: "flex",
    flexFlow: "row wrap", // the wrap & flexDir makes all the difference here.
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
  };

  return (
    <Box sx={{ textAlign: "center" }} id={name}>
      <Heading id={pageId} name={name} />
      <Box sx={styling}>{artifacts}</Box>
    </Box>
  );
};

// Cards.propTypes = {
//   name: PropTypes.string,
//   cards: PropTypes.array,
// };
