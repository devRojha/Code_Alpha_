
const express = require("express");
const setProblem = require("../controler/problem/setProblem");
const editProblem = require("../controler/problem/editProblem");
const deleteProblem = require("../controler/problem/deleteProblem");
const allProblem = require("../controler/problem/allProblem");
const Problem = require("../controler/problem/problembyid");
const authMiddleware = require("../middleware/authMiddleware");
const addtestcases = require("../controler/testCases/addtestcases");



const router = express.Router();


router.post("/setproblem",authMiddleware,setProblem);
router.put("/editproblem",authMiddleware,editProblem);
router.delete("/deleteproblem",authMiddleware,deleteProblem);
router.get("/allproblem",allProblem);
router.get("/problembyid",authMiddleware,Problem);
router.post("/addtestcases", authMiddleware, addtestcases)


module.exports = router