import { createSlice } from "@reduxjs/toolkit";
import { apiStarted } from "./api";

const userKey = "user";
const tokenKey = "token";

// Attempt to get user information and token from cookies
const user = JSON.parse(localStorage.getItem(userKey));
const token = localStorage.getItem(tokenKey);

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "editor",
  initialState:
    {
      isEditing: false, 
    },
  reducers: {
    editorStarted: (editor, action) => {
      editor.isEditing = true;
    },
    editorExited: (editor, action) => {
      editor.isEditing = false;
    }
  },
});

export default slice.reducer;

const {
  editorStarted,
  editorExited,
} = slice.actions;

// Write Actions Below