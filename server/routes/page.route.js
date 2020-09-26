// Create a new router
const router = require("express").Router();
const userMiddleware = require("../middleware/authentication.middleware");
const pageController = require("../controllers/page.controller");
const artifactController = require("../controllers/artifact.controller");

router.get("/:pageId", pageController.findPageById);

router.patch(
  "/:pageId",
  userMiddleware.authenticateToken,
  pageController.changePage
);

router.delete(
  "/:pageId",
  userMiddleware.authenticateToken,
  pageController.deletePageById
);

router.post(
  "/:pageId/artifacts",
  userMiddleware.authenticateToken,
  artifactController.createArtifact
);

router.get(
  "/:pageId/all",
  pageController.findAllDetails
);

router.get("/:pageId/artifacts", artifactController.findArtifactsByPageId);

module.exports = router;