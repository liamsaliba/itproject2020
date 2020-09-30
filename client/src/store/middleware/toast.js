import { toast } from "react-toastify";

const toastMiddleware = ({ dispatch }) => next => async action => {
  // allow logging of api calls to Redux Dev Tools
  const actionType = action.type.toLowerCase();
  if (!(actionType.includes("error") || actionType.includes("fail")))
    return next(action);

  const { message, data, hideErrorToast } = action.payload;

  if (data === null || data === {}) {
    console.warn("TOAST: ", action);
    if (hideErrorToast === false) toast.warn(message);
  } else {
    console.warn("TOAST: ", action);
    if (hideErrorToast === false)
      toast.warn(`${JSON.stringify(data)} (${message})`);
  }

  next(action);
};

export default toastMiddleware;
