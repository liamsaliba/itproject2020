const toastMiddleware = ({ dispatch }) => next => async action => {
  // allow logging of api calls to Redux Dev Tools
  const actionType = action.type.toLowerCase();
  if (!(actionType.includes("error") || actionType.includes("fail")))
    return next(action);

  const { message, data, hideErrorToast } = action.payload;

  if (hideErrorToast === true) return next(action);
  if (data === null || data === {}) {
    console.log("TOAST: ", message);
  } else {
    console.log("TOAST: ", data, `(${message}`);
  }

  next(action);
};

export default toastMiddleware;
