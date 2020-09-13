import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  addBug,
  getUnresolvedBugs,
  resolveBug,
  loadBugs,
  assignBugToUser,
} from "../entries";

import configureStore from "../configureStore";

// What is the _behaviour_ we need to test?  Implementation may change in the future.
// Each test will run with a clean state.

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({ entities: { bugs: { list: [] } } });

  // AAA: Arrange (initialisation), Act (trigger action), Assert (expectation)
  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if the bugs don't exist in the cache", () => {
      it("should be fetched from the server and put in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list.length).toBe(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            // while waiting for response
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });
        it("should be false after the bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  describe("assign bug to user", () => {
    it("should happen if it's saved to the server", async () => {
      const userId = 1;
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, userId });

      await store.dispatch(addBug({}));
      await store.dispatch(assignBugToUser(1, userId));

      expect(bugsSlice().list[0].userId).toBe(userId);
    });
    it("should not happen if it's not saved to the server", async () => {
      const userId = 1;
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      fakeAxios.onPatch("/bugs/1").reply(500);

      await store.dispatch(addBug({}));
      await store.dispatch(assignBugToUser(1, userId));

      expect(bugsSlice().list[0].userId).not.toBe(userId);
    });
  });

  describe("mark the bug as resolved", () => {
    it("should happen if it's saved to the server", async () => {
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(1));

      expect(bugsSlice().list[0].resolved).toBe(true);
    });

    it("should not happen if it's not saved to the server", async () => {
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      fakeAxios.onPatch("/bugs/1").reply(500, { id: 1, resolved: true });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(1));

      expect(bugsSlice().list[0].resolved).not.toBe(true);
    });
  });
  describe("add the bug to the store", () => {
    it("should happen if it's saved to the server", async () => {
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost("/bugs").reply(200, savedBug);

      await store.dispatch(addBug());

      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not happen if it's not saved to the server", async () => {
      const bug = { description: "a" };
      fakeAxios.onPost("/bugs").reply(500); // internal server error

      await store.dispatch(addBug());

      expect(bugsSlice().list).toHaveLength(0);
    });
  });

  describe("selectors", () => {
    it("should getUnresolvedBugs", async () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
