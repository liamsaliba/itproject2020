const User = require("../../models/user.model");
const Contact = require("../../models/contact.model");
const nodemailer = require("nodemailer");
const nodemailerMock = require("nodemailer-mock");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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
    
    const oauth2Client = new OAuth2(
      process.env.MAILER_CLIENT_ID, // ClientID
      process.env.MAILER_CLIENT_SECRET, // Client Secret
      "https://developers.google.com/oauthplayground" // Redirect URL
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.MAILER_REFRESH_TOKEN
    });
    const accessToken = oauth2Client.getAccessToken()

    let transporter = nodemailerMock.createTransport({
      host: "smtp.gmail.com",
      port: 465, // secure port
      secure: true,
      service: "gmail",
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ACCOUNT,
        clientId: process.env.MAILER_CLIENT_ID,
        clientSecret: process.env.MAILER_CLIENT_SECRET,
        refreshToken: process.env.MAILER_REFRESH_TOKEN,
        accessToken: accessToken,
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
