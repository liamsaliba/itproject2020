const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
const pageController = require("../page.controller");
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

describe("Page Controller - Create a Page", () => {
  it("Successfully create a new page", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      params: {
        username: "test",
      },
      user: {
        username: "test",
      },
      body: {
        name: "Sample name",
        type: "Sample type",
      },
    });
    const res = httpMocks.createResponse(req);
    await pageController.createPage(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("type");
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("artifacts");

      expect(body.username).toBe("test");
      expect(body.type).toBe("Sample type");
      expect(body.name).toBe("Sample name");
      expect(body.artifacts.length).toBe(0);

      expect(body).not.toHaveProperty("__v");
      expect(body).not.toHaveProperty("_id");
    });
  });
});

describe("Page Controller - Get all details of a page", () => {
  it("Successful", async () => {
    let pageId;
    let req;
    let res;

    req = httpMocks.createRequest({
      method: "POST",
      params: {
        username: "test",
      },
      user: {
        username: "test",
      },
      body: {
        name: "Sample name",
        type: "Sample type",
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.createPage(req, res).then(async () => {
      const body = await res._getData();
      pageId = body.id;
    });

    req = httpMocks.createRequest({
      method: "GET",
      params: {
        username: "test",
        pageId,
      },
      user: {
        username: "test",
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.findAllDetails(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);
      expect(body).toHaveProperty("page");
      expect(body.page).toHaveProperty("username");
      expect(body.page).toHaveProperty("type");
      expect(body.page).toHaveProperty("id");
      expect(body.page).toHaveProperty("name");
      expect(body.page).toHaveProperty("artifacts");
      expect(body).toHaveProperty("artifacts");
    });

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.deletePageById(req, res);
  });

  it("Failed - Page not found", async () => {
    let req;
    let res;

    req = httpMocks.createRequest({
      method: "GET",
      user: {
        username: "test",
      },
      params: {
        pageId: "notAPageId",
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.findAllDetails(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(404);
    });
  });
});

describe("Page Controller - Get a page given ID", () => {
  it("Successful", async () => {
    let pageId;
    let req;
    let res;

    req = httpMocks.createRequest({
      method: "POST",
      params: {
        username: "test",
      },
      user: {
        username: "test",
      },
      body: {
        name: "Sample name",
        type: "Sample type",
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.createPage(req, res).then(async () => {
      const body = await res._getData();
      pageId = body.id;
    });

    req = httpMocks.createRequest({
      method: "GET",
      user: {
        username: "test",
      },
      params: {
        pageId,
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.findPageById(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("type");
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("artifacts");
      expect(body).toHaveProperty("artifacts");
    });

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.deletePageById(req, res);
  });

  it("Failed - Page not found", async () => {
    let req;
    let res;

    req = httpMocks.createRequest({
      method: "GET",
      user: {
        username: "test",
      },
      params: {
        pageId: "notAPageId",
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.findPageById(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(404);
    });
  });
});

describe("Page Controller - Delete an existing page", () => {
  it("Successful", async () => {
    let pageId;
    let req;
    let res;

    req = httpMocks.createRequest({
      method: "POST",
      params: {
        username: "test",
      },
      user: {
        username: "test",
      },
      body: {
        name: "Sample name",
        type: "Sample type",
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.createPage(req, res).then(async () => {
      const body = await res._getData();
      pageId = body.id;
    });

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.deletePageById(req, res);
  });

  it("Failed - Page not found", async () => {
    let req;
    let res;

    req = httpMocks.createRequest({
      method: "GET",
      user: {
        username: "test",
      },
      params: {
        pageId: "notAPageId",
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.findPageById(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(404);
    });
  });
});
