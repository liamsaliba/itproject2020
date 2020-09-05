const User = require("../models/user.model");

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
      username,
      firstName,
      middleName,
      lastName,
      password,
      email,
    });

    // Save the new User to the database
    const token = await newUser.generateAuthToken();

    res.status(201).send({
      user: newUser.toObject(),
      token: token,
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
    if (!user) {
      res.status(401).json("Incorrect username or password.");
      return;
    }
    const token = await user.generateAuthToken();
    res.status(200).send({
      user: user.toObject(),
      token,
    });
  } catch (err) {
    res.status(401).json(err);
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.user._id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json(err));
};

// Get the currently logged in user
const getCurrentUser = (req, res) => {
  res.status(200).send(req.user.toObject());
};

// Log out a user
const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(
      users.map((user) => {
        return user.username;
      })
    );
  } catch (err) {
    req.status(400).json(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  deleteUser,
  getAllUsers,
};
