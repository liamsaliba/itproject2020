/** @jsx jsx */
import { jsx } from "theme-ui";
import { toast } from "react-toastify";
import { Button, Form, Grid, Header, Image, Message } from "semantic-ui-react";
import camel from "../../svg/camel.svg";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store";
import { useEffect } from "react";
import { Title, Toast } from "../../components";
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
    <Grid verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Title>Login</Title>
        <Header as="h2" textAlign="center">
          <Image src={camel} /> Log in to your account
        </Header>
        <br />
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            id="username"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Username / Email address"
          />
          <Form.Input
            id="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Form.Checkbox id="remember" label="Remember me" defaultChecked />

          <Button fluid size="large" type="submit">
            Login
          </Button>
        </Form>

        <Message positive>
          Don't have an account? <a href="/signup">Sign up now!</a>
        </Message>
        <Dimmer inverted active={auth.loading}>
          <Loader inverted>Logging in...</Loader>
        </Dimmer>
      </Grid.Column>
    </Grid>
  );
};
