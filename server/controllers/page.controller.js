const Page = require("../models/page.model");
const portfolioModel = require("../models/portfolio.model");

// Get all pages of a user
const findPagesByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      throw Error("User unidentified.");
    }
    const username = req.params.username;
    const pages = await Page.findByUsername(username);
    if (!pages) {
      throw Error("Pages not found.");
    }
    res.status(200).json(pages.map(p => p.toObject()));
  } catch (err) {
    res.status(404).json(err);
  }
};

// Add a new page to the database
const createPage = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      throw Error("User not found.");
    }
    const username = req.params.username;
    const portfolio = await portfolioModel.findByUsername(username);
    const portfolioId = portfolio._id;
    const contents = req.body.contents;
    const newPage = new Page({
      username,
      portfolioId,
      contents,
    });
    await newPage.save();
    res.status(200).send(newPage);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Find a page given its ID
const findPageById = async (req, res) => {
  try {
    if (!req.params.pageId) {
      throw Error();
    }
    const id = req.params.pageId;
    const page = await Page.findById(id);
    const contents = await Page.findAllArtifacts(page._id);
    const p = page.toObject();
    p.contents = contents;
    if (!page) {
      throw Error("Page not found.");
    }
    res.status(200).json(p);
  } catch (err) {
    res.status(404).json(err);
  }
};

// Change the contents of a page
const changePage = async (req, res) => {
  try {
    if (!req.user || !req.params.pageId) {
      throw Error("User or page not found.");
    }
    const page = await Page.findById(req.params.pageId);
    const contents = req.body.contents;
    const type = req.body.type;
    const name = req.body.name;
    page.contents = contents ? contents : page.contents;
    page.type = type ? type : page.type;
    page.name = name ? name : page.name;
    await page.save();
    res.status(200).json(page.toObject());
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete a page (requires password authentication first)
const deletePageById = async (req, res) => {
  try {
    if (!req.user || !req.params.pageId) {
      throw Error("User or page not found.");
    }
    await Page.findByIdAndDelete(req.params.pageId);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(error);
  }
};

module.exports = {
  createPage,
  findPagesByUsername,
  deletePageById,
  findPageById,
  changePage,
};
