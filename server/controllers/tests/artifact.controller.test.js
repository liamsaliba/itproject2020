const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
const pageController = require("../page.controller");
const artifactController = require("../artifact.controller");

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

describe("Artifact Controller - Create an aritfact", () => {
  it("Successfully create a new artifact", async () => {
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

    let artifactId;

    req = httpMocks.createRequest({
      method: "POST",
      params: {
        pageId,
      },
      user: {
        username: "test",
      },
      body: {
        contents: {
          name: "name",
        },
        type: "type",
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.createArtifact(req, res).then(async () => {
      const body = await res._getData();
      artifactId = body.id;
      expect(res.statusCode).toBe(200);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("contents");
      expect(body).toHaveProperty("pageId");
      expect(body).toHaveProperty("id");

      expect(body).not.toHaveProperty("__v");
      expect(body).not.toHaveProperty("_id");
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

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
        artifactId,
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.deleteArtifactById(req, res);
  });

  it("Failed - Page not found", async () => {
    let req;
    let res;
    const pageId = "notAPageId";

    req = httpMocks.createRequest({
      method: "POST",
      params: {
        pageId,
      },
      user: {
        username: "test",
      },
      body: {
        contents: {
          name: "name",
        },
        type: "type",
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.createArtifact(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(400);
      expect(body).toBe('"Page notAPageId not found."');
    });
  });
});

describe("Artifact Controller - Get an artifact", () => {
  it("Successfully get a new artifact", async () => {
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

    let artifactId;

    req = httpMocks.createRequest({
      method: "POST",
      params: {
        pageId,
      },
      user: {
        username: "test",
      },
      body: {
        contents: {
          name: "name",
        },
        type: "type",
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.createArtifact(req, res).then(async () => {
      const body = await res._getData();
      artifactId = body.id;
    });

    req = httpMocks.createRequest({
      method: "GET",
      params: {
        pageId,
        artifactId,
      },
      user: {
        username: "test",
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.findArtifactById(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);
      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("contents");
      expect(body).toHaveProperty("pageId");
      expect(body).toHaveProperty("id");

      expect(body).not.toHaveProperty("__v");
      expect(body).not.toHaveProperty("_id");
    });

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
        artifactId,
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.deletePageById(req, res);

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
        artifactId,
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.deleteArtifactById(req, res);
  });

  it("Failed - Artifact not found", async () => {
    let req;
    let res;
    const artifactId = "notAnArifactId";

    req = httpMocks.createRequest({
      method: "GET",
      params: {
        artifactId,
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.findArtifactById(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(404);
      expect(body).toBe('"Artifact notAnArifactId not found."');
    });
  });
});

describe("Artifact Controller - Delete an artifact", () => {
  it("Successfully delete a artifact", async () => {
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

    let artifactId;

    req = httpMocks.createRequest({
      method: "POST",
      params: {
        pageId,
      },
      user: {
        username: "test",
      },
      body: {
        contents: {
          name: "name",
        },
        type: "type",
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.createArtifact(req, res).then(async () => {
      const body = await res._getData();
      artifactId = body.id;
    });

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
        artifactId,
      },
    });
    res = httpMocks.createResponse(req);
    await pageController.deletePageById(req, res);

    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "test",
      },
      params: {
        pageId,
        artifactId,
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.deleteArtifactById(req, res);
  });

  it("Failed - Artifact not found", async () => {
    let req;
    let res;
    const artifactId = "notAnArifactId";

    req = httpMocks.createRequest({
      method: "GET",
      params: {
        artifactId,
      },
    });
    res = httpMocks.createResponse(req);
    await artifactController.findArtifactById(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(404);
      expect(body).toBe('"Artifact notAnArifactId not found."');
    });
  });
});
