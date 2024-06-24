
const express = require("express");
const authRouter = require("./auth.js")
const ProblemRouter = require("./problem.js")
const userProblemStatus = require("./userProblemStatus.js");
const router = express.Router();


router.use("/auth",authRouter);
router.use("/problem",ProblemRouter);
router.use("/user", userProblemStatus);


module.exports = router