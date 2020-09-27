import * as endpoints from "../../endpoints";
import configureStore from "../../configureStore";

import {
  fetchEntirePage,
  fetchEntirePortfolio,
  fetchPortfolioArtifacts,
  fetchPageArtifacts,
  fetchPortfolioPages,
} from "..";

import * as templates from "./templates";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("combined slice", () => {
  let store;
  let fakeAxios;

  const portfoliosSlice = () => store.getState().portfolios;
  const pagesSlice = () => store.getState().pages;
  const artifactsSlice = () => store.getState().artifacts;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore(true);
  });

  describe("loading full page", () => {
    beforeEach(async () => {
      fakeAxios
        .onGet(endpoints.fullPageById("a"))
        .reply(200, templates.fullPage);
      await store.dispatch(fetchEntirePage("a"));
    });

    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        await store.dispatch(fetchEntirePage("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should add the page properties to the store", async () => {
        expect(pagesSlice().ids.length).toBe(1);
        expect(pagesSlice().entities).toHaveProperty("a");
        expect(pagesSlice().entities["a"].name).toBe(
          templates.fullPage.page.name
        );
      });

      it("should add the new artifacts to the store", async () => {
        await store.dispatch(fetchEntirePage("a"));
        expect(artifactsSlice().ids.length).toBe(
          templates.fullPage.artifacts.length
        );
      });
    });
  });

  describe("loading full portfolio", () => {
    beforeEach(async () => {
      fakeAxios
        .onGet(endpoints.fullPortfolioByUsername("a"))
        .reply(200, templates.fullPortfolio);
      await store.dispatch(fetchEntirePortfolio("a"));
    });

    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        await store.dispatch(fetchEntirePortfolio("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should add the portfolio properties to the store", async () => {
        expect(portfoliosSlice().ids.length).toBe(1);
        expect(portfoliosSlice().entities).toHaveProperty("a");
        expect(portfoliosSlice().entities["a"].username).toBe(
          templates.fullPortfolio.portfolio.username
        );
      });

      it("should add the new artifacts to the store", async () => {
        expect(artifactsSlice().ids.length).toBe(
          templates.fullPortfolio.artifacts.length
        );
      });

      it("should add the new pages to the store", async () => {
        expect(pagesSlice().ids.length).toBe(
          templates.fullPortfolio.pages.length
        );
      });
    });
  });

  describe("loading all artifacts in portfolio", () => {
    beforeEach(async () => {
      fakeAxios
        .onGet(endpoints.artifactsByUsername("a"))
        .reply(200, templates.artifacts);
      await store.dispatch(fetchPortfolioArtifacts("a"));
    });

    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        await store.dispatch(fetchPortfolioArtifacts("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should add the new artifacts to the store", async () => {
        expect(artifactsSlice().ids.length).toBe(templates.artifacts.length);
      });
    });
  });

  describe("loading all pages in portfolio", () => {
    beforeEach(async () => {
      fakeAxios
        .onGet(endpoints.pagesByUsername("a"))
        .reply(200, templates.pages);
      await store.dispatch(fetchPortfolioPages("a"));
    });

    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        await store.dispatch(fetchPortfolioPages("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should add the new pages to the store", async () => {
        expect(pagesSlice().ids.length).toBe(templates.pages.length);
      });
    });
  });

  describe("loading all artifacts in page", () => {
    beforeEach(async () => {
      fakeAxios
        .onGet(endpoints.artifactsByPageId("a"))
        .reply(200, templates.artifacts);
      await store.dispatch(fetchPageArtifacts("a"));
    });

    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        await store.dispatch(fetchPageArtifacts("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should add the new artifacts to the store", async () => {
        expect(artifactsSlice().ids.length).toBe(templates.artifacts.length);
      });
    });
  });
});
