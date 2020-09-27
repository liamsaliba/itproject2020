const Portfolio = require("../models/portfolio.model");
const emailBot = require("../emailbot/email");
const Page = require("../models/page.model");
const Artifact = require("../models/artifact.model");

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
const createPortfolio = async (req, res) => {
  try {
    if (req.user && req.user.username) {
      const username = req.user.username;
      const bio = req.body.bio;
      const theme = req.body.theme;
      const newPortfolio = new Portfolio({
        username,
        bio,
        theme,
      });
      const returnedPortfolio = newPortfolio.toObject();
      returnedPortfolio.pages = [];
      await newPortfolio.save();
      if (req.user.local && req.user.local.email) {
        emailBot.sendPortfolioAddNotification(req.user.local.email, req.user);
      }
      res.status(200).send(returnedPortfolio);
    } else {
      throw Error("User unidentified.");
    }
  } catch (err) {
    if (err.code == 11000) {
      res.status(400).json("Portfolio of this user already exists!");
    } else if (err.message) {
      res.status(400).json(err.message);
    } else {
      res.status(400).json(err);
    }
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
    p.pages = contents;
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
    if (req.user.local && req.user.local.email) {
      emailBot.sendPortfolioChangeNotification(
        req.user.local.email,
        req.user,
        changeItems
      );
    }
    await portfolio.save();
    if (!portfolio) {
      throw Error("Portfolio not found!");
    }
    res.status(200).send(portfolio.toObject());
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// Delete a portfolio (requires password authentication first)
const deletePortfolio = async (req, res) => {
  try {
    await Artifact.deleteMany({
      username: req.user.username,
    });
    await Page.deleteMany({
      username: req.user.username,
    });
    await Portfolio.deleteOne({
      username: req.user.username,
    });
    res
      .status(200)
      .json(`Portfolio of user ${req.user.username} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
};

const findAllDetails = async (req, res) => {
  try {
    if (!req.params.username) {
      throw Error("User not found!");
    }
    const username = req.params.username;
    let portfolio = await Portfolio.findByUsername(username);
    portfolio = portfolio ? portfolio.toObject() : {};
    let pages = await Page.findByUsername(username);
    pages = pages ? pages : [];
    let artifacts = await Artifact.findByUsername(username);
    artifacts = artifacts ? artifacts : [];
    res.status(200).send({
      portfolio,
      pages: pages.map(p => {
        const pObject = p.toObject();
        return pObject;
      }),
      artifacts: artifacts.map(a => {
        const aObject = a.toObject();
        return aObject;
      }),
    });
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
};

module.exports = {
  createPortfolio,
  findPortfolioByUsername,
  deletePortfolio,
  getAllPortfolios,
  changePortfolio,
  findAllDetails,
};
