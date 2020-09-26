import React from "react";
import PropTypes from "prop-types";

import Body from './Body';

export default function Artefacts({ feature: { type }, onAddDocument}) {

  const artifact = (
    <div>
      <div class="ui icon header">
        <i class="pdf file outline icon"></i>
        Add an image/video.
      </div>
      <div class="center aligned column">
        <div class="ui primary button" onClick={() => onAddDocument}>
          Add Document
        </div>
      </div>
    </div>
  );

  return (
    <div class="ui vertical stripe segment">
      <div class="ui stackable middle aligned grid container">
        <div class="row">
          <div class="eight wide center aligned column">
            {type === "right" && <Body />}
            {type === "left" && artifact}
          </div>
          <div class="eight wide center aligned column">
            {type === "right" && artifact}
            {type === "left" && <Body />}
          </div>
        </div>
      </div>
    </div>
  );
}

Artefacts.propTypes = {
  /** Composition of the page */
  feature: PropTypes.shape({
    type: PropTypes.string,
    action: PropTypes.bool,
  }),
  /** Event to change the page to active */
};
