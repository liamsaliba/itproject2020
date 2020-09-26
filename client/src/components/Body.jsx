/** @jsx jsx */
import { jsx, Styled, Button, Container } from "theme-ui";
import PropTypes from "prop-types";

export default function Body({ body: { hAlign, vAlign, hasHeading, hasBody, hasAction } }) {
  const styling = {
    padding: "5px",
    textAlign: hAlign,
    verticalAlign: vAlign,
  };

  const Heading = () => {
    if (hasHeading) {
      return (
        <Styled.h2>Body Title</Styled.h2>
      );
    } return;
  }

  const Text = () => {
    if (hasBody) {
      return (
        <Styled.p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora alias
          officiis quam et iste ratione earum illo aliquid neque, quis quas
          accusamus voluptatum provident dolorum aspernatur nostrum quo similique
          odit!
        </Styled.p>
      );
      
    } return;
  }

  const out = (
    <Container sx={styling}>
      <Heading />
      <Text />
      {hasAction && <Button>Optional Action</Button>}
    </Container>
  );
  return out;
}

Body.propTypes = {
  /** Composition of the page */
  body: PropTypes.shape({
    hAlign: PropTypes.string,
    vAlign: PropTypes.string,
    hasHeading: PropTypes.bool,
    hasBody: PropTypes.bool,
    hasAction: PropTypes.bool,
  }),
};
