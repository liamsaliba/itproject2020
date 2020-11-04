/** @jsx jsx */
import { jsx } from "theme-ui";
import { Grid, List, Dropdown, Image } from "semantic-ui-react";
import { ProfileIcon, Title } from "../../components";

import { useHistory } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../../store";
import Fuse from "fuse.js";

const SearchResult = ({ result }) => {
  const { username, avatar, firstName, lastName, bio } = result;
  return (
    <List>
      <List.Item>
        <Image>
          <ProfileIcon userId={username} profile={avatar} />
        </Image>
        <List.Content>
          <List.Header>
            {username} / {firstName} {lastName}
          </List.Header>
          <List.Description>
            <div
              sx={{
                maxHeight: "2em",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {bio}
            </div>
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  // TODO: loading
  // eslint-disable-next-line no-unused-vars
  const [results, setResults] = useState(null);
  const [value, setValue] = useState("");
  const [fuse, setFuse] = useState(null);

  const handleSearchChange = (options, query) => {
    const res = fuse.search(query);
    console.log(res);
    setValue(query);
    return res.map(({ item }) => toDisplay(item));
  };

  const fuseOptions = {
    keys: ["username", "firstName", "lastName"],
  };

  const toDisplay = entry => {
    const { username } = entry;
    return {
      key: username,
      text: username,
      value: username,
      content: <SearchResult result={entry} />,
    };
  };

  useEffect(() => {
    axios
      .get(endpoints.portfolios, { baseURL: endpoints.baseURL })
      .then(res => {
        const r = res.data.map(toDisplay);

        setResults(r);
        setFuse(new Fuse(res.data, fuseOptions));
      })
      .catch(err => {
        console.log("search err", err.message, err.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e, data) => {
    e.preventDefault();
    const username = data.value;
    console.log(username);
    if (username === "") return;
    history.push("/u/" + username);
  };
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Title>Search</Title>
      <Grid.Column>
        <Dropdown
          size="large"
          loading={fuse === null}
          disabled={fuse === null}
          search={handleSearchChange}
          placeholder="Find a portfolio..."
          noResultsMessage={value === "" ? null : "no portfolios found."}
          value={value}
          action={{
            icon: "search",
          }}
          fluid
          selection
          options={results}
          onChange={handleSubmit}
          selectOnBlur={false}
          selectOnNavigation={false}
        />
        {/* <Search
          size="huge"
          loading={loading}
          results={results}
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          placeholder="Find a portfolio..."
          inline
          action={{
            icon: "search",
          }}
          fluid
          onResultSelect={handleSubmit}
        /> */}
      </Grid.Column>
    </Grid>
  );
};
