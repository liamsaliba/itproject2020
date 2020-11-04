import { useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectPortfolioIsEditing, selectPortfolioByUsername } from "./store";

export const isTrue = value => value === "true" || value === true;

export const usePath = userId => {
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));

  const singlePage = useSelector(
    state => selectPortfolioByUsername(state, userId).singlePage
  );
  const path = editing ? "/editor" : `/u/${userId}`;
  const sep = singlePage ? "#" : "";

  return pageName =>
    pageName === "" || pageName === undefined
      ? path
      : `${path}/${sep}${encodeURI(pageName)}`;
};

export const useEffectUpdate = (effect, deps) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      effect();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isFirstRender.current = false;
  }, []);
};

export const hoverGrow = {
  transition: ".3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
  "&:active": {
    transform: "scale(0.96)",
  },
};
