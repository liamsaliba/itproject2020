/** @jsx jsx */
import { jsx, Spinner } from "theme-ui";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { logoutAll } from "../../store";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => history.push("/"), 200);
    if (!auth.token) return () => {};

    dispatch(logoutAll(auth.token));
    return () => toast.success("You've been logged out everywhere.");
  }, [auth.token, dispatch, history]);

  return <Spinner />;
};
