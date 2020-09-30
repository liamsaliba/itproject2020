import { createSlice } from "@reduxjs/toolkit";

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "ui",
  initialState: {
    accordion: null,
  },
  reducers: {
    changeAccordion: (ui, action) => {
      ui.accordion = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
// Actions
export const { changeAccordion } = slice.actions;

// Selectors
export const selectAccordion = state => state.ui.accordion;
