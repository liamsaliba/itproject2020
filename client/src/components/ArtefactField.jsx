/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx, Label, Box } from "theme-ui";
import {
  Input,
  Button,
  TextArea, 
  Form,
  Modal,
} from "semantic-ui-react";

export default function ArtefactField({ state:{open, setOpen}, artefactField:{isNew}, onAddDocument }) {
  const modalStyle = { 
    mr: "5em",
    ml: "5em"
  };

  const inputFieldStyle = {
    mb:"3",
    width:"100%",
    border: "1.5px", 
  };

  const getEditing = () => {
    return (isNew) ? "Create" : "Edit"
  }

  const Field = () => (
    <Box as="form">
      <Label htmlFor="Header">Header</Label>
      <Form sx={inputFieldStyle}>
        <TextArea name="header"  />
      </Form>
      
  
      <Label htmlFor="Body">Body</Label>
      <Form sx={inputFieldStyle} >
        <TextArea name="body" />
      </Form>
  
      <Label htmlFor="UploadMedia">Upload Media</Label>
      <Input type="file" name="uploadMedia">
  
      </Input>
    </Box>
  );

  return (
    <Modal
      sx={modalStyle}
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{getEditing()} Display</Modal.Header>
      <Modal.Content>
        <Field />
      </Modal.Content>
      <Modal.Actions>
        <Button color="gray" >Delete</Button> 
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
