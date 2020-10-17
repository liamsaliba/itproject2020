// Combined selectors
import { createSelector } from "@reduxjs/toolkit";
import {
  selectPortfolioPageIds,
  selectAllPages,
  selectAllArtifacts,
  selectPageById,
} from "./slices";

export const selectPagesByUsername = createSelector(
  [
    (state, username) => selectPortfolioPageIds(state, username), // select the current portfolio
    state => selectAllPages(state),
  ],
  (portfolioPages, pages) => {
    // return the pages for the given portfolio only
    return pages.filter(page => portfolioPages.includes(page.id));
  }
);

export const selectArtifactsByPageId = createSelector(
  [
    (state, pageId) => selectPageById(state, pageId), // select the current portfolio
    state => selectAllArtifacts(state),
  ],
  (pageArtifacts, artifacts) => {
    // return the pages for the given portfolio only
    return artifacts.filter(artifact => pageArtifacts.includes(artifact.id));
  }
);
