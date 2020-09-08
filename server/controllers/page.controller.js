const Page = require("../models/page.model");
const portfolioModel = require("../models/portfolio.model");

// Add a new page to the database
const createPage = async (req, res) => {
  const username = req.params.username;
  const portfolio = await portfolioModel.findByUsername(username);
  const portfolioId = portfolio._id;
  const contents = req.body.contents;
  const newPage = new Page({
    username,
    portfolioId,
    contents,
  });
  newPage.save()
    .then(() => res.status(200).send("New page created!"))
    .catch(err => {
      if (err.message) {
        res.status(400).json(err.message);
      } else {
        res.status(400).json(err);
      }
    });
}


const findPageById = async (req, res) => {
  console.log("???")
  try {
    if (!req.params.pageId) {
      res.status(400).json("User unidentified.");
      return;
    }
    const id = req.params.pageId;
    const page = await Page.findById(id);
    if (!page) {
      res.status(404).json("Pages not found.");
      return;
    }
    res.status(200).json(page);
  } catch (err) {
    res.status(400).json(err);
  }
}


// Find a page given its owner's username
const findPagesByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      res.status(400).json("User unidentified.");
      return;
    }
    const username = req.params.username;
    const pages = await Page.findByUsername(username);
    if (!pages) {
      res.status(404).json("Pages not found.");
      return;
    }
    res.status(200).json(pages);
  } catch (err) {
    res.status(400).json(err);
  }
}


// Delete a page (requires password authentication first)
const deletePageById = async (req, res) => {
  Page.findByIdAndDelete(req.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json(err));
};


// Return an array of all pages on the server
const findPagesByPortfolioId = async (req, res) => {
  try {
    if (!req.params.username) {
      res.status(400).json("User unidentified.");
      return;
    }
    const portfolioId = req.params.portfolioId;
    const pages = await Page.findByPortfolioId(portfolioId);
    if (!pages) {
      res.status(404).json("Pages not found.");
      return;
    }
    res.status(200).json(pages);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  createPage,
  findPagesByPortfolioId,
  findPagesByUsername,
  deletePageById,
  findPageById,
};
