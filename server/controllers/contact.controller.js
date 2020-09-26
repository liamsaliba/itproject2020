const User = require("../models/user.model");
const nodemailer = require("nodemailer");

const contact = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gamil.com",
    port: 465, // secure port
    secure: true,
    service: 'Gmail',
    auth: {
        user:  process.env.EMAILACCOUNT,
        pass: process.env.EMAILPASSWORD

    }
  });
  var textBody = `FROM: ${req.body.name}; EMAIL: ${req.body.email} MESSAGE: ${req.body.message}`;
  var htmlBody = `<h2>Mail From camel_case Contact Form</h2><p>from: ${req.body.name} <a href="mailto:${req.body.email}">${req.body.email}</a></p><p>${req.body.message}</p>`;

  const username = req.body.portfolio_username;
  var useremail = await User.findByUsername(username);

  var mail = {
    from: process.env.EMAILACCOUNT, // sender address
    //to: useremail, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
    to: useremail,
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

};

module.exports = {
  contact,
};


