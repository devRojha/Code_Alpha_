const mongoose = require("mongoose")

const OtpSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    OTP:{
        type: String,
        default: true
    }
});

module.exports = OtpSchema
