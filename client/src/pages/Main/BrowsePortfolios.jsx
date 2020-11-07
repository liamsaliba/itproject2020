/** @jsx jsx */
import { jsx, Box } from "theme-ui";

import { Image } from "semantic-ui-react";
import { Cards } from "../../components";
import { ProfileImage } from "../../components/ProfileIcon";

import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../../store";

const toDisplay = entry => {
  const { username, avatar, firstName, lastName, bio } = entry;
  return {
    card: {
      title: `${username} / ${firstName} ${lastName}`,
      body: bio,
      featureType: "ProfileIcon", // Describes the feature tupe {image|video|...}
      feature: (
        <Image>
          <ProfileImage userId={username} profile={avatar} />
        </Image>),
      featureOrientation: "top",
      username:username
    }
  };
};

const BrowsePortfolios = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(endpoints.portfolios, { baseURL: endpoints.baseURL })
      .then(out => {
        const r = out.data.map(toDisplay);
        setResults(r);
      })
      .catch(err => {
        console.log("poll err", err.message, err.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(results);
  return (
    <Box>
      <Cards 
        id="BrowsePortfolios"
        name="Look through user portfolios."
        editing={false}
        type="cards"
        content={results}
        loading={results.length===0 ? true : false}
      />
    </Box>
  );
}

export default BrowsePortfolios;