import React from "react";
import PropTypes from "prop-types";

import PageTab from "./PageTab";

export function PageList({ loading, pages }, onEditPage, onDeletePage) {
  const events = {
    onEditPage,
    onDeletePage,
  };

  const LoadingRow = (
    <div class="item">
      <div class="ui medium active inline loader"></div>
    </div>
  );

  const loadingRows = (
    <div>
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
    </div>
  );

  return (
    <div class="ui vertical stripe segment">
      <div class="ui stackable middle aligned grid container">
        <div class="ui two wide column">
          <div class="ui middle aligned selection list">
            {loading && loadingRows}
            {!loading &&
              pages.map(page => (
                <div class="item">
                  <PageTab page={page} {...events} />
                </div>
              ))}
          </div>
        </div>
      </div>
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
