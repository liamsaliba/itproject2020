// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

const pageController = require("../controllers/page.controller");

router.get("/", pageController.findPagesByUsername);

router.post("/", pageController.createPage);

router.get("/:pageId", pageController.findPageById);

module.exports = router;