import { createSlice, createSelector } from "@reduxjs/toolkit";
import { actions as portfolioActions } from "./portfolios";
import { portfolioFetchedAll } from "./actions";
// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "ui",
  initialState: {
    accordion: null,
    currentPortfolio: null,
    loading: false,
    loadingPortfolio: false,
    loadingText: null,
  },
  reducers: {
    changeAccordion: (ui, action) => {
      ui.accordion = action.payload;
    },
    changePortfolio: (ui, action) => {
      const userId = action.payload;
      if (ui.currentPortfolio !== userId) {
        ui.currentPortfolio = userId;
        ui.loadingPortfolio = true;
        ui.loading = true;
        ui.loadingText = `Loading ${userId}'s portfolio`;
      }
      ui.accordion = null; // if log in as a different user, shouldn't have settings saved!
    },
    setLoading: (ui, action) => {
      ui.loading = true;
      ui.loadingText = action.payload;
    },
    setLoadingFinished: (ui, action) => {
      ui.loading = false;
      ui.loadingText = null;
    },
  },
  extraReducers: {
    [portfolioActions.portfolioRequestOneFailed]: (ui, action) => {
      if (ui.loadingPortfolio) {
        ui.loadingPortfolio = false;
        ui.loading = false;
        ui.loadingText = "";
      }
    },
    [portfolioFetchedAll]: (ui, action) => {
      if (ui.loadingPortfolio) {
        ui.loadingPortfolio = false;
        ui.loading = false;
        ui.loadingText = "";
      }
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
export const {
  changeAccordion,
  changePortfolio,
  setLoading,
  setLoadingFinished,
} = slice.actions;

// Selectors
export const selectAccordion = state => state.ui.accordion;
export const selectCurrentPortfolio = state => state.ui.currentPortfolio;
export const selectLoadingStatus = state => state.ui.loading;
export const selectLoadingText = state => state.ui.loadingText;
export const selectLoading = createSelector(
  [selectLoadingStatus, selectLoadingText],
  (status, text) => ({
    loading: status,
    text,
  })
);
