// Combined selectors
import { createSelector } from "@reduxjs/toolkit";
import {
  selectPageArtifactIds,
  selectPortfolioPageIds,
  selectAllPages,
  selectAllArtifacts,
} from "./slices";

// export const selectPagesByUsername = createSelector(
//   [
//     (state, username) => selectPortfolioPageIds(state, username), // select the current portfolio
//     state => selectAllPages(state),
//   ],
//   (portfolioPages, pages) => {
//     if (!portfolioPages) return [];
//     // return the pages for the given portfolio only
//     return pages.filter(page => portfolioPages.includes(page.id));
//   }
// );

// export const selectArtifactsByPageId = createSelector(
//   [
//     (state, pageId) => selectPageArtifactIds(state, pageId), // select the current portfolio
//     state => selectAllArtifacts(state),
//   ],
//   (pageArtifacts, artifacts) => {
//     if (!pageArtifacts) return [];
//     // return the pages for the given portfolio only
//     return artifacts.filter(artifact => pageArtifacts.includes(artifact.id));
//   }
// );

export const selectPagesByUsername = createSelector(
  [state => selectAllPages(state), (_, username) => username],
  (state, username) => {
    // return the pages for the given portfolio only
    return selectAllPages(state).filter(page => page.username === username);
  }
);

export const selectArtifactsByPageId = createSelector(
  // need the 2nd dependency to get the pageId argument.
  [state => selectAllArtifacts(state), (_, pageId) => pageId],
  (artifacts, pageId) => {
    // return the pages for the given portfolio only
    return artifacts.filter(artifact => artifact.pageId === pageId);
  }
);
