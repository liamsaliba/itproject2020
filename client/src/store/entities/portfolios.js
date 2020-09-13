import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiStarted } from "./api";
import { cacheProps, cacheNotExpired } from "../helpers";
import * as endpoints from "../endpoints";

const portfolioInitialState = {
  pages: [], //
  bio: "",
  profile: "",
};

// export const portfoliosAdapter = createEntityAdapter({...cacheProps});

// const getPortfolios =

const receivePortfolio = (portfolios, action) => {
  const { theme, username, bio, contents: pages } = action.payload;
  portfolios.byId[username] = {
    loading: false,
    lastFetch: Date.now(),
    theme,
    bio,
    pages,
  };
};

// Slices   (Actions and Reducers)
const slice = createSlice({
  name: "portfolios",
  initialState: {
    ...cacheProps,
    byId: {},
  },
  reducers: {
    portfoliosRequested: (portfolios, action) => {
      portfolios.loading = true;
    },
    portfoliosRequestFailed: (portfolios, action) => {
      portfolios.loading = false;
    },
    portfoliosReceived: (portfolios, action) => {
      portfolios.allIds = action.payload;
      portfolios.loading = false;
      portfolios.lastFetch = Date.now();
    },
    portfolioCreated: (portfolios, action) => {
      portfolios.allIds.push(action.payload.username);
      receivePortfolio(portfolios, action);
    },
    portfolioRequested: (portfolios, action) => {
      const username = action.payload.username;
      portfolios.byId[username] = { ...portfolioInitialState };
    },
    portfolioRequestFailed: (portfolios, action) => {
      const username = action.payload.username;
      delete portfolios.byId[username];
    },
    portfolioReceived: (portfolios, action) =>
      receivePortfolio(portfolios, action),
    portfolioThemeChanged: (portfolios, action) => {
      const { username, theme } = action.payload;
      portfolios.byId[username].theme = theme;
    },
    portfolioBioChanged: (portfolios, action) => {
      const { username, bio } = action.payload;
      portfolios.byId[username].bio = bio;
    },
  },
});

// Combined Reducer (portfoliosReducer)

export default slice.reducer;
const {
  portfoliosRequested,
  portfoliosRequestFailed,
  portfoliosReceived,
  portfolioCreated,
  portfolioRequested,
  portfolioRequestFailed,
  portfolioReceived,
  portfolioThemeChanged,
  portfolioBioChanged,
} = slice.actions;

// Action Creators

// load a list-level representation of all portfolios
export const loadPortfolios = () => (dispatch, getState) => {
  const { lastFetch } = getState().byId.bugs;

  if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: endpoints.portfolios,
      onStart: portfoliosRequested.type,
      onSuccess: portfoliosReceived.type,
      onError: portfoliosRequestFailed.type,
    })
  );
};

// load a portfolio by username, with _all_ properties
export const loadPortfolio = username => (dispatch, getState) => {
  const { lastFetch } = getState().byId.bugs;

  if (cacheNotExpired(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: endpoints.portfoliosByUsername,
      onStart: portfolioRequested.type,
      onSuccess: portfolioReceived.type,
      onError: portfolioRequestFailed.type,
    })
  );
};

// create portfolio with theme, bio
export const createPortfolio = (token, portfolio) =>
  apiStarted({
    url: endpoints.portfolios,
    method: "post",
    data: portfolio,
    token: token,
    onSuccess: portfolioCreated.type,
  });

// update the theme on the portfolio
export const changePortfolioTheme = (token, username, theme) =>
  apiStarted({
    url: endpoints.portfoliosByUsername(username),
    method: "patch",
    data: { theme },
    token: token,
    onSuccess: portfolioThemeChanged.type,
  });

// create portfolio with theme, bio
export const changePortfolioBio = (token, username, bio) =>
  apiStarted({
    url: endpoints.portfoliosByUsername(username),
    method: "patch",
    data: { bio },
    token: token,
    onSuccess: portfolioBioChanged.type,
  });
