const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
  },
  allowedFormats: ["jpg", "jpeg", "png"],
  transformations: [{
    width: 500,
    height: 500,
    crop: "limit"
  }],
});

const uploadFile = multer({
  storage: storage
});

const deleteFile = async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.body.id, {
      folder: "uploads",
    });
    req.deleteStatus = true;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
}


const getPublicId = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.file.public_id = result.public_id;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
}

const getPublicIdHelper = async url => {
  try {
    const result = await cloudinary.uploader.upload(url);
    return result.public_id;
  } catch (err) {
    return null;
  }
}

const deleteFileHelper = async public_id => {
  try {
    if (public_id) {
      await cloudinary.uploader.destroy(public_id, {
        folder: "uploads",
      });
    }
  } catch (err) {}
}

module.exports = {
  uploadFile,
  getPublicId,
  deleteFile,
  getPublicIdHelper,
  deleteFileHelper
};