import React from "react";
import PropTypes from "prop-types";

// import Body from './Body';

export default function Artefacts({
  feature: { type, action },
  onAddDocument,
}) {
  const text = (
    <div>
      <h2 class="ui header">Header</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora alias
        officiis quam et iste ratione earum illo aliquid neque, quis quas
        accusamus voluptatum provident dolorum aspernatur nostrum quo similique
        odit!
      </p>

      {action && (
        <div class="center aligned column">
          <div class="ui button">Optional Action</div>
        </div>
      )}
    </div>
  );

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
            {type === "right" && text}
            {type === "left" && artifact}
          </div>
          <div class="eight wide center aligned column">
            {type === "right" && artifact}
            {type === "left" && text}
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
