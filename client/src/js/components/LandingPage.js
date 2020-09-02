/** @jsx jsx */
import React from "react";
import { jsx, Link } from "theme-ui";
import logo from "../../svg/logo.svg";
import "./App.css";
import ApiTest from "./ApiTest";

export default () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <ApiTest />
        </p>
        <p>
          <a
            className="App-link"
            href="https://github.com/exradr/itproject2020"
          >
            camel_case IT Project 2020
          </a>
        </p>
      </header>
    </div>
  );
};
