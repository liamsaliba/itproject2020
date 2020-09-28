const Artifact = require("../models/artifact.model");
const Media = require("../models/media.model");
const Page = require("../models/page.model");
const Portfolio = require("../models/portfolio.model");

// Find an artifact given its owner's username
const findArtifactsByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      throw Error("User unidentified.");
    }
    const username = req.params.username;
    const artifacts = await Artifact.findByUsername(username);
    if (!artifacts) {
      throw Error("Artifacts not found.");
    }
    res.status(200).json(artifacts.map(p => p.toObject()));
  } catch (err) {
    res.status(404).json(err);
  }
};

// Add a new page to the database
const createArtifact = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      throw Error("User not found.");
    }
    const username = req.user.username;
    const contents = req.body.contents;
    const pageId = req.params.pageId;
    const page = await Page.findById(pageId);
    const portfolio = await Portfolio.findByUsername(username);
    const portfolioId = portfolio._id;
    const newArtifact = new Artifact({
      username,
      contents,
      portfolioId,
      pageId,
    });
    await newArtifact.save();
    res.status(200).send(newArtifact.toObject());
  } catch (err) {
    res.status(400).json(`Page ${req.params.pageId} not found.`);
  }
};

// Find all (detailed) Artifacts
const findArtifactsByPageId = async (req, res) => {
  try {
    if (!req.params.pageId) {
      throw Error("Page unidentified.");
    }
    const pageId = req.params.pageId;
    const artifacts = await Artifact.findByPageId(pageId);
    if (!artifacts) {
      throw Error("Artifacts not found.");
    }
    res.status(200).send(
      artifacts.map(a => a.toObject())
    );
  } catch (err) {
    res.status(404).json(err);
  }
};

// Find all (detailed) Artifacts
const findArtifactsIdsByPageId = async (req, res) => {
  try {
    if (!req.params.pageId) {
      throw Error("Page unidentified.");
    }
    const pageId = req.params.pageId;
    const artifacts = await Artifact.findByPageId(pageId);
    if (!artifacts) {
      throw Error("Artifacts not found.");
    }
    res.status(200).json(
      artifacts.map(a => {
        const aObject = a.toObject();
        return aObject.id;
      })
    );
  } catch (err) {
    res.status(404).json(err);
  }
};

// Get an artifact given its ID (detailed artifacts)
const findArtifactById = async (req, res) => {
  try {
    if (!req.params.artifactId) {
      throw Error("Artifact ID not given.");
    }
    const id = req.params.artifactId;
    const artifact = await Artifact.findById(id);
    const aObject = artifact.toObject();
    let media = []
    for (let i = 0; i < aObject.media.length; i++) {
      const detailedMedia = await Media.findById(aObject.media[i]);
      if (!detailedMedia) {
        continue;
      }
      media.push(detailedMedia.toObject())
    }
    aObject.media = media;
    res.status(200).send(aObject);
  } catch (err) {
    res.status(404).json(`Artifact ${req.params.artifactId} not found.`);
  }
};

// Change an artifact's details
const changeArtifact = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      throw Error("User not found.");
    }
    const artifactId = req.params.artifactId;

    const artifact = await Artifact.findById(artifactId);
    const contents = req.body.contents;
    const type = req.body.type;
    artifact.contents = contents ? contents : artifact.contents;
    artifact.type = type ? type : artifact.type;
    await artifact.save();
    res.status(200).send(artifact.toObject());
  } catch (err) {
    res.status(400).json(`Artifact ${req.params.artifactId} not found.`);
  }
};

// Delete an artifact (requires password authentication first)
const deleteArtifactById = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      throw Error("User not found.");
    }
    const artifactId = req.params.artifactId;
    const artifact = await Artifact.findById(artifactId);
    if (!artifact) {
      throw new Error(`Artifact ${artifactId} not found.`);
    }
    await Artifact.findByIdAndDelete(artifactId);
    res.status(200).json(`Artifact ${artifactId} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const addMediaToArtifact = async (req, res) => {
  try {
    const mediaId = req.body.mediaId;
    const artifactId = req.params.artifactId;
    const artifact = await Artifact.findById(artifactId);
    if (!artifact.media.includes(mediaId)) {
      artifact.media.push(mediaId);
    }
    await artifact.save();
    res.status(200).json(`Media ${mediaId} successfully added to artifact ${artifactId}.`);
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
}

const removeMediaFromArtifact = async (req, res) => {
  try {
    const mediaId = req.body.mediaId;
    const artifactId = req.params.artifactId;
    const artifact = await Artifact.findById(artifactId);
    if (artifact.media.includes(mediaId)) {
      const index = artifact.media.indexOf(mediaId);
      if (index > -1) {
        artifact.media.splice(index, 1);
      }
    }
    await artifact.save();
    res.status(200).json(`Media ${mediaId} successfully removed from artifact ${artifactId}.`);
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
}

module.exports = {
  createArtifact,
  findArtifactsByUsername,
  deleteArtifactById,
  findArtifactById,
  changeArtifact,
  findArtifactsByPageId,
  findArtifactsIdsByPageId,
  addMediaToArtifact,
  removeMediaFromArtifact,
};