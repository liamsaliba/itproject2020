export const cacheNotExpired = lastFetch => {
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};

export const cacheProps = {
  loading: false, // loading indicator for UI
  lastFetch: null, // timestamp of last time fetched from the server (cache)
};

export const getId = action => action.payload._id;

// Endpoints
