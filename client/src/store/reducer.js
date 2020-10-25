// top-level reducer
import { combineReducers } from "redux";
// import entitiesReducer from "./entities";
import authReducer from "./slices/auth";
import uiReducer from "./slices/ui";
import artifactsReducer from "./slices/artifacts";
import pagesReducer from "./slices/pages";
import portfoliosReducer from "./slices/portfolios";
import mediaReducer from "./slices/media";

export default combineReducers({
  // entities: entitiesReducer,
  auth: authReducer,
  ui: uiReducer,
  media: mediaReducer,
  artifacts: artifactsReducer,
  pages: pagesReducer,
  portfolios: portfoliosReducer,
});
