const express = require("express");

const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const uploadMiddleware = require("../middleware/upload.middleware");

router.post(
  "/upload",
  uploadMiddleware.uploadFile.single("image"),
  uploadMiddleware.getPublicId,
  uploadController.uploadImage
);

router.delete(
  "/upload",
  uploadMiddleware.deleteFile,
  uploadController.deleteImage
);

module.exports = router;