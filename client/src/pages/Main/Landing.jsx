/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import Login from "./Login";
// import logo from "../../svg/logo.svg";

export default () => (
  <Container
    variant="layout.centerflex"
    sx={{
      backgroundImage: "url('https://i.redd.it/jpx7gtsw5ye41.jpg')",
    }}
    className="App"
  >
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <Login />
  </Container>
);
