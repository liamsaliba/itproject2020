/** @jsx jsx */
import { jsx, Styled, Flex, Container } from "theme-ui";
import User from "../portfolio/User";
import Navbar from "./Navbar";

const Lorem = props => {
  // const elements = ['test1', 'test2', 'test3', 'test4']
  const items = [];

  // for (const [index, value] of elements.entries()) {
  for (let i = 1; i < 42; i++) {
    // items.push(<li key={index}>{value}</li>)
    items.push(<p>Testing {i}</p>);
  }

  return <div>{items}</div>;
};

export default props => {
  let { userId: id } = props;
  return (
    <Flex
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100vh",
      }}
    >
      <aside
        sx={{
          flexGrow: 1,
          // flexBasis: "sidebar",
          width: "sidebar",
          borderRight: "1px black solid",
          height: "100%",
        }}
      >
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
  );
};
