/** @jsx jsx */
import React from "react";
import { jsx, Image, Box, Styled, Card } from "theme-ui";
import documentPreview from "../../svg/DocumentPreview.png";



// writing it here before making a separate file for it!
const Publications = props => {
  const { id: name, publications} = props;

  console.log(publications, name);

  const publicationsStyle = {
    display:"flex",
    flexWrap:"wrap", // the wrap & flexDir makes all the difference here.
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    maxHeight:"100vh"
  };

  let pubItems = publications.map(card => <PubItem id={card} />); // Do we need to give func components ids?
  pubItems.shift();

  return( 
    <React.Fragment>
      <Styled.h2> {name} </Styled.h2>
      <Styled.p> The {name} container </Styled.p>
      <Box id={name} sx={publicationsStyle} >
        {pubItems}
      </Box> 
    </React.Fragment>
  ); 
}

const PubItem = props => {
  const publicationstyle = {
    maxWidth:"256",
    height: "25%",
    width:"25%"
  };

  const { id: itemName } = props;
  return (
    <Card id={itemName} sx={publicationstyle} p={1}>
      <Image
        src={ documentPreview }
        margin={2}
      />
      <Styled.p>This describes {itemName}!</Styled.p>
    </Card>
  );
};

const styling = {
  m: 3,
  p: 2
};

export default props => {
  if(props.name === "Publications") {
    return <Publications id={props.name} publications={props.publications}/>
  } 
  
  else {
    return (
      <Box id={props.name} sx={styling}>
        <Styled.h2 id={props.name}> {props.name} </Styled.h2>
        <Styled.p> The {props.name} container </Styled.p>
        {props.children}
        {/* what does props.children give? */}
      </Box>
    );
  } 
};
