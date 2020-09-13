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

  let pages = names.map(name => (
    <Page
      name={name}
      publications={
        name === "Publications"
          ? ["publication1", "publication2", "publication3", "publication4"]
          : undefined
      }
    />
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
