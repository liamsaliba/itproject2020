import { useCallback, useEffect, useState } from "react";

export default () => {
  // From https://github.com/mars/heroku-cra-node/blob/master/react-ui/src/App.js
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  // eslint-disable-next-line
  const [url, setUrl] = useState("/api");

  const fetchData = useCallback(() => {
    fetch(url, {
      method: "GET",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`status ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      })
      .catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      });
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return isFetching ? "Fetching message from API" : message;
};
