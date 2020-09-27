import * as endpoints from "../../endpoints";
import configureStore from "../../configureStore";

import {
  fetchArtifact,
  editArtifact,
  createArtifact,
  deleteArtifact,
  fetchPortfolio,
  fetchPage,
  login,
} from "..";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("artifactsSlice", () => {
  let store;
  let fakeAxios;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore(true);
  });

  const artifactsSlice = () => store.getState().artifacts;
  const artifactSlice = id => artifactsSlice().entities[id];

  describe("loading detailed artifact", () => {
    beforeEach(() => {
      fakeAxios
        .onGet(endpoints.artifactsById("a"))
        .reply(200, { username: "u", pageId: "b", id: "a", artifacts: [] });
    });

    describe("if it exists in the cache", () => {
      it("should not be fetched from the server again", async () => {
        await store.dispatch(fetchArtifact("a"));
        await store.dispatch(fetchArtifact("a"));

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if it does not exist in the cache", () => {
      it("should be fetched from the server and put in the store", async () => {
        await store.dispatch(fetchArtifact("a"));
        expect(artifactsSlice().ids.length).toBe(1);
        expect(artifactsSlice().entities).toHaveProperty("a");
      });
    });
  });

  describe("authenticated", () => {
    beforeEach(async () => {
      fakeAxios
        .onPost(endpoints.login)
        .reply(200, { user: { username: "a" }, token: "t" });

      await store.dispatch(login("a", "b"));

      fakeAxios.onGet(endpoints.portfoliosByUsername("a")).reply(200, {
        username: "a",
        pages: [],
      });

      await store.dispatch(fetchPortfolio("a"));

      fakeAxios.onGet(endpoints.pagesById("a")).reply(200, {
        username: "a",
        id: "a",
        artifacts: [],
      });

      await store.dispatch(fetchPage("a"));
    });

    const newArtifact = {
      type: "type",
      body: "body",
      username: "a",
      pageId: "a",
      id: "a",
    };

    describe("create artifact", () => {
      it("should happen if it's saved to the server", async () => {
        fakeAxios
          .onPost(endpoints.artifactsByPageId("a"))
          .reply(200, newArtifact);

        await store.dispatch(createArtifact(newArtifact.pageId));

        expect(artifactSlice("a")).toBeDefined();
        expect(artifactSlice("a").body).toBe(newArtifact.body);
      });

      it("should not happen if it's not saved to the server, and save error message", async () => {
        fakeAxios.onPost(endpoints.artifactsByPageId("a")).reply(500);

        await store.dispatch(createArtifact(newArtifact.pageId));

        expect(artifactSlice("a")).not.toBeDefined();
      });
    });

    describe("modifying artifact", () => {
      beforeEach(async () => {
        fakeAxios.onGet(endpoints.artifactsById("a")).reply(200, newArtifact);

        await store.dispatch(fetchArtifact("a"));
      });

      describe("edit artifact", () => {
        it("should happen if it's saved to the server", async () => {
          fakeAxios
            .onPatch(endpoints.artifactsById("a"))
            .reply(200, { ...newArtifact, body: "newbody" });

          await store.dispatch(editArtifact("a", { body: "newbody" }));
          expect(artifactSlice("a").body).toBe("newbody");
        });

        it("should not happen if it's not saved to the server, and save error message", async () => {
          fakeAxios.onPatch(endpoints.artifactsById("a")).reply(500);

          await store.dispatch(editArtifact("a", { body: "newbody" }));

          expect(artifactSlice("a").body).toBe(newArtifact.body);
        });
      });

      describe("delete artifact", () => {
        it("should happen if it's saved to the server", async () => {
          fakeAxios.onDelete(endpoints.artifactsById("a")).reply(200);

          await store.dispatch(deleteArtifact("a"));

          expect(artifactSlice("a")).not.toBeDefined();
        });

        it("should not happen if it's not saved to the server, and save error message", async () => {
          fakeAxios.onDelete(endpoints.artifactsById("a")).reply(500);

          await store.dispatch(deleteArtifact("a"));

          expect(artifactSlice("a")).toBeDefined();
          expect(artifactSlice("a").body).toBe("body");
        });
      });
    });
  });
});
