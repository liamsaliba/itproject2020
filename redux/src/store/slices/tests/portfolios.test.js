import * as endpoints from "../../endpoints";
import configureStore from "../../configureStore";

import {
  fetchPortfolios,
  fetchPortfolio,
  changePortfolioTheme,
  createPortfolio,
  deletePortfolio,
  createPage,
  login,
  selectPortfolioByUsername,
} from "../";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("portfoliosSlice", () => {
  let store;
  let fakeAxios;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore(true);
  });

  const portfoliosSlice = () => store.getState().portfolios;
  const selectPortfolioByUsername = username =>
    portfoliosSlice().entities[username];

  describe("loading portfolios", () => {
    describe("if portfolios exist in the cache", () => {
      it("should not be fetched from the server again", async () => {
        fakeAxios.onGet(endpoints.portfolios).reply(200, [{ username: "a" }]);

        await store.dispatch(fetchPortfolios());
        await store.dispatch(fetchPortfolios());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if portfolios do not exist in the cache", () => {
      it("should be fetched from the server and put in the store", async () => {
        fakeAxios.onGet(endpoints.portfolios).reply(200, [{ username: "a" }]);

        await store.dispatch(fetchPortfolios());

        expect(portfoliosSlice().ids.length).toBe(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the portfolio", () => {
          fakeAxios.onGet(endpoints.portfolios).reply(() => {
            // while waiting for response
            expect(portfoliosSlice().loading).toBe(true);
            return [200, [{ username: "a" }]];
          });

          store.dispatch(fetchPortfolios());
        });
        it("should be false after portfolios are fetched", async () => {
          fakeAxios.onGet(endpoints.portfolios).reply(200, [{ username: "a" }]);

          await store.dispatch(fetchPortfolios());

          expect(portfoliosSlice().loading).toBe(false);
        });
        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet(endpoints.portfolios).reply(500);

          await store.dispatch(fetchPortfolios());

          expect(portfoliosSlice().loading).toBe(false);
        });
      });
    });
  });

  describe("loading detailed portfolio", () => {
    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        fakeAxios
          .onGet(endpoints.portfoliosByUsername("a"))
          .reply(200, { username: "a", pages: [] });

        await store.dispatch(fetchPortfolio("a"));
        await store.dispatch(fetchPortfolio("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should be fetched from the server and put in the store", async () => {
        fakeAxios
          .onGet(endpoints.portfoliosByUsername("a"))
          .reply(200, { username: "a", pages: [] });

        await store.dispatch(fetchPortfolio("a"));

        expect(portfoliosSlice().ids.length).toBe(1);
        expect(portfoliosSlice().entities).toHaveProperty("a");
      });

      // Not Yet Implemented
      // describe("loading indicator", () => {
      //   it("should be true while fetching the portfolio", () => {
      //     fakeAxios.onGet(endpoints.portfoliosByUsername("a")).reply(() => {
      //       // while waiting for response
      //       expect(selectPortfolioByUsername("a").loading).toBe(true);
      //       return [200, { username: "a", pages: [] }];
      //     });

      //     store.dispatch(fetchPortfolio("a"));
      //   });
      //   it("should be false after portfolios are fetched", async () => {
      //     fakeAxios
      //       .onGet(endpoints.portfoliosByUsername("a"))
      //       .reply(200, { username: "a", pages: [] });

      //     await store.dispatch(fetchPortfolio("a"));

      //     expect(selectPortfolioByUsername("a").loading).toBe(false);
      //   });
      //   it("should be false if the server returns an error", async () => {
      //     fakeAxios.onGet(endpoints.portfoliosByUsername("a")).reply(500);

      //     await store.dispatch(fetchPortfolio("a"));

      //     expect(selectPortfolioByUsername("a").loading).toBe(false);
      //   });
      // });
    });
  });

  describe("authenticated", () => {
    beforeEach(async () => {
      fakeAxios
        .onPost(endpoints.login)
        .reply(200, { user: { username: "a" }, token: "t" });

      await store.dispatch(login("a", "b"));
    });

    const savedPortfolio = {
      theme: "oldTheme",
      bio: "b",
      username: "a",
      pages: [],
    };

    describe("create portfolio", () => {
      it("should happen if it's saved to the server", async () => {
        fakeAxios.onPost(endpoints.portfolios).reply(200, savedPortfolio);

        await store.dispatch(createPortfolio());

        expect(selectPortfolioByUsername("a")).toBeDefined();
        expect(selectPortfolioByUsername("a").bio).toBe("b");
      });

      it("should not happen if it's not saved to the server, and save error message", async () => {
        fakeAxios.onPost(endpoints.portfolios).reply(500);

        await store.dispatch(createPortfolio());

        expect(selectPortfolioByUsername("a")).not.toBeDefined();
      });
    });

    describe("modifying portfolio", () => {
      beforeEach(async () => {
        fakeAxios
          .onGet(endpoints.portfoliosByUsername("a"))
          .reply(200, savedPortfolio);

        await store.dispatch(fetchPortfolio("a"));
      });

      describe("change portfolio theme", () => {
        it("should happen if it's saved to the server", async () => {
          fakeAxios
            .onPatch(endpoints.portfoliosByUsername("a"))
            .reply(200, { username: "a", theme: "newTheme", pages: [] });

          await store.dispatch(changePortfolioTheme("new"));

          expect(selectPortfolioByUsername("a").theme).toBe("newTheme");
        });

        it("should not happen if it's not saved to the server, and save error message", async () => {
          fakeAxios.onPatch(endpoints.portfoliosByUsername("a")).reply(500);

          await store.dispatch(changePortfolioTheme("new"));

          expect(selectPortfolioByUsername("a").theme).toBe("oldTheme");
        });
      });

      describe("delete portfolio", () => {
        it("should happen if it's saved to the server", async () => {
          fakeAxios.onDelete(endpoints.portfoliosByUsername("a")).reply(200);

          await store.dispatch(deletePortfolio("a", "a"));

          expect(selectPortfolioByUsername("a")).not.toBeDefined();
        });

        it("should not happen if it's not saved to the server, and save error message", async () => {
          fakeAxios.onDelete(endpoints.portfoliosByUsername("a")).reply(500);

          await store.dispatch(deletePortfolio("a", "a"));

          expect(selectPortfolioByUsername("a")).toBeDefined();
          expect(selectPortfolioByUsername("a").bio).toBe("b");
        });
      });

      describe("create page", () => {
        it("should add page to portfolio's list of pages; if saved to server", async () => {
          fakeAxios
            .onPost(endpoints.pagesByUsername("a"))
            .reply(200, { id: 1, username: "a" });

          await store.dispatch(createPage());

          expect(selectPortfolioByUsername("a").pages.length).toBe(1);
        });

        it("should add not add page to portfolio's list of pages; if it's not saved to server", async () => {
          fakeAxios.onPost(endpoints.pagesByUsername("a")).reply(500);

          await store.dispatch(createPage());

          expect(selectPortfolioByUsername("a").pages.length).toBe(0);
        });
      });
    });
  });
});
