/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx, Label, Box } from "theme-ui";
import { Input, Button, Form, TextArea, Modal } from "semantic-ui-react";
import React, { useState } from "react";


export default function ArtefactField({
  state: {
    open,
    setOpen,
  },
  artefactField: { isNew },
  onAddDocument,
}) {

/* 
  const handleChange = (content, editor) => {
    setText(content);
    // console.log("Content was updated:", setText(content));
  }; */

  const inputFieldStyle = {
    mb: "1em",
    width: "100%",
    border: "1.5px",
  };

  const getEditing = () => {
    return isNew ? "Create" : "Edit";
  };

  const Field = () => (
    <Box as="form">
      <Label htmlFor="Header">Header</Label>
      <Form sx={inputFieldStyle}>
        <TextArea name="header" />
      </Form>

      <Label htmlFor="Body">Body</Label>
      <Form sx={inputFieldStyle}>
        <TextArea name="body" />
      </Form>

      <Label htmlFor="UploadMedia">Upload Media</Label>
      <Input sx={{mb:"1em"}}type="file" name="MediaDescription"></Input>

      <Label htmlFor="MediaDescription">Description</Label>
      <Form sx={inputFieldStyle}>
        <TextArea name="mediaDescription" />
      </Form> 
    </Box>
  );

  return (
    <Modal
      closeIcon
      size="large"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>{getEditing()} Display</Modal.Header>
      <Modal.Content>
        <Field />
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey">Delete</Button>
        <Button>Save</Button>
      </Modal.Actions>
    </Modal>
  );
}

ArtefactField.propTypes = {
  /** Composition of the page */
  state: PropTypes.shape({
    open: PropTypes.bool,
    setOpen: PropTypes.func,
  }),
  artefactField: PropTypes.shape({
    isNew: PropTypes.bool,
  }),
  onAddDocument: PropTypes.func,
};
