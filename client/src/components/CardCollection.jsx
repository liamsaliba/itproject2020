/** @jsx jsx */
import React from "react";
import { jsx, Box, Styled} from "theme-ui";

import PropTypes from "prop-types";

import OurCard from './OurCard';

/* ------------------------------------------------------------------- */

// writing it here before making a separate file for it!
export default function CardCollection({ name, cards }) {

  const styling = {
    margin: "0 auto",
    mb: 10,
    display: "flex",
    flexFlow: "row wrap", // the wrap & flexDir makes all the difference here.
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
  };

  let allCards = cards.map(cardInput => <OurCard {...cardInput} />); 

  return (
    <Box sx={{textAlign:"center"}}>
      <Styled.h2> {name} </Styled.h2>
      <Box id={name} sx={styling} mr={5} ml={5}>
        {allCards}
      </Box>
    </Box>
  );
};

CardCollection.propTypes = {
  name: PropTypes.string,
  cards: PropTypes.array,
};