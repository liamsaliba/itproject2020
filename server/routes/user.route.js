// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middleware/authentication.middleware");

// Create a new user
router.post("/signup", userController.createUser);

// Log in and send the user an access token
router.post("/login", userController.loginUser);

// Log the user out of their device
router.post(
  "/logout",
  userMiddleware.authenticateToken,
  userController.logoutUser
);

// Send the currently logged in user
router.get(
  "/",
  userMiddleware.authenticateToken,
  userController.getCurrentUser
);

// Change the details of the authenticated user
router.patch(
  "/",
  userMiddleware.authenticateToken,
  userController.changeUserDetails
);

// Delete a user
router.delete(
  "/",
  userMiddleware.authenticatePassword,
  userController.deleteUser
);

// Log out from all devices
router.post(
  "/logout/all",
  userMiddleware.authenticateToken,
  userController.logoutUserAllDevices
);

module.exports = router;
