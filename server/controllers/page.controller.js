const Artifact = require("../models/artifact.model");
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
    let pageObjects = [];
    for (i = 0; i < pages.length; i++) {
      const page = pages[i].toObject();
      const contents = await Page.findAllArtifacts(page.id);
      page.artifacts = contents;
      pageObjects.push(page);
    }
    if (!pages) {
      throw Error("Pages not found.");
    }
    res.status(200).json(pageObjects);
  } catch (err) {
    res.status(404).json(err.message ? err.message : err);
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
    if (!portfolio) {
      throw Error(`Portfolio for user ${username} not found.`);
    }
    const portfolioId = portfolio._id;
    const contents = req.body.contents;
    const name = req.body.name;
    const type = req.body.type;
    const newPage = new Page({
      username,
      portfolioId,
      contents,
      name,
      type,
    });
    await newPage.save();
    res.status(200).send(newPage.toObject());
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
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
    p.artifacts = contents;
    res.status(200).send(p);
  } catch (err) {
    res.status(404).json(`Page ${req.params.pageId} not found.`);
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
    res.status(400).json(`Page ${req.params.pageId} cannot be changed.`);
  }
};

// Delete a page (requires password authentication first)
const deletePageById = async (req, res) => {
  try {
    if (!req.user || !req.params.pageId) {
      throw Error("User or page not found.");
    }
    await Artifact.deleteMany({
      pageId: req.params.pageId,
    });
    await Page.findByIdAndDelete(req.params.pageId);
    res.status(200).json(`Page ${req.params.pageId} successfully deleted.`);
  } catch (err) {
    res.status(400).json(`Page ${req.params.pageId} cannot be deleted.`);
  }
};

// Find a page given its ID
const findAllDetails = async (req, res) => {
  try {
    if (!req.params.pageId) {
      throw Error();
    }
    const id = req.params.pageId;
    const page = await Page.findById(id);
    if (!page) {
      throw Error(`Page ${req.params.pageId} not found.`);
    }
    let artifacts = await Artifact.findByPageId(page.id);
    artifacts = artifacts ? artifacts : [];
    const p = page.toObject();
    res.status(200).send({
      page: p,
      artifacts: artifacts.map(a => {
        const aObject = a.toObject();
        return aObject;
      }),
    });
  } catch (err) {
    res.status(404).json(err.message ? err.message : err);
  }
};

module.exports = {
  createPage,
  findPagesByUsername,
  deletePageById,
  findPageById,
  changePage,
  findAllDetails,
};