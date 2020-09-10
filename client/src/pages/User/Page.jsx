/** @jsx jsx */
import { jsx } from "theme-ui";
import { Box, Styled } from "theme-ui";

const styling = {
  m: 3,
  p: 2
};

export default props => {
  return (
      <Box id={props.name} sx={styling} >
        <Styled.h2 id={props.name}> {props.name} </Styled.h2>
        <Styled.p> The {props.name} container </Styled.p>
        {props.children}
      </Box>
  );
};
