/** @jsx jsx */
import { jsx } from "theme-ui";
import NotExist from "./NotExist";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPortfolioByUsername } from "../../store";
import UserPage from "./UserPage";

export const RouteUser = () => {
  const { userId } = useParams();
  return <User userId={userId} />;
};

const User = props => {
  const { userId } = props;
  const editing = props.editing || false;

  // useEffect;
  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );

  return portfolio ? (
    <UserPage userId={userId} />
  ) : (
    <NotExist userId={userId} />
  );
};

export default User;
