/** @jsx jsx */
import { jsx, Flex, Image, Box } from "theme-ui";
// import PropTypes from "prop-types";
import React, { useState } from "react";
import Body from "./Body";
import { useEffect } from "react";

// Orientation refers to that of the artefact/feature, it is one of - left, right and center
// For now media is URL -> i.e. an image's url.
const Display = ({ openEditor, contents, id, media, editing }) => {
  useEffect(() => {
    console.log(media);
  });

  const { orientation = "right", body, header } = contents;

  var bodyOrientation = {};
  if (orientation === "right") {
    bodyOrientation = {
      hPos: "left",
      vPos: "center",
    };
  } else if (orientation === "left") {
    bodyOrientation = {
      hPos: "right",
      vPos: "center",
    };
  } else if (orientation === "center") {
    bodyOrientation = {
      hPos: "center",
      vPos: "center",
    };
  }

  const MediaCollection = () => {
    const mediaStyle = {
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.125)",
    };

    const mediaCollectionStyle = {
      padding: "1em",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      backgroundColor: "muted",
      borderRadius: "5px",
    };

    const Media = ({ url, description, type, filename, id, setPreview }) => {
      if (type === "image") {
        return <Image key={id.toString()} sx={mediaStyle} src={url} />;
      }
    };

    return (
      <Box sx={mediaCollectionStyle}>
        {media.map(item => (
          <Media {...item} key={item.id} />
        ))}
      </Box>
    );
  };

  const artefactStyle = {
    mr: "5em",
    ml: "5em",
    mb: "2em",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
    border: "2px solid #aaa",
    borderRadius: "5px",
    p: "1em",
    transition: "0.3s all ease",
    "&:hover": editing
      ? {
          transform: "scale(1.05)",
          cursor: "pointer",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
        }
      : undefined,
  };

  const bodyComponent = (
    <Body
      hPos={bodyOrientation.hPos}
      vPos={bodyOrientation.vPos}
      body={body}
      header={header}
    />
  );

  const handleClick = () => {
    openEditor();
  };

  const children =
    orientation === "right" ? (
      <React.Fragment>
        <MediaCollection />
        {bodyComponent}
      </React.Fragment>
    ) : orientation === "left" ? (
      <React.Fragment>
        {bodyComponent}
        <MediaCollection />
      </React.Fragment>
    ) : orientation === "center" ? (
      <React.Fragment>
        {bodyComponent}
        {/* TODO: background media collection */}
        {/* <MediaCollection onClick={handleClick} /> */}
      </React.Fragment>
    ) : null;

  return (
    <Flex key={id.toString()} sx={artefactStyle} onClick={handleClick}>
      {children}
    </Flex>
  );
};

export default Display;
