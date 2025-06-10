
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const emailOTP = require("../controler/email/emailOTP");
const emailForgotPassword = require("../controler/email/emailFrogotPassword");




const router = express.Router();


router.post("/otp",emailOTP);
router.post("/forgotPassword",authMiddleware ,emailForgotPassword);
// router.post("/notification", emailNotification), 


module.exports = router