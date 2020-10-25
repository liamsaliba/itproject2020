/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import React from "react";

import Navbar from "./Navbar";

// import SectionTextEditor from "./SectionTextEditor";
import SectionMedia from "./SectionMedia";
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
      <Navbar userId={props.id} closeEditor={props.closeEditor} />
      <SectionMenu />
      <Flex
        sx={{
          flex: "1",
          justifyContent: "center",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <SectionSettings />
        <SectionPages />
        <SectionMedia />
        {/* <SectionTextEditor /> */}
      </Flex>
    </React.Fragment>
  );
};
