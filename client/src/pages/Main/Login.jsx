/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button, Styled } from "theme-ui";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store";
import { useEffect } from "react";
import { Link, Title, Toast } from "../../components";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Dimmer } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

export default () => {
  const userId = useParams().userId || "";
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.error) {
      toast.error(
        <Toast
          title="Couldn't login."
          message={auth.error.data}
          technical={auth.error.message}
        />
      );
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
    const username = formData.get("username");
    const password = formData.get("password");
    const useCookie = formData.get("remember") === "on";
    dispatch(login(username, password, useCookie));
  };
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Styled.h2>Log in</Styled.h2>
      <br />
      <Label htmlFor="username">Username / Email</Label>
      <Input name="username" mb={3} defaultValue={userId} />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" mb={3} />
      <Box>
        <Label mb={3}>
          <Checkbox name="remember" defaultChecked={true} />
          Remember me
        </Label>
      </Box>
      <Button>Submit</Button>
      <Link to="/signup" sx={{ ml: 4 }}>
        {"Don't have an account? Sign up"}
      </Link>
      <Dimmer inverted active={auth.loading}>
        <Loader inverted>Logging in...</Loader>
      </Dimmer>
    </Box>
  );
};
