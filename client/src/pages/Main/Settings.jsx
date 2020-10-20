/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  Form,
  Input,
  Button,
  Modal,
  Grid,
  Icon,
  Header,
  Image,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import { ProfileIcon } from "../../components/ProfileIcon";
import camel from "../../svg/camel.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthSlice,
  // selectPortfoliosSlice,
  // selectToken,
  // selectUsername,
  selectUser,
} from "../../store";
import { Title, Toast } from "../../components";

import { useEffect, useState } from "react";

const Edit = ({ field, set }) => {
  if (field) {
    return (
      <Form.Button
        fluid
        basic
        primary
        icon="edit"
        content="Edit"
        onClick={() => set(false)}
      />
    );
  } else {
    return (
      <Form.Button
        fluid
        positive
        icon="check"
        content="Save"
        type="submit"
        onClick={() => set(true)}
      />
    );
  }
};

const SetAvatarModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  // const [state, setState] = useState({ name });
  // const dispatch = useDispatch();
  // const handleChange = (e, { name, value }) =>
  //   setState({ ...state, [name]: value });

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   dispatch(renamePage(pageId, state.name));
  //   setOpen(false);
  // };

  return (
    <Modal
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      as={Form}
      // onSubmit={handleSubmit(onSubmit)}
      dimmer={{ inverted: true }}
      trigger={
        <ProfileIcon
          userId={user.userId}
          width={175}
          height={175}
          to="#"
          sx={{ mr: "5px" }}
        />
      }
    >
      <Modal.Header>Set Avatar</Modal.Header>
      <Modal.Content>
        <Grid centered>
          <Grid.Row>
            <ProfileIcon
              userId={user.userId}
              width={250}
              height={250}
              to="#"
              sx={{ mr: "5px" }}
            />
          </Grid.Row>
          <Grid.Row>
            <Input
              sx={{ mb: "1em" }}
              type="file"
              name="MediaDescription"
              transparent
            />
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon
          negative
          labelPosition="left"
          onClick={() => setOpen(false)}
        >
          <Icon name="remove" />
          Cancel
        </Button>
        <Button icon primary type="submit" labelPosition="left">
          <Icon name="checkmark" />
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();

  const handleSubmit = e => {
    // e.preventDefault();
    // const formData = new FormData(e.target);
    // const oldPassword = formData.get("oldPassword");
    // const newPassword = formData.get("newPassword");
    // const confirmNewPassword = formData.get("confirmNewPassword");
    // if (confirmNewPassword === newPassword) {
    //   toast.error("Password does not match.");
    //   setOpen(true)
    //   return;
    // }
    // dispatch(renamePage(pageId, state.name));
    // setOpen(false);
  };

  return (
    <Modal
      size="small"
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      as={Form}
      onSubmit={handleSubmit()}
      dimmer={{ inverted: true }}
      trigger={
        <Button icon primary labelPosition="left">
          <Icon name="lock" />
          Change Password
        </Button>
      }
    >
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            name="oldPassword"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Old Password"
            type="password"
          />
          <Form.Input
            name="newPassword"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="New Password"
            type="password"
          />
          <Form.Input
            name="confirmNewPassword"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm New Password"
            type="password"
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic primary onClick={() => setOpen(false)}>
          <Icon name="remove" />
          Cancel
        </Button>
        <Button positive type="submit">
          <Icon name="checkmark" />
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const DeleteAccountModal = () => {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   dispatch(renamePage(pageId, state.name));
  //   setOpen(false);
  // };

  return (
    <Modal
      size="small"
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      as={Form}
      // onSubmit={handleSubmit(onSubmit)}
      dimmer={{ inverted: true }}
      trigger={
        <Button basic icon negative labelPosition="left">
          <Icon name="trash" />
          Delete Account
        </Button>
      }
    >
      <Modal.Header>Are you sure?</Modal.Header>
      <Modal.Content>
        This process is irreversible and you will not be able to recover your
        account.
      </Modal.Content>
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

const SettingsForm = ({ userId, setForm }) => {
  const user = useSelector(selectUser);
  const [editing, setEditing] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const confirmPassword = formData.get("confirmPassword");
    // const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    // const email = formData.get("email");

    setForm({
      // confirmPassword,
      // password,
      firstName,
      lastName,
      // email,
    });
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column verticalAlign="middle" style={{ minWidth: 400 }}>
          <Title>Settings</Title>
          <Header as="h2" textAlign="center">
            <Image src={camel} /> User Settings
          </Header>
          <br />
          <Grid.Row verticalAlign="middle" centered>
            <SetAvatarModal user={user} />
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column style={{ maxWidth: 400 }}>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                name="firstName"
                fluid
                icon="user"
                iconPosition="left"
                label="First Name"
                defaultValue={user.firstName}
                transparent={editing}
                readOnly={editing}
              />
              <Form.Input
                name="lastName"
                fluid
                icon="user"
                iconPosition="left"
                label="Last Name"
                defaultValue={user.lastName}
                transparent={editing}
                readOnly={editing}
              />
            </Form.Group>
            <Form.Input
              name="email"
              fluid
              icon="mail"
              iconPosition="left"
              label="Email"
              defaultValue={user.email}
              transparent
              disabled
            />
            <Form.Input
              name="username"
              fluid
              icon="at"
              iconPosition="left"
              label="Username"
              defaultValue={user.username}
              transparent
              disabled
            />
            {Edit({ field: editing, set: setEditing })}

            <ChangePasswordModal />
            <DeleteAccountModal />
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(null);

  const authError = useSelector(state => selectAuthSlice(state).error);

  useEffect(() => {
    if (form !== null) {
      const { firstName, lastName } = form;
      if (firstName === "" || lastName === "") {
        toast.error("Required fields are empty.");
        return;
      }
    }
  }, [form, dispatch]);

  useEffect(() => {
    if (authError) {
      toast.error(
        <Toast
          title="Couldn't update user account."
          message={authError.data}
          technical={authError.message}
        />
      );
    }
  }, [authError]);

  return <SettingsForm setForm={setForm} />;
};
