/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
import User from "../User";
import { useSelector } from "react-redux";
import { Title } from "./../../components/index";
import Sidebar from "./Sidebar";

import themes from "../../themes";
import { selectCurrentUserPortfolio, selectUsername } from "../../store";
import { Dimmer } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

export default props => {
  const portfolio = useSelector(selectCurrentUserPortfolio);
  const id = useSelector(selectUsername);

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
        <aside
          sx={{
            width: "250px",
            borderRight: "1px black solid",
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          {portfolio ? <Sidebar /> : null}
          {/* <Dimmer.Dimmable as={Flex} dimmed={!portfolio}>
            <Dimmer inverted active={!portfolio}>
              <Loader size="large">Loading {id}'s portfolio...</Loader>

              
            </Dimmer>
          </Dimmer.Dimmable> */}
        </aside>
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
