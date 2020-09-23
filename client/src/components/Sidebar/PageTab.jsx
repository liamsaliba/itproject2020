import React from "react";
import PropTypes from "prop-types";

export default function PageTab({ page: { title }, onEditPage, onDeletePage }) {
  return (
    // fonts: {
    //   body: "Poppins, sans-serif",
    //   heading: "Poppins, sans-serif",
    //   monospace: "Menlo, monospace",
    // },

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

    // <div className={`list-item ${state}`}>
    //   <label className="checkbox">
    //     <input
    //       type="checkbox"
    //       defaultChecked={state === 'TASK_ARCHIVED'}
    //       disabled={true}
    //       name="checked"
    //     />
    //     <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
    //   </label>
    //   <div className="title">
    //     <input type="text" value={title} readOnly={true} placeholder="Input title" />
    //   </div>

    //   <div className="actions" onClick={event => event.stopPropagation()}>
    //     {state !== 'TASK_ARCHIVED' && (
    //       // eslint-disable-next-line jsx-a11y/anchor-is-valid
    //       <a onClick={() => onPinTask(id)}>
    //         <span className={`icon-star`} />
    //       </a>
    //     )}
    //   </div>
    // </div>
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
