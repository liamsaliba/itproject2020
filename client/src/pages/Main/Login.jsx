/** @jsx jsx */
import { jsx } from "theme-ui";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Dimmer,
  Loader,
  Icon,
} from "semantic-ui-react";
import camel from "../../svg/camel.svg";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store";
import { useEffect, useState } from "react";
import { Title, Toast } from "../../components";
import { useHistory, useParams } from "react-router-dom";

export default () => {
  const userId = useParams().userId || "";
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const [useCookie, setCookie] = useState(true);

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
    if (password === "" || username === "") {
      toast.error("Required fields are empty.");
      return;
    }
    dispatch(login(username, password, useCookie));
  };
  return (
    <Grid verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Title>Login</Title>
        <Header as="h2" textAlign="center">
          <Image src={camel} />
          Log in to your account
        </Header>
        <br />
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            name="username"
            fluid
            icon="at"
            iconPosition="left"
            placeholder="Username"
            defaultValue={userId}
          />
          <Form.Input
            name="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Form.Checkbox
            label="Remember me"
            defaultChecked
            onClick={() => setCookie(!useCookie)}
          />
          <Button animated fluid primary size="large" type="submit">
            <Button.Content visible>Log In</Button.Content>
            <Button.Content hidden>
              <Icon name="sign in" />
            </Button.Content>
          </Button>
        </Form>
        <Message positive>
          Don't have an account? <a href="/signup">Sign up</a> now!
        </Message>
        <Dimmer inverted active={auth.loading}>
          <Loader inverted>Logging in...</Loader>
        </Dimmer>
      </Grid.Column>
    </Grid>
  );
};
