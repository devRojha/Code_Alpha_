
const express = require("express");
const userProblemStatus = require("../controler/userDetail/userProblemArray")


const router = express.Router();


router.get("/problemstatus", userProblemStatus);


module.exports = router