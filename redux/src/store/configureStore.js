import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import toast from "./middleware/toast";
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
      toast,
      api,
      logger,
    ],
  });
}
