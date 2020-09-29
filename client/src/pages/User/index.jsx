/** @jsx jsx */
import { jsx } from "theme-ui";
import NotExist from "./NotExist";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchEntirePortfolio,
  selectPortfolioByUsername,
  selectPortfoliosSlice,
} from "../../store";
import UserPage from "./UserPage";

import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Toast } from "../../components";

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
  const dispatch = useDispatch();
  const { userId } = props;
  const portfolios = useSelector(selectPortfoliosSlice);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const editing = props.editing || false;

  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );

  useEffect(() => {
    dispatch(fetchEntirePortfolio(userId));
  }, [dispatch]);

  useEffect(() => {
    if (portfolios.loading && loading) {
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
  }, [portfolios]);

  return loaded ? (
    portfolio ? (
      <UserPage userId={userId} />
    ) : (
      <NotExist userId={userId} />
    )
  ) : (
    <LoadingPortfolio userId={userId} />
  );
};

export default User;
