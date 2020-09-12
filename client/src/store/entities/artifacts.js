import { createSlice } from "@reduxjs/toolkit";
import { apiStarted } from "./api";
import { endpointByUser } from "./portfolios";

const artifactsEndpointByUser = username =>
  endpointByUser(username) + "/artifacts";

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

// Combined Reducer (artifactsReducer)

export default slice.reducer;
const {
  artifactsRequested,
  artifactsRequestFailed,
  artifactsReceived,
  artifactAdded,
  artifactEdited,
  artifactRemoved,
} = slice.actions;

// Action Creators

export const loadArtifacts = username => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: artifactsEndpointByUser(username),
      onStart: artifactsRequested.type,
      onSuccess: artifactsReceived.type,
      onError: artifactsRequestFailed.type,
    })
  );
};

export const addArtifact = (token, username, artifact) =>
  apiStarted({
    url: artifactsEndpointByUser(username),
    method: "post",
    data: artifact,
    token: token,
    onSuccess: artifactAdded.type,
  });

export const removeArtifact = (token, username, id) =>
  apiStarted({
    url: artifactsEndpointByUser(username) + "/" + id,
    method: "delete",
    token: token,
    onSuccess: artifactRemoved.type,
  });

export const editArtifact = (token, username, id, body) =>
  apiStarted({
    url: artifactsEndpointByUser(username) + "/" + id,
    method: "patch",
    data: { body },
    token: token,
    onSuccess: artifactEdited.type,
  });

// Selectors
