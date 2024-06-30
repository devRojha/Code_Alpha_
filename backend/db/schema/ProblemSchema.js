const mongoose = require("mongoose")

const ProblemSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Deficulty: {
        type: String, 
        required: true
    },
    Constraint: {
        type: String, 
        required: false
    },
    TotalSubmit: {
        type: Number,
        default: 0,
    },
    AcceptSubmit:{
        type: Number,
        default: 0
    },
    AdminId:{
        type : String,
        required : false
    }
});

module.exports = ProblemSchema
