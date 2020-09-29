/** @jsx jsx */
import { jsx } from "theme-ui";
import NotExist from "./NotExist";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPortfolioByUsername } from "../../store";
import UserPage from "./UserPage";

import { Dimmer, Loader, Segment } from "semantic-ui-react";

export const RouteUser = () => {
  const { userId } = useParams();
  return <User userId={userId} />;
};

const LoadingPortfolio = props => (
  <Segment placeholder size="massive" sx={{ height: "100%" }}>
    <Dimmer active inverted>
      <Loader inverted>Loading {props.userId}'s portfolio</Loader>
    </Dimmer>
  </Segment>
);

const User = props => {
  const { userId } = props;
  const editing = props.editing || false;

  // useEffect;
  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );
  return <LoadingPortfolio userId={userId} />;
  return portfolio ? (
    <UserPage userId={userId} />
  ) : (
    <NotExist userId={userId} />
  );
};

export default User;
