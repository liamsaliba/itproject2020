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
  const username = useSelector(selectCurrentPortfolio);
  const portfolios = useSelector(selectPortfoliosSlice);
  const editing = useSelector(selectPortfolioEditing);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // const editing = props.editing || false;

  useEffect(() => {
    dispatch(changePortfolio(userId));
  });

  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );

  useEffect(() => {
    dispatch(fetchEntirePortfolio(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (portfolios.loading) {
      dispatch(setStoreLoading(`Loading ${userId}'s portfolio`));
    } else {
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
