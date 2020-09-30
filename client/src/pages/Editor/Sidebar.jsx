/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import React from "react";

import Navbar from "./Navbar";

import SectionTextEditor from "./SectionTextEditor";
import SectionArtifacts from "./SectionArtifacts";
import SectionSettings from "./SectionSettings";
import SectionPages from "./SectionPages";
import SectionMenu from "./SectionMenu";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { finishEditing, startEditing } from "../../store";

export default props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startEditing());
    return () => {
      dispatch(finishEditing());
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navbar userId={props.id} />
      <Container
        sx={{
          overflow: "auto",
        }}
      >
        <SectionMenu />
        <SectionSettings />
        <SectionPages />
        <SectionArtifacts />
        <SectionTextEditor />
      </Container>
    </React.Fragment>
  );
};
