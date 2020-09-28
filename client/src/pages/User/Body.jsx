/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Box, Image, Styled } from "theme-ui";
import profileExample from "../../svg/Profile_example.png";
import Page from "./Page";

const styling = {
  textAlign: "center",
  justifyContent: "center",
};

export default props => {
  const { userId: id, pages: names } = props;

  const pages = names.map(name => (
    <Page id={"Page" + name} name={name}>
      {[1, 2, 3, 4, 5].map(item => name + item)}
    </Page>
  ));

  return (
    <main>
      <Container display="flex" sx={styling}>
        <Box>
          <Box mb={5}>
            <Image
              src={profileExample}
              sx={{ borderRadius: "50%", width: "20%" }}
              margin={2}
            />
            <Styled.h1> {id} </Styled.h1>
          </Box>
          {pages}
        </Box>
      </Container>
    </main>
  );
};
