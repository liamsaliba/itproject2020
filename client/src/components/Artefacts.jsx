/** @jsx jsx */
import { jsx, Flex, Box, Image } from "theme-ui";
import PropTypes from "prop-types";
import documentPreview from "../svg/DocumentPreview.png";
import { Icon } from "semantic-ui-react";
import React, { useState } from "react";
import Body from "./Body";

import ArtefactField from "./ArtefactField";

export default function Artefact({
  isEditing,
  artefact: { media, hPos, vPos, style },
  body,
  onAddDocument,
}) {
  const [open, setOpen] = useState(false);

  const mediaCollectionStyle = {
    ...style,
    padding: "1em",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "muted",
    borderRadius: "5px",
  };

  const Media = () => {
    const mediaStyle = {
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.125)",
      maxHeight: "300px",
      maxWidth: "300px",
    };

    if (media === "image") {
      return (
        <Image onClick={handleClick} sx={mediaStyle} src={documentPreview} />
      );
    } else if (media === "pdf") {
      return <Icon onClick={handleClick} size="massive" name="file pdf" />;
    }
    return;
  };

  const MediaCollection = () => (
    <Box sx={mediaCollectionStyle}>
      <Media />
    </Box>
  );

  const handleClick = () => {
    if (isEditing) {
      setOpen(!open);
    }
  };

  const artefactStyle = {
    mr: "5em",
    ml: "5em",
    mb: "2em",
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

  const Out = () => {
    if (hPos === "left") {
      return (
        <React.Fragment>
          <ArtefactField {...artefactFieldArgs} />
          <Flex sx={artefactStyle} onClick={handleClick}>
            <MediaCollection />
            <Body body={body} />
          </Flex>
        </React.Fragment>
      );
    } else if (hPos === "right") {
      return (
        <React.Fragment>
          <ArtefactField {...artefactFieldArgs} />
          <Flex sx={artefactStyle} onClick={handleClick}>
            <Body body={body} />
            <MediaCollection />
          </Flex>
        </React.Fragment>
      );
    }
  };

  return <Out />;
}

Artefact.propTypes = {
  /** Composition of the page */
  isEditing: PropTypes.bool,
  artefact: PropTypes.shape({
    media: PropTypes.string,
    hPos: PropTypes.string,
    vPos: PropTypes.string,
    sx: PropTypes.object,
  }),
  body: PropTypes.object,
  onAddDocument: PropTypes.func,
};
