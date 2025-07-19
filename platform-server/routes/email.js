
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { emailOTP, emailForgotPassword, emailNotification } = require("../controllers/email/email.controller");




const router = express.Router();


router.post("/otp", emailOTP);
router.post("/forgotPassword", emailForgotPassword);
router.post("/notification", authMiddleware, emailNotification), 

module.exports = router