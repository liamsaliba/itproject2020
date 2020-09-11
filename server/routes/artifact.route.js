// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

const artifactController = require("../controllers/artifact.controller");

router.get("/", artifactController.findArtifactsByUsername);

router.post("/", artifactController.createArtifact);

router.get("/:pageId", artifactController.createArtifact);

module.exports = router;
