/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx, Box } from "theme-ui";
import {
  Input,
  Header,
  Button,
  Form,
  TextArea,
  Modal,
} from "semantic-ui-react";
// import React, { useState } from "react";

export default function ArtefactField({
  state: { open, setOpen },
  artefactField: { isNew },
  onAddDocument,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(state);
    // dispatch(createPage(state));
    setOpen(false);
  };

  const inputFieldStyle = {
    mb: "1em",
    width: "100%",
    border: "1.5px",
  };

  const getEditing = () => {
    return isNew ? "Create" : "Edit";
  };

  const Field = () => (
    <Box>
      <Header as="h4" htmlFor="Header">
        Header
      </Header>
      <TextArea sx={inputFieldStyle} name="header" />

      <Header as="h4" htmlFor="Body">
        Body
      </Header>
      <TextArea sx={inputFieldStyle} name="body" />

      <Header as="h4" htmlFor="UploadMedia">
        Upload Media
      </Header>
      <Input sx={{ mb: "1em" }} type="file" name="MediaDescription"></Input>

      <Header as="h4" htmlFor="MediaDescription">
        Description
      </Header>
      <TextArea sx={inputFieldStyle} name="mediaDescription" />
    </Box>
  );

  return (
    <Modal
      closeIcon
      size="small"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      as={Form}
      onSubmit={handleSubmit}
    >
      <Modal.Header>{getEditing()} Display</Modal.Header>
      <Modal.Content>
        <Field />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red">Delete</Button>
        <Button color="blue" type="submit">
          Submit
        </Button>
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
