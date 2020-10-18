import { createAction } from "@reduxjs/toolkit";

// type: {}, payload: {}
export const portfolioFetchedAll = createAction(
  "portfolios/portfolioFetchedAll"
);
export const portfolioFetchedPages = createAction(
  "portfolios/portfolioFetchedPages"
);
export const portfolioFetchedArtifacts = createAction(
  "portfolios/portfolioFetchedArtifacts"
);
export const pageFetchedAll = createAction("pages/pageFetchedAll");
export const pageFetchedArtifacts = createAction("pages/pageFetchedArtifacts");

export const avatarUploaded = createAction("avatar/avatarUploaded");
