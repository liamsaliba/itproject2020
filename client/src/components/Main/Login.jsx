/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button, Styled } from "theme-ui";
// import { Link } from "@reach/router";
import { useDispatch } from "react-redux";

import { login } from "./../../store/auth";

export default () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    console.log("test!");
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(login(formData.get("username"), formData.get("password")));
  };
  return (
    <Box as="form" pb={3} onSubmit={handleSubmit}>
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
      {/* <Link to="/signup">{"Don't have an account? Sign up"}</Link> */}
    </Box>
  );
};
