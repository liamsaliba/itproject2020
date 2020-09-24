import { createSlice } from "@reduxjs/toolkit";
import { apiStarted } from "./api";

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "editor",
  initialState: {
    isEditing: false,
  },
  reducers: {
    editorStarted: (editor, action) => {
      editor.isEditing = true;
    },
    editorExited: (editor, action) => {
      editor.isEditing = false;
    },
  },
});

export default slice.reducer;

const { editorStarted, editorExited } = slice.actions;

// Write Actions Below
