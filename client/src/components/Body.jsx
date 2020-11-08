/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import PropTypes from "prop-types";
import React from "react";

export default function Body({
  body,
  header,
  hPos = "right",
  vPos = "center",
}) {
  const styling = {
    padding: "5px",
    textAlign: hPos,
    verticalAlign: vPos,
  };

  const out = (
    <React.Fragment>
      <Container sx={styling}>
        {body === "" ? <h1>{header}</h1> : <h3>{header}</h3>}
        <p>{body}</p>
      </Container>
    </React.Fragment>
  );
  return header !== "" && body !== "" ? out : null;
}

Body.propTypes = {
  /** Composition of the page */
  body: PropTypes.shape({
    isEditing: PropTypes.bool,
    hAlign: PropTypes.string,
    vAlign: PropTypes.string,
    heading: PropTypes.string,
    body: PropTypes.string,
    actionString: PropTypes.string,
    onAction: PropTypes.func,
  }),
};
