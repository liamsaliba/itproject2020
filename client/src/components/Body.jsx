/** @jsx jsx */
import { jsx, Styled, Button, Container } from "theme-ui";
import PropTypes from "prop-types";
import React, {useState} from 'react'
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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (isEditing) {
      setOpen(!open);
    }
  }

  const textEditorArgs = {
    state: {
      open: open,
      setOpen: setOpen
    },
    textEditor: {
      defaultText: text
    }
  }

  const Text = () => (
    <Styled.p onClick={handleClick}>{text}</Styled.p>
  );

  const out = (
    <React.Fragment>
      <TextEditor {...textEditorArgs} />
      <Container sx={styling}>
        <Text />
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
