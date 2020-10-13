const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
const contactController = require("../contact.controller");
const userController = require("../user.controller");

require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

// can your app handle inbound emails
const MailSlurp = require("mailslurp-client").default
const api = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY})

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
      expect(res.statusCode).toBe(401);
    });
  });
  
  it("Successfully create a new contact", async () => {
    jest.setTimeout(60000);
    // create a new email address for this test
    const inbox = await api.createInbox()

    let req;
    let res;
    req = httpMocks.createRequest({
      method: "POST",
      body: {
        firstName: "abc",
        middleName: "abc",
        lastName: "abc",
        username: "abcdefg",
        email: inbox.emailAddress,
        password: "jamescorden",
      },
    });
    
    res = httpMocks.createResponse(req);
    await userController.createUser(req, res);

    req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "abcdefg",
        name: "Kimberly",
        email: "corden@latelateshow.com",
        message: "Hi, how are you?",
      },
    });
    
    res = httpMocks.createResponse(req);
    await contactController.contact(req, res).then( async () => {
      const body = await res._getData();
      const latestEmail = await api.waitForLatestEmail(inbox.id);
      expect(res.statusCode).toBe(200);

      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("email");
      expect(body).toHaveProperty("message");
      
      expect(body.username).toBe("abcdefg");
      expect(body.name).toBe("Kimberly");
      expect(body.email).toBe("corden@latelateshow.com");
      expect(body.message).toBe("Hi, how are you?");

      expect(latestEmail.subject).toBe("Mail From camel_case Contact Form");
      
      expect(body).not.toHaveProperty("__v");
      expect(body).not.toHaveProperty("_id");
    }); 
    
    req = httpMocks.createRequest({
      method: "DELETE",
      user: {
        username: "abcdefg",
        password: "jamescorden",
      },
    });
    res = httpMocks.createResponse(req);
    await userController.deleteUser(req, res);
  }); 
});
