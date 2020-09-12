const express = require("express");

const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const uploadMiddleware = require("../middleware/upload.middleware");

router.post(
  "/upload",
  uploadMiddleware.single("image"),
  uploadController.uploadImage
);

module.exports = router;