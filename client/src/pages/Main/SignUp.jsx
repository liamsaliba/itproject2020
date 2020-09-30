/** @jsx jsx */
import {
  jsx,
  Label,
  Input,
  Box,
  Checkbox,
  Button,
  Styled,
  Spinner,
} from "theme-ui";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolio,
  selectAuthSlice,
  selectPortfoliosSlice,
  selectCurrentUserPortfolio,
  selectToken,
  selectUsername,
  signup,
  fetchPortfolio,
} from "../../store";
import { Link, Loading, Title, Toast } from "../../components";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

const SignUpForm = ({ userId, setForm }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const confirmPassword = formData.get("confirmPassword");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const username = formData.get("username");

    setForm({
      confirmPassword,
      password,
      firstName,
      lastName,
      email,
      username,
    });
  };

  return (
    <Box as="form" pb={3} onSubmit={handleSubmit}>
      <Title>Login</Title>

      <Styled.h2>Sign up</Styled.h2>
      <br />
      <Label htmlFor="firstName">First Name</Label>
      <Input name="firstName" mb={1} />

      <Label htmlFor="lastName">Last Name</Label>
      <Input name="lastName" mb={1} />

      <Label htmlFor="email">Email</Label>
      <Input name="email" mb={1} />

      <Label htmlFor="username">Username</Label>
      <Input name="username" mb={1} defaultValue={userId || ""} />

      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" mb={1} />

      <Label htmlFor="confirm password">Confirm Password</Label>
      <Input type="password" name="confirmPassword" mb={3} />

      <Box>
        <Label mb={3}>
          <Checkbox />
          Remember me
        </Label>
      </Box>
      <Button>Submit</Button>
      <Link to="/login" sx={{ ml: 4 }}>
        {"Have an account? Log in"}
      </Link>
    </Box>
  );
};

export default () => {
  const userId = useParams().userId;
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
  const portfolio = useSelector(selectCurrentUserPortfolio);
  useEffect(() => {
    if (form !== null) {
      const {
        confirmPassword,
        password,
        firstName,
        lastName,
        email,
        username,
      } = form;
      if (confirmPassword !== password) {
        toast.error("Password does not match.");
        return;
      }
      if (
        password === "" ||
        username === "" ||
        email === "" ||
        firstName === "" ||
        lastName === ""
      ) {
        toast.error("Required fields are empty.");
        return;
      }
      dispatch(signup(firstName, lastName, email, username, password));
      setSubmitted(true);
    }
  }, [form]);

  useEffect(() => {
    if (authError) {
      toast.error(
        <Toast
          title="Couldn't create user account."
          message={authError.data}
          technical={authError.message}
        />
      );
    }
  }, [authError]);

  useEffect(() => {
    if (token) {
      if (submitted) {
        toast("Created new account!");
        dispatch(createPortfolio());
      }
      history.push("/editor");
    }
  }, [token]);

  useEffect(() => {
    if (portfolioError) {
      toast.error(
        <Toast
          title="Couldn't create portfolio."
          message={portfolioError.data}
          technical={portfolioError.message}
        />
      );
    }
  }, [portfolioError]);

  return (
    <Box>
      <SignUpForm userId={userId} setForm={setForm} />
      <Dimmer inverted active={authLoading}>
        <Loader inverted>Signing up...</Loader>
      </Dimmer>
      <Dimmer inverted active={token && submitted}>
        <Loader inverted>Creating {username}'s new portfolio...</Loader>
      </Dimmer>
    </Box>
  );
};
