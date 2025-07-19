
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const { setProblem, editProblem, codeSubmitProblem, deleteProblem, allProblem, problemById } = require("../controllers/problem/problem.controller");
const { deleteTestCases, getTestCases, compareResult, addTestCases } = require("../controllers/testCases/testCases.controller");


const router = express.Router();


router.get("/allproblem", allProblem);
router.post("/setproblem", authMiddleware, setProblem);
router.get("/problembyid", authMiddleware, problemById);
router.put("/editproblem", authMiddleware, editProblem);
router.put("/update/submitcode", authMiddleware, codeSubmitProblem);

router.get("/testcases", getTestCases)
router.delete("/deleteproblem", authMiddleware, deleteProblem);
router.post("/addtestcases", authMiddleware, addTestCases);
router.delete("/deletetestcases", authMiddleware, deleteTestCases);

router.post("/compareresult", compareResult);


module.exports = router