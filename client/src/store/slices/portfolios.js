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
    portfolioEditingStart: (portfolios, action) => {
      const { username } = action.payload;
      adapter.upsertOne(portfolios, { username, editing: true });
    },
    portfolioEditingFinish: (portfolios, action) => {
      const { username } = action.payload;
      adapter.upsertOne(portfolios, { username, editing: false });
    },
    portfolioRequestedMany: (portfolios, action) => {
      portfolios.loading = true;
    },
    portfolioReceivedMany: (portfolios, action) => {
      if (action.payload.length !== 0) {
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
      const newPage = { id, name };
      if (!portfolios.entities[username]) {
        adapter.upsertOne({
          username,
          pages: [newPage],
        });
      }
      portfolios.entities[username].pages.push(newPage);
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

export const selectCurrentUserPortfolio = createSelector(
  [selectPortfolioEntities, selectUsername],
  (portfolios, username) => (username ? portfolios[username] : undefined)
);

export const selectPortfolioTheme = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.theme || "default" : undefined)
);
export const selectPortfolioBio = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.bio || "" : undefined)
);

export const selectPortfolioEditing = createSelector(
  selectPortfolioByUsername,
  portfolio => (portfolio ? portfolio.editing || false : undefined)
);

export const selectPortfoliosSlice = state => state.portfolios;

export const selectPagesByUsername = username =>
  createSelector(
    [
      state => selectPortfolioByUsername(state, username), // select the current portfolio
      state => state.pages.ids.map(id => state.pages.entities[id]), // this is the same as selectAllPages
    ],
    (portfolio, pages) => {
      // return the pages for the given portfolio only
      return Object.keys(pages)
        .map(c => pages[c])
        .filter(page => portfolio.pages.includes(page.id));
    }
  );

export const selectTotalPagesByUsername = username =>
  createSelector(
    [
      state => selectPortfolioByUsername(state, username), // select the current portfolio
      state => state.pages.ids.map(id => state.pages.entities[id]), // this is the same as selectAllPages
    ],
    (portfolio, pages) => {
      // return the pages for the given portfolio only
      return Object.keys(pages)
        .map(c => pages[c])
        .filter(page => portfolio.pages.includes(page.id)).length;
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
    })
  );
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
