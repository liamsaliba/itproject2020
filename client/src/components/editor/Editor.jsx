/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import React from "react";

export default props => {
  let { userId: id } = props;
  return <main>this is the editor page of user {id}.</main>;
};
