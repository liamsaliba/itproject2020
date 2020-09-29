import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import 'react-datepicker/dist/react-datepicker.css';


// import {
//   configureStore,
//   login,
//   logout,
//   fetchPortfolios,
//   fetchPortfolio,
//   createPortfolio,
//   deletePortfolio,
//   createPage,
// } from "./store";

// import * as templates from "./store/slices/tests/templates";

// import * as actions from "./store/slices/actions";

// const store = configureStore();

// store.dispatch(login("user2", "12345678"));
// store.dispatch(fetchPortfolios());
// store.dispatch(fetchPortfolio("user1"));
// setTimeout(() => store.dispatch(deletePortfolio("user2", "12345678")), 1000);
// setTimeout(() => store.dispatch(createPortfolio()), 2000);
// setTimeout(() => store.dispatch(createPage(newPage)), 3000);

// store.dispatch(actions.portfolioFetchedArtifacts(templates.artifacts));

// store.dispatch(actions.pageFetchedAll(templates.fullPage));

// setTimeout(() => store.dispatch(logout()), 6000);

/*{
    _id: "123",
    type: "display",
    heading: "First!",
    body: "Lorem ipsum blah blah blah.",
  }


store.dispatch(
  artifactsActions.addOne({
    _id: "123",
    type: "display",
    heading: "First!",
    body: "Lorem ipsum blah blah blah.",
  })
);

store.dispatch(pagesActions.addOne({ _id: "p123", contents: ["123"] }));
*/

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
