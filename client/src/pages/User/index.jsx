/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { NotExist } from "./NotExist";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchEntirePortfolio,
  selectPortfolioByUsername,
  selectPortfolioIsEditing,
  selectPortfoliosSlice,
  changePortfolio,
  selectCurrentPortfolio,
} from "../../store";
import UserPage from "./UserPage";

import { useDispatch } from "react-redux";
import { selectLoadingStatus } from "../../store/slices/ui";

export const RouteUser = () => {
  const { userId } = useParams();
  return <User userId={userId} />;
};

const User = props => {
  const dispatch = useDispatch();
  const { userId } = props;
  // eslint-disable-next-line
  const username = useSelector(selectCurrentPortfolio);
  const portfolios = useSelector(selectPortfoliosSlice);
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
    <UserPage userId={userId} />
  ) : loading ? null : (
    <NotExist userId={userId} />
  );
};

export default User;
