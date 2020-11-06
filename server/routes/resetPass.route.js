const express = require("express");
const router = express.Router();
const resetPassController = require("../controllers/resetpass.controller");

router.post("/Step1", resetPassController.resetPasswordStep1);
router.post("/Step2", resetPassController.resetPasswordStep2);

module.exports = router;
