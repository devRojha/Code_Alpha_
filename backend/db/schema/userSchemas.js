const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Problem: {
        type: [String], // Assuming the problems are stored as an array of strings
        default: []
    },
    Admin:{
        type : Boolean,
        default : false
    }
});

module.exports = UserSchema
