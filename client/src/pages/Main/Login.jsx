/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button, Styled } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, useToast } from "@chakra-ui/core";

import { login } from "../../store/auth";
import { useEffect } from "react";
import { Link, Title } from "../../components";
import { navigate } from "@reach/router";

export default () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.error) {
      toast({
        title: "Unable to login.",
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
        title: "Logged in",
        description: "You've been logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [auth.token, toast]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(login(formData.get("username"), formData.get("password")));
  };
  return (
    <Box as="form" pb={3} onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Styled.h2>Log in</Styled.h2>
      <br />
      <Label htmlFor="username">Username / Email</Label>
      <Input name="username" mb={3} />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" mb={3} />
      <Box>
        <Label mb={3}>
          <Checkbox />
          Remember me
        </Label>
      </Box>
      <Button>Submit</Button>
      {auth.loading ? <Spinner /> : null}
      <Link to="/signup" sx={{ ml: 4 }}>
        {"Don't have an account? Sign up"}
      </Link>
    </Box>
  );
};
