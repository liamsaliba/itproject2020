/** @jsx jsx */
import { jsx, Box, Flex, Styled } from "theme-ui";
import UserNavBar from "./NavBar";
// import { Router } from "@reach/router";

const bodyStyling = {
  position:"absolute", 
  // top: "10%", 
  left:'50%', 
  transform: 'translateX(-50%)', 
  textAlign:'center', 
  justifyContent: 'center'
};


export default props => {
  const { userId: id } = props;
  
  return(
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <header>
        <UserNavBar userId={id} />
      </header>

      <body> 
        <Box sx={bodyStyling}>
          <main>this is the userpage of user {id}.</main>
          <Styled.h1> Hi There </Styled.h1> 
        </Box>
      </body>
    </Flex>
  );
};
