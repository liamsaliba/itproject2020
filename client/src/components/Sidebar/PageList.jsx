import React from "react";
import PropTypes from "prop-types";

import PageTab from "./PageTab";

export function PageList({ loading, pages }, onEditPage, onDeletePage) {
  const events = {
    onEditPage,
    onDeletePage,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  return (
    <div className="list-items">
      {pages.map(page => (
        <PageTab page={page} {...events} />
      ))}
    </div>
  );
}

PageList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  pages: PropTypes.arrayOf(PageTab.propTypes.page),
  /** Event to change the task to pinned */
  onEditPage: PropTypes.func,
  /** Event to change the task to archived */
  onDeletePage: PropTypes.func,
};

PageList.defaultProps = {
  loading: false,
};
