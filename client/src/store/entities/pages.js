import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiStarted } from "./api";
import { cacheProps, cacheNotExpired, getId } from "../helpers";
import * as endpoints from "../endpoints";

const pagesAdapter = createEntityAdapter({ selectId: entity => entity._id });

const pageInitialState = {
  ...cacheProps,
  name: "",
  type: "",
  url: "",
  artifactIds: [],
};

const receivePage = (pages, action) => {
  const { _id: id, username, ...page } = action.payload;
  pages.allIds.push(id);
  pages.list[id] = {
    ...page,
  };
};

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "pages",
  initialState: pagesAdapter.getInitialState({
    ...cacheProps,
    currentPage: null, // id of the current page
  }),
  reducers: {
    pagesRequested: (pages, action) => {
      pages.loading = true;
    },
    pagesRequestFailed: (pages, action) => {
      pages.loading = false;
    },
    pagesReceived: (pages, action) => {
      if (pages.loading) {
        pagesAdapter.setAll(pages, action.payload);
      }
    },
    pageAdded: (pages, action) => receivePage(pages, action),
    artifactAdded: (pages, action) => {
      const { pageId, username, _id: artifactId, ...props } = action.payload;
      pages.byId[pageId].artifactIds.push(artifactId);
    },
    pageRemoved: (pages, action) => {
      const id = getId(action);
      const index = pages.allIds.findIndex(page => page.id === id);
      pages.allIds.remove(index);
      delete pages.byId[id];
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
  const { lastFetch } = getState().byId.bugs;

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

export const addPage = (token, username, page) =>
  apiStarted({
    url: endpoints.portfolioPage(username),
    method: "post",
    data: page,
    token: token,
    onSuccess: pageAdded.type,
  });

export const removePage = (token, id) =>
  apiStarted({
    url: endpoints.pagesById(id),
    method: "delete",
    token: token,
    onSuccess: pageRemoved.type,
  });

export const editPage = (token, id, body) =>
  apiStarted({
    url: endpoints.pagesById(id),
    method: "patch",
    data: { ...body },
    token: token,
    onSuccess: pageEdited.type,
  });

export const editPageName = (token, id, name) =>
  apiStarted({
    url: endpoints.pagesById(id),
    method: "patch",
    data: { name },
    token: token,
    onSuccess: pageEdited.type,
  });

// Selectors
