/** @jsx jsx */
import { jsx } from "theme-ui";

import { useState, useEffect } from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";

// initial state should be an object
export const useFormState = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e, values) => {
    const { name, value } = values;
    setState({ ...state, [name]: value });
  };

  return { state, setState, handleChange };
};

// custom hook
export const useAsync = (loading, error, handleFinish, resetErrors) => {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (loading && status === "sent") {
      setStatus("sending");
    }
  }, [loading, status, setStatus]);

  useEffect(() => {
    if (!loading && status === "sending") {
      if (error === null) {
        handleFinish();
        setStatus("idle");
      }
      resetErrors();
    }
  }, [loading, status, error, handleFinish, resetErrors]);

  return { status, start: () => setStatus("sending") };
};

export const DeleteConfirmationModal = ({
  action,
  content,
  name = "this",
  text = null,
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const handleSubmit = e => {
    e.preventDefault();
    action();
    closeModal();
  };

  return (
    <Modal
      as={Form}
      onSubmit={handleSubmit}
      size="tiny"
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer={{ inverted: false }}
      open={open}
      trigger={
        <Button
          icon="trash"
          basic
          color="red"
          onClick={() => setOpen(true)}
          content={text}
        />
      }
    >
      <Modal.Header>
        Are you sure you want to delete {name}? This process is irreversible.
      </Modal.Header>
      {content ? <Modal.Content>{content}</Modal.Content> : null}
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="red" type="submit">
          <Icon name="trash" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
