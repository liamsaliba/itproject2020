/** @jsx jsx */
import { jsx, Image } from "theme-ui";
import { Box, Styled } from "theme-ui";
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
    <Box>
      <Styled.h2> {name} </Styled.h2>
      <Styled.p> The {name} container </Styled.p>
      <Box id={name} sx={publicationsStyle} >
        {pubItems}
      </Box> 
    </Box>
  ); 
}

const PubItem = props => {
  const publicationstyle = {
    margin:"10px", // Test if we need to put quotes or not.
    border:"1px solid #000",
    boxShadow:"2px 2px 6px 6px rgba(0,0,0,0.3)",
    maxWidth:"23vw"
  };

  const { id: itemName } = props;
  return (
    <Box id={itemName} sx={publicationstyle}>
      <Image
        src={ documentPreview }
        sx={{ 
          width:"auto", 
          height:"auto", 
          minWidth:"100%", 
          minHeight:"100%"
          }}
        margin={2}
      />
      <Box sx={{fill:"#111"}}>
          <Styled.p>This describes {itemName}!</Styled.p>
      </Box>
    </Box>
  );
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
