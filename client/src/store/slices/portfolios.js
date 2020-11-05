import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";
import { cacheProps, addLastFetch, cacheNotExpired } from "../helpers";
import { actions as pageActions } from "./pages";
import { selectToken, selectUsername, actions as authActions } from "./auth";
import {
  portfolioFetchedAll,
  portfolioFetchedPages,
  portfolioFetchedArtifacts,
} from "./actions";

export const adapter = createEntityAdapter({
  selectId: portfolio => portfolio.username,
});

const slice = createSlice({
  name: "portfolios",
  initialState: adapter.getInitialState(cacheProps),
  reducers: {
    portfolioEditingStart: (portfolios, action) => {
      const { username } = action.payload;
      portfolios.error = null;
      adapter.upsertOne(portfolios, { username, editing: true });
    },
    portfolioEditingFinish: (portfolios, action) => {
      const { username } = action.payload;
      portfolios.error = null;
      adapter.upsertOne(portfolios, { username, editing: false });
    },
    portfolioRequestedMany: (portfolios, action) => {
      portfolios.loading = true;
      portfolios.error = null;
    },
    portfolioReceivedMany: (portfolios, action) => {
      if (action.payload.length !== 0) {
        adapter.upsertMany(portfolios, action.payload);
        // adapter.upsertMany(portfolios, action.payload.map(addCacheProps));
      }
      portfolios.loading = false;
      portfolios.error = null;
      portfolios.lastFetch = Date.now();
    },
    portfolioRequestManyFailed: (portfolios, action) => {
      portfolios.loading = false;
      portfolios.error = action.payload;
    },
    portfolioRequestedOne: (portfolios, action) => {
      portfolios.loading = true;
      portfolios.error = null;
    },
    portfolioReceivedOne: (portfolios, action) => {
      adapter.upsertOne(portfolios, addLastFetch(action.payload));
      portfolios.loading = false;
      portfolios.error = null;
    },
    portfolioRequestOneFailed: (portfolios, action) => {
      portfolios.loading = false;
      portfolios.error = action.payload;
    },
    portfolioCreated: (portfolios, action) => {
      // adapter.upsertOne(portfolios, addLastFetch(action.payload));
      adapter.upsertOne(portfolios, action.payload);
      portfolios.error = null;
      portfolios.loading = false;
    },
    portfolioUpdateRequested: (portfolios, action) => {
      const { username, loading } = action.request;
      if (portfolios.entities[username]) {
        portfolios.entities[username] = {
          ...portfolios.entities[username],
          ...action.payload,
          before: { ...portfolios.entities[username] },
        };
      }
      portfolios.loading = loading === undefined ? true : loading;
      portfolios.error = null;
    },
    portfolioFailed: (portfolios, action) => {
      const username = action.request.username;
      if (portfolios.entities[username]) {
        portfolios.entities[username] = {
          ...portfolios.entities[username],
          ...portfolios.entities[username].before,
          before: undefined,
        };
      }
      portfolios.loading = false;
      portfolios.error = action.payload;
    },
    portfolioUpdated: (portfolios, action) => {
      adapter.upsertOne(portfolios, addLastFetch(action.payload));
      portfolios.error = null;
      portfolios.loading = false;
    },
    portfolioDeleted: (portfolios, action) => {
      const username = action.request.data.username;
      adapter.removeOne(portfolios, username);
      portfolios.error = null;
    },
    portfolioReceivedOneAll: (portfolios, action) => {},
  },
  extraReducers: {
    [authActions.userDeleted]: (portfolios, action) => {
      const { username } = action.request.username;
      adapter.removeOne(portfolios, username);
    },
    [authActions.userUpdated]: (portfolios, action) => {
      const {
        firstName,
        lastName,
        avatar,
        allowContact,
        username,
      } = action.payload;

      adapter.upsertOne(portfolios, {
        username,
        firstName,
        lastName,
        avatar,
        allowContact,
      });
    },
    [pageActions.pageCreated]: (portfolios, action) => {
      const { username, id: pageId, name } = action.payload;
      const newPage = { pageId, name };
      if (
        !portfolios.entities[username] ||
        !portfolios.entities[username].pages
      ) {
        adapter.upsertOne(portfolios, {
          username,
          pages: [newPage],
        });
      } else {
        portfolios.entities[username].pages.push(newPage);
      }
    },
    [pageActions.pageUpdated]: (portfolios, action) => {
      const { username, id: pageId, name } = action.payload;
      const newPage = { pageId, name };
      if (
        !portfolios.entities[username] ||
        !portfolios.entities[username].pages
      ) {
        adapter.upsertOne(portfolios, {
          username,
          pages: [newPage],
        });
      } else {
        // update the name
        for (let i = 0; i < portfolios.entities[username].pages.length; i++) {
          if (portfolios.entities[username].pages[i].pageId === pageId) {
            portfolios.entities[username].pages[i] = {
              ...portfolios.entities[username].pages[i],
              name,
            };
          }
        }
      }
    },
    [pageActions.pageDeleted]: (portfolios, action) => {
      const pageId = action.request.id;
      const username = action.request.username;
      if (
        !portfolios.entities[username] ||
        !portfolios.entities[username].pages
      ) {
        adapter.upsertOne(portfolios, {
          username,
          pages: [],
        });
      } else {
        portfolios.entities[username].pages = portfolios.entities[
          username
        ].pages.filter(page => page.pageId !== pageId);
      }
    },
    [portfolioFetchedAll]: (portfolios, action) => {
      const { portfolio } = action.payload;
      portfolio.lastFetch = Date.now();
      portfolio.pagesLastFetch = Date.now();
      portfolio.artifactsLastFetch = Date.now();
      adapter.upsertOne(portfolios, portfolio);
      portfolios.loading = false;
    },
    [portfolioFetchedArtifacts]: (portfolios, action) => {
      const { username } = action.request.data;
      const portfolio = {
        username,
        artifactsLastFetch: Date.now(),
      };
      adapter.upsertOne(portfolios, portfolio);
    },
    [portfolioFetchedPages]: (portfolios, action) => {
      const { username } = action.request.data;
      const portfolio = {
        username,
        pagesLastFetch: Date.now(),
      };
      adapter.upsertOne(portfolios, portfolio);
    },
  },
});

const {
  portfolioEditingStart,
  portfolioEditingFinish,
  portfolioRequestedMany,
  portfolioReceivedMany,
  portfolioRequestManyFailed,
  portfolioRequestedOne,
  portfolioReceivedOne,
  portfolioRequestOneFailed,
  portfolioCreated,
  portfolioUpdateRequested,
  portfolioUpdated,
  portfolioDeleted,
  portfolioFailed,
} = slice.actions;

export default slice.reducer;
export const actions = slice.actions;

// Selectors
export const {
  selectById: selectPortfolioByUsername,
  selectIds: selectPortfolioUsernames,
  selectEntities: selectPortfolioEntities,
  selectAll: selectAllPortfolios,
  selectTotal: selectTotalPortfolios,
} = adapter.getSelectors(state => state.portfolios);

export const selectCurrentUserPortfolio = createSelector(
  [selectPortfolioEntities, selectUsername],
  (portfolios, username) => (username ? portfolios[username] : undefined)
);

export const selectPortfolioTheme = createSelector(
  selectPortfolioByUsername,
  portfolio =>
    portfolio
      ? {
          base: portfolio.theme || "default",
          fonts: portfolio.font || {},
          colours: portfolio.colour || {},
        }
      : undefined
);
export const selectPortfolioBio = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.bio || "" : undefined)
);

export const selectFullName = createSelector(
  selectPortfolioByUsername,
  portfolio =>
    portfolio && portfolio.firstName
      ? [portfolio.firstName || "", portfolio.lastName || ""].join(" ")
      : undefined
);

export const selectPortfolioAvatar = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio !== undefined ? portfolio.avatar : undefined)
);

export const selectPortfolioPages = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.pages || [] : undefined)
);

export const selectSocialIcons = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.social || [] : undefined)
);

export const selectPortfolioPageIds = createSelector(
  selectPortfolioPages,
  pages => (pages ? pages.map(page => page.pageId) || [] : undefined)
);

export const selectPortfolioPageNames = createSelector(
  selectPortfolioPages,
  pages => (pages ? pages.map(page => page.name) || [] : undefined)
);

export const selectPortfolioIsEditing = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.editing || false : false)
);

export const selectPortfolioIsLoading = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.loading : false)
);

export const selectPortfoliosSlice = state => state.portfolios;

export const selectPortfoliosLoading = createSelector(
  selectPortfoliosSlice,
  portfolios => (portfolios ? portfolios.loading : false)
);

// Action Creators

// load a list-level representation of all portfolios
export const fetchPortfolios = () => (dispatch, getState) => {
  const { lastFetch } = getState().portfolios;

  if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiStarted({
      url: endpoints.portfolios,
      method: "get",
      onStart: portfolioRequestedMany.type,
      onSuccess: portfolioReceivedMany.type,
      onFailure: portfolioRequestManyFailed.type,
      hideErrorToast: true,
    })
  );
};

// load a portfolio by username, with _all_ properties
export const fetchPortfolio = (username = null, cache = true) => (
  dispatch,
  getState
) => {
  if (username === null) {
    username = selectUsername(getState());
  }
  const portfolio = selectPortfolioByUsername(getState(), username);
  if (cache && portfolio && cacheNotExpired(portfolio.lastFetch)) return;
  return dispatch(
    apiStarted({
      url: endpoints.portfoliosByUsername(username),
      onStart: portfolioRequestedOne.type,
      onSuccess: portfolioReceivedOne.type,
      onFailure: portfolioRequestOneFailed.type,
      hideErrorToast: true,
    })
  );
};

// fetch entire portfolio by username, including pages and artifacts
export const fetchEntirePortfolio = (username, cache = true) => (
  dispatch,
  getState
) => {
  const portfolio = selectPortfolioByUsername(getState(), username);
  if (
    cache &&
    portfolio &&
    cacheNotExpired(portfolio.lastFetch) &&
    cacheNotExpired(portfolio.pagesLastFetch) &&
    cacheNotExpired(portfolio.artifactsLastFetch)
  )
    return;

  return dispatch(
    apiStarted({
      url: endpoints.fullPortfolioByUsername(username),
      onStart: portfolioRequestedOne.type,
      onSuccess: portfolioFetchedAll.type,
      onFailure: portfolioRequestOneFailed.type,
      hideErrorToast: true,
    })
  );
};

// fetch all pages in portfolio by username
export const fetchPortfolioPages = (username, cache = true) => (
  dispatch,
  getState
) => {
  const portfolio = selectPortfolioByUsername(getState(), username);
  if (cache && portfolio && cacheNotExpired(portfolio.pagesLastFetch)) return;

  return dispatch(
    apiStarted({
      url: endpoints.pagesByUsername(username),
      data: { username },
      onStart: portfolioRequestedOne.type,
      onSuccess: portfolioFetchedPages.type,
      onFailure: portfolioRequestOneFailed.type,
      hideErrorToast: true,
    })
  );
};

// fetch all artifacts in portfolio by username
export const fetchPortfolioArtifacts = (username, cache = true) => (
  dispatch,
  getState
) => {
  const portfolio = selectPortfolioByUsername(getState(), username);
  if (cache && portfolio && cacheNotExpired(portfolio.artifactsLastFetch))
    return;

  return dispatch(
    apiStarted({
      url: endpoints.artifactsByUsername(username),
      data: { username },
      onStart: portfolioRequestedOne.type,
      onSuccess: portfolioFetchedArtifacts.type,
      onFailure: portfolioRequestOneFailed.type,
      hideErrorToast: true,
    })
  );
};

// create portfolio with theme, bio
export const createPortfolio = (portfolio = {}) => (dispatch, getState) => {
  const token = selectToken(getState());

  return dispatch(
    apiStarted({
      url: endpoints.createPortfolio,
      method: "post",
      data: portfolio,
      token,
      onSuccess: portfolioCreated.type,
    })
  );
};

const changePortfolioOptions = (data, loading) => (dispatch, getState) => {
  const token = selectToken(getState());
  const username = selectUsername(getState());
  return dispatch(
    apiStarted({
      url: endpoints.portfoliosByUsername(username),
      method: "patch",
      data: { ...data },
      req: { loading, username },
      token,
      loading: false,
      onStart: portfolioUpdateRequested.type,
      onFailure: portfolioFailed.type,
      onSuccess: portfolioUpdated.type,
    })
  );
};

export const changePortfolioTheme = theme => changePortfolioOptions({ theme });
export const changePortfolioBio = bio => changePortfolioOptions({ bio });
export const updateSocials = social =>
  changePortfolioOptions({ social }, false);

export const updateSinglePage = singlePage =>
  changePortfolioOptions({ singlePage });

// create portfolio with theme, bio
export const deletePortfolio = (username, password) =>
  apiStarted({
    url: endpoints.portfoliosByUsername(username),
    method: "delete",
    data: { username, password },
    onSuccess: portfolioDeleted.type,
  });

export const startEditing = () => (dispatch, getState) => {
  const username = selectUsername(getState());
  if (username === undefined) return;
  return dispatch(portfolioEditingStart({ username }));
};

export const finishEditing = () => (dispatch, getState) => {
  const username = selectUsername(getState());
  if (username === undefined) return;
  return dispatch(portfolioEditingFinish({ username }));
};
