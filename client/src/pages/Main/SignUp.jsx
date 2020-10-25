/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Dimmer,
  Loader,
  Icon,
} from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolio,
  selectAuthSlice,
  selectPortfoliosSlice,
  selectToken,
  selectUsername,
  signup,
  selectPortfolioByUsername,
  resetErrors,
} from "../../store";
import { Title, Toast } from "../../components";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const SignUpForm = ({ userId, setForm }) => {
  const [useCookie, setCookie] = useState(true);

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
      useCookie,
    });
  };

  return (
    <Grid verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Title>Signup</Title>

        <Header as="h2" textAlign="center">
          <Icon name="user plus" />
          Sign up for a new account
        </Header>
        <br />
        <p>
          Your username and full name will be displayed publicly. You can choose
          to show more details later.
        </p>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="firstName"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First Name"
            />
            <Form.Input
              name="lastName"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Last Name"
            />
          </Form.Group>
          <Form.Input
            name="email"
            type="email"
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="Email"
          />
          <Form.Input
            name="username"
            fluid
            icon="at"
            iconPosition="left"
            placeholder="Username"
            defaultValue={userId || ""}
          />
          <Form.Input
            name="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Form.Input
            name="confirmPassword"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            type="password"
          />
          <Form.Checkbox
            label="Remember me"
            defaultChecked
            onClick={() => setCookie(!useCookie)}
          />
          <Button animated fluid primary size="large" type="submit">
            <Button.Content visible>Sign Up</Button.Content>
            <Button.Content hidden>
              <Icon name="signup" />
            </Button.Content>
          </Button>
        </Form>
        <Message info>
          Already have an account? <a href="/login">Log in</a> now!
        </Message>
      </Grid.Column>
    </Grid>
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
  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, username)
  );
  const authError = useSelector(state => selectAuthSlice(state).error);
  const portfolioError = useSelector(
    state => selectPortfoliosSlice(state).error
  );

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  useEffect(() => {
    if (form !== null) {
      const {
        confirmPassword,
        password,
        firstName,
        lastName,
        email,
        username,
        useCookie,
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
      dispatch(
        signup(firstName, lastName, email, username, password, useCookie)
      );
      setSubmitted(true);
    }
  }, [form, dispatch]);

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
    }
  }, [token, submitted, dispatch]);

  useEffect(() => {
    if (token && portfolio) {
      history.push("/u/" + username);
    }
  }, [token, history, portfolio, username]);

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
