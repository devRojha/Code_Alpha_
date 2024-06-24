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
    AdminId:{
        type : String,
        required : false
    }
});

module.exports = ProblemSchema
