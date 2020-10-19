/** @jsx jsx */
import { jsx } from "theme-ui";
import { Form, Grid, Header } from "semantic-ui-react";
import { Title } from "../../components";

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
        <Form size="huge" onSubmit={handleSubmit}>
          <Form.Input
            name="un"
            fluid
            icon="search"
            iconPosition="left"
            placeholder="Finding a particular Portfolio?"
            inline
          />
        </Form>
      </Grid.Column>
    </Grid>
  );
};
