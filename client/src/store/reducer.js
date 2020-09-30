// top-level reducer
import { combineReducers } from "redux";
// import entitiesReducer from "./entities";
import authReducer from "./slices/auth";
import uiReducer from "./slices/ui";
import artifactsReducer from "./slices/artifacts";
import pagesReducer from "./slices/pages";
import portfoliosReducer from "./slices/portfolios";

export default combineReducers({
  // entities: entitiesReducer,
  auth: authReducer,
  ui: uiReducer,
  artifacts: artifactsReducer,
  pages: pagesReducer,
  portfolios: portfoliosReducer,
});
