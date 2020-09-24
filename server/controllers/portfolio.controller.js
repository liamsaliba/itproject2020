const Portfolio = require("../models/portfolio.model");
const emailBot = require("../emailbot/email");

// Return an array of all portfolios on the server
const getAllPortfolios = async (_req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).send(portfolios.map(p => p.toObject()));
  } catch (err) {
    res.status(404).json(err);
  }
};

// Add a new portfolio to the database
const createPortfolio = (req, res) => {
  if (req.user && req.user.username) {
    const username = req.user.username;
    const bio = req.body.bio;
    const theme = req.body.theme;
    const newPortfolio = new Portfolio({
      username,
      bio,
      theme,
    });
    newPortfolio
      .save()
      .then(() => res.status(200).json("New portfolio created!"))
      .catch(err => {
        if (err.code == 11000) {
          res.status(400).json("Portfolio of this user already exists!");
        } else if (err.message) {
          res.status(400).json(err.message);
        } else {
          res.status(400).json(err);
        }
      });
    if (req.user.local && req.user.local.email) {
      emailBot.sendPortfolioAddNotification(req.user.local.email, req.user);
    }
  } else {
    res.sendStatus(400);
  }
};

// Find a portfolio given its owner's username
const findPortfolioByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      throw Error("User not found!");
    }
    const username = req.params.username;
    const portfolio = await Portfolio.findByUsername(username);
    const p = portfolio.toObject();
    const contents = await Portfolio.findAllPages(username);
    p.contents = contents;
    res.status(200).json(p);
  } catch (err) {
    res
      .status(404)
      .json(`Portfolio for the username ${req.params.username} not found.`);
  }
};

// Change a portfolio's details
const changePortfolio = async (req, res) => {
  try {
    if (!req.user) {
      throw Error("User not found!");
    }
    const username = req.user.username;
    const portfolio = await Portfolio.findByUsername(username);
    const { bio, theme } = req.body;
    portfolio.bio = bio ? bio : portfolio.bio;
    portfolio.theme = theme ? theme : portfolio.theme;
    let changeItems = [];
    if (portfolio.isModified("bio")) changeItems = changeItems.concat("Bio");
    if (portfolio.isModified("theme"))
      changeItems = changeItems.concat("Theme");
    emailBot.sendPortfolioChangeNotification(
      req.user.local.email,
      req.user,
      changeItems
    );
    await portfolio.save();
    if (!portfolio) {
      throw Error("Portfolio not found!");
    }
    res.status(200).json(portfolio.toObject());
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete a portfolio (requires password authentication first)
const deletePortfolio = (req, res) => {
  Portfolio.findOneAndDelete({ username: req.user.username })
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  createPortfolio,
  findPortfolioByUsername,
  deletePortfolio,
  getAllPortfolios,
  changePortfolio,
};
