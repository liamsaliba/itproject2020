import { combineReducers } from "redux";
import artifactsReducer from "./artifacts";

export default combineReducers({ artifacts: artifactsReducer });
