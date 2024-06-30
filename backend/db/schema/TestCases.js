const mongoose = require("mongoose")

const TestCasesSchema = new mongoose.Schema({
    ProblemId: {
        type: String,
        required: true
    },
    Cases: {
        type: [String], 
        default: []
    },
    AdminId:{
        type : String,
        required : false
    }
});

module.exports = TestCasesSchema
