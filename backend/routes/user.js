



const express = require("express");
const userProfile = require("../controler/userDetail/profile.js");
const userUpdate = require("../controler/userDetail/updateUser.js");
const userDelete = require("../controler/userDetail/deleteUser.js");
const authMiddleware = require("../middleware/authMiddleware.js");


const router = express.Router();


router.get("/",authMiddleware,userProfile);
router.put("/update", authMiddleware , userUpdate);
router.delete("/delete", authMiddleware , userDelete);


module.exports = router