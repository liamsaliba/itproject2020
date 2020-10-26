/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import PropTypes from "prop-types";
import React from "react";
// import TextEditor from "./TextEditor";

export default function Body({
  // body: { isEditing, style, hAlign, vAlign, text, actionString, onAction },
  body,
  header,
  hPos = "right",
  vPos = "center",
}) {
  const styling = {
    // ...style,
    padding: "5px",
    textAlign: hPos,
    verticalAlign: vPos,
  };

  // const textEditorArgs = {
  //   isEditing: false,
  //   textEditor: {
  //     defaultText: text,
  //   },
  // };

  const out = (
    <React.Fragment>
      <Container sx={styling}>
        {body === "" ? <h1>{header}</h1> : <h3>{header}</h3>}
        <p>{body}</p>
        {/* <TextEditor {...textEditorArgs} />
        {actionString && (
          <Button onClick={() => onAction}>{actionString}</Button>
        )} */}
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
