const User = require("../models/user.model");
const emailBot = require("../emailbot/email");
const Artifact = require("../models/artifact.model");
const Page = require("../models/page.model");
const Portfolio = require("../models/portfolio.model");
const Media = require("../models/media.model");

// Get all users (as an array of usernames)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(
      users.map(user => {
        const uObject = user.toObject();
        delete uObject.local;
        delete uObject.facebook;
        delete uObject.google;
        delete uObject.method;
        return uObject;
      })
    );
  } catch (err) {
    req.status(400).json(err);
  }
};

// Get the currently logged in user
const getCurrentUser = (req, res) => {
  if (req.user) {
    res.status(200).send(req.user.toObject());
  } else {
    res.status(404).json("Not found");
  }
};

// Change the details of an authenticated user
const changeUserDetails = async (req, res) => {
  try {
    if (req.user) {
      const firstName = req.body.firstName;
      const middleName = req.body.middleName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const user = req.user;
      user.local.firstName = firstName ? firstName : user.local.firstName;
      user.local.middleName = middleName ? middleName : user.local.middleName;
      user.local.lastName = lastName ? lastName : user.local.lastName;
      user.local.email = email ? email : user.local.email;
      let changeItems = [];
      if (user.isModified("local.firstName"))
        changeItems = changeItems.concat("First Name");
      if (user.isModified("local.middleName"))
        changeItems = changeItems.concat("Middle Name");
      if (user.isModified("local.lastName"))
        changeItems = changeItems.concat("Last Name");
      if (user.isModified("local.email"))
        changeItems = changeItems.concat("Email");
      if (user.local && user.local.email) {
        emailBot.sendAccountChangeNotification(
          user.local.email,
          user,
          changeItems
        );
      }
      await user.save();
      res.status(200).send(user.toObject());
    }
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
};

// Add an avatar to a user (or change it if it already exists)
const addAvatar = async (req, res) => {
  try {
    // Delete the current avatar of the user
    await Media.findOneAndDelete({
      username: req.user.username,
      description: "avatar",
    });

    // Create a new media
    const newMedia = new Media({
      username: req.user.username,
      url: req.file.path,
      type: "image",
      description: "avatar",
      public_id: req.file.public_id,
    });
    await newMedia.save();

    // Also update the avatar's URL of the user
    req.user.avatar = req.file.path;
    await req.user.save();

    res.status(200).json("Avatar changed.");
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    if (req.user && req.user.username) {
      const user = await User.findOneAndRemove({
        username: req.user.username,
      });

      // Delete all dependencies of this user
      await Artifact.deleteMany({
        username: req.user.username,
      });
      await Page.deleteMany({
        username: req.user.username,
      });
      await Portfolio.deleteOne({
        username: req.user.username,
      });
      await Media.deleteMany({
        username: req.user.username,
      });
      res.status(200).json(`User ${user.username} successfully deleted.`);
    } else {
      throw Error("User unidentified.");
    }
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
};

// Add a new user to the database
const createUser = async (req, res) => {
  try {
    // Create a new user
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const newUser = new User({
      method: ["local"],
      username,
      local: {
        password,
        firstName,
        middleName,
        lastName,
        email,
      },
    });

    // Save the new User to the database
    // Create an authentication token
    const token = await newUser.generateAuthToken();

    // Notify the user by email
    emailBot.sendGreeting(email, newUser);

    res.status(201).send({
      user: newUser.toObject(),
      token,
    });
  } catch (err) {
    if (err.code == 11000) {
      res.status(400).json("Username already exists.");
    } else if (err.message) {
      res.status(400).json(err.message);
    } else {
      res.status(400).json(err);
    }
  }
};

// Log in to existing user
const loginUser = async (req, res) => {
  try {
    // Get username and password from the request body
    // and find the user in the database
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();

    res.status(200).send({
      user: user.toObject(),
      token,
    });
  } catch (err) {
    res.status(401).json("Incorrect username or password.");
  }
};

// Log out a user
const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).json(err);
  }
};

// Log out user on all devices
const logoutUserAllDevices = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).json(err);
  }
};

const googleOAuth = async (req, res, next) => {
  // Generate token

  const token = await req.user.generateAuthToken();
  res.status(201).send({
    user: req.user.toObject(),
    token,
  });
};

const facebookOAuth = async (req, res, next) => {
  // Generate token

  const token = await req.user.generateAuthToken();
  res.status(201).send({
    user: req.user.toObject(),
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  deleteUser,
  getAllUsers,
  changeUserDetails,
  logoutUserAllDevices,
  googleOAuth,
  facebookOAuth,
  addAvatar,
};
