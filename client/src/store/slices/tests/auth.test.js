import { login, logout, signup, logoutAll } from "../";
import * as endpoints from "../../endpoints";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import configureStore from "../../configureStore";

const initialToken = "";
const initialUser = {};

const exampleUser = {
  user: {
    username: "test",
    firstName: "Alan",
    lastName: "Turing",
    email: "test@example.com",
  },
  token: "token",
};

/*
// these tests don't work as the mock for the cookies
// aren't allowing us to set the cookies before configuring store
describe("cookies (cached auth)", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
  });

  const authSlice = store => store.getState().auth;

  describe("if don't have user cookie", () => {
    it("store starts without user and token set", async () => {
      localStorage.__STORE__["token"] = "token";
      // overwrite the store to ensure the cookie is there when initialState is set
      store = configureStore();

      expect(authSlice(store).token).toEqual(initialToken);
      expect(authSlice(store).user).toEqual(initialUser);
    });
  });

  describe("if don't have token cookie", () => {
    it("store starts without user and token set", async () => {
      localStorage.__STORE__["user"] = JSON.stringify(exampleUser.user);
      // overwrite the store to ensure the cookie is there when initialState is set
      store = configureStore();

      expect(authSlice(store).token).toEqual(initialToken);
      expect(authSlice(store).user).toEqual(initialUser);
    });
  });
  describe("if have user and token cookie", () => {
    it("store starts with user and token set", async () => {
      localStorage.__STORE__["token"] = "token";
      localStorage.__STORE__["user"] = JSON.stringify(exampleUser.user);
      // overwrite the store to ensure the cookie is there when initialState is set
      store = configureStore();

      expect(authSlice(store).token).toEqual(localStorage.__STORE__.token);
      expect(authSlice(store).user).toEqual(localStorage.__STORE__.user);
    });
  });
});
*/

describe("authSlice", () => {
  let store;
  let fakeAxios;

  beforeEach(() => {
    localStorage.clear();
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const authSlice = () => store.getState().auth;

  describe("log in", () => {
    describe("if details entered correctly", () => {
      it("put user and token in the store and cookies", async () => {
        fakeAxios.onPost(endpoints.login).reply(200, exampleUser);

        await store.dispatch(login("test", "password123"));

        expect(authSlice().token).toEqual(exampleUser.token);
        expect(authSlice().user).toEqual(exampleUser.user);
        expect(localStorage.__STORE__["user"]).toEqual(
          JSON.stringify(exampleUser.user)
        );
        expect(localStorage.__STORE__["token"]).toEqual(exampleUser.token);
      });
    });

    describe("if details not entered correctly", () => {
      it("put error in store and not change user, token in store and cookies", async () => {
        const errorMsg = "failed";
        fakeAxios.onPost(endpoints.login).reply(403, errorMsg);

        await store.dispatch(login("bob2", "12345678"));

        expect(authSlice().error).toHaveProperty("data");
        expect(authSlice().error.data).toEqual(errorMsg);
        expect(authSlice().token).toEqual(initialToken);
        expect(authSlice().user).toEqual(initialUser);
        expect(localStorage.__STORE__).toEqual({});
      });
    });

    describe("if server errors", () => {
      it("put error in store and not change user, token in store and cookies", async () => {
        fakeAxios.onPost(endpoints.login).reply(500);

        await store.dispatch(login("bob2", "12345678"));
        expect(authSlice().error).toHaveProperty("message");
        expect(authSlice().token).toEqual("");
        expect(authSlice().user).toEqual({});
        expect(localStorage.__STORE__).toEqual({});
      });
    });
  });

  describe("sign up", () => {
    describe("if details entered correctly", () => {
      it("put user and token in the store and cookies", async () => {
        fakeAxios.onPost(endpoints.signup).reply(200, exampleUser);

        await store.dispatch(signup("a", "b", "c", "d", "e"));

        expect(authSlice().token).toEqual(exampleUser.token);
        expect(authSlice().user).toEqual(exampleUser.user);
        expect(localStorage.__STORE__["user"]).toEqual(
          JSON.stringify(exampleUser.user)
        );
        expect(localStorage.__STORE__["token"]).toEqual(exampleUser.token);
      });
    });
    describe("if details not entered correctly", () => {
      it("put error in store and not change user, token in store and cookies", async () => {
        const errorMsg = "failed";
        fakeAxios.onPost(endpoints.signup).reply(403, errorMsg);

        await store.dispatch(signup("a", "b", "c", "d", "e"));

        expect(authSlice().error).toHaveProperty("data");
        expect(authSlice().error.data).toEqual(errorMsg);
        expect(authSlice().token).toEqual(initialToken);
        expect(authSlice().user).toEqual(initialUser);
        expect(localStorage.__STORE__).toEqual({});
      });
    });

    describe("if server errors", () => {
      it("put error in store and not change user, token in store and cookies", async () => {
        fakeAxios.onPost(endpoints.signup).reply(500);

        await store.dispatch(signup("a", "b", "c", "d", "e"));

        expect(authSlice().error).toHaveProperty("message");
        expect(authSlice().token).toEqual(initialToken);
        expect(authSlice().user).toEqual(initialUser);
        expect(localStorage.__STORE__).toEqual({});
      });
    });
  });

  describe("log out", () => {
    describe("if logged in", () => {
      it("remove user and token from store and cookies", async () => {
        fakeAxios.onPost(endpoints.login).reply(200, exampleUser);
        fakeAxios.onPost(endpoints.logout).reply(200);

        await store.dispatch(login("a", "b"));
        await store.dispatch(logout(authSlice().token));

        expect(authSlice().token).toEqual(initialToken);
        expect(authSlice().user).toEqual(initialUser);
        expect(localStorage.__STORE__).toEqual({});
      });
    });
    describe("if not logged in", () => {
      it("don't change user and token in store and cookies", async () => {
        const errorMsg = "failed";
        fakeAxios.onPost(endpoints.logout).reply(401);

        await store.dispatch(logout(""));

        expect(authSlice().token).toEqual(initialToken);
        expect(authSlice().user).toEqual(initialUser);
        expect(localStorage.__STORE__).toEqual({});
      });
    });
  });

  describe("log out all", () => {
    describe("if logged in", () => {
      it("remove user and token from store and cookies", async () => {
        fakeAxios.onPost(endpoints.login).reply(200, exampleUser);
        fakeAxios.onPost(endpoints.logoutAll).reply(200);

        await store.dispatch(login("a", "b"));
        await store.dispatch(logoutAll(authSlice().token));

        expect(authSlice().token).toEqual(initialToken);
        expect(authSlice().user).toEqual(initialUser);
        expect(localStorage.__STORE__).toEqual({});
      });
    });
    describe("if not logged in", () => {
      it("don't change user and token in store and cookies", async () => {
        const errorMsg = "failed";
        fakeAxios.onPost(endpoints.logout).reply(401);

        await store.dispatch(logoutAll(""));

        expect(authSlice().token).toEqual(initialToken);
        expect(authSlice().user).toEqual(initialUser);
        expect(localStorage.__STORE__).toEqual({});
      });
    });
  });
});
