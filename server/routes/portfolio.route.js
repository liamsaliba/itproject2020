// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

const portfolioController = require("../controllers/portfolio.controller");

const userMiddleware = require("../middleware/authentication.middleware");
const pageController = require("../controllers/page.controller");
const artifactController = require("../controllers/artifact.controller");

router.post(
  "/create",
  userMiddleware.authenticateToken,
  portfolioController.createPortfolio
);

router.get("/", portfolioController.getAllPortfolios);

router.get("/:username/pages", pageController.findPagesByUsername);

router.get("/:username/pages/:pageId", pageController.findPageById);

router.post(
  "/:username/pages/:pageId",
  userMiddleware.authenticateToken,
  pageController.findPageById
);

router.delete(
  "/:username/pages/:pageId",
  userMiddleware.authenticateToken,
  pageController.deletePageById
);

router.patch(
  "/:username/pages/:pageId",
  userMiddleware.authenticateToken,
  pageController.changePage
);

router.post(
  "/:username/pages",
  userMiddleware.authenticateToken,
  pageController.createPage
);

router.patch(
  "/:username/artifacts/:artifactId",
  userMiddleware.authenticateToken,
  artifactController.changeArtifact
);

router.get(
  "/:username/artifacts/:artifactId",
  artifactController.findArtifactById
);

router.delete(
  "/:username/artifacts/:artifactId",
  userMiddleware.authenticateToken,
  artifactController.deleteArtifactById
);

router.get("/:username/artifacts", artifactController.findArtifactsByUsername);

router.post(
  "/:username/artifacts/",
  userMiddleware.authenticateToken,
  artifactController.createArtifact
);

router.get("/:username/artifacts", artifactController.findArtifactsByUsername);

router.post("/:username/artifacts/", artifactController.createArtifact);

router.get("/:username/props", portfolioController.findPortfolioByUsername);

router.get("/:username", portfolioController.findPortfolioByUsername);

router.delete(
  "/delete",
  userMiddleware.authenticatePassword,
  portfolioController.deletePortfolio
);

router.patch(
  "/",
  userMiddleware.authenticateToken,
  portfolioController.changePortfolio
);

module.exports = router;
