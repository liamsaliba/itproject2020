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

import { login } from "../../store/auth";
import { useEffect } from "react";
import { Link, Title } from "../../components";
import { useHistory } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.error) {
      toast.error("Couldn't login. " + auth.error);
    }
  }, [auth.error]);

  useEffect(() => {
    if (auth.token) {
      history.push("/editor");
    }
  }, [auth.token, history]);

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
