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
import { selectToken } from "./auth";

export const adapter = createEntityAdapter();

const receiveMany = selector => upsertManyFetch(adapter, selector);

const slice = createSlice({
  name: "artifact",
  initialState: adapter.getInitialState(cacheProps),
  reducers: {
    artifactRequestedMany: (artifacts, action) => {
      artifacts.loading = true;
      artifacts.error = null;
    },
    artifactReceivedMany: (artifacts, action) => {
      adapter.upsertMany(
        artifacts,
        action.payload.map(artifact => addLastFetch(artifact))
      );
      artifacts.loading = false;
      artifacts.error = null;
    },
    artifactRequestManyFailed: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = action.payload;
    },
    artifactRequestedOne: (artifacts, action) => {
      artifacts.loading = true;
      artifacts.error = null;
    },
    artifactReceivedOne: (artifacts, action) => {
      adapter.upsertOne(artifacts, addLastFetch(action.payload));
      artifacts.loading = false;
      artifacts.error = null;
    },
    artifactRequestOneFailed: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = action.payload;
    },
    artifactCreated: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = null;
      adapter.upsertOne(artifacts, addLastFetch(action.payload));
    },
    artifactsUpdating: (artifacts, action) => {
      artifacts.loading = true;
      artifacts.error = null;
    },
    artifactsFailed: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = action.payload;
    },
    artifactUpdated: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = null;
      adapter.upsertOne(artifacts, addLastFetch(action.payload));
    },
    artifactDeleted: (artifacts, action) => {
      artifacts.loading = false;
      artifacts.error = null;
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
  artifactsUpdating,
  artifactsFailed,
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
export const selectArtifactsSlice = state => state.artifacts;

export const selectArtifactsLoading = createSelector(
  selectArtifactsSlice,
  artifacts => artifacts.loading
);
export const selectArtifactsError = createSelector(
  selectArtifactsSlice,
  artifacts => artifacts.error
);

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
      onStart: artifactsUpdating.type,
      onSuccess: artifactCreated.type,
      onFailure: artifactsFailed.type,
    })
  );
};

export const editArtifact = (id, data) => (dispatch, getState) => {
  const token = selectToken(getState());

  return dispatch(
    apiStarted({
      url: endpoints.artifactsById(id),
      method: "patch",
      data: { ...data, id },
      token,
      onStart: artifactsUpdating.type,
      onSuccess: artifactUpdated.type,
      onFailure: artifactsFailed.type,
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
      onStart: artifactsUpdating.type,
      onSuccess: artifactDeleted.type,
      onFailure: artifactsFailed.type,
    })
  );
};
