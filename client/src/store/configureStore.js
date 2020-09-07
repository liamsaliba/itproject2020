import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import logger from "redux-logger";

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
