import { createAction } from "@reduxjs/toolkit";

// type: {}, payload: {}
export const accessDenied = createAction("api/accessDenied");
export const apiStarted = createAction("api/apiStarted");
export const apiEnded = createAction("api/apiEnded");
export const apiErrored = createAction("api/apiErrored");
