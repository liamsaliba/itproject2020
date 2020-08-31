const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

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
    });
  } catch (err) {
    if (err.code == 11000) {
      res.status(400).json("Username already exists.");
    } else {
      res.status(400).json(err);
    }
  }
};

// Log in to existing user
const loginUser = async (req, res, next) => {
  try {
    // Get username and password from the request body
    // and find the user in the database
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res.status(401).json("Incorrect username or password.");
    }
    const token = await user.generateAuthToken();
    res.status(200).send({
      user: user.toObject(),
      token,
    });
    req.user = user;
    next();
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
  res.status(200).send({
    user: req.user.toObject(),
  });
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

// Verify the authentication token the user uses
// and send the user to the next request (if the user
// is found and verified).
const authenticateToken = (req, res, next) => {
  // Form: Bearer [TOKEN]
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) res.status(401).json({});

  // Find details of the user who has been granted this token
  jwt.verify(token, process.env.SECRET_KEY, (err, details) => {
    if (err) return res.sendStatus(403);
    if (details == null) return res.sendStatus(401);

    // Find the user
    User.findById(details._id)
      .then((user) => {
        // User not found
        if (user == null) return res.sendStatus(401);

        // User does not hold the current token anymore
        if (user.tokens.map((token) => token.token).indexOf(token) < 0)
          return res.sendStatus(401);

        // Send the user to the next request
        req.user = user;
        req.token = token;
        next();
      })
      .catch((err) => res.status(400).json(err));
  });
};

// Authenticate the login credentials and send the user to
// the next request
const authenticatePassword = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res.status(401).json("Incorrect username or password.");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  deleteUser,
  authenticateToken,
  getAllUsers,
  authenticatePassword,
};
