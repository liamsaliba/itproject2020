import React from "react";
import PropTypes from "prop-types";

export default function PageTab({ page: { title }, onEditPage, onDeletePage }) {
  return (
    <div class="ui dropdown">
      <div class="text">{title}</div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div class="item">
          <i class="edit icon" onClick={() => onEditPage()}></i> Edit Page
        </div>
        <div class="item">
          <i class="delete icon" onClick={() => onDeletePage()}></i>Remove Page
        </div>
      </div>
    </div>
  );
}

PageTab.propTypes = {
  /** Composition of the page */
  page: PropTypes.shape({
    /** Id of the page */
    id: PropTypes.string.isRequired,
    /** Title of the page */
    title: PropTypes.string.isRequired,
    /** Current state of the page */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the page to active */
  onActivePage: PropTypes.func,
  onDeletePage: PropTypes.func,
};
