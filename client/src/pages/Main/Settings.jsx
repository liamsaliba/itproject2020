/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  Form,
  Button,
  Modal,
  Grid,
  Icon,
  Header,
  Divider,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import { ChooseProfileModal } from "../../components/ProfileIcon";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  selectAuthSlice,
  // selectPortfoliosSlice,
  // selectToken,
  // selectUsername,
  selectUser,
  selectAuthLoading,
  selectAuthError,
  updateUser,
  resetAuthErrors,
} from "../../store";
import { Link, Title, Toast } from "../../components";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAsync, useFormState } from "../../components/Modals";

const Edit = ({ editing, setEditing, submit, loading = false }) => {
  if (!editing) {
    return (
      <Form.Button
        fluid
        basic
        primary
        icon="edit"
        content="Edit"
        type="button"
        onClick={() => setEditing(true)}
      />
    );
  } else {
    return (
      <Button.Group widths="3">
        <Button
          fluid
          basic
          negative
          icon="remove"
          labelPosition="left"
          content="Cancel"
          type="button"
          disabled={loading}
          onClick={() => setEditing(false)}
        />
        <Button
          fluid
          positive
          icon="check"
          labelPosition="left"
          content="Save"
          loading={loading}
          type="button"
          onClick={submit}
        />
      </Button.Group>
    );
  }
};

const DeleteAccountModal = () => {
  const [status, setStatus] = useState("closed");
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [state, setState] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e, values) => {
    const { name, value } = values;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (loading && status === "sentDelete") {
      setStatus("deleting");
    }
  }, [loading, status, setStatus]);

  useEffect(() => {
    if (!loading && status === "deleting") {
      if (error === null) {
        history.push("/");
        toast.info("Account deleted.");
        setStatus("closed");
      }
      dispatch(resetAuthErrors());
    }
  }, [loading, status, setStatus, dispatch, error, history]);

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = state;
    if (password === "" || username === "") {
      toast.error("Required fields are empty.");
      return;
    }
    dispatch(deleteUser(username, password));
    setStatus("sentDelete");
  };

  return (
    <Modal
      size="small"
      closeOnDimmerClick={false}
      onClose={() => setStatus("closed")}
      onOpen={() => setStatus("open")}
      onSubmit={handleSubmit}
      open={status !== "closed"}
      as={Form}
      // onSubmit={handleSubmit(onSubmit)}
      dimmer={{ inverted: true }}
      trigger={
        <Button basic icon negative labelPosition="left" type="button">
          <Icon name="trash" />
          Delete Account
        </Button>
      }
    >
      <Modal.Header>Deleting portfolio and account</Modal.Header>
      <Modal.Content>
        <p>
          This process is irreversible and you will not be able to recover your
          account or portfolio. To verify that you really want to delete your
          account, please re-enter your username and password.
        </p>
        <Form.Input
          name="username"
          fluid
          icon="at"
          iconPosition="left"
          placeholder="Username"
          autocomplete="off"
          onChange={handleChange}
        />
        <Form.Input
          name="password"
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          autocomplete="off"
          onChange={handleChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => setStatus("closed")} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button
          basic
          negative
          type="button"
          loading={loading}
          onClick={handleSubmit}
        >
          <Icon name="trash" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default () => {
  const dispatch = useDispatch();

  // const [form, setForm] = useState(null);
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [editing, setEditing] = useState(false);

  const { state, handleChange, setState } = useFormState({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  // eslint-disable-next-line no-unused-vars
  const { start } = useAsync(
    loading,
    error,
    () => {
      setState({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      setEditing(false);
    },
    () => dispatch(resetAuthErrors)
  );

  const authError = useSelector(state => selectAuthSlice(state).error);
  const history = useHistory();

  useEffect(() => {
    if (user === undefined || user.username === undefined) {
      history.push("/login");
      toast.error(<Toast title="You need to login to change your settings." />);
    }
  });

  // useEffect(() => {
  //   if (form !== null) {
  //     const { firstName, lastName } = form;
  //     if (firstName === "" || lastName === "") {
  //       toast.error("Required fields are empty.");
  //       return;
  //     }
  //   }
  // }, [form, dispatch]);

  useEffect(() => {
    // TODO: fix error handling on store
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

  const handleSubmit = () => {
    const { firstName, lastName } = state;

    if (firstName === "" || lastName === "") {
      toast.error("Required fields are empty.");
      return;
    }

    dispatch(updateUser({ firstName, lastName }));
    start();
  };
  if (user === undefined || user.username === undefined) return null;

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column verticalAlign="middle" style={{ minWidth: 400 }}>
          <Title>Settings</Title>
          <Header as="h2" textAlign="center">
            <Icon name="settings" /> Settings
          </Header>
          <br />
          <ChooseProfileModal username={user.username} profile={user.avatar} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column style={{ maxWidth: 400 }}>
          <Divider horizontal>User Settings</Divider>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                name="firstName"
                fluid
                icon="user"
                iconPosition="left"
                label="First Name"
                value={state.firstName}
                onChange={handleChange}
                transparent={!editing}
                readOnly={!editing}
              />
              <Form.Input
                name="lastName"
                fluid
                icon="user"
                iconPosition="left"
                label="Last Name"
                value={state.lastName}
                onChange={handleChange}
                transparent={!editing}
                readOnly={!editing}
              />
            </Form.Group>
            <Form.Input
              name="email"
              fluid
              icon="mail"
              iconPosition="left"
              label="Email"
              defaultValue={user.email}
              disabled={editing}
              transparent
              readOnly
            />
            <Form.Input
              name="username"
              fluid
              icon="at"
              iconPosition="left"
              label="Username"
              defaultValue={user.username}
              disabled={editing}
              transparent
              readOnly
            />
            {Edit({ editing, setEditing, submit: handleSubmit, loading })}
            <Divider horizontal>Account Settings</Divider>
            <Button.Group widths="3">
              <Button
                secondary
                as={Link}
                type="button"
                icon="log out"
                labelPosition="left"
                content="Log out from device"
                to="/logout"
              />
              <Button
                basic
                secondary
                as={Link}
                icon="unlock"
                type="button"
                labelPosition="left"
                to="/logout/all"
                content="Log out everywhere"
              />
            </Button.Group>
            <br />
            <br />
            <Button.Group widths="3">
              <Button
                primary
                type="button"
                icon="lock"
                as={Link}
                labelPosition="left"
                content="Change Password"
                to="/reset-password"
              />
              <DeleteAccountModal />
            </Button.Group>
          </Form>
          <br />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
