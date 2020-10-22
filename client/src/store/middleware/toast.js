import { toast } from "react-toastify";

const toastMiddleware = ({ dispatch }) => next => async action => {
  // allow logging of api calls to Redux Dev Tools
  const actionType = action.type.toLowerCase();
  if (!(actionType.includes("error") || actionType.includes("fail")))
    return next(action);

  const { message, data, hideErrorToast } = action.payload;

  let msg = message;
  if (data === null || data === {}) {
    msg = `${JSON.stringify(data)} (${message})`;
  }
  console.warn("TOAST: ", action);
  if (hideErrorToast === false) toast.warn(msg);
  else if (process.env.NODE_ENV === "development") toast.info(msg);
  next(action);
};

export default toastMiddleware;
