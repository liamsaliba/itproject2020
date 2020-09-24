/** @jsx jsx */
import { jsx } from "theme-ui";
import { Flex, Box, Styled } from "theme-ui";

/* import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; */

/* const Navbar = props => (
  <Flex
    p={2}
    {...props}
    sx={{
      ...props.sx,
      alignItems: "center",
      bg: props.bg ?? "background",
    }}
  />
);
 */

/* const headerText = (props) => (
  <Styled.h1>
    {props.children}
  </Styled.h1>
);

const bodyText = (props) => (
  <Styled.p>
    {props.children}
  </Styled.p>
); */


export default props => {
  const { type  } = props;
  // const { type, sx, Title, Organisation, Location  } = props;
  
  const styling = {
    textAlign: "center",
    justifyContent: "center",
  }

  // Writing for Projects first
  const base = (
    <Flex sx={styling}>
      <Box>
        <Styled.h1>
          Experience
        </Styled.h1>
        <Styled.h2>
          Title
        </Styled.h2>
        <Styled.p>
          Organisation
        </Styled.p>
        <Styled.p>
          Location
        </Styled.p>
        <Styled.p>
          00-00-2000 till 12-12-2000
        </Styled.p>
        <Styled.p>
          Completed
        </Styled.p>
        <Styled.p>
          Description
        </Styled.p>
      </Box>
    </Flex>
  );

  if (type==="Experience") {
    return base;
  }
};