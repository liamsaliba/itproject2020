import {
  configureStore,
  login,
  logout,
  fetchPortfolios,
  fetchPortfolio,
  createPortfolio,
  deletePortfolio,
  createPage,
} from "./store";

const store = configureStore();

store.dispatch(login("user2", "12345678"));

store.dispatch(fetchPortfolios());

store.dispatch(fetchPortfolio("user1"));
setTimeout(() => store.dispatch(deletePortfolio("user2", "12345678")), 1000);

setTimeout(() => store.dispatch(createPortfolio()), 2000);

const newPage = { name: "Aboot", type: "display" };

setTimeout(() => store.dispatch(createPage(newPage)), 3000);

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
