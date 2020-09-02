/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import React from "react";
import { useParams } from "react-router-dom";

export default () => {
  let { id } = useParams();
  return <main>this is the userpage of user {id}.</main>;
};
