/** @jsx jsx */
import { jsx, Box, Image, Styled, Card as ThemedCard } from "theme-ui";

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
      <Styled.h2 id={name}> {name} </Styled.h2>
      <Box sx={styling} mr={5} ml={5}>
        {artifacts}
      </Box>
    </Box>
  );
};

// Cards.propTypes = {
//   name: PropTypes.string,
//   cards: PropTypes.array,
// };
