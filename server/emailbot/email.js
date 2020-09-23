const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const nodemailer = require("nodemailer");
const fs = require("fs");
const { use } = require("passport");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send a greeting email to the client
// args:
//    email : a string of an array of strings
//    user  : the user object
const sendGreeting = (email, user) => {
  if (!email) {
    return;
  }

  let name = user.username;
  if (user.local && user.local.firstName && user.local.lastName) {
    name = user.local.firstName + " " + user.local.lastName;
  }

  // Read the pre-compiled message
  fs.readFile("./emailbot/samples/greeting.txt", "utf-8", (err, data) => {
    if (err) return;

    data = data.replace("${username}", name);
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Welcome to Camel Pages!",
      text: data,
    };
    transporter.sendMail(mailOptions, (err, _info) => {
      if (err) {
        return;
      }
    });
  });
};

// Send a notification email to a user about the change of some item
// args:
//    email      : a string of list of strings
//    user       : the user object
//    changeItems: list of strings for item names
const sendAccountChangeNotification = (email, user, changeItem) => {
  if (!email) {
    return;
  }
  if (!changeItem || (changeItem instanceof Array && changeItem.length == 0)) {
    return;
  }
  if (changeItem.length > 1) {
    changeItem = changeItem.filter(i => i != null);
    changeItem = "\n\n    - " + changeItem.join("\n    - ");
  } else {
    changeItem = changeItem[0];
  }
  // Read the pre-compiled message
  fs.readFile("./emailbot/samples/account-change.txt", "utf-8", (err, data) => {
    if (err) return;

    let name = user.username;
    if (user.local && user.local.firstName && user.local.lastName) {
      name = user.local.firstName + " " + user.local.lastName;
    }

    data = data
      .replace("${username}", name)
      .replace("${changeItem}", changeItem);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Camel Pages: Change of Account Details",
      text: data,
    };
    transporter.sendMail(mailOptions, (err, _info) => {
      if (err) {
        return;
      }
    });
  });
};

// Send a notification email to a user about the addition of a portfolio
// args:
//    email      : a string of list of strings
//    user       : the user object
const sendPortfolioAddNotification = (email, user) => {
  if (!email) {
    return;
  }
  // Read the pre-compiled message
  fs.readFile("./emailbot/samples/portfolio-add.txt", "utf-8", (err, data) => {
    if (err) return;

    let name = user.username;
    if (user.local && user.local.firstName && user.local.lastName) {
      name = user.local.firstName + " " + user.local.lastName;
    }

    data = data.replace("${username}", name);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Camel Pages: New Portfolio Created!",
      text: data,
    };
    transporter.sendMail(mailOptions, (err, _info) => {
      if (err) {
        return;
      }
    });
  });
};

// Send a notification email to a user about the change of some item in their portfolio
// args:
//    email      : a string of list of strings
//    user       : the user object
//    changeItems: list of strings for item names
const sendPortfolioChangeNotification = (email, user, changeItem) => {
  if (!email) {
    return;
  }
  if (!changeItem || (changeItem instanceof Array && changeItem.length == 0)) {
    return;
  }
  if (changeItem.length > 1) {
    changeItem = changeItem.filter(i => i != null);
    changeItem = "\n\n    - " + changeItem.join("\n    - ");
  } else {
    changeItem = changeItem[0];
  }
  // Read the pre-compiled message
  fs.readFile(
    "./emailbot/samples/portfolio-change.txt",
    "utf-8",
    (err, data) => {
      if (err) return;

      let name = user.username;
      if (user.local && user.local.firstName && user.local.lastName) {
        name = user.local.firstName + " " + user.local.lastName;
      }

      data = data
        .replace("${username}", name)
        .replace("${changeItem}", changeItem);

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Camel Pages: Change of Portfolio Details",
        text: data,
      };
      transporter.sendMail(mailOptions, (err, _info) => {
        if (err) {
          return;
        }
      });
    }
  );
};

module.exports = {
  sendGreeting,
  sendAccountChangeNotification,
  sendPortfolioAddNotification,
  sendPortfolioChangeNotification,
};
