const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
const userController = require("../user.controller");
const should = require('should');
var mockery = require('mockery');
var nodemailerMock = require("nodemailer-mock");
const { TestScheduler } = require("jest");
var contactController;

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
  beforeAll(async () =>{
    mockery.enable({
      warnOnUnregistered: false,
    });
    mockery.registerMock('nodemailer', nodemailerMock);

    // do the require() here after nodemailer is mocked
    contactController = require("./mock_contact.controller");
  });
  afterEach(async () =>{
    // Reset the mock back to the defaults after each test
    nodemailerMock.mock.reset();
  });
  
  afterAll(async () =>{
    // Remove our mocked nodemailer and disable mockery
    mockery.deregisterAll();
    mockery.disable();
    
  });

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
    
    let req;
    let res;
    req = httpMocks.createRequest({
      method: "POST",
      body: {
        firstName: "abc",
        middleName: "abc",
        lastName: "abc",
        username: "abcdefg",
        email: "usertest@gmail.com",
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
        //email: inbox.emailAddress,
        message: "Hi, how are you?",
      },
    });
    
    res = httpMocks.createResponse(req);
    await contactController.contact(req, res).then( async () => {
      const body = await res._getData();
      expect(res.statusCode).toBe(200);
  
      const sentMail = nodemailerMock.mock.getSentMail();
      expect(sentMail[0]).toHaveProperty("from");
      expect(sentMail[0]).toHaveProperty("html");
      expect(sentMail[0]).toHaveProperty("subject");
      expect(sentMail[0]).toHaveProperty("text");
      
      sentMail.length.should.be.exactly(1);
      
      expect(sentMail[0].from).toBe("camelpages2020@gmail.com");
      expect(sentMail[0].subject).toBe( "Mail From camel_case Contact Form");
      expect(sentMail[0].text).toBe("FROM: Kimberly; EMAIL: corden@latelateshow.com MESSAGE: Hi, how are you?");

      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("email");
      expect(body).toHaveProperty("message");
      
      expect(body.username).toBe("abcdefg");
      expect(body.name).toBe("Kimberly");
      expect(body.email).toBe("corden@latelateshow.com");
      expect(body.message).toBe("Hi, how are you?");

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
