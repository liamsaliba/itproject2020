const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const nodemailer = require("nodemailer");
const nodemailerMock = require("nodemailer-mock");

const contact = async (req, res) => {
  try {
    // Create a new user
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const newContact = new Contact({
      username,
      name,
      email,
      message,
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // secure port
      secure: true,
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    var textBody = `FROM: ${name}; EMAIL: ${email} MESSAGE: ${message}`;
    var htmlBody = `<h2>Mail From camel_case Contact Form</h2><p>from: ${name} <a href="mailto:${email}">${email}</a></p><p>${message}</p>`;

    var useremail = await User.findByUsername(username);
    if (!useremail) { 
      throw Error("Username not found.");
    }

    var mail = {
      from: process.env.EMAIL_ACCOUNT, // sender address
      to: useremail, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
      subject: "Mail From camel_case Contact Form", // Subject line
      text: textBody,
      html: htmlBody,
    };
    // send mail with defined transport object
    transporter.sendMail(mail, function (err, info) {
      if (err) {
        console.log(err);
        res.json({
          message: "message not sent: an error occured; check the server's console log"
        });
      } else {
        res.json({ message: `message sent: ${info.messageId}` });
      }
    });

    await newContact.save();
    res.status(200).send(newContact.toObject());
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = {
  contact,
};
