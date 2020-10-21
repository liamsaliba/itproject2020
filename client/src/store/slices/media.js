import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";
import { actions as artifactActions } from "./artifacts";

import {
  cacheProps,
  addLastFetch,
  cacheNotExpired,
  upsertManyFetch,
} from "../helpers";
import { selectToken } from "./auth";

import { portfolioFetchedAll, pageFetchedAll, avatarUploaded } from "./actions";

export const adapter = createEntityAdapter();

const receiveMany = selector => upsertManyFetch(adapter, selector);

const selectMediaFromArtifact = artifact => (artifact ? artifact.media : []);

const slice = createSlice({
  name: "media",
  initialState: adapter.getInitialState(cacheProps),
  reducers: {
    mediaLoading: (media, action) => {
      media.loading = true;
    },
    mediaRequestedMany: (media, action) => {
      media.loading = true;
    },
    mediaReceivedMany: (media, action) => {
      adapter.upsertMany(
        media,
        action.payload.map(media => addLastFetch(media))
      );
      media.lastFetch = Date.now();
      media.loading = false;
    },
    mediaRequestManyFailed: (media, action) => {
      media.loading = false;
      media.error = action.payload;
    },
    mediaRequestedOne: (media, action) => {
      media.loading = true;
    },
    mediaReceivedOne: (media, action) => {
      adapter.upsertOne(media, addLastFetch(action.payload));
      media.loading = false;
    },
    mediaRequestOneFailed: (media, action) => {
      media.loading = false;
      media.error = action.payload;
    },
    mediaUploadFailed: (media, action) => {
      media.loading = false;
      media.error = action.payload;
    },
    mediaUploaded: (media, action) => {
      media.loading = false;
      adapter.upsertOne(media, addLastFetch(action.payload));
    },
    avatarUploaded: (media, action) => {
      media.loading = false;
      adapter.upsertOne(media, addLastFetch(action.payload));
    },
    mediaDeleted: (media, action) => {
      adapter.removeOne(media, action.request.data.id);
    },
  },
  extraReducers: {
    [portfolioFetchedAll]: receiveMany(p =>
      p.artifacts.map(selectMediaFromArtifact)
    ),
    [pageFetchedAll]: receiveMany(p =>
      p.artifacts.map(selectMediaFromArtifact)
    ),
    [artifactActions.artifactCreated]: (pages, action) => {
      const { pageId, id } = action.payload;
      if (!pages.entities[pageId] || !pages.entities[pageId].pages) {
        adapter.upsertOne(pages, {
          id: pageId,
          artifacts: [{ id }],
        });
      } else {
        pages.entities[pageId].artifacts.push({ id });
      }
    },
  },
});

// Actions
export const {
  mediaLoading,
  mediaRequestedOne,
  mediaReceivedOne,
  mediaRequestOneFailed,
  mediaReceivedMany,
  mediaRequestedMany,
  mediaRequestManyFailed,
  mediaUploaded,
  mediaDeleted,
  mediaUploadFailed,
} = slice.actions;
export const actions = slice.actions;

// Reducer
export default slice.reducer;

// Selectors
export const {
  selectById: selectMediaById,
  selectIds: selectMediaIds,
  selectEntities: selectMediaEntities,
  selectAll: selectAllMedia,
  selectTotal: selectTotalMedia,
} = adapter.getSelectors(state => state.media);
export const selectMediaSlice = state => state.media;

// create a new artifact
export const uploadMedia = (file, description, filename, type = "image") => (
  dispatch,
  getState
) => {
  const token = selectToken(getState());
  let formData = new FormData();
  formData.append("image", file);
  formData.append(
    "json",
    JSON.stringify({ description, type, filename: file.name ? file.name : "" })
  );
  // const media = {
  //   image: file,
  //   json: { description, type },
  // };
  return dispatch(
    apiStarted({
      url: endpoints.media,
      method: "post",
      multipart: true,
      data: formData,
      token,
      onStart: mediaLoading.type,
      onFailure: mediaUploadFailed.type,
      onSuccess: mediaUploaded.type,
    })
  );
};

// upload an avatar
export const uploadAvatar = file => (dispatch, getState) => {
  const token = selectToken(getState());
  let formData = new FormData();
  formData.append("image", file);
  formData.append("json", JSON.stringify({}));
  // const media = {
  //   image: file,
  //   json: { description, type },
  // };
  console.log(formData);
  return dispatch(
    apiStarted({
      url: endpoints.avatar,
      method: "post",
      multipart: true,
      data: formData,
      token,
      onStart: mediaLoading.type,
      onFailure: mediaUploadFailed.type,
      onSuccess: avatarUploaded.type,
    })
  );
};

// delete a artifact by id
export const getMedia = () => (dispatch, getState, cache = true) => {
  const token = selectToken(getState());
  const media = selectMediaSlice(getState());

  if (media && (cacheNotExpired(media.lastFetch) || media.loading)) return;

  return dispatch(
    apiStarted({
      url: endpoints.media,
      method: "get",
      token,
      onStart: mediaRequestedMany.type,
      onFailure: mediaRequestManyFailed.type,
      onSuccess: mediaReceivedMany.type,
    })
  );
};

// delete a artifact by id
export const deleteMedia = id => (dispatch, getState) => {
  const token = selectToken(getState());

  return dispatch(
    apiStarted({
      url: endpoints.mediaById(id),
      method: "delete",
      data: { id },
      token,
      onSuccess: mediaDeleted.type,
    })
  );
};
