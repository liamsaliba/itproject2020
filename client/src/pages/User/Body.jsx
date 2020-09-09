/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Box, Image, Styled } from "theme-ui";
import profileExample from "../../svg/Profile_example.png";
import Page from "./Page";

const styling = {
  textAlign: "center",
  m: 3,
};

export default props => {
  const { userId: id, pages: names } = props;

  let pages = names.map(name => <Page name={name} />);
  pages.shift();

  return (
    <main>
      <Container sx={styling}>
        <Box>
          <Image
            src={profileExample}
            sx={{ borderRadius: "50%", width: "40%" }}
            margin={5}
          />
          <Styled.h1> {id} </Styled.h1>
        </Box>
      </Container>

      {pages}
    </main>
  );
};
