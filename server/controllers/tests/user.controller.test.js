const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
const userController = require("../user.controller");
jest.setTimeout(10000);

require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// First, set up a connection to the database
beforeAll(async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI, options, err => {
    if (err) console.error(err);
  });
});

// Finally, disconnect the database
afterAll(async () => {
  await mongoose.disconnect();
});

describe("User Controller - Create User", () => {
  it("Fail - Password too short", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        firstName: "James",
        middleName: "Kimberly",
        lastName: "Corden",
        username: "jamescorden",
        email: "jamescorden@latelateshow.com",
        password: "james",
      },
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req, res).then(async () => {
      expect(res.statusCode).toBe(400);
    });
  });

  it("Fail - Invalid email", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        firstName: "James",
        middleName: "Kimberly",
        lastName: "Corden",
        username: "jamescorden",
        email: "jamessemail",
        password: "jamescorden",
      },
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req, res).then(async () => {
      expect(res.statusCode).toBe(400);
    });
  });

  it("Successfully create a new user", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        firstName: "James",
        middleName: "Kimberly",
        lastName: "Corden",
        username: "jamescorden",
        email: "jamescorden@latelateshow.com",
        password: "jamescorden",
      },
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(201);
      expect(body).toHaveProperty("user");
      expect(body).toHaveProperty("token");

      expect(body.user).toHaveProperty("method");
      expect(body.user).toHaveProperty("username");
      expect(body.user).toHaveProperty("firstName");
      expect(body.user).toHaveProperty("middleName");
      expect(body.user).toHaveProperty("lastName");

      expect(body.user.firstName).toBe("James");
      expect(body.user.middleName).toBe("Kimberly");
      expect(body.user.lastName).toBe("Corden");
      expect(body.user.email).toBe("jamescorden@latelateshow.com");

      expect(body.user.local).toHaveProperty("firstName");
      expect(body.user.local).toHaveProperty("middleName");
      expect(body.user.local).toHaveProperty("lastName");

      expect(body.user).not.toHaveProperty("password");
      expect(body.user.local).not.toHaveProperty("password");
      expect(body.user).not.toHaveProperty("__v");
      expect(body.user).not.toHaveProperty("_id");
    });
  });

  it("Fail to create a new user with an existing username", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        firstName: "James",
        middleName: "Kimberly",
        lastName: "Corden",
        username: "jamescorden",
        email: "jamescorden@latelateshow.com",
        password: "jamescorden",
      },
    });
    const res = httpMocks.createResponse(req);
    await userController.createUser(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(400);
      expect(body).toBe('"Username already exists."');
    });
  });
});

describe("User Controller - Log in User", () => {
  it("Successfully create a new user", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "jamescorden",
        password: "jamescorden",
      },
    });
    const res = httpMocks.createResponse(req);
    await userController.loginUser(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);
      expect(body).toHaveProperty("user");
      expect(body).toHaveProperty("token");

      expect(body.user).toHaveProperty("method");
      expect(body.user).toHaveProperty("username");
      expect(body.user).toHaveProperty("firstName");
      expect(body.user).toHaveProperty("middleName");
      expect(body.user).toHaveProperty("lastName");

      expect(body.user.firstName).toBe("James");
      expect(body.user.middleName).toBe("Kimberly");
      expect(body.user.lastName).toBe("Corden");
      expect(body.user.email).toBe("jamescorden@latelateshow.com");

      expect(body.user.local).toHaveProperty("firstName");
      expect(body.user.local).toHaveProperty("middleName");
      expect(body.user.local).toHaveProperty("lastName");

      expect(body.user).not.toHaveProperty("password");
      expect(body.user.local).not.toHaveProperty("password");
      expect(body.user).not.toHaveProperty("__v");
      expect(body.user).not.toHaveProperty("_id");
    });
  });
  it("Fail to log in - password is incorrect", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "jamescorden",
        password: "wrongpassword",
      },
    });
    const res = httpMocks.createResponse(req);
    await userController.loginUser(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(401);
      expect(body).toBe('"Incorrect username or password."');
    });
  });
});

describe("User Controller - Delete User", () => {
  it("Fail to delete a user", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
    });
    const res = httpMocks.createResponse(req);
    await userController.deleteUser(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(400);
    });
  });

  it("Successfully delete a user", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "jamescorden",
        password: "jamescorden",
      },
    });
    const res = httpMocks.createResponse(req);
    await userController.deleteUser(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);
      expect(body).toBe('"User jamescorden successfully deleted."');
    });
  });
});
