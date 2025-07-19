
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { allUsers, allProblem } = require("../controllers/userDetail/userDetail.controller");


const router = express.Router();


router.get("/problemstatus", authMiddleware, allProblem);
router.get("/all", authMiddleware, allUsers);



module.exports = router