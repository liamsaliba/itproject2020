// Router for media
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();
const userMiddleware = require("../middleware/authentication.middleware");
const mediaController = require("../controllers/media.controller");
const uploadMiddleware = require("../middleware/upload.middleware");

router.get("/:mediaId",
  userMiddleware.authenticateToken,
  mediaController.findMediaById
);

router.get("/",
  userMiddleware.authenticateToken,
  mediaController.findMediaByUsername
);

router.post("/",
  userMiddleware.authenticateToken,
  uploadMiddleware.uploadFile.single("image"),
  uploadMiddleware.getPublicId,
  mediaController.createMedia
)

router.delete(
  "/:mediaId",
  userMiddleware.authenticateToken,
  mediaController.deleteMediaById
);

module.exports = router;