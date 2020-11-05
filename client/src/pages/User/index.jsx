/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { NotExist } from "./NotExist";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchEntirePortfolio,
  selectPortfolioByUsername,
  selectPortfolioIsEditing,
  selectPortfoliosSlice,
  changePortfolio,
  selectPortfolioAvatar,
} from "../../store";
import UserPage from "./UserPage";

import { useDispatch } from "react-redux";
import { Dimmer, Loader } from "semantic-ui-react";
import { Camel } from "../../components/Camel";

const User = props => {
  const dispatch = useDispatch();
  const { userId, selectedPage } = props;
  // eslint-disable-next-line
  const editing = useSelector(selectPortfolioIsEditing);
  const loading = useSelector(state => selectPortfoliosSlice(state).loading);
  const [status, setStatus] = useState("waitload");
  // const editing = props.editing || false;

  useEffect(() => {
    dispatch(fetchEntirePortfolio(userId));
    dispatch(changePortfolio(userId));
  }, [userId]);

  useEffect(() => {
    if (loading) {
      setStatus("loading");
    } else if (status === "loading") {
      setStatus("doneload");
    }
  });

  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );
  const avatar = useSelector(state => selectPortfolioAvatar(state, userId));

  return portfolio ? (
    <UserPage userId={userId} selectedPage={selectedPage} />
  ) : status !== "doneload" ? (
    <Dimmer active={loading} inverted>
      <Loader inverted>
        <Camel src={avatar} />
        {`Loading ${userId}'s portfolio`}
      </Loader>
    </Dimmer>
  ) : (
    <NotExist userId={userId} />
  );
};

export default User;
