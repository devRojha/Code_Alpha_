
const express = require("express");
const authRouter = require("./auth.js")
const ProblemRouter = require("./problem.js")
const userData = require("./userData.js");
const userProfile = require("./user.js");
const email = require("./email.js");
const router = express.Router();


router.use("/auth",authRouter);
router.use("/problem",ProblemRouter);
router.use("/user", userData);
router.use("/userProfile", userProfile);
router.use("/email", email);



module.exports = router