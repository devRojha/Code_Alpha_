



const express = require("express");
const userProfile = require("../controler/userDetail/profile.js");
const { updateProblemSolved, updateUser, updateProblemCode } = require("../controler/userDetail/updateUser.js");
const userDelete = require("../controler/userDetail/deleteUser.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const submitCodeProblem = require("../controler/userDetail/submitCodeProblem.js");


const router = express.Router();


router.get("/",authMiddleware,userProfile);
router.put("/update", authMiddleware , updateUser);
router.put("/update/submitcode", authMiddleware , submitCodeProblem);
router.put("/update/problemstatus", authMiddleware , updateProblemSolved);
router.put("/update/problemcode", authMiddleware , updateProblemCode);
router.delete("/delete", authMiddleware , userDelete);


module.exports = router