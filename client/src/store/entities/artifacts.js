import { createSlice } from "@reduxjs/toolkit";
import { apiStarted } from "./api";

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "artifacts",
  initialState: {
    list: [], // array of artifacts
    loading: false, // loading indicator for UI
    lastFetch: null, // timestamp of last time fetched from the server (cache)
  },
  reducers: {
    artifactsRequested: (artifacts, action) => {
      artifacts.loading = true;
    },
    artifactsRequestFailed: (artifacts, action) => {
      artifacts.loading = false;
    },
    artifactsReceived: (artifacts, action) => {
      artifacts.list = action.payload;
      artifacts.loading = false;
      artifacts.lastFetch = Date.now();
    },
    artifactAdded: (artifacts, action) => {
      artifacts.list.push(action.payload);
      // TODO: Reorder artifacts
    },
    artifactEdited: (artifacts, action) => {
      const index = artifacts.list.findIndex(
        artifact => artifact.id === action.payload.id
      );
      artifacts.list[index] = action.payload.newArtifact;
    },
    artifactRemoved: (artifacts, action) => {
      const index = artifacts.list.findIndex(
        artifact => artifact.id === action.payload.id
      );
      artifacts.list.remove(index);
    },
  },
});

export default slice.reducer;
const {
  artifactsRequested,
  artifactsRequestFailed,
  artifactsReceived,
  artifactAdded,
  artifactEdited,
  artifactRemoved,
} = slice.actions;

export const addArtifact = artifact =>
  apiStarted({
    url: "/user/signup",
    method: "post",
    data: { firstName, lastName, email, username, password },
    onStart: signUpRequested.type,
    onSuccess: signUpSucceeded.type,
    onFailure: signUpFailed.type,
  });

export const login = (username, password) => dispatch => {
  return dispatch(
    apiStarted({
      url: "/user/login",
      method: "post",
      data: { username, password },
      onStart: loginRequested.type,
      onSuccess: loginSucceeded.type,
      onFailure: loginFailed.type,
    })
  );
};

export const logout = token => dispatch => {
  return dispatch(
    apiStarted({
      url: "/user/logout",
      method: "post",
      token: token,
      onStart: logoutRequested.type,
    })
  );
};
