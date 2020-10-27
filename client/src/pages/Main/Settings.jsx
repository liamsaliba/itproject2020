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
  resetErrors,
} from "../../store";
import { Link, Title, Toast } from "../../components";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Edit = ({ editing, setEditing }) => {
  if (!editing) {
    return (
      <Form.Button
        fluid
        basic
        primary
        icon="edit"
        content="Edit"
        onClick={() => setEditing(true)}
      />
    );
  } else {
    return (
      <Form.Group widths="equal">
        <Form.Button
          fluid
          basic
          negative
          icon="remove"
          content="Cancel"
          onClick={() => setEditing(false)}
        />
        <Form.Button
          fluid
          positive
          icon="check"
          content="Save"
          type="submit"
          onClick={() => setEditing(false)}
        />
      </Form.Group>
    );
  }
};
// const ChangePasswordModal = () => {
//   const [open, setOpen] = useState(false);
//   // const dispatch = useDispatch();

//   const handleSubmit = e => {
//     // e.preventDefault();
//     // const formData = new FormData(e.target);
//     // const oldPassword = formData.get("oldPassword");
//     // const newPassword = formData.get("newPassword");
//     // const confirmNewPassword = formData.get("confirmNewPassword");
//     // if (confirmNewPassword === newPassword) {
//     //   toast.error("Password does not match.");
//     //   setOpen(true)
//     //   return;
//     // }
//     // dispatch(renamePage(pageId, state.name));
//     // setOpen(false);
//   };

//   return (
//     <Modal
//       size="small"
//       closeOnDimmerClick={false}
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//       open={open}
//       as={Form}
//       onSubmit={handleSubmit()}
//       dimmer={{ inverted: true }}
//       trigger={
//         <Button icon primary labelPosition="left">
//           <Icon name="lock" />
//           Change Password
//         </Button>
//       }
//     >
//       <Modal.Header>Change Password</Modal.Header>
//       <Modal.Content>
//         <Form>
//           <Form.Input
//             name="oldPassword"
//             fluid
//             icon="lock"
//             iconPosition="left"
//             placeholder="Old Password"
//             type="password"
//           />
//           <Form.Input
//             name="newPassword"
//             fluid
//             icon="lock"
//             iconPosition="left"
//             placeholder="New Password"
//             type="password"
//           />
//           <Form.Input
//             name="confirmNewPassword"
//             fluid
//             icon="lock"
//             iconPosition="left"
//             placeholder="Confirm New Password"
//             type="password"
//           />
//         </Form>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button basic primary onClick={() => setOpen(false)}>
//           <Icon name="remove" />
//           Cancel
//         </Button>
//         <Button positive type="submit">
//           <Icon name="checkmark" />
//           Save
//         </Button>
//       </Modal.Actions>
//     </Modal>
//   );
// };

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
      dispatch(resetErrors());
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
  const [editing, setEditing] = useState(false);
  const authError = useSelector(state => selectAuthSlice(state).error);

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

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const confirmPassword = formData.get("confirmPassword");
    // const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    // const email = formData.get("email");

    if (firstName === "" || lastName === "") {
      toast.error("Required fields are empty.");
      return;
    }

    dispatch(updateUser({ firstName, lastName }));

    // setForm({
    //   // confirmPassword,
    //   // password,
    //   firstName,
    //   lastName,
    //   // email,
    // });
  };

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
                defaultValue={user.firstName}
                transparent={!editing}
                readOnly={!editing}
              />
              <Form.Input
                name="lastName"
                fluid
                icon="user"
                iconPosition="left"
                label="Last Name"
                defaultValue={user.lastName}
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
              transparent
              readOnly
            />
            {Edit({ editing, setEditing })}
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
                type="button"
                icon="unlock"
                labelPosition="left"
                content="Log out everywhere"
                to="/logout/all"
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
                onClick={() =>
                  toast.info(
                    "A link to change your password has been sent to your email!"
                  )
                }
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
