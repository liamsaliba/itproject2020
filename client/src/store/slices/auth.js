import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";

const userKey = "user";
const tokenKey = "token";

// Attempt to get user information and token from cookies
const user = JSON.parse(localStorage.getItem(userKey));
const token = localStorage.getItem(tokenKey);
const finishLogin = (auth, { payload, request }) => {
  const { user, token } = payload;
  const { useCookie } = request;
  auth.loading = false;
  auth.error = null;
  auth.user = user;
  auth.token = token;
  if (useCookie) {
    localStorage.setItem(userKey, JSON.stringify(user));
    localStorage.setItem(tokenKey, token);
  }
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

// Reducer
export default slice.reducer;
// Actions
const {
  loginRequested,
  loginSucceeded,
  loginFailed,
  signUpFailed,
  signUpRequested,
  signUpSucceeded,
  logoutRequested,
} = slice.actions;

// Selectors
const selectAuth = state => state.auth;

export const selectToken = createSelector(selectAuth, auth => auth.token);
export const selectUser = createSelector(selectAuth, auth => auth.user);
export const selectUsername = createSelector(selectUser, user =>
  user === undefined ? undefined : user.username
);

// Action Creators

export const signup = (
  firstName,
  lastName,
  email,
  username,
  password,
  useCookie = true
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
      req: { useCookie },
    })
  );

export const login = (username, password, useCookie = true) => dispatch => {
  return dispatch(
    apiStarted({
      url: endpoints.login,
      method: "post",
      data: { username, password },
      onStart: loginRequested.type,
      onSuccess: loginSucceeded.type,
      onFailure: loginFailed.type,
      hideErrorToast: true,
      req: { useCookie },
    })
  );
};

export const logout = () => (dispatch, getState) => {
  const token = selectToken(getState());

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
  const token = selectToken(getState());

  return dispatch(
    apiStarted({
      url: endpoints.logoutAll,
      method: "post",
      token: token,
      onStart: logoutRequested.type,
    })
  );
};
