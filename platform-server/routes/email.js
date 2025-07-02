
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const emailOTP = require("../controler/email/emailOTP");
const emailForgotPassword = require("../controler/email/emailFrogotPassword");
const emailNotification = require("../controler/email/emailNotification");




const router = express.Router();


router.post("/otp",emailOTP);
router.post("/forgotPassword" ,emailForgotPassword);
router.post("/notification",authMiddleware, emailNotification), 

module.exports = router