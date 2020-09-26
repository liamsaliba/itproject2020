import { createSlice } from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";

const userKey = "user";
const tokenKey = "token";

// Attempt to get user information and token from cookies
const user = JSON.parse(localStorage.getItem(userKey));
const token = localStorage.getItem(tokenKey);
const finishLogin = (auth, { payload }) => {
  const { user, token } = payload;
  auth.loading = false;
  auth.error = null;
  auth.user = user;
  auth.token = token;
  localStorage.setItem(userKey, JSON.stringify(user));
  localStorage.setItem(tokenKey, token);
};

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "auth",
  initialState:
    user && token
      ? {
          loading: false,
          error: null,
          user,
          token,
        }
      : {
          loading: false,
          error: null,
          user: {},
          token: "",
        },
  reducers: {
    loginRequested: (auth, action) => {
      auth.loading = true;
      auth.error = null;
    },
    loginSucceeded: (auth, action) => finishLogin(auth, action),
    loginFailed: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
      auth.user = {};
      auth.token = "";
    },
    signUpRequested: (auth, action) => {
      auth.loading = true;
    },
    signUpSucceeded: (auth, action) => finishLogin(auth, action),
    signUpFailed: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
      auth.user = {};
      auth.token = "";
    },
    logoutRequested: (auth, action) => {
      auth.user = {};
      auth.token = "";
      localStorage.removeItem(userKey);
      localStorage.removeItem(tokenKey);
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
  logoutRequested,
} = slice.actions;

export const signup = (
  firstName,
  lastName,
  email,
  username,
  password
) => dispatch =>
  dispatch(
    apiStarted({
      url: endpoints.signup,
      method: "post",
      data: { firstName, lastName, email, username, password },
      onStart: signUpRequested.type,
      onSuccess: signUpSucceeded.type,
      onFailure: signUpFailed.type,
      hideErrorToast: true,
    })
  );

export const login = (username, password) => dispatch => {
  return dispatch(
    apiStarted({
      url: endpoints.login,
      method: "post",
      data: { username, password },
      onStart: loginRequested.type,
      onSuccess: loginSucceeded.type,
      onFailure: loginFailed.type,
      hideErrorToast: true,
    })
  );
};

export const logout = () => (dispatch, getState) => {
  const token = getState().auth.token;

  return dispatch(
    apiStarted({
      url: endpoints.logout,
      method: "post",
      token: token,
      onStart: logoutRequested.type,
    })
  );
};

export const logoutAll = () => (dispatch, getState) => {
  const token = getState().auth.token;

  return dispatch(
    apiStarted({
      url: endpoints.logoutAll,
      method: "post",
      token: token,
      onStart: logoutRequested.type,
    })
  );
};
