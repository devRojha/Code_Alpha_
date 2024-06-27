
const express = require("express");
const authRouter = require("./auth.js")
const ProblemRouter = require("./problem.js")
const userProblemStatus = require("./userProblemStatus.js");
const userProfile = require("./user.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();


router.use("/auth",authRouter);
router.use("/problem",ProblemRouter);
router.use("/user", userProblemStatus);
router.use("/userProfile", userProfile);


module.exports = router