const router = require("express").Router();

// TODO: add more routes

const userRouter = require("./user.route");

router.use("/user", userRouter);

module.exports = router;
