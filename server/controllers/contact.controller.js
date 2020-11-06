const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const emailBot = require("../emailbot/email");

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
    
    var useremail = await User.findByUsername(username);
    if (!useremail) { 
      throw Error("Username not found.");
    }
 
    emailBot.sendContactForm(
      useremail,
      name,
      email,
      message
    );

    await newContact.save();
    res.status(200).send(newContact.toObject());
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = {
  contact,
};
