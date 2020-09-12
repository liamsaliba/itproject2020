// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

const portfolioController = require("../controllers/portfolio.controller");

const userMiddleware = require("../middleware/authentication.middleware");
const pageController = require("../controllers/page.controller");

router.post(
  "/",
  userMiddleware.authenticateToken,
  portfolioController.createPortfolio
);

router.get("/", portfolioController.getAllPortfolios);

router.get("/:username", portfolioController.findPortfolioByUsername);

router.patch(
  "/:username",
  userMiddleware.authenticateToken,
  portfolioController.changePortfolio
);

router.post(
  "/:username/page",
  userMiddleware.authenticateToken,
  pageController.createPage
);

module.exports = router;
