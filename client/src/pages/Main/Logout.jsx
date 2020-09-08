/** @jsx jsx */
import { jsx } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, useToast } from "@chakra-ui/core";

import { logout } from "../../store/auth";
import { useEffect } from "react";
import { navigate } from "@reach/router";

export default () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => navigate("/"), 200);
    if (!auth.token) return () => {};

    dispatch(logout(auth.token));
    return () =>
      toast({
        title: "Logged out",
        description: "You've been logged out.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  });

  return <Spinner />;
};
