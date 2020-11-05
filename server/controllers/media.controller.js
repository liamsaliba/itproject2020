const uploadMiddleware = require("../middleware/upload.middleware");
const Media = require("../models/media.model");

// Add a new media to the database
// Assumes uploadFile middleware has been called before and
// the result is stored in req.file
const createMedia = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      throw Error("User not found.");
    }
    if (!req.file || !req.file.path) {
      throw Error("File not uploaded.");
    }
    body = JSON.parse(req.body.json);
    const username = req.user.username;
    const url = req.file.path;
    const type = body.type;
    const description = body.description;
    const filename = body.filename;
    const public_id = req.file.public_id;

    const newMedia = new Media({
      username,
      url,
      type,
      description,
      filename,
      public_id,
    });

    await newMedia.save();

    res.status(200).send(newMedia.toObject());
  } catch (err) {
    res.status(400).json(err.message ? err.message : err);
  }
};

// Find all media files of a user
const findMediaByUsername = async (req, res) => {
  try {
    if (!req.user) {
      throw Error("User unidentified.");
    }
    const username = req.user.username;
    const media = await Media.find({
      username,
    });
    if (!media) {
      throw Error("Media not found.");
    }
    res.status(200).json(media.map(p => p.toObject()));
  } catch (err) {
    res.status(404).json(err.message ? err.message : err);
  }
};

// Find a media file using ID
const findMediaById = async (req, res) => {
  try {
    if (!req.params.mediaId) {
      throw Error("Media unidentified.");
    }

    const mediaId = req.params.mediaId;
    const media = await Media.findById(mediaId);
    if (!media) {
      throw Error(`Media ${mediaId} not found.`);
    }
    res.status(200).send(media.toObject());
  } catch (err) {
    res.status(404).json(err.message ? err.message : err);
  }
};

// Delete a media file
const deleteMediaById = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      throw Error("User not found.");
    }
    const mediaId = req.params.mediaId;
    const media = await Media.findByIdAndRemove(mediaId);
    if (!media) {
      throw Error(`Media ${mediaId} not found.`);
    }
    await uploadMiddleware.deleteFileHelper(media.public_id);
    res.status(200).json(`Media ${mediaId} deleted`);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  createMedia,
  findMediaByUsername,
  findMediaById,
  deleteMediaById,
};
