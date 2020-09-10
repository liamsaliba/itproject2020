/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button, Styled } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, useToast } from "@chakra-ui/core";
import { signup } from "../../store/auth";

import { Link, Title } from "../../components";
import { useEffect } from "react";
import { navigate } from "@reach/router";

export default () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.error) {
      toast({
        title: "Unable to create user account.",
        description: auth.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [auth.error, toast]);

  useEffect(() => {
    if (auth.token) {
      navigate("/editor");
      toast({
        title: "Account created.",
        description: "You've been logged into your new account.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [auth.token, toast]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("confirmPassword") !== formData.get("password")) {
      toast({
        title: "Password does not match.",
        description: auth.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    dispatch(
      signup(
        formData.get("firstName"),
        formData.get("lastName"),
        formData.get("email"),
        formData.get("username"),
        formData.get("password")
      )
    );

    // dispatch(signup(firstName, lastName, email, username, password));
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
      <Input name="username" mb={1} />

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
      {auth.loading ? <Spinner /> : null}
      <Link to="/login" sx={{ ml: 4 }}>
        {"Have an account? Log in"}
      </Link>
    </Box>
  );
};
