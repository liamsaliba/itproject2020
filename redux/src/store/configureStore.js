import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import { createLogger } from "redux-logger";

const logger = createLogger();

export default function (testing) {
  if (testing) {
    return configureStore({
      reducer,
      middleware: [
        ...getDefaultMiddleware(), // Redux Thunk
        api,
      ],
    });
  }
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(), // Redux Thunk
      api,
      logger,
    ],
  });
}
