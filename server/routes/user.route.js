// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

const jwt = require("jsonwebtoken");

const userController = require("../controllers/user.controller");

// Create a new user
router.post("/signup", userController.createUser);

// Log in and send the user an access token
router.post("/login", userController.loginUser);

// Send the currently logged in user
router.get(
  "/me",
  userController.authenticateToken,
  userController.getCurrentUser
);

// Log the user out of their device
router.post(
  "/logout",
  userController.authenticateToken,
  userController.logoutUser
);

// Delete a user
router.post(
  "/delete",
  userController.authenticatePassword,
  userController.deleteUser
);

// Send usernames of all users
router.get("/", userController.getAllUsers);

module.exports = router;
