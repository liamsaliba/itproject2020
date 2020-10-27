import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import toast from "./middleware/toast";
import api from "./middleware/api";
import { createLogger } from "redux-logger";

const logger = createLogger();

const getMiddleware = () => {
  const getDefault = () => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["api/apiStarted", "api/apiErrored", "api/apiEnded"],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        // ignoredPaths: ['items.dates']
      },
    });
  };

  switch (process.env.NODE_ENV) {
    case "test":
      return [...getDefault(), api];
    case "production":
      return [...getDefault(), toast, api];
    case "development":
    default:
      return [...getDefault(), toast, api, logger];
  }
};

export default function (preloadedState = undefined) {
  return configureStore({
    reducer,
    middleware: getMiddleware(),
    preloadedState,
  });
}
