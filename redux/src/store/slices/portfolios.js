import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiStarted } from "../api";
import * as endpoints from "../endpoints";
import { cacheProps, addLastFetch, cacheNotExpired } from "../helpers";
import { actions as pageActions } from "./pages";

export const adapter = createEntityAdapter({
  selectId: portfolio => portfolio.username,
});

const slice = createSlice({
  name: "portfolios",
  initialState: adapter.getInitialState(cacheProps),
  reducers: {
    portfolioRequestedAll: (portfolios, action) => {
      portfolios.loading = true;
    },
    portfolioReceivedAll: (portfolios, action) => {
      if (action.payload.length != 0) {
        adapter.upsertMany(portfolios, action.payload);
        // adapter.upsertMany(portfolios, action.payload.map(addCacheProps));
      }
      portfolios.loading = false;
      portfolios.lastFetch = Date.now();
    },
    portfolioRequestAllFailed: (portfolios, action) => {
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
  },
  extraReducers: {
    [pageActions.pageCreated]: (portfolios, action) => {
      const { username, _id: pageId, name } = action.payload;
      portfolios.entities[username].contents.push({ pageId, name });
    },
  },
});

const {
  portfolioRequestedAll,
  portfolioReceivedAll,
  portfolioRequestAllFailed,
  portfolioRequestedOne,
  portfolioReceivedOne,
  portfolioRequestOneFailed,
  portfolioCreated,
  portfolioUpdated,
  portfolioDeleted,
} = slice.actions;

export default slice.reducer;
export const actions = slice.actions;

// Action Creators

// load a list-level representation of all portfolios
export const fetchPortfolios = () => (dispatch, getState) => {
  const { lastFetch } = getState().portfolios;

  if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiStarted({
      url: endpoints.portfolios,
      method: "get",
      onStart: portfolioRequestedAll.type,
      onSuccess: portfolioReceivedAll.type,
      onFailure: portfolioRequestAllFailed.type,
      hideErrorToast: true,
    })
  );
};

// load a portfolio by username, with _all_ properties
export const fetchPortfolio = (username, cache = true) => (
  dispatch,
  getState
) => {
  const portfolio = getState().portfolios.entities[username];
  if (cache && portfolio && cacheNotExpired(portfolio.lastFetch)) return;

  return dispatch(
    apiStarted({
      url: endpoints.portfoliosByUsername(username),
      method: "get",
      onStart: portfolioRequestedOne.type,
      onSuccess: portfolioReceivedOne.type,
      onFailure: portfolioRequestOneFailed.type,
    })
  );
};

// create portfolio with theme, bio
export const createPortfolio = portfolio => (dispatch, getState) => {
  const token = getState().auth.token;
  portfolio = portfolio === undefined ? {} : portfolio;
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

export const changePortfolioOptions = data => (dispatch, getState) => {
  const token = getState().auth.token;
  const username = getState().auth.user.username;
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

export const changePortfolioTheme = theme => (dispatch, getState) => {
  const token = getState().auth.token;
  const username = getState().auth.user.username;
  return dispatch(
    apiStarted({
      url: endpoints.portfoliosByUsername(username),
      method: "patch",
      data: {
        theme,
      },
      token,
      onSuccess: portfolioUpdated.type,
    })
  );
};

// create portfolio with theme, bio
export const deletePortfolio = (username, password) =>
  apiStarted({
    url: endpoints.portfoliosByUsername(username),
    method: "delete",
    data: { username, password },
    onSuccess: portfolioDeleted.type,
  });

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
