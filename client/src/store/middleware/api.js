import axios from "axios";
import * as actions from "../api";

const apiBaseUrl = "/api/";

const authHeader = () => {
  // From: https://jasonwatmore.com/post/2017/12/07/react-redux-jwt-authentication-tutorial-example
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    baseURL,
    method,
    data,
    headers,
    onStart,
    onSuccess,
    onError,
  } = action.payload;

  baseURL = baseURL ?? apiBaseUrl;
  if (baseURL === apiBaseUrl) {
    headers = authHeader();
    console.log(headers);
  }

  if (onStart) dispatch({ type: onStart });

  // allow logging of api calls to Redux Dev Tools
  next(action);

  // make api call
  try {
    const response = await axios.request({
      baseURL,
      url,
      method,
      data,
      headers,
    });
    // General success action
    dispatch(actions.apiCallSuccess(response.data));
    // Specific action
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General error action
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
