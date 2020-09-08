const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Verify the authentication token the user uses
// and send the user to the next request (if the user
// is found and verified).
const authenticateToken = (req, res, next) => {
  // Form: Bearer [TOKEN]
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({});
    return;
  }

  // Find details of the user who has been granted this token
  jwt.verify(token, process.env.SECRET_KEY, (err, details) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    if (!details) {
      res.sendStatus(401);
      return;
    }

    // Find the user
    User.findById(details._id)
      .then(user => {
        // User not found
        if (!user) {
          res.sendStatus(401);
          return;
        }

        // User does not hold the current token anymore
        if (user.tokens.map(token => token.token).indexOf(token) < 0) {
          res.sendStatus(401);
          return;
        }

        // Send the user to the next request
        req.user = user;
        req.token = token;
        next();
      })
      .catch(err => {
        res.status(400).json(err);
        return;
      });
  });
};

// Authenticate the login credentials and send the user to
// the next request
const authenticatePassword = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      res.status(401).json("Incorrect username or password.");
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(err);
    return;
  }
};

module.exports = {
  authenticatePassword,
  authenticateToken,
};
