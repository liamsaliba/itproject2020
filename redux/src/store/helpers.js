import moment from "moment";

export const cacheNotExpired = lastFetch => {
  if (lastFetch === undefined) return false;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};

export const cacheProps = {
  loading: false, // loading indicator for UI
  lastFetch: null, // timestamp of last time fetched from the server (cache)
};

export const addCacheProps = object => ({
  ...cacheProps,
  ...object,
});

export const addLastFetch = object => ({
  ...object,
  lastFetch: Date.now(),
});

export const getId = action => action.payload._id;

export const idObjectify = id => ({ _id: id });
export const arrIdObjectify = arr => arr.map(idObjectify);
