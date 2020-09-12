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
module.exports = uploadFile;