
const express = require("express");
const setProblem = require("../controler/problem/setProblem");
const allProblem = require("../controler/problem/allProblem");
const authMiddleware = require("../middleware/authMiddleware")



const router = express.Router();


router.post("/setproblem",authMiddleware,setProblem);
router.get("/allproblem",allProblem);


module.exports = router