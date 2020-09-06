/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import React from "react";

export default props => {
  const { userId: id } = props;
  return <main>this is the userpage of user {id}.</main>;
};
