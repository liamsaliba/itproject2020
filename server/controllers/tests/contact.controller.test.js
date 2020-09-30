const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
const contactController = require("../contact.controller");

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

describe("Contact Controller - Create Contact", () => {
  it("Fail to contact - username not fount", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "dghsgdh", //jamescorden
        name: "Kimberly",
        email: "jamescorden@latelateshow.com",
        message: "Hi, how are you?",
      },
    });
    const res = httpMocks.createResponse(req);
    await contactController.contact(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(403);
      expect(body).toBe('"username is not found"');
    });
  });
  
  it("Successfully create a new contact", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "jamescorden",
        name: "Kimberly",
        email: "corden@latelateshow.com",
        message: "Hi, how are you?",
      },
    });
    const res = httpMocks.createResponse(req);
    await contactController.contact(req, res).then(async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);

      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("email");
      expect(body).toHaveProperty("message");
      
      expect(body.username).toBe("jamescorden");
      expect(body.name).toBe("Kimberly");
      expect(body.email).toBe("corden@latelateshow.com");
      expect(body.message).toBe("Hi, how are you?");

      expect(body).not.toHaveProperty("__v");
      expect(body).not.toHaveProperty("_id");
    });
  }); 
});
