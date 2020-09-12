// Router for user
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

module.exports = router;
