// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

const portfolioController = require("../controllers/portfolio.controller");

const userMiddleware = require("../middleware/authentication.middleware");
const pageController = require("../controllers/page.controller");

router.post("/create", portfolioController.createPortfolio);

router.get("/", portfolioController.getAllPortfolios);

router.get("/:username/pages", pageController.findPagesByUsername);

router.get("/:username/pages/:pageId", pageController.findPageById);

router.post("/:username/pages", pageController.createPage);

router.get("/:username/props", portfolioController.findPortfolioByUsername);

router.get("/:username", portfolioController.getAllPortfolios);

router.delete("/delete", userMiddleware.authenticatePassword, 
              portfolioController.deletePortfolio);

module.exports = router;