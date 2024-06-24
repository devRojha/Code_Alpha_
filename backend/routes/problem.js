
const express = require("express");
const setProblem = require("../controler/problem/setProblem");
const allProblem = require("../controler/problem/allProblem");



const router = express.Router();


router.post("/setproblem",setProblem);
router.get("/allproblem",allProblem);


module.exports = router