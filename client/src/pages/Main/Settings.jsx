/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button, Styled } from "theme-ui";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthSlice,
  selectPortfoliosSlice,
  selectToken,
  selectUsername,
  selectUser,
} from "../../store";
import { Link, Title, Toast } from "../../components";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Divider } from "semantic-ui-react";

const SettingsForm = ({ userId, setForm }) => {
  const user = useSelector(selectUser);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const confirmPassword = formData.get("confirmPassword");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");

    setForm({
      confirmPassword,
      password,
      firstName,
      lastName,
      email,
    });
  };

  return (
    <Box as="form" pb={3} onSubmit={handleSubmit}>
      <Title>Settings - {user.username}</Title>

      <Styled.h2>User Settings</Styled.h2>
      <br />
      <Label htmlFor="firstName">First Name</Label>
      <Input name="firstName" mb={1} defaultValue={user.firstName} />

      <Label htmlFor="lastName">Last Name</Label>
      <Input name="lastName" mb={1} defaultValue={user.lastName} />

      <Label htmlFor="email">Email</Label>
      <Input name="email" mb={1} defaultValue={user.email} />

      <Label htmlFor="username">Username</Label>
      <Input name="username" mb={1} disabled defaultValue={user.username} />

      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" mb={1} />

      <Label htmlFor="confirm password">Confirm Password</Label>
      <Input type="password" name="confirmPassword" mb={3} />
      <Divider />

      <Button>Submit</Button>
    </Box>
  );
};

export default () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const token = useSelector(selectToken);
  const authLoading = useSelector(state => selectAuthSlice(state).loading);
  const username = useSelector(selectUsername);
  const authError = useSelector(state => selectAuthSlice(state).error);
  const portfolioError = useSelector(
    state => selectPortfoliosSlice(state).error
  );
  useEffect(() => {
    if (form !== null) {
      const { confirmPassword, password, firstName, lastName, email } = form;
      if (confirmPassword !== password) {
        toast.error("Password does not match.");
        return;
      }
      if (
        password === "" ||
        email === "" ||
        firstName === "" ||
        lastName === ""
      ) {
        toast.error("Required fields are empty.");
        return;
      }
      // dispatch(signup(firstName, lastName, email, username, password));
      setSubmitted(true);
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

  return (
    <Box>
      <SettingsForm setForm={setForm} />
    </Box>
  );
};
