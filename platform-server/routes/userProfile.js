



const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { updateUser, updateUserPassword, submitCodeProblem, updateProblemSolved, updateProblemCode, deleteUser, profile } = require("../controllers/userDetail/userDetail.controller.js");

const router = express.Router();


router.get("/", authMiddleware, profile);
router.put("/update", authMiddleware , updateUser);
router.put("/updatePassword", updateUserPassword);
router.put("/update/submitcode", authMiddleware , submitCodeProblem);
router.put("/update/problemstatus", authMiddleware , updateProblemSolved);
router.put("/update/problemcode", authMiddleware , updateProblemCode);
router.delete("/delete", authMiddleware , deleteUser);


module.exports = router