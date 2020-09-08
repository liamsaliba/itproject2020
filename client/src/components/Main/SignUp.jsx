/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button, Styled } from "theme-ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/auth";

export default () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(
      formData.get("firstName"),
      formData.get("lastName"),
      formData.get("email"),
      formData.get("username"),
      formData.get("password")
    );
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
    </Box>
  );
};
