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

export const portfolioCacheProps = {
  pagesLastFetch: null, // timestamp of last time fetched from the server (cache)
  artifactsLastFetch: null, // timestamp of last time fetched from the server (cache)
};

export const addCacheProps = object => ({
  ...object,
  ...cacheProps,
});

export const addLastFetch = object => ({
  ...object,
  lastFetch: Date.now(),
});

export const getId = action => action.payload._id;

export const idObjectify = id => ({ _id: id });
export const arrIdObjectify = arr => arr.map(idObjectify);

export const upsertManyFetch = (adapter, selector = payload => payload) => (
  items,
  { payload }
) => {
  adapter.upsertMany(
    items,
    selector(payload).map(item => addLastFetch(item))
  );
};
