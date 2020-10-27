/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import { Form, Grid, Icon, Header } from "semantic-ui-react";
import { toast } from "react-toastify";
import ReactCodeInput from "react-verification-code-input";
import React from "react";
// import { useSelector } from "react-redux";
// import {
//   selectAuthSlice,
// } from "../../store";
import { Title } from "../../components";

import { useState } from "react";

export default () => {
  const [valid, setValid] = useState(false);
  // const authError = useSelector(state => selectAuthSlice(state).error);

  // TODO: change hardcoded value to the code sent to email
  const checkVal = val => {
    if (val === "123456") {
      setValid(true);
    } else {
      toast.error("Invalid code");
    }
  };

  // useEffect(() => {
  //   // TODO: fix error handling on store
  //   if (authError) {
  //     toast.error(
  //       <Toast
  //         title="Couldn't update user account."
  //         message={authError.data}
  //         technical={authError.message}
  //       />
  //     );
  //   }
  // }, [authError]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("newPassword");
    const confirmPassword = formData.get("confirmNewPassword");
    if (password === "" || confirmPassword === "") {
      toast.error("Required fields are empty.");
      return;
    }
    if (confirmPassword !== password) {
      toast.error("Password does not match.");
      return;
    }
    // dispatch(updateUser({ firstName, lastName }));
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column verticalAlign="middle" style={{ minWidth: 400 }}>
          <Title>Reset Password</Title>
          <Header as="h2" textAlign="center">
            <Icon name="user secret" /> Reset/Change Password
          </Header>
          <br />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 400 }}>
          {!valid ? (
            <React.Fragment>
              <Header as="h2" textAlign="center">
                Enter the 6-digit verification code sent to your email
              </Header>
              <Flex variant="layout.centerflex">
                <ReactCodeInput onComplete={val => checkVal(val)} />
              </Flex>
            </React.Fragment>
          ) : (
            <Form size="large" onSubmit={handleSubmit}>
              <Form.Input
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="New Password"
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
              <Form.Group widths="equal">
                <Form.Button
                  fluid
                  basic
                  negative
                  icon="remove"
                  content="Cancel"
                  // onClick={() => setEditing(false)}
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
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
