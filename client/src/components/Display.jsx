/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
// import PropTypes from "prop-types";
import React, { useState } from "react";
import Body from "./Body";

import { EditArtifactForm } from "./ArtifactForm";

const Display = ({ editing, contents, id, media }) => {
  const [open, setOpen] = useState(false);
  const { hPos = "center" } = contents;

  const body = <Body hPos="center" vPos="center" {...contents} />;

  const MediaCollection = () => {
    // const mediaStyle = {
    //   boxShadow: "0 0 3px rgba(0, 0, 0, 0.125)",
    // };

    // const mediaCollectionStyle = {
    //   // ...style,
    //   padding: "1em",
    //   display: "flex",
    //   flex: 1,
    //   justifyContent: "center",
    //   backgroundColor: "muted",
    //   borderRadius: "5px",
    // };
    return null;
    // TODO: reimplement
    // if (media === "image") {
    //   return (
    //     <Image onClick={handleClick} sx={mediaStyle} src={documentPreview} />
    //   );
    // } else if (media === "pdf") {
    //   return <Icon onClick={handleClick} size="massive" name="file pdf" />;
    // }
    // return (
    //   <Box sx={mediaCollectionStyle}>
    //     <Media />
    //   </Box>
    // );
  };

  const handleClick = () => {
    if (editing) {
      setOpen(!open);
    }
  };

  const artefactStyle = {
    mr: "5em",
    ml: "5em",
    mb: "2em",
    border: editing ? "1px solid black" : null,
  };

  const artefactFieldArgs = {
    state: {
      open: open,
      setOpen: setOpen,
    },
    artefactField: {
      isNew: false,
    },
  };

  const children =
    hPos === "right" ? (
      <React.Fragment>
        <MediaCollection />
        {body}
      </React.Fragment>
    ) : hPos === "left" ? (
      <React.Fragment>
        {body}
        <MediaCollection />
      </React.Fragment>
    ) : hPos === "center" ? (
      <React.Fragment>
        {body}
        {/* TODO: background media collection */}
        {/* <MediaCollection onClick={handleClick} /> */}
      </React.Fragment>
    ) : null;

  return (
    <React.Fragment>
      <EditArtifactForm {...artefactFieldArgs} />
      <Flex sx={artefactStyle} onClick={handleClick}>
        {children}
      </Flex>
    </React.Fragment>
  );
};

export default Display;
