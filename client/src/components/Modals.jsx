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

// export const AsyncModal = ({
//   action,
//   content,
//   name = "this",
//   text = null,
//   loading = false,
//   error = null,
//   handleFinish= () => null,
//   resetErrors = () => null,
//   initialState = {},
// }) => {
//   const [open, setOpen] = useState("closed");
//   const closeModal = () => setOpen(false);
//   const {state, handleChange} = useFormState(initialState)
//   const {status, start} = useAsync(loading, error, resetErrors, handleFinish);

// }

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
        <Button primary onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button basic negative type="submit">
          <Icon name="trash" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

// // eslint-disable-next-line no-unused-vars
// const RenamePageModal = ({ pageState }) => {
//   const { name, id } = pageState;
//   const [open, setOpen] = useState(false);
//   const [state, setState] = useState({ name });
//   const dispatch = useDispatch();
//   const handleChange = (e, { name, value }) =>
//     setState({ ...state, [name]: value });

//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(renamePage(id, state.name));
//     setOpen(false);
//   };

//   return (
//     <Modal
//       as={Form}
//       onSubmit={handleSubmit}
//       size="tiny"
//       closeOnDimmerClick={false}
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//       dimmer={{ inverted: true }}
//       open={open}
//       trigger={
//         <Dropdown.Item>
//           <Icon name="i cursor" />
//           Rename
//         </Dropdown.Item>
//       }
//     >
//       <Modal.Header>Edit page name</Modal.Header>
//       <Modal.Content>
//         <Input
//           transparent
//           fluid
//           iconPosition="left"
//           icon="file"
//           placeholder="Page Name"
//           name="name"
//           onChange={handleChange}
//           defaultValue={name}
//           required
//         />
//       </Modal.Content>
//       <Modal.Actions>
//         <Button basic color="red" onClick={() => setOpen(false)} type="button">
//           <Icon name="remove" /> Cancel
//         </Button>
//         <Button color="green" type="submit">
//           <Icon name="checkmark" /> Rename Page
//         </Button>
//       </Modal.Actions>
//     </Modal>
//   );
// };
