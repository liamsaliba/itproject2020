import React from "react";
import PropTypes from "prop-types";
import documentPreview from "../svg/DocumentPreview.png";
import { Flex, Box, Image } from "theme-ui";
import { Icon } from 'semantic-ui-react';

import Body from './Body';

export default function Artefact({ artefact: { media, hPos, vPos, style }, body, onAddDocument}) {

  const styling = {
    ...style,
    padding: "5px",
    display:"flex",
    justifyContent:"center"
  };

  const Media = () => {
    const mediaStyle = {
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.125)",
      maxHeight:"300px",
      maxWidth:"300px",
      padding:"2px"
    }

    if (media==="image") {
      return (<Image sx={mediaStyle} src={documentPreview} />);
    } else if (media==="pdf") {
      return (<Icon sx={mediaStyle} size='massive' name='file pdf' />);
    } 
    return;
  };

  const MediaCollection = () => (
    <Box sx={styling}>
      <Media />
      {/* <Button onClick={() => onAddDocument}>Add Artefact</Button> */}
    </Box>
  );

  const Out = () => {
    if (hPos==="left") {
      return (
        <Flex>
          <MediaCollection />
          <Body body={body}/>
        </Flex> 
      );
    } else if (hPos==="right") {
      return (
        <Flex>
          <Body body={body}/>
          <MediaCollection />
        </Flex> 
      );
    }
  }

  return (
    <Out />
  );
}

Artefact.propTypes = {
  /** Composition of the page */
  artefact: PropTypes.shape({
    media: PropTypes.string,
    hPos: PropTypes.string,
    vPos: PropTypes.string,
    sx: PropTypes.object, 
  }),
  body: PropTypes.object, 
  onAddDocument: PropTypes.func, 
};
