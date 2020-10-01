/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
import User from "../User";
import { useSelector } from "react-redux";
import { Title, Toast } from "./../../components/index";
import Sidebar from "./Sidebar";

import themes from "../../themes";
import {
  selectAuthSlice,
  selectCurrentUserPortfolio,
  selectUsername,
} from "../../store";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default props => {
  const portfolio = useSelector(selectCurrentUserPortfolio);
  const authError = useSelector(state => selectAuthSlice(state).error);
  const history = useHistory();

  const id = useSelector(selectUsername);

  useEffect(() => {
    if (authError) {
      history.push("/logout");
      toast.info(
        <Toast
          title="You've been logged out."
          message={authError.data}
          technical={authError.message}
        />
      );
    }
    if (id === undefined) {
      history.push("/login");
      toast.error(<Toast title="You need to login to edit a portfolio." />);
    }
  });

  return (
    <Flex
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100vh",
        background: "white",
        color: "black",
      }}
    >
      <Title>Editor: {id}</Title>
      <ThemeProvider theme={themes.base}>
        <Flex
          sx={{
            width: "250px",
            borderRight: "1px black solid",
            overflowY: "auto",
            overflowX: "hidden",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          {portfolio ? <Sidebar /> : null}
        </Flex>
      </ThemeProvider>
      <main
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: 320,
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
        }}
      >
        <User userId={id} />
      </main>
    </Flex>
  );
};
