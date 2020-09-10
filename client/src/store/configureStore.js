import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import { createLogger } from "redux-logger";

const logger = createLogger();

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(), // Redux Thunk
      logger,
      api,
    ],
  });
}
