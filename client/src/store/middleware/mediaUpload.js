import axios from "axios";
import * as endpoints from "../endpoints";
import { actions as mediaActions } from "../slices/media";

export const uploadMedia = dispatch => async (
  token,
  file,
  description,
  type = "image"
) => {
  const method = "push";
  const url = endpoints.media;
  const data = {
    image: file,
    json: { description, type },
  };

  dispatch({ type: mediaActions.mediaLoading.type });

  axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL ||
    // || "http://localhost:5000/api";
    "https://camelcase-itproject.herokuapp.com/api";

  axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const request = {
    url,
    method,
    data,
    token,
  };

  // make api call
  try {
    const response = await axios.request({
      url,
      method,
      data,
    });

    // Specific action
    dispatch({
      type: mediaActions.mediaUploaded,
      payload: response.data,
      request,
    });
  } catch (error) {
    // General error action
    const returnedError = {
      message: error.message,
      data: error.response ? error.response.data : null,
      hideErrorToast: false,
      request,
    };

    dispatch({
      type: mediaActions.mediaUploadFailed.type,
      payload: returnedError,
    });
  }
};
