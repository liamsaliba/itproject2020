/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

import PropTypes from "prop-types";

import Card from "./Card";

/* ------------------------------------------------------------------- */

// writing it here before making a separate file for it!
export default function CardCollection({ pageId, name, cards }) {
  const styling = {
    margin: "0 auto",
    mb: "2em",
    display: "flex",
    flexFlow: "row wrap", // the wrap & flexDir makes all the difference here.
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
  };

  let allCards = cards.map((card, index) => (
    <Card key={"card" + index} {...card} />
  ));

  return (
    <Box sx={{ textAlign: "center" }} id={name}>
      <Styled.h2 id={name}> {name} </Styled.h2>
      <Box sx={styling} mr={5} ml={5}>
        {allCards}
      </Box>
    </Box>
  );
}

CardCollection.propTypes = {
  name: PropTypes.string,
  cards: PropTypes.array,
};
