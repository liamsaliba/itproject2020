import { createSlice } from "@reduxjs/toolkit";
// import { apiCallBegan } from "./api";

// Attempt to get user information and token from cookies
const user = JSON.parse(localStorage.getItem("user"));

// Slices   (Actions and Reducers)

const slice = createSlice({
  name: "auth",
  initialState:
    user && token
      ? {
          loading: false,
          user,
        }
      : {
          loading: false,
          user: {},
        },
  reducers: {
    loginRequested: (auth, action) => {
      auth.loading = true;
    },
    loginSucceeded: (auth, action) => {
      auth.loading = false;
      auth.user = action.payload;
    },
    loginFailed: (auth, action) => {
      auth.loading = false;
    },
    signUpRequested: (auth, action) => {
      auth.loading = true;
    },
    signUpSucceeded: (auth, action) => {
      auth.loading = false;
      auth.user = action.payload;
    },
    signUpFailed: (auth, action) => {
      auth.loading = false;
    },
  },
});

export default slice.reducer;
const {
  loginRequested,
  loginSucceeded,
  loginFailed,
  signUpFailed,
  signUpRequested,
  signUpSucceeded,
} = slice.actions;

export const login = (username, password) => {
  apiCallBegan({
    url: "/user/login",
    onStart: loginRequested,
    onSuccess: loginSucceeded,
    onError: loginFailed,
  });
};
