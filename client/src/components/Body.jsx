/** @jsx jsx */
import { jsx, Styled, Button, Container } from "theme-ui";
import PropTypes from "prop-types";

export default function Body({ body: { hAlign, vAlign, heading, body, actionString, onAction } }) {
  const styling = {
    padding: "5px",
    textAlign: hAlign,
    verticalAlign: vAlign,
  };

  const Heading = () => {
    return (
      <Styled.h2>{heading}</Styled.h2>
    );
  }

  const Text = () => {
    return (
      <Styled.p>{body}</Styled.p>
    );
  }

  const out = (
    <Container sx={styling}>
      <Heading />
      <Text />
      {actionString && <Button onClick={() => onAction}>{actionString}</Button>}
    </Container>
  );
  return out;
}

Body.propTypes = {
  /** Composition of the page */
  body: PropTypes.shape({
    hAlign: PropTypes.string,
    vAlign: PropTypes.string,
    heading: PropTypes.bool,
    body: PropTypes.bool,
    actionString: PropTypes.bool,
    onAction: PropTypes.func,
  }),
};
