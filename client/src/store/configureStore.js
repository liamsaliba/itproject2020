import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import toast from "./middleware/toast";
import api from "./middleware/api";
import { createLogger } from "redux-logger";

const logger = createLogger();

const getMiddleware = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return [...getDefaultMiddleware(), api];
    case "production":
      return [...getDefaultMiddleware(), toast, api];
    default:
      return [...getDefaultMiddleware(), toast, api, logger];
  }
};

export default function () {
  return configureStore({
    reducer,
    middleware: getMiddleware(),
  });
}
