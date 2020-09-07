// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

const portfolioController = require("../controllers/portfolio.controller");

const userMiddleware = require("../middleware/authentication.middleware");

router.post("/create", portfolioController.createPortfolio);

router.get("/", portfolioController.getAllPortfolios);

router.get("/:username", portfolioController.findPortfolioByUsername);

router.delete("/delete", userMiddleware.authenticatePassword, 
              portfolioController.deletePortfolio);

module.exports = router;