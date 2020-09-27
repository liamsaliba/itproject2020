import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";
import { cacheProps, addLastFetch, cacheNotExpired } from "../helpers";
import { actions as pageActions } from "./pages";
import { selectToken, selectUsername } from "./auth";
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
    portfolioRequestedMany: (portfolios, action) => {
      portfolios.loading = true;
    },
    portfolioReceivedMany: (portfolios, action) => {
      if (action.payload.length != 0) {
        adapter.upsertMany(portfolios, action.payload);
        // adapter.upsertMany(portfolios, action.payload.map(addCacheProps));
      }
      portfolios.loading = false;
      portfolios.lastFetch = Date.now();
    },
    portfolioRequestManyFailed: (portfolios, action) => {
      portfolios.loading = false;
      portfolios.error = action.payload;
    },
    portfolioRequestedOne: (portfolios, action) => {
      portfolios.loading = true;
    },
    portfolioReceivedOne: (portfolios, action) => {
      adapter.upsertOne(portfolios, addLastFetch(action.payload));
      portfolios.loading = false;
    },
    portfolioRequestOneFailed: (portfolios, action) => {
      portfolios.loading = false;
      portfolios.error = action.payload;
    },
    portfolioCreated: (portfolios, action) => {
      adapter.upsertOne(portfolios, addLastFetch(action.payload));
    },
    portfolioUpdated: (portfolios, action) => {
      adapter.upsertOne(portfolios, addLastFetch(action.payload));
    },
    portfolioDeleted: (portfolios, action) => {
      const username = action.request.data.username;
      adapter.removeOne(portfolios, username);
    },
    portfolioReceivedOneAll: (portfolios, action) => {},
  },
  extraReducers: {
    [pageActions.pageCreated]: (portfolios, action) => {
      const { username, id, name } = action.payload;
      portfolios.entities[username].pages.push({ id, name });
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
      portfolio.artifactsLastFetch = Date.now();
    },
    [portfolioFetchedPages]: (portfolios, action) => {
      portfolio.pagesLastFetch = Date.now();
    },
  },
});

const {
  portfolioRequestedMany,
  portfolioReceivedMany,
  portfolioRequestManyFailed,
  portfolioRequestedOne,
  portfolioReceivedOne,
  portfolioRequestOneFailed,
  portfolioCreated,
  portfolioUpdated,
  portfolioDeleted,
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

export const selectPagesByUsername = portfolioId =>
  createSelector(
    [
      state => selectPortfolioById(state, portfolioId), // select the current portfolio
      state => state.pages.ids.map(id => state.pages.entities[_id]), // this is the same as selectAllPages
    ],
    (portfolio, pages) => {
      // return the pages for the given portfolio only
      return Object.keys(pages)
        .map(c => pages[c])
        .filter(page => portfolio.pages.includes(page._id));
    }
  );

export const selectTotalPagesByUsername = portfolioId =>
  createSelector(
    [
      state => selectPortfolioById(state, portfolioId), // select the current portfolio
      state => state.pages.ids.map(id => state.pages.entities[_id]), // this is the same as selectAllPages
    ],
    (portfolio, pages) => {
      // return the pages for the given portfolio only
      return Object.keys(pages)
        .map(c => pages[c])
        .filter(page => portfolio.pages.includes(page._id)).length;
    }
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

const getOnePortfolio = (username, onSuccess) =>
  apiStarted({
    url: endpoints.portfoliosByUsername(username),
    method: "get",
    onStart: portfolioRequestedOne.type,
    onSuccess: onSuccess.type,
    onFailure: portfolioRequestOneFailed.type,
  });

// load a portfolio by username, with _all_ properties
export const fetchPortfolio = (username, cache = true) => (
  dispatch,
  getState
) => {
  const portfolio = selectPortfolioByUsername(getState(), username);
  if (cache && portfolio && cacheNotExpired(portfolio.lastFetch)) return;
  return dispatch(getOnePortfolio(username, portfolioReceivedOne));
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

  return dispatch(getOnePortfolio(username, portfolioFetchedAll));
};

// fetch all pages in portfolio by username
export const fetchPortfolioPages = (username, cache = true) => (
  dispatch,
  getState
) => {
  const portfolio = selectPortfolioByUsername(getState(), username);
  if (cache && portfolio && cacheNotExpired(portfolio.pagesLastFetch)) return;

  return dispatch(getOnePortfolio(username, portfolioFetchedPages));
};

// fetch all artifacts in portfolio by username
export const fetchPortfolioArtifacts = (username, cache = true) => (
  dispatch,
  getState
) => {
  const portfolio = selectPortfolioByUsername(getState(), username);
  if (cache && portfolio && cacheNotExpired(portfolio.artifactsLastFetch))
    return;

  return dispatch(getOnePortfolio(username, portfolioFetchedArtifacts));
};

// create portfolio with theme, bio
export const createPortfolio = (portfolio = {}) => (dispatch, getState) => {
  const token = selectToken(getState());

  return dispatch(
    apiStarted({
      url: endpoints.portfolios,
      method: "post",
      data: portfolio,
      token,
      onSuccess: portfolioCreated.type,
    })
  );
};

const changePortfolioOptions = data => (dispatch, getState) => {
  const token = selectToken(getState());
  const username = selectUsername(getState());
  return dispatch(
    apiStarted({
      url: endpoints.portfoliosByUsername(username),
      method: "patch",
      data,
      token,
      onSuccess: portfolioUpdated.type,
    })
  );
};

export const changePortfolioTheme = theme => changePortfolioOptions({ theme });
export const changePortfolioBio = bio => changePortfolioOptions({ bio });

// create portfolio with theme, bio
export const deletePortfolio = (username, password) =>
  apiStarted({
    url: endpoints.portfoliosByUsername(username),
    method: "delete",
    data: { username, password },
    onSuccess: portfolioDeleted.type,
  });
