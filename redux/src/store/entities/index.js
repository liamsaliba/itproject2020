import { combineReducers } from "redux";
import artifactsReducer from "./artifacts";
import pagesReducer from "./pages";
import portfoliosReducer from "./portfolios";

export default combineReducers({
  artifacts: artifactsReducer,
  pages: pagesReducer,
  portfolios: portfoliosReducer,
});
