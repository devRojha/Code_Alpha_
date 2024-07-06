
const express = require("express");
const authRouter = require("./auth.js")
const ProblemRouter = require("./problem.js")
const userData = require("./userData.js");
const userProfile = require("./user.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();


router.use("/auth",authRouter);
router.use("/problem",ProblemRouter);
router.use("/user", userData);
router.use("/userProfile", userProfile);


module.exports = router