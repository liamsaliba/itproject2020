// top-level reducer
import { combineReducers } from "redux";
// import entitiesReducer from "./entities";
import authReducer from "./slices/auth";
import artifactsReducer from "./slices/artifacts";
import pagesReducer from "./slices/pages";
import portfoliosReducer from "./slices/portfolios";

export default combineReducers({
  // entities: entitiesReducer,
  auth: authReducer,
  artifacts: artifactsReducer,
  pages: pagesReducer,
  portfolios: portfoliosReducer,
});
