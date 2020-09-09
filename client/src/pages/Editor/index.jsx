/** @jsx jsx */
import { jsx, Styled, Flex, Container, ThemeProvider } from "theme-ui";
import User from "../User";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Title } from "./../../components/index";

import themes from "../../themes";

const Lorem = props => {
  // const elements = ['test1', 'test2', 'test3', 'test4']
  const items = [];

  // for (const [index, value] of elements.entries()) {
  for (let i = 1; i < 42; i++) {
    // items.push(<li key={index}>{value}</li>)
    items.push(<p key={i}>Testing {i}</p>);
  }

  return <div>{items}</div>;
};

export default props => {
  const theme = themes.custom;
  let { userId: id } = props;

  const auth = useSelector(state => state.auth);
  id = auth.user.username;

  return (
    <ThemeProvider theme={theme}>
      <Flex
        sx={{
          display: "flex",
          flexWrap: "wrap",
          height: "100vh",
        }}
      >
        <Title>Editor: {id}</Title>
        <aside
          sx={{
            width: "sidebar",
            borderRight: "1px black solid",
            height: "100%",
          }}
        >
          {/* <Sidebar/> */}
          <Navbar userId={id} />
          <Container
            sx={{
              overflow: "auto",
            }}
          >
            <Styled.p>this is the editor page of user {id}.</Styled.p>
            <Lorem />
          </Container>
        </aside>
        <main
          sx={{
            flexGrow: 99999,
            flexBasis: 0,
            minWidth: 320,
            overflow: "auto",
            height: "100%",
          }}
        >
          <User userId={id} />
        </main>
      </Flex>
    </ThemeProvider>
  );
};
