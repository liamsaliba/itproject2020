/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import {
  Form,
  Grid,
  Icon,
  Header,
  Message,
  Loader,
  Button,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import ReactCodeInput from "react-verification-code-input";
import React from "react";
// import { useSelector } from "react-redux";
// import {
//   selectAuthSlice,
// } from "../../store";
import { Title } from "../../components";

import { useState } from "react";
import { endpoints, selectUsername } from "../../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useFormState } from "../../components/Modals";

const defaultForm = {
  password: "",
  confirmPassword: "",
  code: "",
};

export default () => {
  const [status, setStatus] = useState("wait username");
  const { state, setState, handleChange } = useFormState(defaultForm);

  const loggedInUsername = useSelector(selectUsername);
  const wasLoggedIn = loggedInUsername !== undefined;
  const [username, setUsername] = useState(null);
  const history = useHistory();
  const [resend, setResend] = useState(false);

  useEffect(() => {
    if (!resend) setTimeout(() => setResend(true), 8000);
  }, [resend]);

  useEffect(() => {
    if (status === "wait username") {
      if (loggedInUsername === undefined) {
        setStatus("ask username");
      } else {
        setUsername(loggedInUsername);
        setStatus("got username");
      }
    }
  }, [status, loggedInUsername]);

  useEffect(() => {
    const sendEmail = () => {
      axios
        .post(
          endpoints.resetPasswordStep(1),
          { username },
          { baseURL: endpoints.baseURL }
        )
        .then(res => {
          setStatus("await code");
        })
        .catch(err => {
          toast.warn(err.message);
        });
    };

    if (status === "got username") {
      sendEmail();
    }
  }, [username, status]);

  const handleUsernameSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    if (username === "") {
      toast.error("Required fields are empty.");
      return;
    }
    setUsername(username);
    setStatus("got username");
    // dispatch(updateUser({ firstName, lastName }));
  };

  const handlePasswordSubmit = e => {
    e.preventDefault();
    const { password, code, confirmPassword } = state;
    if (code === "") {
      toast.error("Verification code not entered.");
    }

    if (password === "" || confirmPassword === "") {
      toast.error("Password not entered.");
      return;
    }
    if (confirmPassword !== password) {
      toast.error("Password does not match.");
      return;
    }
    console.log("submitting...");
    axios
      .post(
        endpoints.resetPasswordStep(2),
        { username, password, code },
        { baseURL: endpoints.baseURL }
      )
      .then(res => {
        setStatus("success");
        if (!wasLoggedIn) {
          toast.success("Password reset! Try logging in.");
          setTimeout(() => history.push("/login"), 200);
        } else {
          toast.success("Password reset!");
          setTimeout(() => history.push("/settings"), 200);
        }
      })
      .catch(err => {
        toast.warn(err.response.data);
        setState(defaultForm);
      });
    // dispatch(updateUser({ firstName, lastName }));
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column verticalAlign="middle" style={{ minWidth: 400 }}>
          <Title>Reset Password</Title>
          <Header as="h2" textAlign="center">
            <Icon name="user secret" /> Reset Password
          </Header>
        </Grid.Column>
      </Grid.Row>
      {status === "await code" ? (
        <React.Fragment>
          <Grid.Row centered>
            <Grid.Column style={{ maxWidth: 400 }}>
              <Message textAlign="center">
                Enter the 6-digit verification code sent to your email and
                change your password.
              </Message>
              <Box
                sx={{
                  m: "2em auto",
                  "& > div": {
                    m: "0 auto",
                  },
                }}
              >
                <ReactCodeInput
                  value={state.code}
                  onChange={value =>
                    handleChange(null, { name: "code", value })
                  }
                  inputStyle={{ margin: "0 auto" }}
                />
                <br />
                <Button
                  type="button"
                  icon="send"
                  fluid
                  content="Resend email"
                  disabled={!resend}
                  onClick={() => {
                    if (resend) {
                      axios
                        .post(
                          endpoints.resetPasswordStep(1),
                          { username },
                          { baseURL: endpoints.baseURL }
                        )
                        .then(res => {
                          setStatus("await code");
                        })
                        .catch(err => {
                          toast.warn(err.message);
                        });
                    }
                  }}
                />
              </Box>
              <Form size="large" onSubmit={handlePasswordSubmit}>
                <Form.Input
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="New Password"
                  type="password"
                />
                <Form.Input
                  name="confirmPassword"
                  value={state.confirmPassword}
                  onChange={handleChange}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                />
                <br />
                <Form.Group widths="equal">
                  <Form.Button
                    fluid
                    basic
                    negative
                    icon="arrow left"
                    content="Cancel"
                    type="button"
                    onClick={() => history.goBack()}
                  />
                  <Form.Button
                    fluid
                    positive
                    icon="check"
                    content="Save"
                    type="submit"
                    // onClick={() => setEditing(false)}
                  />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <br />
        </React.Fragment>
      ) : status === "got username" ? (
        <Loader inline size="large" active={true}>
          Sending email...
        </Loader>
      ) : status === "ask username" ? (
        <Box sx={{ minWidth: "350px" }}>
          <Form size="large" onSubmit={handleUsernameSubmit}>
            <Message>
              An email will be sent to you with a verification code. <br /> You
              can then enter that code to change your password.
            </Message>
            <Header as="h3" textAlign="center">
              Enter your username
            </Header>
            <Form.Input
              name="username"
              fluid
              icon="at"
              iconPosition="left"
              placeholder="username"
            />
            <Form.Group widths="equal">
              <Form.Button
                fluid
                basic
                type="button"
                negative
                icon="arrow left"
                content="Cancel"
                onClick={() => history.goBack()}
              />
              <Form.Button
                fluid
                positive
                icon="send"
                content="Send email"
                type="submit"
                // onClick={() => setEditing(false)}
              />
            </Form.Group>
          </Form>
        </Box>
      ) : null}
    </Grid>
  );
};
