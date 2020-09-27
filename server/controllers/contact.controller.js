const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const nodemailer = require("nodemailer");

const contact = async (req, res) => {

  // Create a new user
  const portfolio_username = req.body.portfolio_username;
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  
  const newContact = new Contact({
    portfolio_username,
    name,
    email,
    message
  });  

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // secure port
    secure: true,
    service: 'Gmail',
    auth: {
        user:  process.env.EMAILACCOUNT,
        pass: process.env.EMAILPASSWORD

    }
  });
  var textBody = `FROM: ${name}; EMAIL: ${email} MESSAGE: ${message}`;
  var htmlBody = `<h2>Mail From camel_case Contact Form</h2><p>from: ${name} <a href="mailto:${email}">${email}</a></p><p>${message}</p>`;

  const username = portfolio_username;
  var useremail = await User.findByUsername(username);

  var mail = {
    from: process.env.EMAILACCOUNT, // sender address
    to: useremail, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
    subject: "Mail From camel_case Contact Form", // Subject line
    text: textBody,
    html: htmlBody
  };
  // send mail with defined transport object
  transporter.sendMail(mail, function (err, info) {
    if(err) {
      console.log(err);
      res.json({ message: "message not sent: an error occured; check the server's console log" });
    }
    else {
      res.json({ message: `message sent: ${info.messageId}` });
    }
  });

  await newContact.save();
  res.status(200).json(newContact.toObject());

};

module.exports = {
  contact,
};



