
const express = require("express");
const userSignin = require("../controler/auth/userSignin.js")
const userSignup = require("../controler/auth/userSignup.js")

const adminSignin = require("../controler/auth/adminSignin.js")
const adminSignup = require("../controler/auth/adminSignup.js")



const router = express.Router();


router.post("/user/signin",userSignin);
router.post("/user/signup",userSignup);

router.post("/admin/signin",adminSignin);
router.post("/admin/signup",adminSignup);


module.exports = router