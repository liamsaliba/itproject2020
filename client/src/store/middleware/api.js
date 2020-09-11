import axios from "axios";
import * as actions from "../api";

// Inspired by https://github.com/ohansemmanuel/fake-medium/

const apiMiddleware = ({ dispatch }) => next => async action => {
  // allow logging of api calls to Redux Dev Tools
  if (action.type !== actions.apiStarted.type) return next(action);

  const {
    url,
    method,
    data,
    token,
    onStart,
    onSuccess,
    onFailure,
    headers,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);

  axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL ||
    "https://camelcase-itproject.herokuapp.com/api";

  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // make api call
  try {
    const response = await axios.request({
      url,
      method,
      [dataOrParams]: data,
      headers,
    });

    // General success action
    dispatch(actions.apiEnded(response.data));

    // Specific action
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    console.error(error.toJSON());
    // General error action
    dispatch(actions.apiErrored(error.message));
    // Specific
    if (onFailure) dispatch({ type: onFailure, payload: error.message });

    if (error.response && error.response.status === 403) {
      dispatch(actions.accessDenied(window.location.pathname));
    }
  }
};

export default apiMiddleware;
