/** @jsx jsx */
import { jsx, Label, Input, Box, Styled } from "theme-ui";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import camel from "../../svg/camel.svg";
import { Title, Toast } from "../../components";

import { useHistory } from "react-router-dom";

export default () => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("un");
    if (username === "") return;
    history.push("/u/" + username);
  };
  return (
    <Grid textAlign="middle" verticalAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Title>Search</Title>
        <Header
          as="h2"
          textAlign="center"
          content="Finding a particular Portfolio?"
        />
        <Form size="huge" onSubmit={handleSubmit}>
          <Form.Input
            name="un"
            // fluid
            icon="search"
            iconPosition="left"
            placeholder="Username"
            // transparent
            inline
          />
          {/* <Button>Go</Button> */}
        </Form>
      </Grid.Column>
    </Grid>
  );
};
