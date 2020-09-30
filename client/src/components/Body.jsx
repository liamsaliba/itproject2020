/** @jsx jsx */
import { jsx, Styled, Button, Container } from "theme-ui";
import PropTypes from "prop-types";
import React from 'react'
import TextEditor from './TextEditor';

export default function Body({ 
  body: { 
    isEditing, 
    style, 
    hAlign, 
    vAlign, 
    text, 
    actionString, 
    onAction } 
  }) {
    
  const styling = {
    ...style,
    padding: "5px",
    textAlign: hAlign,
    verticalAlign: vAlign,
  };

  const textEditorArgs = {
    isEditing:false, 
    textEditor: {
      defaultText: text
    }
  }

  const Text = () => (
    <Styled.p>{text}</Styled.p>
  );

  const out = (
    <React.Fragment>
      <Container sx={styling}>
        <TextEditor {...textEditorArgs} />
        {actionString && <Button onClick={() => onAction}>{actionString}</Button>}
      </Container>
    </React.Fragment>
  );
  return out;
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
