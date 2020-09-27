import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";
import {
  cacheProps,
  addLastFetch,
  cacheNotExpired,
  upsertManyFetch,
} from "../helpers";
import {
  portfolioFetchedAll,
  portfolioFetchedArtifacts,
  pageFetchedArtifacts,
  pageFetchedAll,
} from "./actions";
import { selectToken, selectUsername } from "./auth";

export const adapter = createEntityAdapter();

const receiveMany = selector => upsertManyFetch(adapter, selector);

const slice = createSlice({
  name: "artifact",
  initialState: adapter.getInitialState(cacheProps),
  reducers: {
    artifactRequestedMany: (artifacts, action) => {
      artifacts.loading = true;
    },
    artifactReceivedMany: (artifacts, action) => {
      adapter.upsertMany(
        artifacts,
        action.payload.map(artifact => addLastFetch(artifact))
      );
      artifacts.loading = false;
    },
    artifactRequestManyFailed: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = action.payload;
    },
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
      adapter.removeOne(artifacts, action.request.data.id);
    },
  },
  extraReducers: {
    [portfolioFetchedAll]: receiveMany(p => p.artifacts),
    [portfolioFetchedArtifacts]: receiveMany(),
    [pageFetchedAll]: receiveMany(p => p.artifacts),
    [pageFetchedArtifacts]: receiveMany(),
  },
});

// Actions
const {
  artifactRequestedMany,
  artifactReceivedMany,
  artifactRequestManyFailed,
  artifactRequestedOne,
  artifactReceivedOne,
  artifactRequestOneFailed,
  artifactCreated,
  artifactUpdated,
  artifactDeleted,
} = slice.actions;
export const actions = slice.actions;

// Reducer
export default slice.reducer;

// Selectors
export const {
  selectById: selectArtifactById,
  selectIds: selectArtifactIds,
  selectEntities: selectArtifactEntities,
  selectAll: selectAllArtifacts,
  selectTotal: selectTotalArtifacts,
} = adapter.getSelectors(state => state.artifacts);

// Action Creators

// load a artifact by id, with _all_ properties
export const fetchArtifact = (id, cache = true) => (dispatch, getState) => {
  const artifact = selectArtifactById(getState(), id);
  if (cache && artifact && cacheNotExpired(artifact.lastFetch)) return;

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
export const createArtifact = (pageId, artifact = {}) => (
  dispatch,
  getState
) => {
  const token = selectToken(getState());

  return dispatch(
    apiStarted({
      url: endpoints.artifactsByPageId(pageId),
      method: "post",
      data: artifact,
      token,
      onSuccess: artifactCreated.type,
    })
  );
};

export const editArtifact = (id, data) => (dispatch, getState) => {
  const token = selectToken(getState());

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
  const token = selectToken(getState());

  return dispatch(
    apiStarted({
      url: endpoints.artifactsById(id),
      method: "delete",
      data: { id },
      token,
      onSuccess: artifactDeleted.type,
    })
  );
};
