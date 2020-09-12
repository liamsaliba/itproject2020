import { createSlice } from "@reduxjs/toolkit";
import { apiStarted } from "./api";
import { cacheProps, cacheNotExpired, getId } from "../helpers";
import * as endpoints from "../endpoints";

const pageInitialState = {
  ...cacheProps,
  name: "",
  type: "",
  url: "",
  artifactIds: [],
};

const receivePage = (pages, action) => {
  const { _id: pageId, name, type, artifactIds } = action.payload;
  pages.list[pageId] = {
    name,
    type,
    artifactIds,
  };
};

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "pages",
  initialState: {
    byId: {}, // array of pages
    allIds: [], // array of page ids
    ...cacheProps,
    currentPage: null, // id of the current page
  },
  reducers: {
    pageRequested: (pages, action) => {
      pages.list[getId(action)] = { ...pageInitialState };
    },
    pageRequestFailed: (pages, action) => {
      pages.list[getId(action)].loading = false;
    },
    pageReceived: (pages, action) => receivePage(pages, action),
    pageAdded: (pages, action) => {
      pages.ids.push(getId(action));
      // TODO: Reorder pages
    },
    // artifactAddedToPage: (pages, action) => {
    //   const pageId = getId(action);

    //   const index = pages.list.findIndex(
    //     artifact => artifact.id === action.payload.id
    //   );
    //   pages.list[index] = action.payload.newArtifact;
    // },
    pageRemoved: (pages, action) => {
      const id = getId(action);
      const index = pages.ids.findIndex(page => page.id === id);
      pages.ids.remove(index);
      delete pages.list[id];
    },
  },
});

// Combined Reducer (pagesReducer)

export default slice.reducer;
const {
  pagesRequested,
  pagesRequestFailed,
  pagesReceived,
  artifactAdded,
  artifactEdited,
  artifactRemoved,
} = slice.actions;

// Action Creators

export const loadPages = username => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: endpoints.pagesById(username),
      onStart: pagesRequested.type,
      onSuccess: pagesReceived.type,
      onError: pagesRequestFailed.type,
    })
  );
};

export const addPage = (token, page) =>
  apiStarted({
    url: endpoints.pagesById(username),
    method: "post",
    data: artifact,
    token: token,
    onSuccess: artifactAdded.type,
  });

export const removeArtifact = (token, id) =>
  apiStarted({
    url: endpoints.pagesById(id),
    method: "delete",
    token: token,
    onSuccess: artifactRemoved.type,
  });

export const editArtifact = (token, id, body) =>
  apiStarted({
    url: endpoints.pagesById(id),
    method: "patch",
    data: { body },
    token: token,
    onSuccess: artifactEdited.type,
  });

// Selectors
