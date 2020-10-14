const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
//const contactController = require("../contact.controller");

const userController = require("../user.controller");
const should = require('should');
var mockery = require('mockery');
var nodemailerMock = require("nodemailer-mock");
const { TestScheduler } = require("jest");
var contactController;

require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

// can your app handle inbound emails
const MailSlurp = require("mailslurp-client").default
const api = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY})

//const slurp = new MailslurpClient.InboxcontrollerApi()
//const slurpKey = process.env.MAILSLURP_API_KEY;

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

  /*mockery.enable({
    warnOnUnregistered: false,
  });
  mockery.registerMock('nodemailer', nodemailerMock)
  contactController = require("../contact.controller");*/
});

// Finally, disconnect the database
afterAll(async () => {
  await mongoose.disconnect();

  // Reset the mock back to the defaults after each test
  /*nodemailerMock.mock.reset();
  // Remove our mocked nodemailer and disable mockery
  mockery.deregisterAll();
  mockery.disable();*/
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
      //expect(body).toBe('"Username not found."');
    });
  });
  /*it("Successfully create a new contact", async () => {
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

      // create a new email address for this test
      const inbox = await api.createInbox()

      // trigger an app action that sends an email
      //await signUpForMyApp(inbox.emailAddress)
      const options = {
        to: ["test@latelateshow.com"],
        subject: "Mail From camel_case Contact Form",
        body: "Hi, how are you?"
      };
      await api.sendEmail(inbox.id, options);

      // fetch sent email from the inbox
      // include a retryTimeout and minCount so that
      // MailSlurp waits for an email
      //const emails = await api.getEmails(inbox.id, { minCount: 1, retryTimeout: 60000 })
      const latestEmail = await api.waitForLatestEmail(inbox.id);

      // assert that the correct email was sent
      //expect(latestEmail[0].length).toBe(1)
      //expect(latestEmail[0].content).toBe("Hi, how are you?")
      expect(latestEmail.subject).toContain("Mail From camel_case Contact Form");
      expect(latestEmail.body).toContain("Hi, how are you?");

      expect(body).not.toHaveProperty("__v");
      expect(body).not.toHaveProperty("_id");
    });
  }); */
  /*it("Fail to contact - username not fount", async () => {
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
      expect(body).toBe('"Username not found."');
    });
  });*/

  /*it("Successfully create a new contact", async () => {
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
        //email: inbox.emailAddress,
        message: "Hi, how are you?",
      },
    });
    res = httpMocks.createResponse(req);
    await contactController.contact(req, res).then( async () => {
      const body = await res._getData();
      //const latestEmail = await api.waitForLatestEmail(inbox.id);
      const latestEmail = await api.getEmails(inbox.id, { minCount: 1, retryTimeout: 60000 })
      expect(res.statusCode).toBe(200);

      //expect(latestEmail.subject).toBe("Mail From camel_case Contact Form");
      //expect(latestEmail.text.message).toBe("Hi, how are you?");
      

      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("email");
      expect(body).toHaveProperty("message");
      
      expect(body.username).toBe("abcdefg");
      expect(body.name).toBe("Kimberly");
      expect(body.email).toBe("corden@latelateshow.com");
      //expect(body.email).toBe(inbox.emailAddress);
      expect(body.message).toBe("Hi, how are you?");

      // trigger an app action that sends an email
      //await signUpForMyApp(inbox.emailAddress)
      
      //await api.sendEmail(inbox.id, options);

      // fetch sent email from the inbox
      // include a retryTimeout and minCount so that
      // MailSlurp waits for an email
      //const latestEmail = await api.getEmails(inbox.id, { minCount: 1, retryTimeout: 60000 })
      
      //const latestEmail = await api.waitForLatestEmail(inbox.id);


      // assert that the correct email was sent
      //expect(latestEmail[0].length).toBe(1)
      //expect(latestEmail[0].content).toBe("Hi, how are you?")
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
  }); */

  let app = null;

  

  it("Successfully create a new contact", async () => {
    //jest.setTimeout(60000);
    // create a new email address for this test
    //const inbox = await api.createInbox()

    let req;
    let res;
    req = httpMocks.createRequest({
      method: "POST",
      body: {
        firstName: "abc",
        middleName: "abc",
        lastName: "abc",
        username: "abcdefg",
        //email: inbox.emailAddress,
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
      //const latestEmail = await api.waitForLatestEmail(inbox.id);
      //const latestEmail = await api.getEmails(inbox.id, { minCount: 1, retryTimeout: 60000 })
      const sentMail = nodemailerMock.mock.getSentMail();
      //sentMail[0].property.should.be.exactly('foobar');
      expect(sentMail[0]).toHaveProperty("from");
      expect(sentMail[0]).toHaveProperty("html");
      expect(sentMail[0]).toHaveProperty("subject");
      expect(sentMail[0]).toHaveProperty("text");
      
      sentMail.length.should.be.exactly(1);
      //expect(res.statusCode).toBe(200);

      //expect(latestEmail.subject).toBe("Mail From camel_case Contact Form");
      //expect(latestEmail.text.message).toBe("Hi, how are you?");
      

      expect(body).toHaveProperty("username");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("email");
      expect(body).toHaveProperty("message");
      
      expect(body.username).toBe("abcdefg");
      expect(body.name).toBe("Kimberly");
      expect(body.email).toBe("corden@latelateshow.com");
      //expect(body.email).toBe(inbox.emailAddress);
      expect(body.message).toBe("Hi, how are you?");

      // trigger an app action that sends an email
      //await signUpForMyApp(inbox.emailAddress)
      /*const options = {
        to: ["test@latelateshow.com"],
        subject: "Mail From camel_case Contact Form",
        body: "Hi, how are you?"
      };*/
      //await api.sendEmail(inbox.id, options);

      // fetch sent email from the inbox
      // include a retryTimeout and minCount so that
      // MailSlurp waits for an email
      //const latestEmail = await api.getEmails(inbox.id, { minCount: 1, retryTimeout: 60000 })
      
      //const latestEmail = await api.waitForLatestEmail(inbox.id);


      // assert that the correct email was sent
      //expect(latestEmail[0].length).toBe(1)
      //expect(latestEmail[0].content).toBe("Hi, how are you?")
      //expect(latestEmail.subject).toBe("Mail From camel_case Contact Form");
      
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