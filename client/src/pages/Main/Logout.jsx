/** @jsx jsx */
import { jsx, Spinner } from "theme-ui";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/auth";
import { useEffect } from "react";
import { navigate } from "@reach/router";

export default () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => navigate("/"), 200);
    if (!auth.token) return () => {};

    dispatch(logout(auth.token));
    return () => toast.success("Logged out.");
  });

  return <Spinner />;
};
