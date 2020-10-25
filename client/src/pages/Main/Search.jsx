/** @jsx jsx */
import { jsx } from "theme-ui";
import { Form, Grid } from "semantic-ui-react";
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
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Title>Search</Title>
        <Form size="huge" onSubmit={handleSubmit}>
          <Form.Input
            name="un"
            fluid
            placeholder="Finding a particular Portfolio?"
            inline
            action={{
              icon: "search",
            }}
          />
        </Form>
      </Grid.Column>
    </Grid>
  );
};
