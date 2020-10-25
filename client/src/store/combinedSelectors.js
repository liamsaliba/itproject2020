// Combined selectors
import { createSelector } from "@reduxjs/toolkit";
import { selectAllPages, selectAllArtifacts, selectAllMedia } from "./slices";
import { selectUsername } from "./slices/auth";

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
  (pages, username) => {
    // return the pages for the given portfolio only
    return pages.filter(page => page.username === username);
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

export const selectNumArtifactsByPageId = createSelector(
  // need the 2nd dependency to get the pageId argument.
  [state => selectAllArtifacts(state), (_, pageId) => pageId],
  (artifacts, pageId) => {
    // return the pages for the given portfolio only
    return artifacts.filter(artifact => artifact.pageId === pageId).length;
  }
);

export const selectMediaByUsername = createSelector(
  [state => selectAllMedia(state), (_, username) => username],
  (media, username) => {
    // return the pages for the given portfolio only
    return media.filter(item => item.username === username);
  }
);

export const selectUserMedia = createSelector(
  [state => state, state => selectUsername(state)],
  selectMediaByUsername
);
