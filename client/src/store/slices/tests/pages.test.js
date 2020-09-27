import * as endpoints from "../../endpoints";
import configureStore from "../../configureStore";

import {
  fetchPage,
  fetchEntirePage,
  renamePage,
  createPage,
  deletePage,
  fetchPortfolio,
  createArtifact,
  login,
} from "../";

import * as templates from "./templates";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("pagesSlice", () => {
  let store;
  let fakeAxios;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore(true);
  });

  const pagesSlice = () => store.getState().pages;
  const pageSlice = id => pagesSlice().entities[id];

  describe("loading detailed page", () => {
    beforeEach(() => {
      fakeAxios.onGet(endpoints.pagesById("a")).reply(200, templates.newPage);
    });

    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        await store.dispatch(fetchPage("a"));
        await store.dispatch(fetchPage("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should be fetched from the server and put in the store", async () => {
        await store.dispatch(fetchPage("a"));
        expect(pagesSlice().ids.length).toBe(1);
        expect(pagesSlice().entities).toHaveProperty("a");
        expect(pagesSlice().entities["a"].name).toBe(templates.newPage.name);
      });
    });
  });

  describe("authenticated", () => {
    beforeEach(async () => {
      fakeAxios.onPost(endpoints.login).reply(200, templates.user);

      await store.dispatch(login("a", "b"));

      fakeAxios.onGet(endpoints.portfoliosByUsername("a")).reply(200, {
        username: "a",
        pages: [],
      });

      await store.dispatch(fetchPortfolio("a"));
    });

    describe("create page", () => {
      it("should happen if it's saved to the server", async () => {
        fakeAxios
          .onPost(endpoints.pagesByUsername("a"))
          .reply(200, templates.newPage);

        await store.dispatch(createPage());

        expect(pageSlice("a")).toBeDefined();
        expect(pageSlice("a").name).toBe(templates.newPage.name);
      });

      it("should not happen if it's not saved to the server, and save error message", async () => {
        fakeAxios.onPost(endpoints.pagesByUsername("a")).reply(500);

        await store.dispatch(createPage());

        expect(pageSlice("a")).not.toBeDefined();
      });
    });

    describe("modifying page", () => {
      beforeEach(async () => {
        fakeAxios.onGet(endpoints.pagesById("a")).reply(200, templates.newPage);

        await store.dispatch(fetchPage("a"));
      });

      describe("change page name", () => {
        it("should happen if it's saved to the server", async () => {
          fakeAxios
            .onPatch(endpoints.pagesById("a"))
            .reply(200, { ...templates.newPage, name: "newName" });

          await store.dispatch(renamePage("a", "newName"));
          expect(pageSlice("a").name).toBe("newName");
        });

        it("should not happen if it's not saved to the server, and save error message", async () => {
          fakeAxios.onPatch(endpoints.pagesById("a")).reply(500);

          await store.dispatch(renamePage("newName"));

          expect(pageSlice("a").name).toBe("name");
        });
      });

      describe("delete page", () => {
        it("should happen if it's saved to the server", async () => {
          fakeAxios.onDelete(endpoints.pagesById("a")).reply(200);

          await store.dispatch(deletePage("a"));

          expect(pageSlice("a")).not.toBeDefined();
        });

        it("should not happen if it's not saved to the server, and save error message", async () => {
          fakeAxios.onDelete(endpoints.pagesById("a")).reply(500);

          await store.dispatch(deletePage("a"));

          expect(pageSlice("a")).toBeDefined();
          expect(pageSlice("a").name).toBe("name");
        });
      });

      describe("create artifact", () => {
        it("should add it to pages's list of artifacts; if saved to server", async () => {
          fakeAxios
            .onPost(endpoints.artifactsByPageId("a"))
            .reply(200, { id: 1, pageId: "a", username: "a" });

          await store.dispatch(createArtifact("a"));

          expect(pageSlice("a").artifacts.length).toBe(1);
        });

        it("should not add it to pages's list of artifacts; if it's not saved to server", async () => {
          fakeAxios.onPost(endpoints.artifactsByPageId("a")).reply(500);

          await store.dispatch(createArtifact("a"));

          expect(pageSlice("a").artifacts.length).toBe(0);
        });
      });
    });
  });
});
