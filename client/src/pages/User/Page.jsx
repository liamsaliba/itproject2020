/** @jsx jsx */
import React from "react";
import { jsx, Image, Box, Styled, Card } from "theme-ui";
import documentPreview from "../../svg/DocumentPreview.png";

import Experience from "./Experiences.jsx";

/* ------------------------------------------------------------------- */

// writing it here before making a separate file for it!
const Publications = props => {
  const { id: name, children: publications } = props;

  const publicationsStyle = {
    margin: "0 auto",
    mb: 10,
    display: "flex",
    flexFlow: "row wrap", // the wrap & flexDir makes all the difference here.
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
  };

  let pubItems = publications.map(card => <PubItem id={card} />); // Do we need to give func components ids?

  return (
    <React.Fragment>
      <Styled.h2> {name} </Styled.h2>
      <Box id={name} sx={publicationsStyle} mr={5} ml={5}>
        {pubItems}
      </Box>
    </React.Fragment>
  );
};

const PubItem = props => {
  const publicationstyle = {
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    padding: 2,
    m: 2,
  };

  const { id: itemName } = props;
  return (
    // When you click it, may open a modal to view the publication?
    <Card id={itemName} sx={publicationstyle}>
      <Image src={documentPreview} margin={2} sx={{ maxWidth: "256px" }} />
      <Styled.p>This describes {itemName}!</Styled.p>
    </Card>
  );
};

/* ------------------------------------------------------------------- */

// const Experience = props => {
// return <React.Fragment></React.Fragment>;
// };

/* ------------------------------------------------------------------- */

export default props => {
  /* const styling = {
    m: 3,
    p: 2,
  }; */
  /* if (props.name === "Publications") {
    return <Publications id={props.name}>{props.children}</Publications>;
  } else if (props.name === "Experience") {
    return <Experience id={props.name} />;
  } else {
    return (
      <Box id={props.name} sx={styling}>
        <Styled.h2 id={props.name}> {props.name} </Styled.h2>
        <Styled.p> The {props.name} container </Styled.p>
        {props.children}
      </Box>
    );
  } */
  if (props.name === "Experience"){
    return <Experience type={"Experience"} />;
  }
  return <Publications id={props.name}>{props.children}</Publications>;
};
