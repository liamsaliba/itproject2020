/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { NotExist } from "./NotExist";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchEntirePortfolio,
  selectPortfolioByUsername,
  selectPortfolioIsEditing,
  changePortfolio,
  selectCurrentPortfolio,
} from "../../store";
import UserPage from "./UserPage";

import { useDispatch } from "react-redux";
import { selectLoadingStatus } from "../../store/slices/ui";
const User = props => {
  const dispatch = useDispatch();
  const { userId, selectedPage } = props;
  // eslint-disable-next-line
  const username = useSelector(selectCurrentPortfolio);
  // eslint-disable-next-line
  const editing = useSelector(selectPortfolioIsEditing);
  const loading = useSelector(selectLoadingStatus);
  // const editing = props.editing || false;

  useEffect(() => {
    if (username !== userId) {
      dispatch(changePortfolio(userId));
      dispatch(fetchEntirePortfolio(userId));
    }
  }, [userId]);

  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );

  return portfolio ? (
    <UserPage userId={userId} selectedPage={selectedPage} />
  ) : loading ? null : (
    <NotExist userId={userId} />
  );
};

export default User;
