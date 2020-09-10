const Artifact = require("../models/artifact.model");
const portfolioModel = require("../models/portfolio.model");

// Add a new page to the database
const createArtifact = async (req, res) => {
  const username = req.params.username;
  const portfolio = await portfolioModel.findByUsername(username);
  const portfolioId = portfolio._id;
  const contents = req.body.contents;
  const newArtifact = new Artifact({
    username,
    portfolioId,
    contents,
  });
  newArtifact
    .save()
    .then(() => res.status(200).send("New page created!"))
    .catch(err => {
      if (err.message) {
        res.status(400).json(err.message);
      } else {
        res.status(400).json(err);
      }
    });
};

const findArtifactById = async (req, res) => {
  try {
    if (!req.params.artifactId) {
      res.status(400).json("User unidentified.");
      return;
    }
    const id = req.params.artifactId;
    const artifact = await Artifact.findById(id);
    res.status(200).json(artifact);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Find an artifact given its owner's username
const findArtifactsByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      res.status(400).json("User unidentified.");
      return;
    }
    const username = req.params.username;
    const artifacts = await Artifact.findByUsername(username);
    if (!artifacts) {
      res.status(404).json("Pages not found.");
      return;
    }
    res.status(200).json(artifacts);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete an artifact (requires password authentication first)
const deleteArtifactById = async (req, res) => {
  Artifact.findByIdAndDelete(req.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).json(err));
};

// Return an array of all artifacts on the server
const findArtifactsByPortfolioId = async (req, res) => {
  try {
    if (!req.params.username) {
      res.status(400).json("User unidentified.");
      return;
    }
    const portfolioId = req.params.portfolioId;
    const artifacts = await Artifact.findByPortfolioId(portfolioId);
    if (!artifacts) {
      res.status(404).json("Pages not found.");
      return;
    }
    res.status(200).json(artifacts);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createArtifact,
  findArtifactsByPortfolioId,
  findArtifactsByUsername,
  deleteArtifactById,
  findArtifactById,
};
