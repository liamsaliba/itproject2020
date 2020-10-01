/** @jsx jsx */
import { jsx } from "theme-ui";
import { NotExist } from "./NotExist";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchEntirePortfolio,
  selectPortfolioByUsername,
  selectPortfolioEditing,
  selectPortfoliosSlice,
  changePortfolio,
  selectCurrentPortfolio,
  setLoading as setStoreLoading,
  setLoadingFinished,
} from "../../store";
import UserPage from "./UserPage";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Toast } from "../../components";

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
  const editing = useSelector(selectPortfolioEditing);
  // eslint-disable-next-line
  const [loaded, setLoaded] = useState(false);

  // const editing = props.editing || false;

  useEffect(() => {
    dispatch(changePortfolio(userId));
    dispatch(setStoreLoading(`Loading ${userId}'s portfolio`));
  }, [userId, dispatch]);

  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );

  useEffect(() => {
    dispatch(fetchEntirePortfolio(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (portfolio) {
      dispatch(setLoadingFinished());
      if (portfolios.error) {
        toast.error(
          <Toast
            title="Couldn't load portfolio."
            message={portfolios.error.data}
            technical={portfolios.error.message}
          />
        );
      }
    }
  }, [portfolios, userId, dispatch]);

  return portfolio ? (
    <UserPage userId={userId} />
  ) : loaded ? (
    <NotExist userId={userId} />
  ) : null;
};

export default User;
