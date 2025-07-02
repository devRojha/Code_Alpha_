
const express = require("express");
const userProblemStatus = require("../controler/userDetail/userProblemArray");
const allUsers = require("../controler/userDetail/allUsers");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();


router.get("/problemstatus",authMiddleware, userProblemStatus);
router.get("/all",authMiddleware, allUsers);



module.exports = router