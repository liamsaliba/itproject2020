import React, { useCallback, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import UserPage from "./UserPage";
import MainPage from "./MainPage";
import EditorPage from "./EditorPage";

export default () => {
  return (
    <Switch>
      <Route exact path="/u/:id" component={UserPage} />
      <Route exact path="/e/:id" component={EditorPage} />
      <Route component={MainPage} />
    </Switch>
  );
};
