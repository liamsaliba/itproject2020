/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import logo from "../../svg/logo.svg";
import ApiTest from "../ApiTest";

export default () => (
  <Container
    sx={{
      textAlign: "center",
      bg: "black",
    }}
    className="App"
  >
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        <ApiTest />
      </p>
      <p>
        <a className="App-link" href="https://github.com/exradr/itproject2020">
          camel_case IT Project 2020
        </a>
      </p>
    </header>
  </Container>
);
