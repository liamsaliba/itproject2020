import { login, logout, signup, logoutAll } from "../auth";
import * as endpoints from "../endpoints";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import configureStore from "../configureStore";

const exampleUser = {
  user: {
    username: "test",
    firstName: "Alan",
    lastName: "Turing",
    email: "test@example.com",
  },
  token: "token",
};

describe("authSlice", () => {
  let store;
  let fakeAxios;

  beforeEach(() => {
    localStorage.clear();
    fakeAxios = new MockAdapter(axios);
    store = configureStore(true);
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
        expect(authSlice().token).toEqual("");
        expect(authSlice().user).toEqual({});
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
        expect(authSlice().token).toEqual("");
        expect(authSlice().user).toEqual({});
        expect(localStorage.__STORE__).toEqual({});
      });
    });

    describe("if server errors", () => {
      it("put error in store and not change user, token in store and cookies", async () => {
        fakeAxios.onPost(endpoints.signup).reply(500);

        await store.dispatch(signup("a", "b", "c", "d", "e"));

        expect(authSlice().error).toHaveProperty("message");
        expect(authSlice().token).toEqual("");
        expect(authSlice().user).toEqual({});
        expect(localStorage.__STORE__).toEqual({});
      });
    });
  });

  describe("log out", () => {
    describe("if logged in", () => {
      beforeEach(() => {});

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
    describe("if not logged in", () => {
      it("put error in store and not change user, token in store and cookies", async () => {
        const errorMsg = "failed";
        fakeAxios.onPost(endpoints.signup).reply(403, errorMsg);

        await store.dispatch(signup("a", "b", "c", "d", "e"));

        expect(authSlice().error).toHaveProperty("data");
        expect(authSlice().error.data).toEqual(errorMsg);
        expect(authSlice().token).toEqual("");
        expect(authSlice().user).toEqual({});
        expect(localStorage.__STORE__).toEqual({});
      });
    });

    describe("if server errors", () => {
      it("put error in store and not change user, token in store and cookies", async () => {
        fakeAxios.onPost(endpoints.signup).reply(500);

        await store.dispatch(signup("a", "b", "c", "d", "e"));

        expect(authSlice().error).toHaveProperty("message");
        expect(authSlice().token).toEqual("");
        expect(authSlice().user).toEqual({});
        expect(localStorage.__STORE__).toEqual({});
      });
    });
  });
});
