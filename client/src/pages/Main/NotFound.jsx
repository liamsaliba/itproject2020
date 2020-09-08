import React from "react";
import { Styled, Box, Container } from "theme-ui";

// TODO: Styles

export default () => {
  return (
    <React.Fragment>
      <Container
        variant="layout.centerflex"
        sx={{
          p: 10,
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2019/09/19/00/40/fantasy-4487980_1280.jpg')",
        }}
      >
        <Box p={10} sx={{ position: "absolute", top: "10%", left: "10%" }}>
          <Styled.h1>404</Styled.h1>
          <Styled.p>Have you lost your way?</Styled.p>
        </Box>
      </Container>
    </React.Fragment>
  );
};
