const Portfolio = require("../models/portfolio.model");
const authMiddleware = require("../middleware/authentication.middleware");

// Add a new portfolio to the database
const createPortfolio = (req, res) => {
  const username = req.body.username;
  const bio = req.body.bio;
  const newPortfolio = new Portfolio({
    username,
    bio,
  });
  newPortfolio
    .save()
    .then(() => res.status(200).send("New portfolio created!"))
    .catch(err => {
      if (err.code == 11000) {
        res.status(400).json("Portfolio of this user already exists.");
      } else if (err.message) {
        res.status(400).json(err.message);
      } else {
        res.status(400).json(err);
      }
    });
};

// Find a portfolio given its owner's username
const findPortfolioByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      res.status(400).json("User unidentified.");
      return;
    }
    const username = req.params.username;
    const portfolio = await Portfolio.findByUsername(username);
    if (!portfolio) {
      res.status(404).json("Portfolio not found.");
      return;
    }
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete a portfolio (requires password authentication first)
const deletePortfolio = async (req, res) => {
  Portfolio.findOneAndDelete({ username: req.user.username })
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err));
};

// Get the portfolio of the user currently logged in
const getCurrentPortfolio = (req, res) => {
  const portfolio = findPortfolioByUsername(req.user.username);
  if (!portfolio) {
    res.status(404).json("Portfolio not found.");
    return;
  }
  res.status(200).json(portfolio);
};

// Return an array of all portfolios on the server
const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).send(portfolios);
  } catch (err) {
    req.status(400).json(err);
  }
};

module.exports = {
  createPortfolio,
  findPortfolioByUsername,
  deletePortfolio,
  getCurrentPortfolio,
  getAllPortfolios,
};
