// Router for artifact
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();
const userMiddleware = require("../middleware/authentication.middleware");

const artifactController = require("../controllers/artifact.controller");

router.get("/:artifactId", artifactController.findArtifactById);

router.patch(
  "/:artifactId",
  userMiddleware.authenticateToken,
  artifactController.changeArtifact
);

router.delete(
  "/:artifactId",
  userMiddleware.authenticateToken,
  artifactController.deleteArtifactById
);

router.post(
  "/:artifactId/media",
  userMiddleware.authenticateToken,
  artifactController.addMediaToArtifact
);

router.delete(
  "/:artifactId/media",
  userMiddleware.authenticateToken,
  artifactController.removeMediaFromArtifact
);

module.exports = router;
