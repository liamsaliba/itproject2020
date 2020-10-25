/** @jsx jsx */
import { jsx } from "theme-ui";
import { Form, Grid } from "semantic-ui-react";
import { Title } from "../../components";

import { useHistory } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../../store";

export default () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(endpoints.portfolios)
      .then(res => {
        setResults(res.data);
        console.log(results);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("un");
    if (username === "") return;
    history.push("/u/" + username);
  };
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: "600px" }}>
        <Title>Search</Title>
        <Form size="huge" onSubmit={handleSubmit}>
          <Form.Input
            name="un"
            fluid
            placeholder="Find someone's portfolio..."
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
