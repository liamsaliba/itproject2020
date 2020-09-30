import { createSlice, createSelector } from "@reduxjs/toolkit";

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "ui",
  initialState: {
    accordion: null,
    currentPortfolio: null,
    loading: false,
    loadingText: null,
  },
  reducers: {
    changeAccordion: (ui, action) => {
      ui.accordion = action.payload;
    },
    changePortfolio: (ui, action) => {
      ui.currentPortfolio = action.payload;
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
