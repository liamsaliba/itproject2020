import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";
import { cacheProps } from "../helpers";
import { actions as pagesActions, selectArtifactsByPageId } from "./pages";

export const adapter = createEntityAdapter({
  selectId: artifact => artifact._id,
});

const slice = createSlice({
  name: "artifact",
  initialState: adapter.getInitialState(cacheProps),
  reducers: {
    // addOne: adapter.addOne,
    // addMany: adapter.addMany,
    // removeOne: adapter.removeOne,
    // removeMany: adapter.removeMany,
    // updateOne: adapter.updateOne,
    // updateMany: adapter.updateMany,
    // upsertOne: adapter.upsertOne,
    // upsertMany: adapter.upsertMany,
    artifactRequestedMany: (artifacts, action) => {
      artifacts.loading = true;
    },
    artifactReceivedMany: (artifacts, action) => {
      adapter.upsertMany(artifacts, addLastFetch(action.payload));
      artifacts.loading = false;
    },
    artifactRequestedOne: (artifacts, action) => {
      artifacts.loading = true;
    },
    artifactReceivedOne: (artifacts, action) => {
      adapter.upsertOne(artifacts, addLastFetch(action.payload));
      artifacts.loading = false;
    },
    artifactRequestOneFailed: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = action.payload;
    },
    artifactCreated: (artifacts, action) => {
      adapter.upsertOne(artifacts, addLastFetch(action.payload));
    },
    artifactUpdated: (artifacts, action) => {
      adapter.upsertOne(artifacts, addLastFetch(action.payload));
    },
    artifactDeleted: (artifacts, action) => {
      adapter.removeOne(artifacts, action.request.username);
    },
  },
});

const {
  artifactRequestedOne,
  artifactReceivedOne,
  artifactRequestOneFailed,
  artifactCreated,
  artifactUpdated,
  artifactDeleted,
} = slice.actions;

export default slice.reducer;
export const actions = slice.actions;

// Action Creators

// load all artifacts from page, with _all_ properties
export const fetchPageArtifacts = (ids, cache = true) => (
  dispatch,
  getState
) => {
  const artifact = getState().artifacts.entities[id];
  if (cache && artifact && cacheNotExpired(artifact.lastFetch))
    if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiStarted({
      url: endpoints.artifactsById(id),
      method: "get",
      onStart: artifactRequestedOne.type,
      onSuccess: artifactReceivedOne.type,
      onFailure: artifactRequestOneFailed.type,
    })
  );
};

// load a artifact by id, with _all_ properties
export const fetchArtifact = (id, cache = true) => (dispatch, getState) => {
  const artifact = getState().artifacts.entities[id];
  if (cache && artifact && cacheNotExpired(artifact.lastFetch))
    if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiStarted({
      url: endpoints.artifactsById(id),
      method: "get",
      onStart: artifactRequestedOne.type,
      onSuccess: artifactReceivedOne.type,
      onFailure: artifactRequestOneFailed.type,
    })
  );
};

// create a new artifact
export const createArtifact = artifact => (dispatch, getState) => {
  const token = getState().auth.token;
  const username = getState().auth.user.username;
  artifact = artifact === undefined ? {} : artifact;
  return dispatch(
    apiStarted({
      url: endpoints.portfolioArtifact(username),
      method: "post",
      data: artifact,
      token,
      onSuccess: artifactCreated.type,
    })
  );
};

export const changeArtifactOptions = (id, data) => (dispatch, getState) => {
  const token = getState().auth.token;
  return dispatch(
    apiStarted({
      url: endpoints.artifactsById(id),
      method: "patch",
      data,
      token,
      onSuccess: artifactUpdated.type,
    })
  );
};

// delete a artifact by id
export const deleteArtifact = id => (dispatch, getState) => {
  const token = getState().auth.token;

  return dispatch(
    apiStarted({
      url: endpoints.artifactsById(id),
      method: "delete",
      token,
      onSuccess: artifactDeleted.type,
    })
  );
};

// Selectors
export const {
  selectById: selectArtifactById,
  selectIds: selectArtifactIds,
  selectEntities: selectArtifactEntities,
  selectAll: selectAllArtifacts,
  selectTotal: selectTotalArtifacts,
} = adapter.getSelectors(state => state.artifacts);
