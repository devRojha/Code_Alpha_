
const express = require("express");
const { userSignin, userSignup, adminSignin, adminSignup } = require("../controllers/auth/auth.controller.js");




const router = express.Router();


router.post("/user/signin",userSignin);
router.post("/user/signup",userSignup);

router.post("/admin/signin",adminSignin);
router.post("/admin/signup",adminSignup);


module.exports = router