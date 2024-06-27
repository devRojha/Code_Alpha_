
const express = require("express");
const userProblemStatus = require("../controler/userDetail/userProblemArray");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();


router.get("/problemstatus",authMiddleware, userProblemStatus);


module.exports = router