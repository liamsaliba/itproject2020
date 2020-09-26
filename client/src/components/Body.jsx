/** @jsx jsx */
import { jsx, Styled, Button, Container } from "theme-ui";
import PropTypes from "prop-types";

export default function Body({ body: { hAlign, vAlign, hasAction } }) {
  const styling = {
    padding: "5px",
    textAlign: hAlign,
    verticalAlign: vAlign,
  };

  const text = (
    <Container sx={styling}>
      <Styled.h2>Body Title</Styled.h2>
      <Styled.p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora alias
        officiis quam et iste ratione earum illo aliquid neque, quis quas
        accusamus voluptatum provident dolorum aspernatur nostrum quo similique
        odit!
      </Styled.p>

      {hasAction && <Button>Optional Action</Button>}
    </Container>
  );
  return text;
}

Body.propTypes = {
  /** Composition of the page */
  body: PropTypes.shape({
    hAlign: PropTypes.string,
    vAlign: PropTypes.string,
    hasAction: PropTypes.bool,
  }),
};
