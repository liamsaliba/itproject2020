/** @jsx jsx */
import { jsx } from "theme-ui";
import { NotExist } from "./NotExist";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchEntirePortfolio,
  selectPortfolioByUsername,
  selectPortfoliosSlice,
} from "../../store";
import UserPage from "./UserPage";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Toast, Loading } from "../../components";

export const RouteUser = () => {
  const { userId } = useParams();
  return <User userId={userId} />;
};

const User = props => {
  const dispatch = useDispatch();
  const { userId } = props;
  const portfolios = useSelector(selectPortfoliosSlice);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // const editing = props.editing || false;

  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );

  useEffect(() => {
    dispatch(fetchEntirePortfolio(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log(portfolios.loading, loading);
    if (!loading && portfolios.loading) {
      setLoading(true);
    }
    if (loading && !portfolios.loading) {
      setLoaded(true);
      if (portfolios.error) {
        console.log(portfolios.error);
        toast.error(
          <Toast
            title="Couldn't load portfolio."
            message={portfolios.error.data}
            technical={portfolios.error.message}
          />
        );
      }
    }
  }, [portfolios, loading]);

  return loaded ? (
    portfolio ? (
      <UserPage userId={userId} />
    ) : (
      <NotExist userId={userId} />
    )
  ) : (
    <Loading>Loading {props.userId}'s portfolio</Loading>
  );
};

export default User;
