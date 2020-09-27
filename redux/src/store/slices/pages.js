import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";
import { cacheProps, addLastFetch, cacheNotExpired } from "../helpers";
import { actions as artifactActions } from "./artifacts";

export const adapter = createEntityAdapter();

const slice = createSlice({
  name: "page",
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
    pageRequestedMany: (pages, action) => {
      pages.loading = true;
    },
    pageReceivedMany: (pages, action) => {
      adapter.upsertMany(
        pages,
        action.payload.map(page => addLastFetch(page))
      );
      pages.loading = false;
    },
    pageRequestManyFailed: (pages, action) => {
      pages.loading = false;
      pages.error = action.payload;
    },
    pageRequestedOne: (pages, action) => {
      pages.loading = true;
    },
    pageReceivedOne: (pages, action) => {
      adapter.upsertOne(pages, addLastFetch(action.payload));
      pages.loading = false;
    },
    pageRequestOneFailed: (pages, action) => {
      pages.loading = false;
      pages.error = action.payload;
    },
    pageCreated: (pages, action) => {
      adapter.upsertOne(pages, addLastFetch(action.payload));
    },
    pageUpdated: (pages, action) => {
      adapter.upsertOne(pages, addLastFetch(action.payload));
    },
    pageDeleted: (pages, action) => {
      adapter.removeOne(pages, action.request.data.id);
    },
  },
  extraReducers: {
    [artifactActions.artifactCreated]: (pages, action) => {
      const { pageId, id } = action.payload;
      pages.entities[pageId].artifacts.push({ id });
    },
  },
});

const {
  pageRequestedMany,
  pageReceivedMany,
  pageRequestManyFailed,
  pageRequestedOne,
  pageReceivedOne,
  pageRequestOneFailed,
  pageCreated,
  pageUpdated,
  pageDeleted,
} = slice.actions;

export default slice.reducer;
export const actions = slice.actions;

// Action Creators
// load a page by id, with _all_ properties
export const fetchPage = (id, cache = true) => (dispatch, getState) => {
  const page = getState().pages.entities[id];
  if (cache && page && cacheNotExpired(page.lastFetch)) return;

  return dispatch(
    apiStarted({
      url: endpoints.pagesById(id),
      method: "get",
      onStart: pageRequestedOne.type,
      onSuccess: pageReceivedOne.type,
      onFailure: pageRequestOneFailed.type,
    })
  );
};

// create a new page
export const createPage = (page = {}) => (dispatch, getState) => {
  const token = getState().auth.token;
  const username = getState().auth.user.username;
  return dispatch(
    apiStarted({
      url: endpoints.pagesByUsername(username),
      method: "post",
      data: page,
      token,
      onSuccess: pageCreated.type,
    })
  );
};

export const changePageOptions = (id, data) => (dispatch, getState) => {
  const token = getState().auth.token;
  return dispatch(
    apiStarted({
      url: endpoints.pagesById(id),
      method: "patch",
      data,
      token,
      onSuccess: pageUpdated.type,
    })
  );
};

export const renamePage = (id, name) => changePageOptions(id, { name });

// delete a page by id
export const deletePage = id => (dispatch, getState) => {
  const token = getState().auth.token;

  return dispatch(
    apiStarted({
      url: endpoints.pagesById(id),
      method: "delete",
      data: { id },
      token,
      onSuccess: pageDeleted.type,
    })
  );
};

// Selectors
export const {
  selectById: selectPageById,
  selectIds: selectPageIds,
  selectEntities: selectPageEntities,
  selectAll: selectAllPages,
  selectTotal: selectTotalPages,
} = adapter.getSelectors(state => state.pages);

export const selectArtifactsByPageId = pageId =>
  createSelector(
    [
      state => selectPageById(state, pageId), // select the current page
      state => state.artifacts.ids.map(id => state.artifacts.entities[id]), // this is the same as selectAllArtifacts
    ],
    (page, artifacts) => {
      // return the artifacts for the given page only
      return Object.keys(artifacts)
        .map(c => artifacts[c])
        .filter(artifact => page.contents.includes(artifact.id));
    }
  );

export const selectTotalArtifactsByPageId = pageId =>
  createSelector(
    [
      state => selectPageById(state, pageId), // select the current page
      state => state.artifacts.ids.map(id => state.artifacts.entities[id]), // this is the same as selectAllArtifacts
    ],
    (page, artifacts) => {
      // return the artifacts for the given page only
      return Object.keys(artifacts)
        .map(c => artifacts[c])
        .filter(artifact => page.contents.includes(artifact.id)).length;
    }
  );
